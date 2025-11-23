# AI Integration Guide - TCS Digital Portal

## Overview

The TCS Digital Portal now features a **lightweight LLM-powered conversational assistant** using Claude Haiku (3.5) for intelligent, context-aware interactions across all 6 data modules.

## Key Features

### Lightweight LLM Integration
- **Model**: Claude 3.5 Haiku (fast, cost-effective)
- **Max Tokens**: 1024 (optimized for quick responses)
- **Context-Aware**: Understands all 6 data modules simultaneously

### Contextualized Data Modules
The AI assistant has full context from:
1. **Portfolio** - 20+ solution portfolios with case studies
2. **Skills** - 25+ technical and domain skills
3. **Certifications** - 20+ certifications from various providers
4. **Engagements** - Engagement requests and statuses
5. **Incubation** - Innovation projects and CMI initiatives
6. **Projects** - Active and completed projects with reports

## Architecture

```
User Query → AI Service → Claude Haiku LLM → Intent Recognition → Data Filtering → Response
                ↓                                                        ↓
          Context Building                                    Relevant Data Cards
        (All 6 modules)
```

### Components

#### 1. AIService (backend/aiService.js)
Main AI service module handling:
- Context building from all data modules
- LLM query processing
- Intent recognition
- Data filtering and response formatting

#### 2. Updated Server (backend/server.js)
Enhanced `/api/chat` endpoint:
- Loads all 6 data modules
- Passes context to AI service
- Applies intelligent data filtering
- Returns structured responses

## Configuration

### Environment Variables (.env)
```bash
ANTHROPIC_API_KEY=your_api_key_here
```

Get your API key from: https://console.anthropic.com/

## How It Works

### 1. Context Building
The AI service creates a summarized context from all 6 modules:
- Total counts for each module
- Available categories/providers/statuses
- Sample data for reference
- Current statistics

### 2. System Prompt
Provides the LLM with:
- TCS Digital Portal context
- Available data summaries
- Response format guidelines
- Example interactions

### 3. Intent Recognition
The LLM identifies user intent:
- `view_portfolio` - Show solution portfolios
- `view_skills` - Display skills and expertise
- `view_certifications` - Show certifications
- `request_engagement` - Request consultant/SME
- `view_incubation` - Innovation projects
- `view_projects` - Project status and reports
- `help` - General assistance
- `overview` - Dashboard statistics
- `general_query` - Other questions

### 4. Data Filtering
Smart filtering based on LLM response:
- **Category filtering** - AI/ML, Cloud, Security, etc.
- **Status filtering** - Active, Pending, Completed
- **Provider filtering** - AWS, Azure, Google, TCS
- **Keyword filtering** - Full-text search

### 5. Response Format
```json
{
  "intent": "view_portfolio",
  "responseType": "cards|text|form",
  "data": [...],
  "text": "Conversational response",
  "suggestions": ["Follow-up action 1", "..."]
}
```

## Example Queries

### Portfolio Queries
```
"Show me AI solutions"
"What blockchain portfolios do you have?"
"List TCS CMI case studies"
```

### Skills Queries
```
"What cloud skills do you offer?"
"Show DevOps expertise"
"List all programming skills"
```

### Certification Queries
```
"What AWS certifications are available?"
"Show me Azure certifications"
"List security certifications"
```

### Engagement Queries
```
"I need a cloud consultant"
"Request an AI expert for my project"
"Find SME for blockchain implementation"
```

### Project Queries
```
"Show me active projects"
"What projects are completed?"
"Give me project status overview"
```

### General Queries
```
"What can you help me with?"
"Show dashboard overview"
"Help me understand your capabilities"
```

## Benefits of Lightweight LLM

### Claude Haiku Advantages
1. **Fast Response Times** - Sub-second responses
2. **Cost-Effective** - Lower token costs than larger models
3. **Sufficient Intelligence** - Handles intent recognition and filtering perfectly
4. **Lower Latency** - Better user experience
5. **Scalable** - Can handle high request volumes

### Compared to Rule-Based System
- **Natural Language Understanding** - Understands varied phrasings
- **Context Awareness** - Knows about all modules simultaneously
- **Intelligent Filtering** - Better category/intent matching
- **Conversational Responses** - More natural, helpful answers
- **Adaptive** - Can handle unexpected queries gracefully

## API Usage

### Chat Endpoint
```bash
POST http://localhost:5000/api/chat
Content-Type: application/json

{
  "message": "Show me AI solutions"
}
```

### Response
```json
{
  "intent": "view_portfolio",
  "responseType": "cards",
  "data": [...filtered portfolio items...],
  "text": "Here are TCS's AI/ML solution portfolios...",
  "suggestions": [
    "Learn about AI implementation",
    "Request consultation",
    "Explore case studies"
  ]
}
```

## Performance Optimization

### Context Summarization
- Only essential data passed to LLM
- Sample items (3 per module)
- Counts and categories
- Keeps token usage low

### Data Filtering
- Applied after LLM response
- Efficient in-memory filtering
- Limited to 10 results max
- Prevents overwhelming users

### Token Management
- Max 1024 tokens per response
- Optimized system prompt
- Concise context building
- Fast processing

## Development

### Running the Server
```bash
npm run dev:backend
```

### Testing Locally
```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Show me AI portfolios"}'
```

### Monitoring
The server logs show:
- API startup confirmation
- AI assistant enabled status
- Any errors or warnings

## Future Enhancements

### Potential Improvements
1. **Conversation History** - Multi-turn conversations
2. **User Context** - Remember user preferences
3. **Advanced Filtering** - Combine multiple filters
4. **Streaming Responses** - Real-time token streaming
5. **Analytics** - Track query patterns and improve

### Model Upgrades
- Can easily switch to Claude Sonnet for more complex queries
- Can add fallback to rule-based for API failures
- Can implement hybrid approach (rules + LLM)

## Troubleshooting

### Common Issues

**1. API Key Error**
```
Error: Invalid API key
```
Solution: Check `.env` file has correct `ANTHROPIC_API_KEY`

**2. Timeout Issues**
```
Error: Request timeout
```
Solution: Increase timeout in server.js or check API connectivity

**3. Empty Responses**
```
Response: { "text": "", "suggestions": [] }
```
Solution: Check LLM response parsing in aiService.js

**4. Port Already in Use**
```
Error: EADDRINUSE
```
Solution: Kill existing node process on port 5000

## Security Considerations

1. **API Key Protection** - Never commit `.env` to git
2. **Input Validation** - Sanitize user queries
3. **Rate Limiting** - Consider adding rate limits
4. **Error Handling** - Don't expose internal errors
5. **Data Privacy** - Review data sent to LLM

## Cost Estimation

### Claude Haiku Pricing (Approximate)
- Input: $0.25 per million tokens
- Output: $1.25 per million tokens

### Typical Query Cost
- Context: ~500 input tokens
- Response: ~200 output tokens
- **Cost per query**: ~$0.00038 (less than half a cent)

### Monthly Estimates
- 1,000 queries: ~$0.38
- 10,000 queries: ~$3.80
- 100,000 queries: ~$38.00

Very cost-effective compared to larger models!

## Support

For questions or issues:
- Check server logs for errors
- Review API key configuration
- Ensure all dependencies installed
- Test with simple queries first

## Version History

### v1.2.0 (Current)
- Integrated Claude Haiku LLM
- Context-aware across 6 modules
- Intelligent intent recognition
- Enhanced data filtering
- Natural language responses

### v1.1.0 (Previous)
- Rule-based pattern matching
- Limited context awareness
- Fixed query patterns only

---

Built with Claude 3.5 Haiku for TCS Digital Portal
