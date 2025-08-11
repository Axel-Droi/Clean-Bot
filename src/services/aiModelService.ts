// AI Model API Service
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-domain.com/api/ai' 
  : 'http://localhost:3001/api/ai';

export interface DetectionResult {
  trashDetected: boolean;
  confidence: number;
  detections: Array<{
    class: string;
    confidence: number;
    bbox: number[];
  }>;
  processTime?: number;
}

export interface AIResponse {
  success: boolean;
  result: DetectionResult;
  timestamp: string;
}

export class AIModelService {
  /**
   * Detect trash in an uploaded image
   */
  static async detectTrashInImage(imageFile: File): Promise<AIResponse> {
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const response = await fetch(`${API_BASE_URL}/detect`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error detecting trash:', error);
      throw new Error('Failed to process image. Please try again.');
    }
  }

  /**
   * Detect trash in a base64 image (for webcam captures)
   */
  static async detectTrashInBase64(base64Image: string): Promise<AIResponse> {
    try {
      // Convert base64 to blob
      const response = await fetch(base64Image);
      const blob = await response.blob();
      const file = new File([blob], 'capture.jpg', { type: 'image/jpeg' });
      
      return await this.detectTrashInImage(file);
    } catch (error) {
      console.error('Error processing base64 image:', error);
      throw new Error('Failed to process captured image. Please try again.');
    }
  }

  /**
   * Get model information
   */
  static async getModelInfo() {
    try {
      const response = await fetch(`${API_BASE_URL}/model-info`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching model info:', error);
      throw new Error('Failed to fetch model information.');
    }
  }

  /**
   * Check API health
   */
  static async checkHealth() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error checking API health:', error);
      throw new Error('API is currently unavailable.');
    }
  }

  /**
   * Mock detection for demo purposes (when API is not available)
   */
  static async mockDetection(imageSource: string): Promise<AIResponse> {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

    // Generate mock results
    const mockResults: AIResponse = {
      success: true,
      result: {
        trashDetected: Math.random() > 0.3,
        confidence: 0.6 + Math.random() * 0.3,
        detections: [
          {
            class: 'plastic_bottle',
            confidence: 0.85,
            bbox: [100, 100, 200, 300]
          },
          {
            class: 'food_wrapper',
            confidence: 0.72,
            bbox: [300, 150, 150, 200]
          }
        ].slice(0, Math.floor(Math.random() * 3)),
        processTime: 1.2
      },
      timestamp: new Date().toISOString()
    };

    return mockResults;
  }
}

export default AIModelService;
