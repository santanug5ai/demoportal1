import React from 'react';
import './Sidebar.css';

const SidebarNew = ({ isOpen, onToggle, activeView, onViewChange, stats }) => {
  const menuItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard', badge: null },
    { id: 'portfolio', icon: '📂', label: 'Portfolio', badge: stats?.portfolios, subtitle: 'Skills & Certifications included' },
    { id: 'buy-requests', icon: '🛒', label: 'Buy Requests', badge: stats?.pendingBuyRequests || 0, subtitle: 'Lead-to-Order' },
    { id: 'engagements', icon: '🤝', label: 'Engagements', badge: stats?.pendingEngagements, subtitle: 'Includes Projects' },
    { id: 'incubation', icon: '🚀', label: 'Innovation', badge: stats?.activeIncubation },
  ];

  return (
    <>
      <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <button className="sidebar-toggle" onClick={onToggle}>
          {isOpen ? '◀' : '▶'}
        </button>

        {isOpen && (
          <div className="sidebar-header">
            <h3>TCS Digital Portal</h3>
            <p className="sidebar-version">v2.0 - Restructured</p>
          </div>
        )}

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
                <div className="sidebar-item-content">
                  <div className="sidebar-item-header">
                    <span className="sidebar-label">{item.label}</span>
                  </div>
                  {item.subtitle && (
                    <span className="sidebar-subtitle">{item.subtitle}</span>
                  )}
                </div>
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
                  <span className="stat-value">{stats?.totalEngagements || 0}</span>
                  <span className="stat-label">Engagements</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{stats?.pendingBuyRequests || 0}</span>
                  <span className="stat-label">Pending Orders</span>
                </div>
              </div>
            </div>
            <div className="sidebar-changes-note">
              <strong>What's New:</strong>
              <ul>
                <li>Skills & Certs in Portfolio</li>
                <li>Buy Request Workflow</li>
                <li>Projects in Engagements</li>
              </ul>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default SidebarNew;
