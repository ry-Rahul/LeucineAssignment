import { GoogleGenAI } from "@google/genai";
const GEMINI_API_KEY = "AIzaSyC88K-_tEQrS9RWemvnWvCOzR4JSxqLgz0";

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const summarizeTodos = async() => {

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-001",
    contents: text,
  });
  console.log(response.text);
  res.json({ summary: response.text });
};

export { summarizeTodos };
