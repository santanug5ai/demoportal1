import React from 'react';
import './Dashboard.css';

const Dashboard = ({ stats }) => {
  if (!stats) {
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <h2>📊 Dashboard</h2>
          <p>Loading statistics...</p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      icon: '💼',
      title: 'Portfolio Items',
      value: stats.portfolios,
      color: '#002D72',
      description: 'Solutions & Case Studies'
    },
    {
      icon: '⚡',
      title: 'Skills Available',
      value: stats.skills,
      color: '#6A1B9A',
      description: 'Technical & Domain Expertise'
    },
    {
      icon: '🎓',
      title: 'Certifications',
      value: stats.certifications,
      color: '#00BCD4',
      description: 'Available Training Programs'
    },
    {
      icon: '🤝',
      title: 'Engagements',
      value: stats.engagements,
      color: '#FF9800',
      description: `${stats.pendingEngagements} Pending Requests`
    },
    {
      icon: '📋',
      title: 'Active Projects',
      value: stats.activeProjects,
      color: '#2196F3',
      description: `${stats.projects} Total Projects`
    },
    {
      icon: '🚀',
      title: 'Innovation Projects',
      value: stats.activeIncubation,
      color: '#4CAF50',
      description: `${stats.incubation} Total Incubation`
    }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>📊 TCS Digital Portal Dashboard</h2>
        <p>Overview of all services, projects, and engagements</p>
      </div>

      <div className="stats-grid">
        {statCards.map((card, index) => (
          <div key={index} className="stat-card" style={{ borderLeftColor: card.color }}>
            <div className="stat-icon" style={{ background: card.color }}>
              {card.icon}
            </div>
            <div className="stat-content">
              <div className="stat-value" style={{ color: card.color }}>
                {card.value}
              </div>
              <div className="stat-title">{card.title}</div>
              <div className="stat-description">{card.description}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-info">
        <div className="info-card">
          <h3>🌟 Welcome to TCS Digital Portal</h3>
          <p>
            Your one-stop solution for exploring TCS capabilities, requesting engagements,
            tracking projects, and managing innovation initiatives.
          </p>
          <ul>
            <li>Access comprehensive portfolio of solutions and case studies</li>
            <li>Explore skills and certifications across technologies</li>
            <li>Request pre-sales support, SMEs, consultants, and professionals</li>
            <li>Track incubation projects and innovation initiatives</li>
            <li>Monitor project status and reports in real-time</li>
          </ul>
        </div>

        <div className="info-card">
          <h3>💬 Using the Conversational Interface</h3>
          <p>
            Our AI-powered chatbot can help you quickly find information and complete tasks.
            Try these sample queries:
          </p>
          <div className="sample-queries">
            <div className="query-item">"Show me AI/ML portfolios"</div>
            <div className="query-item">"I need a cloud consultant"</div>
            <div className="query-item">"What certifications are available for AWS?"</div>
            <div className="query-item">"Show project status for banking clients"</div>
            <div className="query-item">"What innovation projects are in development?"</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
