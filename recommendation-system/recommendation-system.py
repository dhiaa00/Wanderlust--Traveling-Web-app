# from flask import Flask, request, jsonify, redirect
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.metrics.pairwise import cosine_similarity
# # from flask_limiter import Limiter
# # from flask_limiter.util import get_remote_address

# def generate_recommendations(user_preferences, data):
#     travel_offers = data
    
#     if not travel_offers:
#         return []

#     weight_preferences = 0.6
#     weight_rating = 0.3
#     weight_location = 0.1

#     num_preferences = len(user_preferences)
#     preference_weights = [1.0 - i / num_preferences for i in range(num_preferences)]

#     all_tags = [" ".join(offer['categories']) for offer in travel_offers] + [" ".join(user_preferences)]

#     vectorizer = TfidfVectorizer()
#     tag_vectors = vectorizer.fit_transform(all_tags)

#     user_preferences_vector = tag_vectors[-1]

#     similarities = cosine_similarity(user_preferences_vector, tag_vectors[:-1])

#     for i in range(len(travel_offers)):
#         rating_weight = travel_offers[i].get('rating', 0) / 5.0
#         location_weight = 1.0 / (1.0 + (sum(((user_preferences.get('location')[j] - travel_offers[i].get('agency_location')[j]) ** 2 for j in range(2))) ** 0.5))
#         preference_similarity = sum(preference_weights[pos] * similarities[0][i] for pos in range(num_preferences))
#         rating_weighted = weight_rating * rating_weight
#         location_weighted = weight_location * location_weight
#         similarities[0][i] = (weight_preferences * preference_similarity + rating_weighted + location_weighted)

#     ranked_indices = similarities.argsort(axis=1)[:, ::-1].flatten()
#     ranked_offers = [travel_offers[i] for i in ranked_indices]

#     top_recommendations = ranked_offers[:5]
#     recommendations_ids = [offer['id'] for offer in top_recommendations]
    
#     return recommendations_ids

# app = Flask(__name__)
# # limiter = Limiter(app, key_func=get_remote_address)

# # @app.before_request
# # def before_request():
# #     if not request.is_secure:
# #         url = request.url.replace('http://', 'https://', 1)
# #         return redirect(url, code=301)

# @app.route('/recommendations', methods=['POST'])
# # @limiter.limit("100 per minute")
# def recommendations_route():
#     user_preferences = request.json.get('userPreferences')
#     data = request.json.get('data')
#     recommendations = generate_recommendations(user_preferences, data)
#     return jsonify({'recommendations': recommendations})

# @app.errorhandler(500)
# def internal_error(error):
#     return jsonify(message="Internal server error"), 500

# if __name__ == '__main__':
#     app.run(debug=True)



from flask import Flask, request, jsonify, redirect
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

def generate_recommendations(user_preferences, data):
    travel_offers = data
    
    if not travel_offers:
        return []

    # Adjust weights if needed
    weight_preferences = 0.6
    weight_rating = 0.3
    weight_location = 0.1

    # Process user preferences
    print(user_preferences)
    # append a default user location
    user_location = (0, 0)
    default_agency_location = (0, 0) # instead of travel_offers[i]['agency_location']
    tags = user_preferences
    num_preferences = len(tags)
    preference_weights = [1.0 - i / num_preferences for i in range(num_preferences)]

    # Create a combined list of tags for TF-IDF vectorization
    all_tags = [" ".join(offer['categories']) for offer in travel_offers] + [" ".join(tags)]

    # Vectorize the tags using TF-IDF
    vectorizer = TfidfVectorizer()
    tag_vectors = vectorizer.fit_transform(all_tags)

    # Get the user preferences vector
    user_preferences_vector = tag_vectors[-1]

    # Calculate similarities
    similarities = cosine_similarity(user_preferences_vector, tag_vectors[:-1]).flatten()

    # Compute final scores considering preferences, ratings, and location
    for i in range(len(travel_offers)):
        rating_weight = travel_offers[i].get('rating', 0) / 5.0
        location_weight = 1.0 / (1.0 + (sum((user_location[j] - default_agency_location[j]) ** 2 for j in range(2))) ** 0.5)
        
        preference_similarity = similarities[i]
        rating_weighted = weight_rating * rating_weight
        location_weighted = weight_location * location_weight
        
        # Update similarity score
        similarities[i] = (weight_preferences * preference_similarity) + rating_weighted + location_weighted

    # Rank offers based on the final score
    ranked_indices = np.argsort(similarities)[::-1]
    ranked_offers = [travel_offers[i] for i in ranked_indices]

    # Get the top 5 recommendations
    top_recommendations = ranked_offers[:5]
    recommendations_ids = [offer['id'] for offer in top_recommendations]
    
    return recommendations_ids

app = Flask(__name__)

@app.route('/recommendations', methods=['POST'])
def recommendations_route():
    user_preferences = request.json.get('userPreferences')
    data = request.json.get('data')
    recommendations = generate_recommendations(user_preferences, data)
    return jsonify({'recommendations': recommendations})

@app.errorhandler(500)
def internal_error(error):
    return jsonify(message="Internal server error"), 500

if __name__ == '__main__':
    app.run(debug=True)
