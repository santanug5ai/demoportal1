import React, { useState } from 'react';
import './DataCard.css';

const DataCard = ({ data, type }) => {
  const [expanded, setExpanded] = useState(false);

  if (!data) return null;

  // Portfolio Card
  if (data.category || data.useCases) {
    return (
      <div className="data-card portfolio-card">
        <div className="card-header">
          <div className="card-category">{data.category}</div>
          <div className="card-id">{data.id}</div>
        </div>
        <h3 className="card-title">{data.title}</h3>
        <p className="card-description">{data.description}</p>

        {data.technologies && (
          <div className="card-technologies">
            {data.technologies.slice(0, 4).map((tech, idx) => (
              <span key={idx} className="tech-badge">{tech}</span>
            ))}
            {data.technologies.length > 4 && (
              <span className="tech-badge more">+{data.technologies.length - 4}</span>
            )}
          </div>
        )}

        {data.useCases && (
          <div className="card-section">
            <h4 className="section-title">Use Cases:</h4>
            <ul className="use-cases-list">
              {data.useCases.slice(0, expanded ? undefined : 2).map((useCase, idx) => (
                <li key={idx}>{useCase}</li>
              ))}
            </ul>
          </div>
        )}

        {data.caseStudies && data.caseStudies.length > 0 && (
          <div className="card-section">
            <h4 className="section-title">Case Study:</h4>
            <div className="case-study">
              <p><strong>Client:</strong> {data.caseStudies[0].client} ({data.caseStudies[0].industry})</p>
              {expanded && (
                <>
                  <p><strong>Challenge:</strong> {data.caseStudies[0].challenge}</p>
                  <p><strong>Solution:</strong> {data.caseStudies[0].solution}</p>
                  <p className="results"><strong>Results:</strong> {data.caseStudies[0].results}</p>
                </>
              )}
            </div>
          </div>
        )}

        <button className="expand-btn" onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Show Less ▲' : 'Show More ▼'}
        </button>
      </div>
    );
  }

  // Skills Card
  if (data.level && data.relatedTechnologies) {
    return (
      <div className="data-card skill-card">
        <div className="card-header">
          <div className="card-category">{data.category}</div>
          <div className={`demand-badge ${data.demandLevel.toLowerCase()}`}>
            {data.demandLevel} Demand
          </div>
        </div>
        <h3 className="card-title">{data.name}</h3>
        <div className="skill-level">
          <span className="level-label">Level:</span>
          <span className={`level-badge ${data.level.toLowerCase()}`}>{data.level}</span>
        </div>
        <p className="card-description">{data.description}</p>
        {data.relatedTechnologies && (
          <div className="card-technologies">
            {data.relatedTechnologies.map((tech, idx) => (
              <span key={idx} className="tech-badge">{tech}</span>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Certifications Card
  if (data.provider && data.validityPeriod) {
    return (
      <div className="data-card cert-card">
        <div className="card-header">
          <div className="card-category">{data.category}</div>
          <div className="validity-badge">{data.validityPeriod}</div>
        </div>
        <h3 className="card-title">{data.name}</h3>
        <p className="provider">by {data.provider}</p>
        <p className="card-description">{data.description}</p>

        {expanded && data.prerequisites && (
          <div className="card-section">
            <h4 className="section-title">Prerequisites:</h4>
            <ul>
              {data.prerequisites.map((prereq, idx) => (
                <li key={idx}>{prereq}</li>
              ))}
            </ul>
          </div>
        )}

        {expanded && data.benefits && (
          <div className="card-section">
            <h4 className="section-title">Benefits:</h4>
            <ul>
              {data.benefits.map((benefit, idx) => (
                <li key={idx}>{benefit}</li>
              ))}
            </ul>
          </div>
        )}

        <button className="expand-btn" onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Show Less ▲' : 'Show More ▼'}
        </button>
      </div>
    );
  }

  // Engagement Card
  if (data.type && data.clientName) {
    return (
      <div className="data-card engagement-card">
        <div className="card-header">
          <div className="engagement-type">{data.type}</div>
          <div className={`status-badge ${data.status.toLowerCase().replace(' ', '-')}`}>
            {data.status}
          </div>
        </div>
        <h3 className="card-title">{data.clientName}</h3>
        <p className="industry">{data.industry}</p>
        <p className="card-description">{data.description}</p>

        <div className="engagement-details">
          <div className="detail-item">
            <span className="detail-label">Duration:</span>
            <span className="detail-value">{data.duration}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Priority:</span>
            <span className={`priority-badge ${data.priority.toLowerCase()}`}>{data.priority}</span>
          </div>
        </div>

        {data.skillsRequired && (
          <div className="card-technologies">
            {data.skillsRequired.map((skill, idx) => (
              <span key={idx} className="tech-badge">{skill}</span>
            ))}
          </div>
        )}

        {data.assignedTo && (
          <p className="assigned-to">Assigned to: <strong>{data.assignedTo}</strong></p>
        )}
      </div>
    );
  }

  // Incubation Card
  if (data.stage && data.milestones) {
    return (
      <div className="data-card incubation-card">
        <div className="card-header">
          <div className="card-category">{data.category}</div>
          <div className={`stage-badge ${data.stage.toLowerCase()}`}>{data.stage}</div>
        </div>
        <h3 className="card-title">{data.projectName}</h3>
        <p className="card-description">{data.description}</p>

        <div className="engagement-details">
          <div className="detail-item">
            <span className="detail-label">Status:</span>
            <span className={`status-badge ${data.status.toLowerCase()}`}>{data.status}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Team Size:</span>
            <span className="detail-value">{data.team.length}</span>
          </div>
        </div>

        {expanded && data.milestones && (
          <div className="card-section">
            <h4 className="section-title">Milestones:</h4>
            <div className="milestones">
              {data.milestones.map((milestone, idx) => (
                <div key={idx} className="milestone">
                  <span className={`milestone-status ${milestone.status.toLowerCase().replace(' ', '-')}`}>
                    {milestone.status === 'Completed' ? '✓' :
                     milestone.status === 'In Progress' ? '◐' : '○'}
                  </span>
                  <span>{milestone.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <button className="expand-btn" onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Show Less ▲' : 'Show More ▼'}
        </button>
      </div>
    );
  }

  // Project Card
  if (data.projectName && data.client && data.progress !== undefined) {
    return (
      <div className="data-card project-card">
        <div className="card-header">
          <div className="card-id">{data.id}</div>
          <div className={`status-badge ${data.status.toLowerCase().replace(' ', '-')}`}>
            {data.status}
          </div>
        </div>
        <h3 className="card-title">{data.projectName}</h3>
        <p className="client">Client: {data.client}</p>

        <div className="progress-section">
          <div className="progress-header">
            <span>Progress</span>
            <span className="progress-value">{data.progress}%</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${data.progress}%` }}
            ></div>
          </div>
        </div>

        <div className="engagement-details">
          <div className="detail-item">
            <span className="detail-label">Budget:</span>
            <span className="detail-value">${(data.budget / 1000000).toFixed(1)}M</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Team:</span>
            <span className="detail-value">{data.team.length}</span>
          </div>
        </div>

        {data.reports && data.reports.length > 0 && (
          <div className="latest-report">
            <strong>Latest Report:</strong> {data.reports[0].type} - {data.reports[0].date}
          </div>
        )}

        {expanded && data.risks && data.risks.length > 0 && (
          <div className="card-section">
            <h4 className="section-title">Risks:</h4>
            <ul>
              {data.risks.map((risk, idx) => (
                <li key={idx}>{risk}</li>
              ))}
            </ul>
          </div>
        )}

        <button className="expand-btn" onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Show Less ▲' : 'Show More ▼'}
        </button>
      </div>
    );
  }

  return null;
};

export default DataCard;
