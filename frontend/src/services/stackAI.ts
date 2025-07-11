// Stack AI Service
export interface StackAIRequest {
  'doc-0': string[];
  'in-0': string;
  user_id: string;
}

export interface StackAIResponse {
  // Define the response structure based on what Stack AI returns
  [key: string]: any;
}

class StackAIService {
  private readonly baseUrl = process.env.NEXT_PUBLIC_STACK_AI_API_URL || 'https://api.stack-ai.com/inference/v0/run/a0613a2d-2698-4b56-a97a-5ca11fc52e98/686fdb8b3dc4bad5c3a6773f';
  private readonly apiKey = process.env.NEXT_PUBLIC_STACK_AI_API_KEY || '251b52c5-e53f-4399-b917-0e4cd20c8c78';

  async query(data: StackAIRequest): Promise<StackAIResponse> {
    try {
      const response = await fetch(this.baseUrl, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Stack AI API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error calling Stack AI API:', error);
      throw error;
    }
  }

  // Helper method for UX Copy generation
  async generateUXCopy(
    prompt: string, 
    userId: string, 
    documents: string[] = ["https://example.com/placeholder.txt"]
  ): Promise<StackAIResponse> {
    const data: StackAIRequest = {
      'doc-0': documents,
      'in-0': prompt,
      'user_id': userId
    };

    return this.query(data);
  }

  // Helper method for improving existing copy
  async improveCopy(
    originalCopy: string, 
    userId: string, 
    context = '',
    documents: string[] = ["https://example.com/placeholder.txt"]
  ): Promise<StackAIResponse> {
    const prompt = context 
      ? `Improve this copy: "${originalCopy}". Context: ${context}`
      : `Give me a better copy for "${originalCopy}"`;

    return this.generateUXCopy(prompt, userId, documents);
  }

  // Helper method for chatbot conversations
  async chatUXCopywriting(
    message: string, 
    userId: string, 
    context?: string,
    documents: string[] = ["https://example.com/placeholder.txt"]
  ): Promise<StackAIResponse> {
    // Format the message for better UX copywriting context
    const formattedPrompt = context 
      ? `Context: ${context}\n\nAs a UX copywriting expert, help me with this request: ${message}`
      : `As a UX copywriting expert, help me with this request: ${message}`;

    return this.generateUXCopy(formattedPrompt, userId, documents);
  }
}

export const stackAIService = new StackAIService(); 