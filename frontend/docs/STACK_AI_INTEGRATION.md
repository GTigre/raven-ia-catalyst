# Stack AI Integration Documentation

## Overview

This document describes the integration of Stack AI's inference API into the IA Catalyst platform for UX copy generation and improvement.

## API Configuration

### Endpoint
```
https://api.stack-ai.com/inference/v0/run/a0613a2d-2698-4b56-a97a-5ca11fc52e98/686fdb8b3dc4bad5c3a6773f
```

### Authentication
- **Method**: Bearer Token
- **Header**: `Authorization: Bearer <API_KEY>`

## Request Format

```typescript
interface StackAIRequest {
  'doc-0': string[];      // Array of document URLs (required)
  'in-0': string;         // Input prompt/text
  user_id: string;        // User identifier
}
```

### Example Request
```json
{
  "doc-0": ["https://example.com/placeholder.txt"],
  "in-0": "Give me a better copy for 'Buy Now'",
  "user_id": "user-123"
}
```

## Response Format

```typescript
interface StackAIResponse {
  outputs: {
    'out-0': string;      // Generated text response
  };
  citations: any;         // Citation information (if any)
  run_id: string;         // Unique run identifier
  metadata: any;          // Additional metadata
  progress_data: any;     // Progress information
}
```

### Example Response
```json
{
  "outputs": {
    "out-0": "Here are two optimized options for the \"Buy Now\" call-to-action:\n\nSolución 1: \"Get Yours Today\"\n\nPor qué: This copy creates a sense of immediacy..."
  },
  "citations": null,
  "run_id": "d6c8648a-a0f4-453a-8584-1792c427eb42",
  "metadata": null,
  "progress_data": null
}
```

## Implementation

### Service Layer
The `StackAIService` class (`src/services/stackAI.ts`) provides:

- `query(data: StackAIRequest)`: Direct API call
- `generateUXCopy(prompt, userId, documents)`: Helper for UX copy generation
- `improveCopy(originalCopy, userId, context, documents)`: Helper for copy improvement

### React Component
The `StackAIDemo` component (`src/components/StackAIDemo.tsx`) provides:

- Interactive UI for testing the API
- Example prompts
- Formatted response display
- Error handling

### Demo Page
Access the Stack AI demo at: `/stack-ai-demo`

## Usage Examples

### Basic Copy Generation
```typescript
import { stackAIService } from '../services/stackAI';

const response = await stackAIService.generateUXCopy(
  "Create a compelling CTA for a SaaS signup",
  "user-123"
);
```

### Copy Improvement
```typescript
const response = await stackAIService.improveCopy(
  "Sign Up Now",
  "user-123",
  "For a project management tool targeting small businesses"
);
```

## Error Handling

Common errors:
- **400 Bad Request**: Usually indicates missing or invalid document URLs
- **401 Unauthorized**: Invalid API key
- **429 Too Many Requests**: Rate limit exceeded

## Environment Variables

For production use, configure these environment variables:

```env
NEXT_PUBLIC_STACK_AI_API_URL=https://api.stack-ai.com/inference/v0/run/...
NEXT_PUBLIC_STACK_AI_API_KEY=your-api-key-here
```

## Integration Points

The Stack AI integration is accessible through:

1. **Dashboard Module**: "AI UX Writer (Stack AI)" card
2. **Direct URL**: `/stack-ai-demo`
3. **Service Import**: Import `stackAIService` in any component

## Future Enhancements

- Document upload functionality
- Copy history and versioning
- Batch processing
- Custom prompt templates
- Integration with project management modules 