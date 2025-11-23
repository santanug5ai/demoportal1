import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { AIService } from './aiService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const aiService = new AIService();

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

// Helper function to write JSON files
const writeJSON = async (filename, data) => {
  const filePath = path.join(__dirname, '..', 'data', filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};

// Portfolio endpoints (now includes skills and certifications)
app.get('/api/portfolio', async (req, res) => {
  try {
    const data = await readJSON('portfolio-new.json');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch portfolio data' });
  }
});

app.get('/api/portfolio/:id', async (req, res) => {
  try {
    const data = await readJSON('portfolio-new.json');
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
    const data = await readJSON('portfolio-new.json');
    const filtered = data.filter(p =>
      p.category.toLowerCase().includes(req.params.category.toLowerCase())
    );
    res.json(filtered);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch portfolio by category' });
  }
});

// Get skills for a specific portfolio
app.get('/api/portfolio/:id/skills', async (req, res) => {
  try {
    const data = await readJSON('portfolio-new.json');
    const portfolio = data.find(p => p.id === req.params.id);
    if (portfolio) {
      res.json(portfolio.skills || []);
    } else {
      res.status(404).json({ error: 'Portfolio not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch portfolio skills' });
  }
});

// Get certifications for a specific portfolio
app.get('/api/portfolio/:id/certifications', async (req, res) => {
  try {
    const data = await readJSON('portfolio-new.json');
    const portfolio = data.find(p => p.id === req.params.id);
    if (portfolio) {
      res.json(portfolio.certifications || []);
    } else {
      res.status(404).json({ error: 'Portfolio not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch portfolio certifications' });
  }
});

// Buy Request endpoints
app.get('/api/buy-requests', async (req, res) => {
  try {
    const data = await readJSON('buy-requests.json');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch buy requests' });
  }
});

app.get('/api/buy-requests/:id', async (req, res) => {
  try {
    const data = await readJSON('buy-requests.json');
    const item = data.find(b => b.id === req.params.id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ error: 'Buy request not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch buy request' });
  }
});

app.get('/api/buy-requests/status/:status', async (req, res) => {
  try {
    const data = await readJSON('buy-requests.json');
    const filtered = data.filter(b =>
      b.workflowStatus.toLowerCase().replace(' ', '-') === req.params.status.toLowerCase().replace(' ', '-')
    );
    res.json(filtered);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch buy requests by status' });
  }
});

app.post('/api/buy-requests', async (req, res) => {
  try {
    const data = await readJSON('buy-requests.json');
    const { portfolioId, selectedSkills, quantity, duration, budget, businessJustification, priority, requestedBy } = req.body;

    // Get portfolio details
    const portfolios = await readJSON('portfolio-new.json');
    const portfolio = portfolios.find(p => p.id === portfolioId);

    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }

    // Auto-select certifications based on selected skills
    const autoSelectedCertifications = [];
    portfolio.certifications.forEach(cert => {
      if (cert.autoSelectedForSkill && cert.autoSelectedForSkill.some(skillId => selectedSkills.includes(skillId))) {
        if (!autoSelectedCertifications.includes(cert.id)) {
          autoSelectedCertifications.push(cert.id);
        }
      }
    });

    const newBuyRequest = {
      id: `BUY-${String(data.length + 1).padStart(3, '0')}`,
      portfolioId,
      portfolioTitle: portfolio.title,
      requestedBy: requestedBy || 'Anonymous User',
      requestDate: new Date().toISOString().split('T')[0],
      selectedSkills,
      autoSelectedCertifications,
      quantity: quantity || 1,
      duration: duration || '3 months',
      budget: budget || 0,
      workflowStatus: 'Draft',
      workflowHistory: [
        {
          status: 'Draft',
          date: new Date().toISOString().split('T')[0],
          actor: requestedBy || 'Anonymous User',
          comments: 'Initial request created'
        }
      ],
      businessJustification: businessJustification || '',
      priority: priority || 'Medium'
    };

    data.push(newBuyRequest);
    await writeJSON('buy-requests.json', data);
    res.status(201).json(newBuyRequest);
  } catch (error) {
    console.error('Buy request creation error:', error);
    res.status(500).json({ error: 'Failed to create buy request' });
  }
});

// Update buy request workflow status
app.put('/api/buy-requests/:id/workflow', async (req, res) => {
  try {
    const data = await readJSON('buy-requests.json');
    const index = data.findIndex(b => b.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ error: 'Buy request not found' });
    }

    const { status, actor, comments } = req.body;

    data[index].workflowStatus = status;
    data[index].workflowHistory.push({
      status,
      date: new Date().toISOString().split('T')[0],
      actor,
      comments
    });

    if (status === 'Approved') {
      data[index].approver = actor;
      data[index].approvalDate = new Date().toISOString().split('T')[0];
    }

    await writeJSON('buy-requests.json', data);
    res.json(data[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update buy request workflow' });
  }
});

// Engagements endpoints (now includes projects)
app.get('/api/engagements', async (req, res) => {
  try {
    const data = await readJSON('engagements-new.json');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch engagements data' });
  }
});

app.get('/api/engagements/:id', async (req, res) => {
  try {
    const data = await readJSON('engagements-new.json');
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
    const data = await readJSON('engagements-new.json');
    const filtered = data.filter(e =>
      e.status.toLowerCase().replace(' ', '-') === req.params.status.toLowerCase().replace(' ', '-')
    );
    res.json(filtered);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch engagements by status' });
  }
});

// Get projects for a specific engagement
app.get('/api/engagements/:id/projects', async (req, res) => {
  try {
    const data = await readJSON('engagements-new.json');
    const engagement = data.find(e => e.id === req.params.id);
    if (engagement) {
      res.json(engagement.projects || []);
    } else {
      res.status(404).json({ error: 'Engagement not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch engagement projects' });
  }
});

// Get all unique statuses for engagements (for filter dropdown)
app.get('/api/engagements/meta/statuses', async (req, res) => {
  try {
    const data = await readJSON('engagements-new.json');
    const statuses = [...new Set(data.map(e => e.status))];
    res.json(statuses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch engagement statuses' });
  }
});

app.post('/api/engagements', async (req, res) => {
  try {
    const data = await readJSON('engagements-new.json');
    const newEngagement = {
      id: `ENG-${String(data.length + 1).padStart(3, '0')}`,
      ...req.body,
      requestDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
      assignedTo: null,
      projects: []
    };
    data.push(newEngagement);
    await writeJSON('engagements-new.json', data);
    res.status(201).json(newEngagement);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create engagement' });
  }
});

// Incubation endpoints (unchanged)
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
    await writeJSON('incubation.json', data);
    res.status(201).json(newIncubation);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create incubation project' });
  }
});

