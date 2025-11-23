import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';

dotenv.config();

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/**
 * Lightweight LLM service for conversational AI - Updated for new data structure
 * Uses Claude Haiku for fast, cost-effective responses
 */
export class AIService {
  constructor() {
    this.model = 'claude-3-5-haiku-20241022'; // Lightweight Haiku model
    this.maxTokens = 1024;
  }

  /**
   * Build context from restructured data modules
   */
  buildContext(dataModules) {
    const { portfolios, engagements, incubation, buyRequests } = dataModules;

    // Create summarized context to stay within token limits
    const context = {
      portfolios: {
        total: portfolios?.length || 0,
        categories: portfolios ? [...new Set(portfolios.map(p => p.category))] : [],
        sample: portfolios ? portfolios.slice(0, 3).map(p => ({
          id: p.id,
          title: p.title,
          category: p.category,
          description: p.description?.substring(0, 150),
          skillsCount: p.skills?.length || 0,
          certificationsCount: p.certifications?.length || 0
        })) : []
      },
      engagements: {
        total: engagements?.length || 0,
        statuses: engagements ? [...new Set(engagements.map(e => e.status))] : [],
        pending: engagements ? engagements.filter(e => e.status === 'Pending').length : 0,
        withProjects: engagements ? engagements.filter(e => e.projects && e.projects.length > 0).length : 0
      },
      incubation: {
        total: incubation?.length || 0,
        active: incubation ? incubation.filter(i => i.status === 'Active').length : 0,
        stages: incubation ? [...new Set(incubation.map(i => i.stage))] : []
      },
      buyRequests: {
        total: buyRequests?.length || 0,
        statuses: buyRequests ? [...new Set(buyRequests.map(b => b.workflowStatus))] : [],
        pending: buyRequests ? buyRequests.filter(b => b.workflowStatus === 'Pending Approval').length : 0
      }
    };

    return context;
  }

  /**
   * Create system prompt with TCS context - Updated for new structure
   */
  getSystemPrompt(contextSummary) {
    return `You are an AI assistant for the TCS Digital Portal (Restructured). Your role is to help users navigate and find information about TCS services, capabilities, and orders.

**New Data Structure:**
- Portfolios: ${contextSummary.portfolios.total} solution portfolios (now include embedded Skills & Certifications) across categories: ${contextSummary.portfolios.categories.join(', ')}
- Engagements: ${contextSummary.engagements.total} engagements (now include embedded Projects) - ${contextSummary.engagements.pending} pending, ${contextSummary.engagements.withProjects} with active projects
- Buy Requests: ${contextSummary.buyRequests.total} portfolio orders with workflow states - ${contextSummary.buyRequests.pending} awaiting approval
- Incubation: ${contextSummary.incubation.total} innovation projects (${contextSummary.incubation.active} active)

**Key Changes:**
1. Skills and Certifications are now part of Portfolio items
2. Projects are embedded within Engagements (not separate)
3. New "Buy Request" feature allows ordering portfolio solutions with automatic certification selection

**Your Capabilities:**
1. Answer questions about TCS portfolios and their associated skills/certifications
2. Help users place buy requests for portfolio solutions
3. Show engagement information including their associated projects
4. Provide incubation project information
5. Track buy request workflow status (Draft → Pending → Approved → In Fulfillment → Fulfilled)

**Guidelines:**
- Be helpful, professional, and concise
- When users ask about skills or certifications, direct them to Portfolio
- When users ask about projects, direct them to Engagements
- Explain the buy request process when users want to order solutions
- Use natural, conversational language

**Response Format:**
Your response must be a JSON object with this structure:
{
  "intent": "string (e.g., 'view_portfolio', 'place_buy_request', 'view_engagements', 'help', 'general_query')",
  "responseType": "string ('text', 'cards', or 'form')",
  "dataFilter": {
    "module": "string (portfolio/engagements/incubation/buyRequests)",
    "filterType": "string (category/status/etc)",
    "filterValue": "string (the value to filter by)"
  },
  "text": "string (your conversational response to the user)",
  "suggestions": ["array of 3-4 follow-up suggestions"]
}

**Examples:**
- User asks "show me AI solutions" → intent: "view_portfolio", dataFilter: {module: "portfolio", filterType: "category", filterValue: "AI/ML"}
- User asks "what cloud skills do you have" → Explain skills are in portfolios, suggest viewing Cloud portfolios
- User asks "show projects" → Explain projects are in engagements, dataFilter: {module: "engagements"}
- User asks "I want to order a solution" → intent: "place_buy_request", explain buy request process`;
  }

  /**
   * Process user query with LLM
   */
  async processQuery(userMessage, dataModules) {
    try {
      const contextSummary = this.buildContext(dataModules);
      const systemPrompt = this.getSystemPrompt(contextSummary);

      const message = await anthropic.messages.create({
        model: this.model,
        max_tokens: this.maxTokens,
        messages: [
          {
            role: 'user',
            content: userMessage
          }
        ],
        system: systemPrompt
      });

      // Parse LLM response
      const responseText = message.content[0].text;

      // Try to extract JSON from the response
      let parsedResponse;
      try {
        // Look for JSON in the response
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsedResponse = JSON.parse(jsonMatch[0]);
        } else {
          // If no JSON found, create a default structure
          parsedResponse = {
            intent: 'general_query',
            responseType: 'text',
            text: responseText,
            suggestions: ['View portfolios', 'Check engagements', 'Place buy request', 'Help']
          };
        }
      } catch (parseError) {
        console.error('Failed to parse LLM response as JSON:', parseError);
        parsedResponse = {
          intent: 'general_query',
          responseType: 'text',
          text: responseText,
          suggestions: ['View portfolios', 'Check engagements', 'Place buy request', 'Help']
        };
      }

      return parsedResponse;
    } catch (error) {
      console.error('AI Service Error:', error);
      throw error;
    }
  }

  /**
   * Apply data filter based on LLM response
   */
  applyDataFilter(data, filterConfig) {
    if (!data || !Array.isArray(data)) {
      return [];
    }

    if (!filterConfig || !filterConfig.filterType || !filterConfig.filterValue) {
      return data.slice(0, 6); // Return first 6 items if no filter
    }

    const { filterType, filterValue } = filterConfig;
    const lowerValue = filterValue.toLowerCase();

    let filtered = data;

    switch (filterType) {
      case 'category':
        filtered = data.filter(item =>
          item.category?.toLowerCase().includes(lowerValue) ||
          item.title?.toLowerCase().includes(lowerValue) ||
          item.name?.toLowerCase().includes(lowerValue) ||
          item.description?.toLowerCase().includes(lowerValue)
        );
        break;

      case 'status':
        filtered = data.filter(item =>
          item.status?.toLowerCase().replace(' ', '-') === lowerValue.replace(' ', '-') ||
          item.workflowStatus?.toLowerCase().replace(' ', '-') === lowerValue.replace(' ', '-')
        );
        break;

      case 'keyword':
        filtered = data.filter(item => {
          const searchText = JSON.stringify(item).toLowerCase();
          return searchText.includes(lowerValue);
        });
        break;

      default:
        filtered = data.slice(0, 6);
    }

    // Limit results to prevent overwhelming the user
    return filtered.slice(0, 10);
  }
}

export default AIService;
