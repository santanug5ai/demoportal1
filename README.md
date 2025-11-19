# TCS Digital Portal - Conversational UI

A comprehensive conversational UI portal built for TATA Consultancy Services (TCS) RFP demo, featuring an AI-powered chatbot interface for seamless digital workflow management.

## Features

### Core Capabilities
- **Portfolio Information**: Browse 20+ solution portfolios with use cases and case studies
- **Skills Database**: Explore 25+ technical and domain skills across various technologies
- **Certifications**: View 20+ available certifications and training programs
- **Engagement Requests**: Request pre-sales support, SMEs, consultants, and professionals
- **Incubation Projects**: Track 20+ innovation projects including TCS CMI initiatives
- **Project Management**: Monitor 20+ active and completed projects with real-time reports

### Conversational AI Interface
- Natural language query processing
- Intelligent intent recognition
- Context-aware responses
- Rich data cards for visual information display
- Quick action buttons for common tasks
- Suggested follow-up queries

## Technology Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool and dev server
- **Axios** - HTTP client for API calls
- **CSS3** - Custom styling with animations

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **JSON Files** - Demo data storage (no database required)

## Project Structure

```
demoportal1/
├── backend/
│   └── server.js          # Express API server
├── data/
│   ├── portfolio.json     # Portfolio data with case studies
│   ├── skills.json        # Skills and expertise data
│   ├── certifications.json # Certification programs
│   ├── engagements.json   # Engagement requests
│   ├── incubation.json    # Innovation projects
│   └── projects.json      # Project and reports data
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   ├── ChatInterface.jsx
│   │   ├── MessageBubble.jsx
│   │   ├── DataCard.jsx
│   │   └── Dashboard.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── SPECIFICATIONS.md      # Detailed technical specifications
└── README.md
```

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm (v7 or higher)

### Setup Steps

1. Install dependencies:
```bash
npm install
```

2. Start the application (runs both frontend and backend):
```bash
npm run dev
```

This will start:
- **Backend API**: http://localhost:5000
- **Frontend UI**: http://localhost:3000

The application will automatically open in your default browser.

## Usage

### Conversational Interface

The chatbot understands various types of queries:

**Portfolio Queries:**
- "Show me AI/ML portfolios"
- "What are your cloud solutions?"
- "Show blockchain case studies"

**Skills Queries:**
- "What skills do you have in cloud?"
- "Show me AI expertise"
- "List DevOps skills"

**Certification Queries:**
- "What certifications are available?"
- "Show AWS certifications"
- "List TCS certifications"

**Engagement Requests:**
- "I need a cloud consultant"
- "Request SME for AI project"
- "Need pre-sales support for banking"

**Project Status:**
- "Show project status"
- "What projects are in progress?"
- "Show completed projects"

**Innovation Projects:**
- "Show incubation projects"
- "What innovation initiatives are active?"
- "Show CMI projects"

**General:**
- "Help"
- "Overview"
- "Dashboard"

### Navigation

- **Chat Assistant**: Main conversational interface
- **Dashboard**: Overview statistics and quick access
- **Sidebar**: Quick navigation to different sections

## API Endpoints

### Portfolio
- `GET /api/portfolio` - Get all portfolios
- `GET /api/portfolio/:id` - Get specific portfolio
- `GET /api/portfolio/category/:category` - Filter by category

### Skills
- `GET /api/skills` - Get all skills
- `GET /api/skills/:id` - Get specific skill
- `GET /api/skills/category/:category` - Filter by category

### Certifications
- `GET /api/certifications` - Get all certifications
- `GET /api/certifications/:id` - Get specific certification
- `GET /api/certifications/provider/:provider` - Filter by provider

### Engagements
- `GET /api/engagements` - Get all engagements
- `GET /api/engagements/:id` - Get specific engagement
- `POST /api/engagements` - Create new engagement
- `GET /api/engagements/status/:status` - Filter by status

### Incubation
- `GET /api/incubation` - Get all incubation projects
- `GET /api/incubation/:id` - Get specific project
- `POST /api/incubation` - Create new incubation request

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get specific project
- `GET /api/projects/status/:status` - Filter by status
- `GET /api/projects/:id/reports` - Get project reports

### Chat
- `POST /api/chat` - Process conversational queries

## Demo Data

The application includes comprehensive demo data:
- **20 Portfolio Items** - Covering AI/ML, Cloud, Blockchain, IoT, and more
- **25 Skills** - Technical, domain, and soft skills
- **20 Certifications** - From AWS, Azure, Google, TCS, and others
- **20 Engagement Requests** - Various types and statuses
- **20 Incubation Projects** - Including TCS CMI initiatives
- **20 Projects** - Active and completed with reports

## TCS CMI Integration

The demo includes TCS Cognitive Market Insights (CMI) case studies and projects:
- AI-powered customer support systems
- Predictive supply chain intelligence
- Medical imaging diagnostics
- Automated code review assistants
- Climate risk analytics
- And more...

## Development

### Run Frontend Only
```bash
npm run dev:frontend
```

### Run Backend Only
```bash
npm run dev:backend
```

### Build for Production
```bash
npm run build
```

## Customization

### Adding New Data
Edit the JSON files in the `data/` directory to add or modify:
- Portfolios
- Skills
- Certifications
- Engagements
- Incubation projects
- Projects

### Modifying the Chatbot
Edit `backend/server.js` to add new intents or modify response logic in the `/api/chat` endpoint.

## Browser Support
- Chrome (recommended)
- Firefox
- Safari
- Edge

## License
Proprietary - TCS Internal Use

## Contact
For questions or support, contact the development team.

---

Built with ❤️ for TCS RFP Demo
