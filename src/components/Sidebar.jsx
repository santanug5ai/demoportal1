import React from 'react';
import './Sidebar.css';

const Sidebar = ({ isOpen, onToggle, activeView, onViewChange, stats }) => {
  const menuItems = [
    { id: 'chat', icon: '💬', label: 'Chat Assistant', badge: null },
    { id: 'dashboard', icon: '📊', label: 'Dashboard', badge: null },
    { id: 'portfolio', icon: '💼', label: 'Portfolio', badge: stats?.portfolios },
    { id: 'skills', icon: '⚡', label: 'Skills', badge: stats?.skills },
    { id: 'certifications', icon: '🎓', label: 'Certifications', badge: stats?.certifications },
    { id: 'engagements', icon: '🤝', label: 'Engagements', badge: stats?.pendingEngagements },
    { id: 'incubation', icon: '🚀', label: 'Innovation', badge: stats?.activeIncubation },
    { id: 'projects', icon: '📋', label: 'Projects', badge: stats?.activeProjects },
  ];

  return (
    <>
      <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <button className="sidebar-toggle" onClick={onToggle}>
          {isOpen ? '◀' : '▶'}
        </button>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`sidebar-item ${activeView === item.id ? 'active' : ''}`}
              onClick={() => onViewChange(item.id)}
              title={item.label}
            >
              <span className="sidebar-icon">{item.icon}</span>
              {isOpen && (
                <>
                  <span className="sidebar-label">{item.label}</span>
                  {item.badge !== null && item.badge !== undefined && (
                    <span className="sidebar-badge">{item.badge}</span>
                  )}
                </>
              )}
            </button>
          ))}
        </nav>

        {isOpen && (
          <div className="sidebar-footer">
            <div className="sidebar-info">
              <p className="sidebar-info-title">Quick Stats</p>
              <div className="sidebar-stats">
                <div className="stat-item">
                  <span className="stat-value">{stats?.activeProjects || 0}</span>
                  <span className="stat-label">Active Projects</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{stats?.pendingEngagements || 0}</span>
                  <span className="stat-label">Pending</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
