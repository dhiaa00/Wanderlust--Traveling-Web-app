import { GoogleGenerativeAI } from "@google/generative-ai";

const generateResponse = async (question, previousConversation) => {
  // get api key from env
  const API_KEY = process.env.GOOGLE_API_KEY;
  const essentialContext =
    "Let's suppose you are 'Wundy', a virtual travel assistant for Wanderlust, a travel website connecting travelers and travel agencies. Respond in a short, simple, and conversational tone. ";
  const additionalContext =
    "This is additional data you can use: 1. Adventure Travel Agency: Specializes in eco-tours, trekking expeditions, and cultural immersion experiences. 2. Luxury Travel Agency: Curates bespoke itineraries featuring high-end accommodations and personalized service. 3. Family Travel Agency: Offers family-friendly tours and all-inclusive packages. 4. Traveler Preferences: Budget: $3000, Travel Style: Active, Preferred Destinations: Southeast Asia, Interests: Hiking, Food.";

  const genAIInstance = new GoogleGenerativeAI(API_KEY);
  const model = genAIInstance.getGenerativeModel({ model: "gemini-pro" });
  let finalPrompt = essentialContext + question;
  console.log(previousConversation.length);
  finalPrompt =
    previousConversation.length - 2 > 0
      ? "this is your previous conversation as a chatbot with the person asking so you can structure your response accordingly:" +
        previousConversation +
        ", now this is the question:" +
        question
      : finalPrompt;

  finalPrompt += additionalContext;

  try {
    const result = await model.generateContent(finalPrompt, {
      max_tokens: 1000,
    });
    const response = result.response.text();
    console.log(finalPrompt);
    return response;
  } catch (error) {
    console.error("Error generating text:", error);
    return null;
  }
};

export default generateResponse;
