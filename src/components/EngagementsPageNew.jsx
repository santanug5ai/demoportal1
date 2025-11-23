import React, { useState, useEffect } from 'react';
import './EngagementsPageNew.css';
import engagementsData from '../data/engagements-new.json';

function EngagementsPageNew() {
  const [engagements, setEngagements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [availableStatuses, setAvailableStatuses] = useState(['All']);
  const [expandedEngagement, setExpandedEngagement] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    // Simulate loading for consistent UX
    setLoading(true);
    setTimeout(() => {
      setEngagements(engagementsData);

      // Extract unique statuses
      const statuses = ['All', ...new Set(engagementsData.map(e => e.status))];
      setAvailableStatuses(statuses);

      setLoading(false);
    }, 300);
  }, []);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortedData = () => {
    let filtered = selectedStatus === 'All'
      ? engagements
      : engagements.filter(e => e.status === selectedStatus);

    if (sortConfig.key) {
      filtered = [...filtered].sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  };

  const toggleExpandEngagement = (engagementId) => {
    setExpandedEngagement(expandedEngagement === engagementId ? null : engagementId);
  };

  const getStatusColor = (status) => {
    const statusColors = {
      'Pending': '#f39c12',
      'In Review': '#3498db',
      'Approved': '#27ae60',
      'Assigned': '#9b59b6',
      'Completed': '#2ecc71'
    };
    return statusColors[status] || '#95a5a6';
  };

  const getPriorityColor = (priority) => {
    const priorityColors = {
      'Critical': '#e74c3c',
      'High': '#e67e22',
      'Medium': '#f39c12',
      'Low': '#95a5a6'
    };
    return priorityColors[priority] || '#95a5a6';
  };

  if (loading) {
    return (
      <div className="engagements-page-new">
        <div className="loading-spinner">Loading engagements...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="engagements-page-new">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  const sortedEngagements = getSortedData();

  return (
    <div className="engagements-page-new">
      <div className="page-header">
        <h1>🤝 Engagements & Projects</h1>
        <p>View and manage engagements with their associated projects</p>
      </div>

      {/* Status Filter */}
      <div className="status-filter">
        <label>Filter by Status:</label>
        <div className="status-buttons">
          {availableStatuses.map(status => (
            <button
              key={status}
              className={`status-btn ${selectedStatus === status ? 'active' : ''}`}
              onClick={() => setSelectedStatus(status)}
            >
              {status}
              {status !== 'All' && (
                <span className="count">
                  ({engagements.filter(e => e.status === status).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="summary-stats">
        <div className="stat-card">
          <div className="stat-value">{engagements.length}</div>
          <div className="stat-label">Total Engagements</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">
            {engagements.reduce((sum, e) => sum + (e.projects?.length || 0), 0)}
          </div>
          <div className="stat-label">Total Projects</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">
            {engagements.filter(e => e.status === 'Pending').length}
          </div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">
            {engagements.filter(e => e.status === 'Completed').length}
          </div>
          <div className="stat-label">Completed</div>
        </div>
      </div>

      {/* Engagements Table */}
      <div className="table-container">
        <table className="engagements-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('id')} className="sortable">
                ID {sortConfig.key === 'id' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
              </th>
              <th onClick={() => handleSort('type')} className="sortable">
                Type {sortConfig.key === 'type' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
              </th>
              <th onClick={() => handleSort('clientName')} className="sortable">
                Client {sortConfig.key === 'clientName' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
              </th>
              <th onClick={() => handleSort('industry')} className="sortable">
                Industry {sortConfig.key === 'industry' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
              </th>
              <th onClick={() => handleSort('status')} className="sortable">
                Status {sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
              </th>
              <th onClick={() => handleSort('priority')} className="sortable">
                Priority {sortConfig.key === 'priority' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
              </th>
              <th>Projects</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedEngagements.map(engagement => (
              <React.Fragment key={engagement.id}>
                <tr className="engagement-row">
                  <td className="id-cell">{engagement.id}</td>
                  <td>
                    <span className="type-badge">{engagement.type}</span>
                  </td>
                  <td className="client-cell">{engagement.clientName}</td>
                  <td>{engagement.industry}</td>
                  <td>
                    <span
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(engagement.status) }}
                    >
                      {engagement.status}
                    </span>
                  </td>
                  <td>
                    <span
                      className="priority-badge"
                      style={{ backgroundColor: getPriorityColor(engagement.priority) }}
                    >
                      {engagement.priority}
                    </span>
                  </td>
                  <td className="projects-count">
                    {engagement.projects && engagement.projects.length > 0 ? (
                      <span className="badge">{engagement.projects.length} project(s)</span>
                    ) : (
                      <span className="no-projects">No projects</span>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn-expand"
                      onClick={() => toggleExpandEngagement(engagement.id)}
                    >
                      {expandedEngagement === engagement.id ? '▲ Collapse' : '▼ Expand'}
                    </button>
                  </td>
                </tr>

                {/* Expanded Row - Details */}
                {expandedEngagement === engagement.id && (
                  <tr className="expanded-row">
                    <td colSpan="8">
                      <div className="engagement-details">
                        {/* Engagement Info */}
                        <div className="details-section">
                          <h3>Engagement Details</h3>
                          <div className="detail-grid">
                            <div className="detail-item">
                              <strong>Description:</strong>
                              <p>{engagement.description}</p>
                            </div>
                            <div className="detail-item">
                              <strong>Duration:</strong>
                              <p>{engagement.duration}</p>
                            </div>
                            <div className="detail-item">
                              <strong>Request Date:</strong>
                              <p>{engagement.requestDate}</p>
                            </div>
                            <div className="detail-item">
                              <strong>Assigned To:</strong>
                              <p>{engagement.assignedTo || 'Not assigned'}</p>
                            </div>
                            <div className="detail-item">
                              <strong>Skills Required:</strong>
                              <div className="skills-tags">
                                {engagement.skillsRequired?.map((skill, idx) => (
                                  <span key={idx} className="skill-tag">{skill}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Associated Projects */}
                        {engagement.projects && engagement.projects.length > 0 && (
                          <div className="details-section projects-section">
                            <h3>📊 Associated Projects ({engagement.projects.length})</h3>
                            <div className="projects-list">
                              {engagement.projects.map(project => (
                                <div key={project.id} className="project-card">
                                  <div className="project-header">
                                    <h4>{project.projectName}</h4>
                                    <span
                                      className="project-status"
                                      style={{
                                        backgroundColor:
                                          project.status === 'Completed' ? '#27ae60' :
                                          project.status === 'In Progress' ? '#3498db' : '#95a5a6'
                                      }}
                                    >
                                      {project.status}
                                    </span>
                                  </div>

                                  <div className="project-details">
                                    <div className="project-info">
                                      <span><strong>Start:</strong> {project.startDate}</span>
                                      <span><strong>End:</strong> {project.endDate}</span>
                                      <span><strong>Budget:</strong> ${project.budget?.toLocaleString()}</span>
                                    </div>

                                    {/* Progress Bar */}
                                    {project.progress !== undefined && (
                                      <div className="progress-section">
                                        <div className="progress-label">
                                          Progress: {project.progress}%
                                        </div>
                                        <div className="progress-bar">
                                          <div
                                            className="progress-fill"
                                            style={{ width: `${project.progress}%` }}
                                          />
                                        </div>
                                      </div>
                                    )}

                                    {/* Team */}
                                    {project.team && project.team.length > 0 && (
                                      <div className="team-section">
                                        <strong>Team:</strong>
                                        <div className="team-members">
                                          {project.team.map((member, idx) => (
                                            <span key={idx} className="team-member">{member}</span>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                    {/* Risks */}
                                    {project.risks && project.risks.length > 0 && (
                                      <div className="risks-section">
                                        <strong>⚠️ Risks:</strong>
                                        <ul>
                                          {project.risks.map((risk, idx) => (
                                            <li key={idx}>{risk}</li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}

                                    {/* Recent Reports */}
                                    {project.reports && project.reports.length > 0 && (
                                      <div className="reports-section">
                                        <strong>📄 Recent Reports:</strong>
                                        <div className="reports-list">
                                          {project.reports.slice(0, 2).map((report, idx) => (
                                            <div key={idx} className="report-item">
                                              <span className="report-date">{report.date}</span>
                                              <span className="report-type">{report.type}</span>
                                              <p className="report-summary">{report.summary}</p>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        {sortedEngagements.length === 0 && (
          <div className="no-data">
            No engagements found for the selected status.
          </div>
        )}
      </div>
    </div>
  );
}

export default EngagementsPageNew;
