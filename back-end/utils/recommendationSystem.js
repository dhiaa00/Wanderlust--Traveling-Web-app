const { TfidfVectorizer } = require("sklearn.feature_extraction.text");
const { cosineSimilarity } = require("sklearn.metrics.pairwise");

function generateRecommendations(userPreferences, data) {
  const travelOffers = data;
  const userTags = userPreferences.tags;

  // Weighting factors
  const weightPreferences = 0.6;
  const weightRating = 0.3;
  const weightLocation = 0.1;

  // Weighting based on position in preferences list
  const numPreferences = userTags.length;
  const preferenceWeights = Array.from(
    { length: numPreferences },
    (_, i) => 1.0 - i / numPreferences
  );

  // Combine user preferences with travel offers' tags
  const allTags = travelOffers.map((offer) => offer.tags).concat(userTags);

  // Convert combined tags into text and feature vectors
  const vectorizer = new TfidfVectorizer();
  const tagVectors = vectorizer.fitTransform(allTags);

  // Extract user preferences' TF-IDF vector
  const userPreferencesVector = tagVectors[-1];

  // Compute cosine similarity between user preferences and travel offers' tags
  const similarities = cosineSimilarity(
    userPreferencesVector,
    tagVectors.slice(0, -1)
  );

  // Incorporate rating and agency location proximity into similarity scores with weights
  const rankedOffers = travelOffers
    .map((offer, i) => {
      const ratingWeight = offer.rating / 5.0; // Normalize rating to range [0, 1]
      const locationWeight =
        1.0 /
        (1.0 +
          Math.sqrt(
            (userPreferences.location[0] - offer.agencyLocation[0]) ** 2 +
              (userPreferences.location[1] - offer.agencyLocation[1]) ** 2
          ));
      const preferenceSimilarity = userTags.reduce(
        (acc, tag, pos) => acc + preferenceWeights[pos] * similarities[i][pos],
        0
      );
      const ratingWeighted = weightRating * ratingWeight;
      const locationWeighted = weightLocation * locationWeight;
      return {
        ...offer,
        similarityScore:
          weightPreferences * preferenceSimilarity +
          ratingWeighted +
          locationWeighted,
      };
    })
    .sort((a, b) => b.similarityScore - a.similarityScore);

  // Display top recommendations
  const topRecommendations = rankedOffers.slice(0, 5);
  return topRecommendations;
}
