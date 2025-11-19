// Static data service for GitHub Pages deployment
// Imports JSON data directly instead of making API calls

import portfolioData from '../data/portfolio.json';
import skillsData from '../data/skills.json';
import certificationsData from '../data/certifications.json';
import engagementsData from '../data/engagements.json';
import incubationData from '../data/incubation.json';
import projectsData from '../data/projects.json';

class StaticDataService {
  constructor() {
    this.data = {
      portfolio: portfolioData,
      skills: skillsData,
      certifications: certificationsData,
      engagements: engagementsData,
      incubation: incubationData,
      projects: projectsData
    };
  }

  // Simulate API delay for realistic UX
  async simulateDelay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Portfolio methods
  async getPortfolio() {
    await this.simulateDelay();
    return this.data.portfolio;
  }

  async getPortfolioById(id) {
    await this.simulateDelay();
    return this.data.portfolio.find(p => p.id === id);
  }

  async getPortfolioByCategory(category) {
    await this.simulateDelay();
    return this.data.portfolio.filter(p =>
      p.category.toLowerCase().includes(category.toLowerCase())
    );
  }

  // Skills methods
  async getSkills() {
    await this.simulateDelay();
    return this.data.skills;
  }

  async getSkillById(id) {
    await this.simulateDelay();
    return this.data.skills.find(s => s.id === id);
  }

  async getSkillsByCategory(category) {
    await this.simulateDelay();
    return this.data.skills.filter(s =>
      s.category.toLowerCase().includes(category.toLowerCase())
    );
  }

  // Certifications methods
  async getCertifications() {
    await this.simulateDelay();
    return this.data.certifications;
  }

  async getCertificationById(id) {
    await this.simulateDelay();
    return this.data.certifications.find(c => c.id === id);
  }

  async getCertificationsByProvider(provider) {
    await this.simulateDelay();
    return this.data.certifications.filter(c =>
      c.provider.toLowerCase().includes(provider.toLowerCase())
    );
  }

  // Engagements methods
  async getEngagements() {
    await this.simulateDelay();
    return this.data.engagements;
  }

  async getEngagementById(id) {
    await this.simulateDelay();
    return this.data.engagements.find(e => e.id === id);
  }

  async getEngagementsByStatus(status) {
    await this.simulateDelay();
    return this.data.engagements.filter(e =>
      e.status.toLowerCase() === status.toLowerCase()
    );
  }

  // Incubation methods
  async getIncubation() {
    await this.simulateDelay();
    return this.data.incubation;
  }

  async getIncubationById(id) {
    await this.simulateDelay();
    return this.data.incubation.find(i => i.id === id);
  }

  // Projects methods
  async getProjects() {
    await this.simulateDelay();
    return this.data.projects;
  }

  async getProjectById(id) {
    await this.simulateDelay();
    return this.data.projects.find(p => p.id === id);
  }

  async getProjectsByStatus(status) {
    await this.simulateDelay();
    return this.data.projects.filter(p =>
      p.status.toLowerCase().replace(' ', '-') === status.toLowerCase()
    );
  }

  async getProjectReports(id) {
    await this.simulateDelay();
    const project = this.data.projects.find(p => p.id === id);
    return project ? project.reports : [];
  }

