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

    // Portfolio related
    if (lowerMessage.includes('portfolio') || lowerMessage.includes('use case') || lowerMessage.includes('case stud')) {
      const data = await readJSON('portfolio.json');

      // Check for specific categories
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
      const data = await readJSON('skills.json');

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
      const data = await readJSON('certifications.json');

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
      const data = await readJSON('incubation.json');
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
