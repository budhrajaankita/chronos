// app/api/generate-questions.js
export async function POST(req, res) {

// export default async function handler(req, res) {
    if (req.method === "POST") {
      try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "model": "meta-llama/llama-3.1-8b-instruct:free",
            "messages": [
              {
                "role": "system",
                "content": "Generate a list of quiz questions about historical events with multiple choice answers."
              }
            ],
          }),
        });
  
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
  
        const data = await response.json();
        const questions = data.choices[0].message.content; // Assuming the response contains the questions in this format
  
        res.status(200).json({ questions });
      } catch (error) {
        console.error("Error generating questions:", error);
        res.status(500).json({ error: "Error generating questions" });
      }
    } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
