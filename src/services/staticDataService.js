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

  // Chat/Conversational AI with improved intelligence
  async processChat(message) {
    await this.simulateDelay(500);

    const lowerMessage = message.toLowerCase().trim();
    let response = {
      intent: 'unknown',
      responseType: 'text',
      data: null,
      text: '',
      suggestions: []
    };

    // Portfolio related - with intelligent filtering
    if (lowerMessage.includes('portfolio') || lowerMessage.includes('solution') || lowerMessage.includes('use case') || lowerMessage.includes('case stud')) {
      const data = this.data.portfolio;
      let filtered = [];
      let categoryFound = '';

      // AI/ML - specific keywords
      if (lowerMessage.match(/\b(ai|ml|machine learning|artificial intelligence|cognitive|neural|deep learning)\b/i)) {
        filtered = data.filter(p =>
          p.category.toLowerCase().includes('ai') ||
          p.category.toLowerCase().includes('ml') ||
          p.title.toLowerCase().includes('ai') ||
          p.title.toLowerCase().includes('cognitive') ||
          p.description.toLowerCase().includes('machine learning')
        );
        categoryFound = 'AI/ML';
      }
      // Cloud - specific keywords
      else if (lowerMessage.match(/\b(cloud|aws|azure|gcp|migration|serverless)\b/i)) {
        filtered = data.filter(p =>
          p.category.toLowerCase().includes('cloud') ||
          p.title.toLowerCase().includes('cloud') ||
          p.technologies.some(tech => ['AWS', 'Azure', 'GCP'].includes(tech))
        );
        categoryFound = 'Cloud';
      }
      // Blockchain - specific keywords
      else if (lowerMessage.match(/\b(blockchain|crypto|smart contract|distributed ledger|hyperledger|ethereum)\b/i)) {
        filtered = data.filter(p =>
          p.category.toLowerCase().includes('blockchain') ||
          p.title.toLowerCase().includes('blockchain')
        );
        categoryFound = 'Blockchain';
      }
      // IoT - specific keywords
      else if (lowerMessage.match(/\b(iot|internet of things|sensor|device|edge computing)\b/i)) {
        filtered = data.filter(p =>
          p.category.toLowerCase().includes('iot') ||
          p.title.toLowerCase().includes('iot') ||
          p.description.toLowerCase().includes('sensor')
        );
        categoryFound = 'IoT';
      }
      // Security - specific keywords
      else if (lowerMessage.match(/\b(security|cybersecurity|fraud|threat|soc|siem)\b/i)) {
        filtered = data.filter(p =>
          p.category.toLowerCase().includes('security') ||
          p.title.toLowerCase().includes('security') ||
          p.title.toLowerCase().includes('fraud')
        );
        categoryFound = 'Security';
      }
      // Automation/RPA - specific keywords
      else if (lowerMessage.match(/\b(automation|rpa|robotic process|bot)\b/i)) {
        filtered = data.filter(p =>
          p.category.toLowerCase().includes('automation') ||
          p.title.toLowerCase().includes('automation') ||
          p.title.toLowerCase().includes('rpa')
        );
        categoryFound = 'Automation';
      }
      // Data Analytics - specific keywords
      else if (lowerMessage.match(/\b(data analytics|business intelligence|bi|analytics|data lake)\b/i)) {
        filtered = data.filter(p =>
          p.category.toLowerCase().includes('data analytics') ||
          p.title.toLowerCase().includes('analytics') ||
          p.title.toLowerCase().includes('intelligence')
        );
        categoryFound = 'Data Analytics';
      }
      // TCS CMI specific
      else if (lowerMessage.match(/\b(cmi|cognitive market insights|tcs cmi)\b/i)) {
        filtered = data.filter(p =>
          p.id.includes('CMI') ||
          p.title.includes('TCS CMI') ||
          p.description.includes('TCS CMI') ||
          p.technologies.includes('TCS CMI')
        );
        categoryFound = 'TCS CMI';
      }
      // Show all only if no specific category found and explicitly asked for "all" or "show portfolios"
      else if (lowerMessage.match(/\b(all|show all|list all|everything)\b/i) || lowerMessage === 'portfolio' || lowerMessage === 'portfolios') {
        filtered = data.slice(0, 6); // Show only first 6, not all
        categoryFound = 'Overview';
      }

      if (filtered.length > 0) {
        response = {
          intent: 'view_portfolio',
          responseType: 'cards',
          data: filtered,
          text: categoryFound === 'Overview'
            ? `Here are ${filtered.length} featured portfolio items. Ask about specific categories like AI/ML, Cloud, or Security for more.`
            : `I found ${filtered.length} ${categoryFound} portfolio item${filtered.length > 1 ? 's' : ''} with detailed use cases and case studies.`,
          suggestions: categoryFound === 'Overview'
            ? ['Show AI/ML solutions', 'Show Cloud solutions', 'Show TCS CMI solutions']
            : ['Show more details', 'View related skills', 'Request engagement']
        };
      } else {
        response = {
          intent: 'view_portfolio',
          responseType: 'text',
          data: null,
          text: `I couldn't find any portfolio items matching "${message}". Try asking about: AI/ML, Cloud, Blockchain, IoT, Security, Automation, or TCS CMI solutions.`,
          suggestions: ['Show AI/ML portfolios', 'Show Cloud portfolios', 'Show TCS CMI solutions']
        };
      }
    }
    // Skills related - with intelligent filtering
    else if (lowerMessage.match(/\b(skill|expertise|competenc|capability|proficiency)\b/i)) {
      const data = this.data.skills;
      let filtered = [];
      let categoryFound = '';

      // Cloud skills
      if (lowerMessage.match(/\b(cloud|aws|azure|gcp)\b/i)) {
        filtered = data.filter(s =>
          s.name.toLowerCase().includes('cloud') ||
          s.name.toLowerCase().includes('aws') ||
          s.name.toLowerCase().includes('azure') ||
          s.relatedTechnologies.some(tech => tech.toLowerCase().includes('cloud') || tech.toLowerCase().includes('aws') || tech.toLowerCase().includes('azure'))
        );
        categoryFound = 'Cloud';
      }
      // AI/ML skills
      else if (lowerMessage.match(/\b(ai|ml|machine learning|artificial intelligence|data science)\b/i)) {
        filtered = data.filter(s =>
          s.name.toLowerCase().includes('machine learning') ||
          s.name.toLowerCase().includes('ai') ||
          s.description.toLowerCase().includes('machine learning') ||
          s.description.toLowerCase().includes('artificial intelligence')
        );
        categoryFound = 'AI/ML';
      }
      // DevOps skills
      else if (lowerMessage.match(/\b(devops|ci\/cd|jenkins|kubernetes|docker)\b/i)) {
        filtered = data.filter(s =>
          s.name.toLowerCase().includes('devops') ||
          s.name.toLowerCase().includes('kubernetes') ||
          s.relatedTechnologies.some(tech => tech.toLowerCase().includes('jenkins') || tech.toLowerCase().includes('kubernetes'))
        );
        categoryFound = 'DevOps';
      }
      // Programming skills
      else if (lowerMessage.match(/\b(python|java|javascript|node|react|programming)\b/i)) {
        filtered = data.filter(s =>
          s.name.toLowerCase().includes('python') ||
          s.name.toLowerCase().includes('java') ||
          s.name.toLowerCase().includes('react') ||
          s.name.toLowerCase().includes('node')
        );
        categoryFound = 'Programming';
      }
      // Technical category
      else if (lowerMessage.match(/\b(technical|technology)\b/i)) {
        filtered = data.filter(s => s.category === 'Technical').slice(0, 8);
        categoryFound = 'Technical';
      }
      // Domain skills
      else if (lowerMessage.match(/\b(domain|business|industry)\b/i)) {
        filtered = data.filter(s => s.category === 'Domain');
        categoryFound = 'Domain';
      }
      // All skills - only show limited set
      else if (lowerMessage.match(/\b(all|show all|list)\b/i) || lowerMessage === 'skills') {
        filtered = data.slice(0, 6);
        categoryFound = 'Overview';
      }

      if (filtered.length > 0) {
        response = {
          intent: 'view_skills',
          responseType: 'cards',
          data: filtered,
          text: categoryFound === 'Overview'
            ? `Here are ${filtered.length} key skills. Ask about specific areas like Cloud, AI/ML, or DevOps for more.`
            : `I found ${filtered.length} ${categoryFound} skill${filtered.length > 1 ? 's' : ''} in our expertise portfolio.`,
          suggestions: categoryFound === 'Overview'
            ? ['Cloud skills', 'AI/ML skills', 'DevOps skills']
            : ['View related certifications', 'Show projects using this skill', 'Request expert']
        };
      } else {
        response = {
          intent: 'view_skills',
          responseType: 'text',
          data: null,
          text: `I couldn't find skills matching "${message}". Try: Cloud, AI/ML, DevOps, Python, or ask for Technical or Domain skills.`,
          suggestions: ['Cloud skills', 'AI/ML skills', 'Show all skills']
        };
      }
    }
    // Certifications related - with intelligent filtering
    else if (lowerMessage.match(/\b(certif|training|course|certification)\b/i)) {
      const data = this.data.certifications;
      let filtered = [];
      let categoryFound = '';

      // AWS certifications
      if (lowerMessage.match(/\b(aws|amazon)\b/i)) {
        filtered = data.filter(c =>
          c.provider.toLowerCase().includes('aws') ||
          c.name.toLowerCase().includes('aws') ||
          c.provider.toLowerCase().includes('amazon')
        );
        categoryFound = 'AWS';
      }
      // Azure certifications
      else if (lowerMessage.match(/\b(azure|microsoft)\b/i)) {
        filtered = data.filter(c =>
          c.provider.toLowerCase().includes('azure') ||
          c.name.toLowerCase().includes('azure') ||
          c.provider.toLowerCase().includes('microsoft')
        );
        categoryFound = 'Azure';
      }
      // Google/GCP certifications
      else if (lowerMessage.match(/\b(google|gcp|cloud platform)\b/i)) {
        filtered = data.filter(c =>
          c.provider.toLowerCase().includes('google') ||
          c.name.toLowerCase().includes('google')
        );
        categoryFound = 'Google Cloud';
      }
      // Cloud certifications (general)
      else if (lowerMessage.match(/\b(cloud)\b/i)) {
        filtered = data.filter(c => c.category.toLowerCase().includes('cloud'));
        categoryFound = 'Cloud';
      }
      // Security certifications
      else if (lowerMessage.match(/\b(security|cissp|ceh|cybersecurity)\b/i)) {
        filtered = data.filter(c =>
          c.category.toLowerCase().includes('security') ||
          c.name.toLowerCase().includes('security')
        );
        categoryFound = 'Security';
      }
      // TCS certifications
      else if (lowerMessage.match(/\b(tcs)\b/i)) {
        filtered = data.filter(c => c.provider.toLowerCase().includes('tcs'));
        categoryFound = 'TCS';
      }
      // All certifications - limited
      else if (lowerMessage.match(/\b(all|show all|available)\b/i) || lowerMessage === 'certifications') {
        filtered = data.slice(0, 6);
        categoryFound = 'Overview';
      }

      if (filtered.length > 0) {
        response = {
          intent: 'view_certifications',
          responseType: 'cards',
          data: filtered,
          text: categoryFound === 'Overview'
            ? `Here are ${filtered.length} featured certifications. Ask about AWS, Azure, or Security certifications for more.`
            : `I found ${filtered.length} ${categoryFound} certification${filtered.length > 1 ? 's' : ''} available.`,
          suggestions: categoryFound === 'Overview'
            ? ['AWS certifications', 'Azure certifications', 'Security certifications']
            : ['View prerequisites', 'Show related skills', 'Get training information']
        };
      } else {
        response = {
          intent: 'view_certifications',
          responseType: 'text',
          data: null,
          text: `I couldn't find certifications for "${message}". Try: AWS, Azure, Google Cloud, Security, or TCS certifications.`,
          suggestions: ['AWS certifications', 'Azure certifications', 'Show all certifications']
        };
      }
    }
    // Engagement request related - intelligent handling
    else if (lowerMessage.match(/\b(request|need|consultant|sme|professional|expert|hire|engage)\b/i)) {

      // Check if showing existing engagements or creating new
      if (lowerMessage.match(/\b(show|view|list|status|check|existing|current)\b/i)) {
        const data = this.data.engagements;
        let filtered = [];

        // Filter by status if mentioned
        if (lowerMessage.includes('pending')) {
          filtered = data.filter(e => e.status === 'Pending');
        } else if (lowerMessage.includes('approved')) {
          filtered = data.filter(e => e.status === 'Approved');
        } else if (lowerMessage.includes('completed')) {
          filtered = data.filter(e => e.status === 'Completed');
        } else {
          filtered = data.slice(0, 6); // Show latest 6
        }

        response = {
          intent: 'view_engagements',
          responseType: 'cards',
          data: filtered,
          text: `Here are ${filtered.length} engagement request${filtered.length > 1 ? 's' : ''}. You can filter by status or create a new request.`,
          suggestions: ['Create new request', 'Show pending requests', 'Show approved requests']
        };
      } else {
        // Create new engagement request
        response = {
          intent: 'request_engagement',
          responseType: 'text',
          data: {
            types: ['Pre-sales', 'SME', 'Consultant', 'Professional'],
            industries: ['Banking', 'Healthcare', 'Retail', 'Manufacturing', 'Telecom', 'Insurance', 'Government', 'Energy']
          },
          text: `I can help you request an engagement. Please specify:\n\n• Type: Pre-sales, SME, Consultant, or Professional\n• Industry: Banking, Healthcare, Retail, etc.\n• Skills needed\n• Duration\n\nFor example: "I need a cloud consultant for banking project for 6 months"`,
          suggestions: ['View existing requests', 'Show available consultants', 'Show skills']
        };
      }
    }
    // Incubation related - intelligent filtering
    else if (lowerMessage.match(/\b(incubat|innovation|new project|r&d|research)\b/i)) {
      const data = this.data.incubation;
      let filtered = [];
      let categoryFound = '';

      // Filter by stage
      if (lowerMessage.match(/\b(development|developing)\b/i)) {
        filtered = data.filter(i => i.stage === 'Development');
        categoryFound = 'in Development stage';
      } else if (lowerMessage.match(/\b(testing|test)\b/i)) {
        filtered = data.filter(i => i.stage === 'Testing');
        categoryFound = 'in Testing stage';
      } else if (lowerMessage.match(/\b(pilot)\b/i)) {
        filtered = data.filter(i => i.stage === 'Pilot');
        categoryFound = 'in Pilot stage';
      } else if (lowerMessage.match(/\b(ideation|idea)\b/i)) {
        filtered = data.filter(i => i.stage === 'Ideation');
        categoryFound = 'in Ideation stage';
      }
      // Filter by category
      else if (lowerMessage.match(/\b(ai|ml|cognitive)\b/i)) {
        filtered = data.filter(i =>
          i.category.toLowerCase().includes('ai') ||
          i.projectName.toLowerCase().includes('ai') ||
          i.description.toLowerCase().includes('cognitive')
        );
        categoryFound = 'AI/ML';
      } else if (lowerMessage.match(/\b(security|fraud|threat)\b/i)) {
        filtered = data.filter(i => i.category.toLowerCase().includes('security'));
        categoryFound = 'Security';
      }
      // Active projects
      else if (lowerMessage.match(/\b(active|current|ongoing)\b/i)) {
        filtered = data.filter(i => i.status === 'Active').slice(0, 6);
        categoryFound = 'active';
      }
      // Default - show limited
      else {
        filtered = data.slice(0, 6);
        categoryFound = 'featured';
      }

      response = {
        intent: 'view_incubation',
        responseType: 'cards',
        data: filtered,
        text: `I found ${filtered.length} ${categoryFound} innovation project${filtered.length > 1 ? 's' : ''}. We have ${data.length} total incubation initiatives.`,
        suggestions: ['Show AI projects', 'Show by stage', 'Submit new idea']
      };
    }
    // Project status related - intelligent filtering
    else if (lowerMessage.match(/\b(project|delivery|implementation|status|report)\b/i)) {
      const data = this.data.projects;
      let filtered = [];
      let categoryFound = '';

      // Filter by status
      if (lowerMessage.match(/\b(in progress|ongoing|active|current)\b/i)) {
        filtered = data.filter(p => p.status === 'In Progress');
        categoryFound = 'in progress';
      } else if (lowerMessage.match(/\b(completed|finished|done)\b/i)) {
        filtered = data.filter(p => p.status === 'Completed');
        categoryFound = 'completed';
      } else if (lowerMessage.match(/\b(on hold|paused)\b/i)) {
        filtered = data.filter(p => p.status === 'On Hold');
        categoryFound = 'on hold';
      }
      // Filter by industry
      else if (lowerMessage.match(/\b(banking|bank|finance|financial)\b/i)) {
        filtered = data.filter(p => p.client.toLowerCase().includes('bank') || p.client.toLowerCase().includes('financial'));
        categoryFound = 'Banking/Finance';
      } else if (lowerMessage.match(/\b(healthcare|medical|hospital)\b/i)) {
        filtered = data.filter(p => p.client.toLowerCase().includes('health'));
        categoryFound = 'Healthcare';
      } else if (lowerMessage.match(/\b(retail|e-commerce|ecommerce)\b/i)) {
        filtered = data.filter(p =>
          p.client.toLowerCase().includes('retail') ||
          p.client.toLowerCase().includes('e-commerce')
        );
        categoryFound = 'Retail';
      } else if (lowerMessage.match(/\b(manufacturing|factory|production)\b/i)) {
        filtered = data.filter(p => p.client.toLowerCase().includes('manufact'));
        categoryFound = 'Manufacturing';
      }
      // Specific project search by name
      else if (lowerMessage.match(/\b(cloud migration|migration)\b/i)) {
        filtered = data.filter(p => p.projectName.toLowerCase().includes('migration') || p.projectName.toLowerCase().includes('cloud'));
        categoryFound = 'Cloud Migration';
      } else if (lowerMessage.match(/\b(sap)\b/i)) {
        filtered = data.filter(p => p.projectName.toLowerCase().includes('sap'));
        categoryFound = 'SAP';
      }
      // Default - show limited recent projects
      else {
        filtered = data.slice(0, 6);
        categoryFound = 'recent';
      }

      if (filtered.length > 0) {
        response = {
          intent: 'view_projects',
          responseType: 'cards',
          data: filtered,
          text: `I found ${filtered.length} ${categoryFound} project${filtered.length > 1 ? 's' : ''}. We have ${data.length} total projects across industries.`,
          suggestions: ['Show in-progress projects', 'Show completed projects', 'Filter by industry']
        };
      } else {
        response = {
          intent: 'view_projects',
          responseType: 'text',
          data: null,
          text: `No projects found matching "${message}". Try: "in progress projects", "completed projects", or specify an industry like Banking, Healthcare, or Retail.`,
          suggestions: ['In progress projects', 'Completed projects', 'Show all projects']
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
