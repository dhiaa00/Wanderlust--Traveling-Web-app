from flask import Flask, request, jsonify
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

def generate_recommendations(user_preferences, data):
    # Sample travel offers data (for demonstration purposes)
    # travel_offers = [
    #     {"id": 1, "destination": "Paris", "tags": "city, culture, romance", "agency_location": (40.7128, -74.0060), "rating": 4.5},
    # ]
    
    travel_offers = data
    
    
    if not travel_offers:
        return []

    # Sample user preferences and location (for demonstration purposes)
    # user_preferences = {"id": 1, "tags": "beach, luxury, relaxation", "location": (40.7128, -74.0060)} 

    # Weighting factors
    weight_preferences = 0.6
    weight_rating = 0.3
    weight_location = 0.1

    # Weighting based on position in preferences list
    num_preferences = len(user_preferences)
    preference_weights = [1.0 - i / num_preferences for i in range(num_preferences)]

    # Combine user preferences with travel offers' tags
    all_tags = [" ".join(offer['categories']) for offer in travel_offers] + [" ".join(user_preferences)]

    # Convert combined tags into text and feature vectors
    vectorizer = TfidfVectorizer()
    tag_vectors = vectorizer.fit_transform(all_tags)

    # Extract user preferences' TF-IDF vector
    user_preferences_vector = tag_vectors[-1]

    # Compute cosine similarity between user preferences and travel offers' tags
    similarities = cosine_similarity(user_preferences_vector, tag_vectors[:-1])

    # Incorporate rating and agency location proximity into similarity scores with weights
    for i in range(len(travel_offers)):
        rating_weight = 4.5 / 5.0  # Normalize rating to range [0, 1]
        location_weight = 1.0 / (1.0 + (sum(((40.7128, -74.0060)[j] - (40.7128, -74.0060)[j]) ** 2 for j in range(2))) ** 0.5)
        preference_similarity = sum(preference_weights[pos] * similarities[0][i] for pos in range(num_preferences))
        rating_weighted = weight_rating * rating_weight
        location_weighted = weight_location * location_weight
        similarities[0][i] = (weight_preferences * preference_similarity + rating_weighted + location_weighted)  # Adjust similarity score based on preferences, rating, and location   

    ranked_indices = similarities.argsort(axis=1)[:, ::-1].flatten()
    ranked_offers = [travel_offers[i] for i in ranked_indices]

    # Display top recommendations
    top_recommendations = ranked_offers[:5]
    # return just the ids
    recommendations_ids = [offer['id'] for offer in top_recommendations]
    
    return recommendations_ids



app = Flask(__name__)


limiter = Limiter(app, key_func=get_remote_address)

def get_recommendations():
    user_preferences = request.json.get('userPreferences')
    data = request.json.get('data')
    recommendations = generate_recommendations(user_preferences, data)
    print(recommendations)
    return jsonify({'recommendations': recommendations})

# Set the rate limit rules
limiter.limit("100/minute")(get_recommendations)  # Limit the rate to 100 requests per minute

@app.route('/recommendations', methods=['POST'])
@limiter.exempt  # Exempt this route from rate limiting
def recommendations_route():
    return get_recommendations()

if __name__ == '__main__':
    app.run(debug=True)