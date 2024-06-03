import { GoogleGenerativeAI } from "@google/generative-ai";
import { Offer } from "../models/Offer.js";

// get all tours
const getTours = async () => {
  try {
    const tours = await Offer.find();
    return tours;
  } catch (error) {
    console.error("Error fetching tours:", error);
    return null;
  }
};

const generateResponse = async (req, res) => {
  // get the question and previous conversation from the request
  const { question, previousConversation, preferences } = req.body;

  // get api key from env
  const API_KEY = process.env.GOOGLE_API_KEY;
  const essentialContext =
    "Let's suppose you are 'Wundy', a virtual travel assistant for Wanderlust, a travel website connecting travelers and travel agencies. Respond in a short, simple, and conversational tone. ";
  const additionalContext =
    "This is confidential data for the user that is asking you right now, use it only when you need to (for example if the user asked for suggestion or things like that): 1. User Preferences: " +
    `${preferences}` +
    ". 2.tours that already exists in the wanderlust platform: " +
    `${getTours()}`;

  const genAIInstance = new GoogleGenerativeAI(API_KEY);
  const model = genAIInstance.getGenerativeModel({ model: "gemini-pro" });
  let finalPrompt = essentialContext + question;
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
    res.status(200).json({ response });
  } catch (error) {
    console.error("Error generating text:", error);
    res.status(500).json({ message: "Failed to generate response" });
  }
};

export default generateResponse;
