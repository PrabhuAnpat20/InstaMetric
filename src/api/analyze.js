// pages/api/analyze.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  const API_URL =
    "https://api.langflow.astra.datastax.com/lf/d2924391-4b67-4536-ba1f-e791057432fa/api/v1/run/59dd73de-b8cb-4405-b343-177d52f324cb?stream=false";
  const API_TOKEN =
    "AstraCS:XgZOFKlfSeSbRdAJvLRYRdsv:a8513d74f870b53b8fb0d6a3d4653af83be2872367763466164602dad58f72a2";

  try {
    // Combine the post type and username into a single input string
    const inputString = `${req.body.selectedPostType} ${req.body.username}`;

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify({
        input_value: inputString,
        output_value: "chat",
        input_type: "chat",
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    // Extract the text from the nested response structure
    const outputs = result.outputs || [];
    const extractedText = outputs[0]?.outputs[0]?.results?.message?.data?.text;

    if (extractedText) {
      res.status(200).json({ text: extractedText });
    } else {
      res.status(400).json({
        error: "Failed to extract text from the API response",
        result: result, // Including the full result for debugging
      });
    }
  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
}
