import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client lazily/safely
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// AI Diagnostic Report & Coaching Recommendation
app.post("/api/gemini/analyze", async (req, res) => {
  try {
    const ai = getGeminiClient();
    if (!ai) {
      return res.status(503).json({
        error: "Gemini API key is not configured.",
      });
    }

    const {
      wpm = 0,
      rawWpm = 0,
      accuracy = 100,
      timeSeconds = 30,
      mistakes = 0,
      keyErrors = {},
      fingerStats = {},
      mode = "time",
    } = req.body;

    const topErrors = Object.entries(keyErrors as Record<string, number>)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([key, count]) => `'${key}': ${count} error(s)`)
      .join(", ");

    const prompt = `Analyze this user's typing speed performance and provide structured coaching feedback:
    - Speed: ${wpm} WPM (Raw WPM: ${rawWpm})
    - Accuracy: ${accuracy}%
    - Test Duration: ${timeSeconds} seconds
    - Total Mistakes: ${mistakes}
    - Mode: ${mode}
    - Top Error-Prone Keys: ${topErrors || "None! Clean run."}

    Provide an insightful, encouraging, and highly practical assessment with:
    1. Overall Tier/Rating (e.g. "Touch Typist Apprentice", "Keyboard Ninja", "Precision Master")
    2. Executive Summary (2 sentences max)
    3. Top 2 Strengths
    4. Top 2 Actionable Improvement Areas
    5. Specific Finger/Hand Ergonomic Advice
    6. Custom Targeted Practice Drill (A short sentence/paragraph focusing specifically on their error-prone keys or standard typing rhythm).`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            rating: { type: Type.STRING },
            summary: { type: Type.STRING },
            strengths: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            areasToImprove: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            coachingAdvice: { type: Type.STRING },
            recommendedCustomDrillText: { type: Type.STRING },
          },
          required: [
            "rating",
            "summary",
            "strengths",
            "areasToImprove",
            "coachingAdvice",
            "recommendedCustomDrillText",
          ],
        },
      },
    });

    if (response.text) {
      const data = JSON.parse(response.text.trim());
      return res.json(data);
    }

    return res.status(500).json({ error: "Empty AI response" });
  } catch (err: any) {
    console.error("Gemini Analysis Error:", err);
    res.status(500).json({ error: err.message || "Failed to generate AI analysis" });
  }
});

// Custom AI Topic Generator for Typing Practice
app.post("/api/gemini/generate-text", async (req, res) => {
  try {
    const ai = getGeminiClient();
    if (!ai) {
      return res.status(503).json({
        error: "Gemini API key is not configured.",
      });
    }

    const { topic = "Technology", wordCount = 30, difficulty = "medium" } = req.body;

    const prompt = `Generate a single typing passage on the topic of "${topic}".
    Requirements:
    - Approximately ${wordCount} words.
    - Difficulty: ${difficulty} (easy = simple words and short sentences; medium = standard punctuation and vocabulary; hard = includes numbers, symbols, and complex technical terms).
    - Do NOT include title, markdown, quotes around passage, or preamble. Return plain clean text only.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    const text = response.text?.trim() || "";
    res.json({ text });
  } catch (err: any) {
    console.error("Gemini Text Generation Error:", err);
    res.status(500).json({ error: err.message || "Failed to generate passage" });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Typing Speed Master server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
