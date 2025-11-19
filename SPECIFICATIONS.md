# TCS Digital Portal - Technical Specifications

## 1. Overview
A conversational UI portal for TCS to manage digital workflow for BUY service requests with minimal manual intervention.

## 2. System Architecture

### 2.1 Frontend
- **Framework**: React 18 with Vite
- **Port**: 3000
- **UI Pattern**: Conversational Interface with Chat-based interaction
- **State Management**: React Hooks (useState, useEffect)

### 2.2 Backend
- **Framework**: Express.js (Node.js)
- **Port**: 5000
- **Data Storage**: JSON files (no database)
- **API Pattern**: RESTful API

### 2.3 Communication
- **Protocol**: HTTP/REST
- **Data Format**: JSON
- **CORS**: Enabled for frontend-backend communication

## 3. Data Models

### 3.1 Portfolio
```json
{
  "id": "string (UUID)",
  "title": "string",
  "category": "string (AI/ML, Cloud, Blockchain, etc.)",
  "description": "string",
  "useCases": ["string"],
  "caseStudies": [{
    "client": "string",
    "industry": "string",
    "challenge": "string",
    "solution": "string",
    "results": "string"
  }],
  "technologies": ["string"],
  "createdDate": "string (ISO date)"
}
```

### 3.2 Skills
```json
{
  "id": "string (UUID)",
  "name": "string",
  "category": "string (Technical, Domain, Soft Skills)",
  "level": "string (Beginner, Intermediate, Advanced, Expert)",
  "description": "string",
  "relatedTechnologies": ["string"],
  "demandLevel": "string (High, Medium, Low)"
}
```

### 3.3 Certifications
```json
{
  "id": "string (UUID)",
  "name": "string",
  "provider": "string",
  "category": "string",
  "validityPeriod": "string",
  "description": "string",
  "prerequisites": ["string"],
  "benefits": ["string"]
}
```

### 3.4 Engagement Requests
```json
{
  "id": "string (UUID)",
  "type": "string (Pre-sales, SME, Consultant, Professional)",
  "clientName": "string",
  "industry": "string",
  "skillsRequired": ["string"],
  "duration": "string",
  "status": "string (Pending, In Review, Approved, Assigned, Completed)",
  "priority": "string (Low, Medium, High, Critical)",
  "description": "string",
  "requestDate": "string (ISO date)",
  "assignedTo": "string (optional)"
}
```

### 3.5 Incubation Projects
```json
{
  "id": "string (UUID)",
  "projectName": "string",
  "description": "string",
  "category": "string",
  "stage": "string (Ideation, Development, Testing, Pilot, Production)",
  "startDate": "string (ISO date)",
  "estimatedCompletion": "string (ISO date)",
  "team": ["string"],
  "status": "string (Active, On Hold, Completed, Cancelled)",
  "milestones": [{
    "name": "string",
    "status": "string",
    "dueDate": "string"
  }]
}
```

### 3.6 Projects & Reports
```json
{
  "id": "string (UUID)",
  "projectName": "string",
  "client": "string",
  "status": "string (Not Started, In Progress, On Hold, Completed, Cancelled)",
  "progress": "number (0-100)",
  "startDate": "string (ISO date)",
  "endDate": "string (ISO date)",
  "team": ["string"],
  "budget": "number",
  "risks": ["string"],
  "reports": [{
    "date": "string (ISO date)",
    "type": "string (Weekly, Monthly, Milestone)",
    "summary": "string",
    "url": "string"
  }]
}
```

## 4. API Endpoints

### 4.1 Portfolio Endpoints
- `GET /api/portfolio` - Get all portfolios
- `GET /api/portfolio/:id` - Get specific portfolio
- `GET /api/portfolio/category/:category` - Get portfolios by category

### 4.2 Skills Endpoints
- `GET /api/skills` - Get all skills
- `GET /api/skills/:id` - Get specific skill
- `GET /api/skills/category/:category` - Get skills by category

### 4.3 Certifications Endpoints
- `GET /api/certifications` - Get all certifications
- `GET /api/certifications/:id` - Get specific certification
- `GET /api/certifications/provider/:provider` - Get certifications by provider

### 4.4 Engagement Endpoints
- `GET /api/engagements` - Get all engagement requests
- `GET /api/engagements/:id` - Get specific engagement
- `POST /api/engagements` - Create new engagement request
- `PUT /api/engagements/:id` - Update engagement request
- `GET /api/engagements/status/:status` - Get engagements by status