  // Chat/Conversational AI
  async processChat(message) {
    await this.simulateDelay(500);

    const lowerMessage = message.toLowerCase();
    let response = {
      intent: 'unknown',
      responseType: 'text',
      data: null,
      text: '',
      suggestions: []
    };

    // Portfolio related
    if (lowerMessage.includes('portfolio') || lowerMessage.includes('use case') || lowerMessage.includes('case stud')) {
      const data = this.data.portfolio;

      if (lowerMessage.includes('ai') || lowerMessage.includes('ml') || lowerMessage.includes('machine learning')) {
        const filtered = data.filter(p => p.category.toLowerCase().includes('ai') || p.category.toLowerCase().includes('ml'));
        response = {
          intent: 'view_portfolio',
          responseType: 'cards',
          data: filtered,
          text: `I found ${filtered.length} AI/ML portfolio items with relevant use cases and case studies.`,
          suggestions: ['Show more details', 'View certifications', 'Request engagement']
        };
      } else if (lowerMessage.includes('cloud')) {
        const filtered = data.filter(p => p.category.toLowerCase().includes('cloud'));
        response = {
          intent: 'view_portfolio',
          responseType: 'cards',
          data: filtered,
          text: `I found ${filtered.length} cloud-related portfolio items.`,
          suggestions: ['Show skills required', 'View projects', 'Request consultant']
        };
      } else if (lowerMessage.includes('blockchain')) {
        const filtered = data.filter(p => p.category.toLowerCase().includes('blockchain'));
        response = {
          intent: 'view_portfolio',
          responseType: 'cards',
          data: filtered,
          text: `I found ${filtered.length} blockchain portfolio items.`,
          suggestions: ['Show implementation details', 'View skills', 'Contact team']
        };
      } else {
        response = {
          intent: 'view_portfolio',
          responseType: 'cards',
          data: data.slice(0, 10),
          text: `Here are our top portfolio items with use cases and case studies. We have solutions across AI/ML, Cloud, Blockchain, IoT, and more.`,
          suggestions: ['Filter by AI/ML', 'Filter by Cloud', 'Filter by Security']
        };
      }
    }
    // Skills related
    else if (lowerMessage.includes('skill') || lowerMessage.includes('expertise') || lowerMessage.includes('competenc')) {
      const data = this.data.skills;

      if (lowerMessage.includes('cloud') || lowerMessage.includes('aws') || lowerMessage.includes('azure')) {
        const filtered = data.filter(s =>
          s.name.toLowerCase().includes('cloud') ||
          s.name.toLowerCase().includes('aws') ||
          s.name.toLowerCase().includes('azure')
        );
        response = {
          intent: 'view_skills',
          responseType: 'cards',
          data: filtered,
          text: `I found ${filtered.length} cloud-related skills in our portfolio.`,
          suggestions: ['View certifications', 'Show all skills', 'Request expert']
        };
      } else if (lowerMessage.includes('ai') || lowerMessage.includes('ml')) {
        const filtered = data.filter(s =>
          s.description.toLowerCase().includes('ai') ||
          s.description.toLowerCase().includes('ml') ||
          s.description.toLowerCase().includes('machine learning')
        );
        response = {
          intent: 'view_skills',
          responseType: 'cards',
          data: filtered,
          text: `I found ${filtered.length} AI/ML related skills.`,
          suggestions: ['View related certifications', 'Show projects', 'Request SME']
        };
      } else {
        response = {
          intent: 'view_skills',
          responseType: 'cards',
          data: data.slice(0, 10),
          text: `Here are our top skills across technical, domain, and soft skills categories.`,
          suggestions: ['Filter by category', 'Show high-demand skills', 'View certifications']
        };
      }
    }
    // Certifications related
    else if (lowerMessage.includes('certif') || lowerMessage.includes('training')) {
      const data = this.data.certifications;

      if (lowerMessage.includes('aws')) {
        const filtered = data.filter(c => c.provider.toLowerCase().includes('aws') || c.name.toLowerCase().includes('aws'));
        response = {
          intent: 'view_certifications',
          responseType: 'cards',
          data: filtered,
          text: `I found ${filtered.length} AWS certification(s).`,
          suggestions: ['View other cloud certs', 'Show all certifications', 'Get training info']
        };
      } else if (lowerMessage.includes('azure')) {
        const filtered = data.filter(c => c.provider.toLowerCase().includes('azure') || c.name.toLowerCase().includes('azure'));
        response = {
          intent: 'view_certifications',
          responseType: 'cards',
          data: filtered,
          text: `I found ${filtered.length} Azure certification(s).`,
          suggestions: ['View cloud certifications', 'Show prerequisites', 'Request training']
        };
      } else {
        response = {
          intent: 'view_certifications',
          responseType: 'cards',
          data: data.slice(0, 10),
          text: `Here are our available certifications across various technologies and domains.`,
          suggestions: ['Filter by category', 'Show TCS certifications', 'View benefits']
        };
      }
    }
    // Engagement request related
    else if (lowerMessage.includes('request') || lowerMessage.includes('need') || lowerMessage.includes('consultant') || lowerMessage.includes('sme') || lowerMessage.includes('professional')) {
      response = {
        intent: 'request_engagement',
        responseType: 'form',
        data: {
          types: ['Pre-sales', 'SME', 'Consultant', 'Professional'],
          industries: ['Banking', 'Healthcare', 'Retail', 'Manufacturing', 'Telecom', 'Insurance', 'Government', 'Energy']
        },
        text: 'I can help you request an engagement. Please provide the following details: Client Name, Industry, Skills Required, Duration, and Description.',
        suggestions: ['View existing requests', 'Check availability', 'Show skills']
      };
    }
    // Incubation related
    else if (lowerMessage.includes('incubat') || lowerMessage.includes('innovation') || lowerMessage.includes('new project')) {
      const data = this.data.incubation;
      response = {
        intent: 'view_incubation',
        responseType: 'cards',
        data: data.slice(0, 10),
        text: `We have ${data.length} active incubation projects across various innovation areas. Here are some highlights:`,
        suggestions: ['Filter by stage', 'Show CMI projects', 'Submit new idea']
      };
    }
    // Project status related
    else if (lowerMessage.includes('project') || lowerMessage.includes('status') || lowerMessage.includes('report')) {
      const data = this.data.projects;

      if (lowerMessage.includes('in progress') || lowerMessage.includes('ongoing')) {
        const filtered = data.filter(p => p.status === 'In Progress');
        response = {
          intent: 'view_projects',
          responseType: 'cards',
          data: filtered,
          text: `I found ${filtered.length} projects currently in progress.`,
          suggestions: ['Show completed projects', 'View reports', 'Filter by client']
        };
      } else if (lowerMessage.includes('completed')) {
        const filtered = data.filter(p => p.status === 'Completed');
        response = {
          intent: 'view_projects',
          responseType: 'cards',
          data: filtered,
          text: `I found ${filtered.length} completed projects.`,
          suggestions: ['Show in-progress projects', 'View success stories', 'Show all projects']
        };
      } else {
        response = {
          intent: 'view_projects',
          responseType: 'cards',
          data: data.slice(0, 10),
          text: `Here's an overview of our projects. We have ${data.length} projects across various industries.`,
          suggestions: ['Filter by status', 'Show reports', 'View by industry']
        };
      }
    }
    // Help/greeting
    else if (lowerMessage.includes('help') || lowerMessage.includes('hello') || lowerMessage.includes('hi ') || lowerMessage === 'hi' || lowerMessage.includes('what can')) {
      response = {
        intent: 'help',
        responseType: 'text',
        data: null,
        text: `Hello! I'm your TCS Digital Portal assistant. I can help you with:

• View Portfolio - Browse our solutions, use cases, and case studies
• Explore Skills - Discover our technical and domain expertise
• Check Certifications - View available certifications and training
• Request Engagement - Request pre-sales support, SMEs, consultants, or professionals
• Track Incubation - Check innovation project status and submit new ideas
• Project Status - View ongoing and completed projects with reports

Try asking: "Show me AI portfolios" or "I need a cloud consultant" or "What are the current projects?"`,
        suggestions: ['Show portfolios', 'View skills', 'Request engagement', 'Check projects']
      };
    }
    // Statistics/overview
    else if (lowerMessage.includes('overview') || lowerMessage.includes('dashboard') || lowerMessage.includes('statistics') || lowerMessage.includes('summary')) {
      const portfolios = this.data.portfolio;
      const skills = this.data.skills;
      const certifications = this.data.certifications;
      const engagements = this.data.engagements;
      const incubation = this.data.incubation;
      const projects = this.data.projects;

      const activeProjects = projects.filter(p => p.status === 'In Progress').length;
      const pendingEngagements = engagements.filter(e => e.status === 'Pending').length;
      const activeIncubation = incubation.filter(i => i.status === 'Active').length;

      response = {
        intent: 'overview',
        responseType: 'text',
        data: {
          portfolios: portfolios.length,
          skills: skills.length,
          certifications: certifications.length,
          engagements: engagements.length,
          projects: projects.length,
          incubation: incubation.length,
          activeProjects,
          pendingEngagements,
          activeIncubation
        },
        text: `Here's a quick overview of TCS Digital Portal:

📊 Portfolio Items: ${portfolios.length}
💡 Skills Available: ${skills.length}
🎓 Certifications: ${certifications.length}
📋 Engagement Requests: ${engagements.length} (${pendingEngagements} pending)
🚀 Active Projects: ${activeProjects} of ${projects.length}
🔬 Innovation Projects: ${activeIncubation} active incubation initiatives

What would you like to explore?`,
        suggestions: ['View portfolios', 'Check project status', 'See active engagements', 'Innovation projects']
      };
    }
    // Default response
    else {
      response = {
        intent: 'unknown',
        responseType: 'text',
        data: null,
        text: `I'm not sure I understood that. I can help you with:

• Portfolio information and case studies
• Skills and expertise details
• Certifications and training
• Engagement requests (Pre-sales, SME, Consultants)
• Incubation project status
• Project reports and status updates

Try asking something like "Show me cloud portfolios" or "I need an AI consultant"`,
        suggestions: ['Show help', 'View portfolios', 'Check skills', 'Request engagement']
      };
    }

    return response;
  }

  // Get statistics
  async getStatistics() {
    await this.simulateDelay();

    const activeProjects = this.data.projects.filter(p => p.status === 'In Progress').length;
    const pendingEngagements = this.data.engagements.filter(e => e.status === 'Pending').length;
    const activeIncubation = this.data.incubation.filter(i => i.status === 'Active').length;

    return {
      portfolios: this.data.portfolio.length,
      skills: this.data.skills.length,
      certifications: this.data.certifications.length,
      engagements: this.data.engagements.length,
      projects: this.data.projects.length,
      incubation: this.data.incubation.length,
      activeProjects,
      pendingEngagements,
      activeIncubation
    };
  }
}

export default new StaticDataService();
