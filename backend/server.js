import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Helper function to read JSON files
const readJSON = async (filename) => {
  const filePath = path.join(__dirname, '..', 'data', filename);
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
};

// Portfolio endpoints
app.get('/api/portfolio', async (req, res) => {
  try {
    const data = await readJSON('portfolio.json');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch portfolio data' });
  }
});

app.get('/api/portfolio/:id', async (req, res) => {
  try {
    const data = await readJSON('portfolio.json');
    const item = data.find(p => p.id === req.params.id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ error: 'Portfolio not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch portfolio' });
  }
});

app.get('/api/portfolio/category/:category', async (req, res) => {
  try {
    const data = await readJSON('portfolio.json');
    const filtered = data.filter(p =>
      p.category.toLowerCase().includes(req.params.category.toLowerCase())
    );
    res.json(filtered);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch portfolio by category' });
  }
});

// Skills endpoints
app.get('/api/skills', async (req, res) => {
  try {
    const data = await readJSON('skills.json');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch skills data' });
  }
});

app.get('/api/skills/:id', async (req, res) => {
  try {
    const data = await readJSON('skills.json');
    const item = data.find(s => s.id === req.params.id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ error: 'Skill not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch skill' });
  }
});

app.get('/api/skills/category/:category', async (req, res) => {
  try {
    const data = await readJSON('skills.json');
    const filtered = data.filter(s =>
      s.category.toLowerCase().includes(req.params.category.toLowerCase())
    );
    res.json(filtered);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch skills by category' });
  }
});

// Certifications endpoints
app.get('/api/certifications', async (req, res) => {
  try {
    const data = await readJSON('certifications.json');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch certifications data' });
  }
});

app.get('/api/certifications/:id', async (req, res) => {
  try {
    const data = await readJSON('certifications.json');
    const item = data.find(c => c.id === req.params.id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ error: 'Certification not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch certification' });
  }
});

app.get('/api/certifications/provider/:provider', async (req, res) => {
  try {
    const data = await readJSON('certifications.json');
    const filtered = data.filter(c =>
      c.provider.toLowerCase().includes(req.params.provider.toLowerCase())
    );
    res.json(filtered);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch certifications by provider' });
  }
});

// Engagements endpoints
app.get('/api/engagements', async (req, res) => {
  try {
    const data = await readJSON('engagements.json');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch engagements data' });
  }
});

app.get('/api/engagements/:id', async (req, res) => {
  try {
    const data = await readJSON('engagements.json');
    const item = data.find(e => e.id === req.params.id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ error: 'Engagement not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch engagement' });
  }
});

app.get('/api/engagements/status/:status', async (req, res) => {
  try {
    const data = await readJSON('engagements.json');
    const filtered = data.filter(e =>
      e.status.toLowerCase() === req.params.status.toLowerCase()
    );
    res.json(filtered);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch engagements by status' });
  }
});

app.post('/api/engagements', async (req, res) => {
  try {
    const data = await readJSON('engagements.json');
    const newEngagement = {
      id: `ENG-${String(data.length + 1).padStart(3, '0')}`,
      ...req.body,
      requestDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
      assignedTo: null
    };
    data.push(newEngagement);
    await fs.writeFile(
      path.join(__dirname, '..', 'data', 'engagements.json'),
      JSON.stringify(data, null, 2)
    );
    res.status(201).json(newEngagement);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create engagement' });
  }
});

// Incubation endpoints
app.get('/api/incubation', async (req, res) => {
  try {
    const data = await readJSON('incubation.json');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch incubation data' });
  }
});

app.get('/api/incubation/:id', async (req, res) => {
  try {
    const data = await readJSON('incubation.json');
    const item = data.find(i => i.id === req.params.id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ error: 'Incubation project not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch incubation project' });
  }
});

app.post('/api/incubation', async (req, res) => {
  try {
    const data = await readJSON('incubation.json');
    const newIncubation = {
      id: `INCUB-${String(data.length + 1).padStart(3, '0')}`,
      ...req.body,
      startDate: new Date().toISOString().split('T')[0],
      status: 'Active',
      stage: 'Ideation'
    };
    data.push(newIncubation);
    await fs.writeFile(
      path.join(__dirname, '..', 'data', 'incubation.json'),
      JSON.stringify(data, null, 2)
    );
    res.status(201).json(newIncubation);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create incubation project' });
  }
});