### 4.5 Incubation Endpoints
- `GET /api/incubation` - Get all incubation projects
- `GET /api/incubation/:id` - Get specific incubation project
- `POST /api/incubation` - Create new incubation request
- `PUT /api/incubation/:id` - Update incubation status

### 4.6 Projects Endpoints
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get specific project
- `GET /api/projects/status/:status` - Get projects by status
- `GET /api/projects/:id/reports` - Get project reports

### 4.7 Conversational AI Endpoint
- `POST /api/chat` - Process natural language queries

## 5. UI Components Specification

### 5.1 Main Layout
- **Header**: TCS branding, navigation, user profile
- **Sidebar**: Quick access to main sections
- **Chat Interface**: Central conversational UI
- **Dashboard Panel**: Visual data display

### 5.2 Chat Interface Components
- **Message Bubble**: Display user and bot messages
- **Input Box**: Text input for user queries
- **Quick Actions**: Pre-defined action buttons
- **Rich Response Cards**: Display structured data (portfolio cards, skill cards, etc.)
- **Status Indicators**: Typing indicator, online status

### 5.3 Response Card Types
- **Portfolio Card**: Title, category, description, case studies
- **Skill Card**: Name, level, description, demand
- **Certification Card**: Name, provider, validity
- **Engagement Card**: Type, client, status, priority
- **Incubation Card**: Project name, stage, progress
- **Project Card**: Name, client, status, progress bar

### 5.4 Dashboard Widgets
- **Statistics Overview**: Total portfolios, active projects, pending engagements
- **Recent Activity**: Latest updates and requests
- **Quick Filters**: Filter by status, category, priority

## 6. Conversational AI Logic

### 6.1 Intent Recognition
The system should recognize the following intents:
- **View Portfolio**: "show portfolios", "what are your use cases"
- **Search Skills**: "find skills in AI", "show cloud skills"
- **View Certifications**: "list certifications", "AWS certifications"
- **Create Engagement**: "request consultant", "need SME for project"
- **Check Incubation**: "incubation status", "show innovation projects"
- **View Projects**: "project status", "show reports"
- **General Help**: "help", "what can you do"

### 6.2 Response Format
```json
{
  "intent": "string",
  "responseType": "string (text, cards, form, chart)",
  "data": "object | array",
  "suggestions": ["string"]
}
```

### 6.3 Context Management
- Maintain conversation context for follow-up questions
- Remember user preferences and recent searches
- Provide contextual suggestions

## 7. User Flows

### 7.1 Portfolio Discovery Flow
1. User asks: "Show me AI/ML portfolios"
2. System recognizes intent and category
3. System retrieves matching portfolios
4. System displays portfolio cards with use cases
5. User can click to see detailed case studies

### 7.2 Engagement Request Flow
1. User asks: "I need a consultant for cloud migration"
2. System recognizes engagement intent
3. System presents engagement request form
4. User fills details (client, industry, duration, skills)
5. System creates request and provides tracking ID
6. System shows status updates

### 7.3 Project Status Check Flow
1. User asks: "What's the status of project XYZ"
2. System searches projects by name
3. System displays project card with progress
4. System shows recent reports and milestones
5. User can request detailed reports

## 8. Styling Guidelines

### 8.1 Color Palette
- **Primary**: TCS Blue (#002D72)
- **Secondary**: TCS Purple (#6A1B9A)
- **Accent**: TCS Cyan (#00BCD4)
- **Success**: Green (#4CAF50)
- **Warning**: Orange (#FF9800)
- **Error**: Red (#F44336)
- **Background**: Light Gray (#F5F5F5)
- **Text**: Dark Gray (#333333)

### 8.2 Typography
- **Font Family**: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- **Headers**: Bold, 24px-32px
- **Body**: Regular, 14px-16px
- **Chat Messages**: 15px

### 8.3 Layout
- **Max Width**: 1400px (desktop)
- **Chat Width**: 600px-800px
- **Card Padding**: 20px
- **Border Radius**: 8px-12px
- **Shadows**: Subtle elevation shadows

## 9. Performance Requirements
- **Initial Load**: < 2 seconds
- **API Response**: < 500ms
- **Chat Response**: < 1 second
- **Smooth Animations**: 60fps

## 10. Accessibility
- **ARIA Labels**: All interactive elements
- **Keyboard Navigation**: Full support
- **Screen Reader**: Compatible
- **Color Contrast**: WCAG AA compliant

## 11. Testing Requirements
- Minimum 20 demo records for each data type
- Test all API endpoints
- Test conversational flows
- Cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- Responsive design (Desktop, Tablet, Mobile)
