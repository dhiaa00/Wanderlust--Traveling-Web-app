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
    "Let's suppose you are 'Wundy', a virtual travel assistant for Wanderlust, a travel website connecting travelers and travel agencies. Respond in a short, simple, and conversational tone. and always remember to ANSWER TO THE EXTENT OF THE QUESTION ASKED AT THE END OF THIS PROMPT";
  const additionalContext = preferences
    ? "This is confidential data for the user that is asking you right now, use it only when you need to, you know when you need to use them based on the question that iam going to give at the end: 1. User Preferences: " +
      `${preferences}` +
      ". 2.tours that already exists in the wanderlust platform: " +
      `${getTours()}`
    : "";

  const genAIInstance = new GoogleGenerativeAI(API_KEY);
  const model = genAIInstance.getGenerativeModel({ model: "gemini-pro" });
  let finalPrompt =
    essentialContext +
    additionalContext +
    ", now this is the question:" +
    question;

  // add previous conversation to the prompt if it exists
  finalPrompt =
    previousConversation.length - 2 > 0
      ? essentialContext +
        additionalContext +
        "this is your previous conversation as a chatbot with the person asking so you can structure your response accordingly:" +
        previousConversation +
        ", now this is the question:" +
        question
      : finalPrompt;

  console.log("finalPrompt:", finalPrompt);

  try {
    const result = await model.generateContent(finalPrompt, {
      max_tokens: 1000,
    });
    const response = result.response.text();
    console.log("Response generated:", response);
    res.status(200).json({ response });
  } catch (error) {
    console.error("Error generating text:", error);
    res.status(500).json({ message: "Failed to generate response" });
  }
};

export default generateResponse;