// Conversational AI endpoint with updated data structure
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    // Load all data modules for context
    const dataModules = {
      portfolios: await readJSON('portfolio-new.json'),
      engagements: await readJSON('engagements-new.json'),
      incubation: await readJSON('incubation.json'),
      buyRequests: await readJSON('buy-requests.json')
    };

    // Process query with AI service (using Claude Haiku)
    const aiResponse = await aiService.processQuery(message, dataModules);

    // Initialize response structure
    let response = {
      intent: aiResponse.intent || 'unknown',
      responseType: aiResponse.responseType || 'text',
      data: null,
      text: aiResponse.text || '',
      suggestions: aiResponse.suggestions || []
    };

    // Apply data filtering based on AI response
    if (aiResponse.dataFilter && aiResponse.dataFilter.module) {
      const { module } = aiResponse.dataFilter;

      switch (module) {
        case 'portfolio':
          const filtered = aiService.applyDataFilter(dataModules.portfolios, aiResponse.dataFilter);
          response.data = filtered;
          response.responseType = filtered.length > 0 ? 'cards' : 'text';
          break;

        case 'engagements':
          const engagementsFiltered = aiService.applyDataFilter(dataModules.engagements, aiResponse.dataFilter);
          response.data = engagementsFiltered;
          response.responseType = engagementsFiltered.length > 0 ? 'cards' : 'text';
          break;

        case 'incubation':
          const incubationFiltered = aiService.applyDataFilter(dataModules.incubation, aiResponse.dataFilter);
          response.data = incubationFiltered;
          response.responseType = incubationFiltered.length > 0 ? 'cards' : 'text';
          break;

        case 'buyRequests':
          const buyRequestsFiltered = aiService.applyDataFilter(dataModules.buyRequests, aiResponse.dataFilter);
          response.data = buyRequestsFiltered;
          response.responseType = buyRequestsFiltered.length > 0 ? 'cards' : 'text';
          break;

        default:
          break;
      }
    }

    // Handle special intents
    if (aiResponse.intent === 'request_engagement') {
      response.responseType = 'form';
      response.data = {
        types: ['Pre-sales', 'SME', 'Consultant', 'Professional'],
        industries: ['Banking', 'Healthcare', 'Retail', 'Manufacturing', 'Telecom', 'Insurance', 'Government', 'Energy']
      };
    } else if (aiResponse.intent === 'overview' || aiResponse.intent === 'help') {
      response.responseType = 'text';
    }

    res.json(response);
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      error: 'Failed to process chat message',
      text: 'Sorry, I encountered an error processing your request. Please try again.',
      suggestions: ['Show help', 'View portfolios', 'Check engagements']
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'TCS Digital Portal API is running (Restructured)' });
});

app.listen(PORT, () => {
  console.log(`🚀 TCS Digital Portal API (Restructured) running on http://localhost:${PORT}`);
  console.log(`📊 API endpoints available at http://localhost:${PORT}/api/*`);
  console.log(`🤖 AI-powered conversational assistant enabled (Claude Haiku)`);
  console.log(`📦 New data structure:  - Portfolio (merged with Skills & Certifications)`);
  console.log(`                       - Buy Requests (Lead-to-Order workflow)`);
  console.log(`                       - Engagements (includes Projects)`);
});
