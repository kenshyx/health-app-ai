import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { GoogleGenAI, Type } from '@google/genai'

// Initialize Gemini Client
// The API_KEY is sourced from the environment for security.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const app = new Hono()

// Enable CORS for frontend communication
app.use('/*', cors())

interface HealthMetrics {
  sleepHours: number;
  steps: number;
  stressLevel: number;
}

/**
 * Helper function to map raw metrics into descriptive visual characteristics
 * for the AI image generation prompt.
 */
const getVisualContext = (metrics: HealthMetrics) => {
  let sleepDesc = "restful and balanced";
  if (metrics.sleepHours < 6) sleepDesc = "fragmented, foggy, dark fatigue with heavy shadows and muted tones";
  else if (metrics.sleepHours > 8) sleepDesc = "bright, ethereal, energized with soft lens flares and vibrant glows";

  let activityDesc = "steady momentum and moderate flow";
  if (metrics.steps < 5000) activityDesc = "static, heavy, stationary geometric forms, grounding textures";
  else if (metrics.steps > 10000) activityDesc = "dynamic ribbons of light, high kinetic energy, fluid motion, streaking particles";

  let stressDesc = "calm and harmonious composition";
  if (metrics.stressLevel > 70) stressDesc = "chaotic, jagged edges, intense reds and oranges, stormy and high contrast";
  else if (metrics.stressLevel < 30) stressDesc = "smooth organic textures, cool blues and deep iridescent greens, tranquil symmetry";

  return { sleepDesc, activityDesc, stressDesc };
}

/**
 * POST /api/generate
 * Generates an abstract image representing the user's health state.
 */
app.post('/api/generate', async (c) => {
  try {
    const metrics: HealthMetrics = await c.req.json();
    const { sleepDesc, activityDesc, stressDesc } = getVisualContext(metrics);

    const prompt = `Create an abstract piece of generative art representing a person's biometric state. 
Visual style: 3D render, ethereal, futuristic data visualization, cinematic lighting.

State parameters to visualize:
1. Sleep State (${metrics.sleepHours}hrs): ${sleepDesc}.
2. Physical Activity (${metrics.steps} steps): ${activityDesc}.
3. Mental Stress (${metrics.stressLevel}/100): ${stressDesc}.

Combine these elements into a cohesive, artistic Aura. Use depth of field, premium textures, and elegant lighting. 4k resolution, high-end digital art masterpiece.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }]
      }
    });

    // Extract image data from the response candidates
    let imageUrl = "";
    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64Data = part.inlineData.data;
          const mimeType = part.inlineData.mimeType || 'image/png';
          imageUrl = `data:${mimeType};base64,${base64Data}`;
          break;
        }
      }
    }

    if (!imageUrl) {
      throw new Error("Gemini AI failed to produce an image for the given prompt.");
    }

    return c.json({
      imageUrl,
      prompt
    });

  } catch (error: any) {
    console.error("Backend Generate Error:", error);
    return c.json({ error: error.message || "An unexpected error occurred during art generation." }, 500);
  }
})

/**
 * POST /api/insights
 * Generates personalized health tips and a recipe based on user metrics.
 */
app.post('/api/insights', async (c) => {
  try {
    const metrics: HealthMetrics = await c.req.json();
    
    const prompt = `You are a holistic wellness coach. Analyze these daily health metrics:
- Sleep: ${metrics.sleepHours} hours
- Activity: ${metrics.steps} steps
- Stress Level: ${metrics.stressLevel}/100

Tasks:
1. Provide 3 short, actionable tips for immediate well-being.
2. Provide one healthy recipe suited for this state (e.g. anti-inflammatory for stress, or high-energy for activity).`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tips: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Three specific wellness tips."
            },
            recipe: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                description: { type: Type.STRING },
                ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
                instructions: { type: Type.ARRAY, items: { type: Type.STRING } },
                calories: { type: Type.NUMBER },
                prepTime: { type: Type.STRING }
              },
              required: ["name", "description", "ingredients", "instructions", "calories", "prepTime"]
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("The AI returned an empty response for health insights.");

    return c.json(JSON.parse(text));
  } catch (error: any) {
    console.error("Backend Insights Error:", error);
    return c.json({ error: error.message || "Failed to retrieve health insights." }, 500);
  }
});

const port = 8080;
console.log(`Aura Backend logic active on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port
});