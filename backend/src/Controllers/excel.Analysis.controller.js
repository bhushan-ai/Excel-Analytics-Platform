import openai from "../../Config/openai.js";
import History from "../Models/history.model.js";
import ParsedData from "../Models/parseData.model.js";

export const getExcelInsight = async (req, res) => {
  const fileId = req.params.id;

  if (!fileId) {
    return res.status(400).json({ success: false, msg: "fileid not found" });
  }

  const file = await ParsedData.findById(fileId).select("data user");
  if (!file) {
    return res.status(400).json({ success: false, msg: "file not found" });
  }

  try {
    const dataPreview = file.data.slice(0, 3);
    const prompt = ` 
 You are an expert Excel analyst. Given the following data: 

  ${JSON.stringify(dataPreview, null, 2)}
 Provide:
1. A short summary of what this dataset is about.
2. Any visible trends or patterns.
3. Any anomalies or unusual values.
4. Suggested chart types to visualize it.

    Return a plain Text
 `;

    const aiAnalysis = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
    });

    const insight = aiAnalysis.choices[0].message.content;

    //adding to history

    await History.create({
      file: file._id,
      user: file.user,
    });

    return res
      .status(200)
      .json({ success: true, message: "Analysis by ai", data: insight });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
};
