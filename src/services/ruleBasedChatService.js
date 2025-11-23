// Rule-based conversational navigation service
class RuleBasedChatService {
  constructor() {
    this.navigationCallbacks = {};
  }

  // Set navigation callback
  setNavigationCallback(callback) {
    this.navigationCallbacks.navigate = callback;
  }

  // Process user message and return response with navigation action
  async processMessage(message) {
    const lowerMessage = message.toLowerCase().trim();

    // Navigation patterns
    const navigationRules = [
      // Dashboard navigation
      {
        patterns: ['dashboard', 'show dashboard', 'go to dashboard', 'open dashboard', 'view dashboard'],
        action: 'dashboard',
        response: 'Opening Dashboard... Here you can view all your statistics and overview.'
      },
      // Portfolio navigation
      {
        patterns: ['portfolio', 'portfolios', 'solutions', 'show portfolio', 'go to portfolio', 'view portfolio', 'show solutions'],
        action: 'portfolio',
        response: 'Opening Portfolio page... Browse our comprehensive solution portfolios with skills and certifications.'
      },
      // Buy Requests navigation
      {
        patterns: ['buy request', 'buy requests', 'orders', 'place order', 'show orders', 'view orders', 'my orders'],
        action: 'buy-requests',
        response: 'Opening Buy Requests page... Track your orders through the lead-to-order workflow.'
      },
      // Engagements navigation
      {
        patterns: ['engagement', 'engagements', 'projects', 'show engagements', 'view engagements', 'show projects'],
        action: 'engagements',
        response: 'Opening Engagements page... View all your active engagements and projects.'
      },
      // Innovation/Incubation navigation
      {
        patterns: ['innovation', 'incubation', 'show innovation', 'view innovation', 'innovative projects'],
        action: 'incubation',
        response: 'Opening Innovation page... Explore our innovation and incubation projects.'
      }
    ];

    // Information patterns
    const infoRules = [
      {
        patterns: ['what can you do', 'help', 'how to use', 'guide', 'what are your capabilities'],
        response: `I can help you navigate through the TCS Digital Portal! Here's what I can do:

📊 Navigate to Dashboard - Say "show dashboard"
📂 View Portfolios - Say "show portfolio"
🛒 Check Buy Requests - Say "show orders"
🤝 View Engagements - Say "show engagements"
🚀 Explore Innovation - Say "show innovation"

Just tell me where you want to go, and I'll take you there!`
      },
      {
        patterns: ['hello', 'hi', 'hey', 'greetings'],
        response: `Hello! 👋 Welcome to TCS Digital Portal.

I'm your navigation assistant. I can help you quickly navigate to different sections:
- Dashboard
- Portfolio & Solutions
- Buy Requests / Orders
- Engagements & Projects
- Innovation Projects

Where would you like to go?`
      },
      {
        patterns: ['thanks', 'thank you', 'appreciate'],
        response: `You're welcome! 😊 Is there anything else I can help you with? Just let me know where you'd like to go!`
      },
      {
        patterns: ['bye', 'goodbye', 'see you'],
        response: `Goodbye! 👋 Feel free to chat with me anytime you need to navigate the portal!`
      }
    ];

    // Check navigation rules first
    for (const rule of navigationRules) {
      if (rule.patterns.some(pattern => lowerMessage.includes(pattern))) {
        // Trigger navigation
        if (this.navigationCallbacks.navigate) {
          setTimeout(() => {
            this.navigationCallbacks.navigate(rule.action);
          }, 500);
        }

        return {
          text: rule.response,
          action: rule.action,
          type: 'navigation'
        };
      }
    }

    // Check information rules
    for (const rule of infoRules) {
      if (rule.patterns.some(pattern => lowerMessage.includes(pattern))) {
        return {
          text: rule.response,
          type: 'info'
        };
      }
    }

    // Default response
    return {
      text: `I can help you navigate the portal! Try saying:

• "Show dashboard" - View statistics
• "Show portfolio" - Browse solutions
• "Show orders" - Track buy requests
• "Show engagements" - View projects
• "Show innovation" - Explore innovations

Where would you like to go?`,
      type: 'help'
    };
  }
}

export default new RuleBasedChatService();