// Projects endpoints
app.get('/api/projects', async (req, res) => {
  try {
    const data = await readJSON('projects.json');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects data' });
  }
});

app.get('/api/projects/:id', async (req, res) => {
  try {
    const data = await readJSON('projects.json');
    const item = data.find(p => p.id === req.params.id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

app.get('/api/projects/status/:status', async (req, res) => {
  try {
    const data = await readJSON('projects.json');
    const filtered = data.filter(p =>
      p.status.toLowerCase().replace(' ', '-') === req.params.status.toLowerCase()
    );
    res.json(filtered);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects by status' });
  }
});

app.get('/api/projects/:id/reports', async (req, res) => {
  try {
    const data = await readJSON('projects.json');
    const project = data.find(p => p.id === req.params.id);
    if (project) {
      res.json(project.reports);
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project reports' });
  }
});

// Conversational AI endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    const lowerMessage = message.toLowerCase();

    // Intent recognition
    let response = {
      intent: 'unknown',
      responseType: 'text',
      data: null,
      text: '',
      suggestions: []
    };

    // Portfolio related - with intelligent filtering
    if (lowerMessage.includes('portfolio') || lowerMessage.includes('solution') || lowerMessage.includes('use case') || lowerMessage.includes('case stud')) {
      const data = await readJSON('portfolio.json');
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
          (p.technologies && p.technologies.some(tech => ['AWS', 'Azure', 'GCP'].includes(tech)))
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
          (p.technologies && p.technologies.includes('TCS CMI'))
        );
        categoryFound = 'TCS CMI';
      }
      // Show limited set if no specific category and explicitly asked for "all"
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
      const data = await readJSON('skills.json');
      let filtered = [];
      let categoryFound = '';

      // Cloud skills
      if (lowerMessage.match(/\b(cloud|aws|azure|gcp)\b/i)) {
        filtered = data.filter(s =>
          s.name.toLowerCase().includes('cloud') ||
          s.name.toLowerCase().includes('aws') ||
          s.name.toLowerCase().includes('azure') ||
          (s.relatedTechnologies && s.relatedTechnologies.some(tech => tech.toLowerCase().includes('cloud')))
        );
        categoryFound = 'Cloud';
      }
      // AI/ML skills
      else if (lowerMessage.match(/\b(ai|ml|machine learning|artificial intelligence|data science)\b/i)) {
        filtered = data.filter(s =>
          s.name.toLowerCase().includes('ai') ||
          s.name.toLowerCase().includes('ml') ||
          s.name.toLowerCase().includes('machine learning') ||
          s.description.toLowerCase().includes('machine learning')
        );
        categoryFound = 'AI/ML';
      }
      // DevOps skills
      else if (lowerMessage.match(/\b(devops|ci\/cd|kubernetes|docker|jenkins)\b/i)) {
        filtered = data.filter(s =>
          s.name.toLowerCase().includes('devops') ||
          s.name.toLowerCase().includes('kubernetes') ||
          s.name.toLowerCase().includes('docker')
        );
        categoryFound = 'DevOps';
      }
      // Programming skills
      else if (lowerMessage.match(/\b(programming|coding|development|java|python|javascript)\b/i)) {
        filtered = data.filter(s =>
          s.category.toLowerCase().includes('technical') &&
          (s.name.toLowerCase().includes('development') ||
           s.name.toLowerCase().includes('programming') ||
           (s.relatedTechnologies && s.relatedTechnologies.some(tech =>
             ['Java', 'Python', 'JavaScript', 'C++'].includes(tech)
           )))
        );
        categoryFound = 'Programming';
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
            ? `Here are ${filtered.length} featured skills. Ask about specific categories like Cloud, AI/ML, or DevOps for more.`
            : `I found ${filtered.length} ${categoryFound} skill${filtered.length > 1 ? 's' : ''} in our portfolio.`,
          suggestions: categoryFound === 'Overview'
            ? ['Show Cloud skills', 'Show AI/ML skills', 'Show DevOps skills']
            : ['View certifications', 'Show related portfolios', 'Request expert']
        };
      } else {
        response = {
          intent: 'view_skills',
          responseType: 'text',
          data: null,
          text: `I couldn't find any skills matching "${message}". Try asking about: Cloud, AI/ML, DevOps, Programming, or Domain expertise.`,
          suggestions: ['Show Cloud skills', 'Show AI/ML skills', 'Show all skills']
        };
      }
    }
    // Certifications related - with intelligent filtering
    else if (lowerMessage.match(/\b(certif|training|credential)\b/i)) {
      const data = await readJSON('certifications.json');
      let filtered = [];
      let categoryFound = '';

      // AWS certifications
      if (lowerMessage.match(/\b(aws|amazon)\b/i)) {
        filtered = data.filter(c =>
          c.provider.toLowerCase().includes('aws') ||
          c.name.toLowerCase().includes('aws')
        );
        categoryFound = 'AWS';
      }
      // Azure certifications
      else if (lowerMessage.match(/\b(azure|microsoft)\b/i)) {
        filtered = data.filter(c =>
          c.provider.toLowerCase().includes('azure') ||
          c.provider.toLowerCase().includes('microsoft') ||
          c.name.toLowerCase().includes('azure')
        );
        categoryFound = 'Azure';
      }
      // Google Cloud certifications
      else if (lowerMessage.match(/\b(gcp|google cloud)\b/i)) {
        filtered = data.filter(c =>
          c.provider.toLowerCase().includes('google') ||
          c.name.toLowerCase().includes('google')
        );
        categoryFound = 'Google Cloud';
      }
      // Security certifications
      else if (lowerMessage.match(/\b(security|cissp|cism|ceh)\b/i)) {
        filtered = data.filter(c =>
          c.category?.toLowerCase().includes('security') ||
          c.name.toLowerCase().includes('security')
        );
        categoryFound = 'Security';
      }
      // TCS certifications
      else if (lowerMessage.match(/\b(tcs|tata)\b/i)) {
        filtered = data.filter(c =>
          c.provider.toLowerCase().includes('tcs')
        );
        categoryFound = 'TCS';
      }
      // All certifications - only show limited set
      else if (lowerMessage.match(/\b(all|show all|list)\b/i) || lowerMessage === 'certifications') {
        filtered = data.slice(0, 6);
        categoryFound = 'Overview';
      }

      if (filtered.length > 0) {
        response = {
          intent: 'view_certifications',
          responseType: 'cards',
          data: filtered,
          text: categoryFound === 'Overview'
            ? `Here are ${filtered.length} featured certifications. Ask about specific providers like AWS, Azure, or Google Cloud for more.`
            : `I found ${filtered.length} ${categoryFound} certification${filtered.length > 1 ? 's' : ''}.`,
          suggestions: categoryFound === 'Overview'
            ? ['Show AWS certifications', 'Show Azure certifications', 'Show TCS certifications']
            : ['View prerequisites', 'Show related skills', 'Request training']
        };
      } else {
        response = {
          intent: 'view_certifications',
          responseType: 'text',
          data: null,
          text: `I couldn't find any certifications matching "${message}". Try asking about: AWS, Azure, Google Cloud, Security, or TCS certifications.`,
          suggestions: ['Show AWS certifications', 'Show Azure certifications', 'Show all certifications']
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
    // Incubation related - with intelligent filtering
    else if (lowerMessage.includes('incubat') || lowerMessage.includes('innovation') || lowerMessage.includes('new project')) {
      const data = await readJSON('incubation.json');
      response = {
        intent: 'view_incubation',
        responseType: 'cards',
        data: data.slice(0, 6), // Show only first 6
        text: `We have ${data.length} incubation projects across various innovation areas. Here are ${Math.min(6, data.length)} featured projects:`,
        suggestions: ['Filter by stage', 'Show CMI projects', 'Submit new idea']
      };
    }
    // Project status related
    else if (lowerMessage.includes('project') || lowerMessage.includes('status') || lowerMessage.includes('report')) {
      const data = await readJSON('projects.json');

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
          data: data.slice(0, 6), // Show only first 6
          text: `Here's an overview of our projects. We have ${data.length} projects across various industries. Showing ${Math.min(6, data.length)} featured projects:`,
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
      const portfolios = await readJSON('portfolio.json');
      const skills = await readJSON('skills.json');
      const certifications = await readJSON('certifications.json');
      const engagements = await readJSON('engagements.json');
      const incubation = await readJSON('incubation.json');
      const projects = await readJSON('projects.json');

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

    res.json(response);
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      error: 'Failed to process chat message',
      text: 'Sorry, I encountered an error. Please try again.',
      suggestions: ['Show help', 'View portfolios']
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'TCS Digital Portal API is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 TCS Digital Portal API running on http://localhost:${PORT}`);
  console.log(`📊 API endpoints available at http://localhost:${PORT}/api/*`);
});
