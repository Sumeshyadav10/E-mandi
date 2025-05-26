import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const createsummary = async (req, res) => {
  try {
    const { name, price, category } = req.body;

    // Construct the prompt for Gemini
    const prompt = `Summarize the following product details in a concise and appealing way for a user:
      Product Name: ${name}
      Price: ${price}
      Category: ${category}`;

    const result = await model.generateContent(prompt);
    const summary = result.response.candidates[0].content.parts[0].text;

    res.json({ summary });
  } catch (error) {
    console.error("Error summarizing product:", error);
    res.status(500).json({ error: "Failed to generate summary" });
  }
};

export { createsummary };
