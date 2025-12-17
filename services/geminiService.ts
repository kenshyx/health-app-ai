import { HealthMetrics, InsightData } from "../types";

/**
 * Sends health metrics to the backend to generate a personalized Aura image.
 */
export const generateHealthArt = async (metrics: HealthMetrics): Promise<{ imageUrl: string; prompt: string }> => {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(metrics),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown server error' }));
      throw new Error(errorData.error || `Server error: ${response.status}`);
    }

    const data = await response.json();
    return { 
      imageUrl: data.imageUrl, 
      prompt: data.prompt 
    };

  } catch (error: any) {
    console.error("Art Generation Service Error:", error);
    throw error;
  }
};

/**
 * Sends health metrics to the backend to retrieve AI-powered wellness insights and a recipe.
 */
export const fetchHealthInsights = async (metrics: HealthMetrics): Promise<InsightData> => {
  try {
    const response = await fetch('/api/insights', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(metrics),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown server error' }));
      throw new Error(errorData.error || `Server error: ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error("Health Insights Service Error:", error);
    throw error;
  }
};