import React, { useState, useEffect } from 'react';
import './PortfolioPage.css';
import BuyRequestForm from './BuyRequestForm';
import OrderWorkflowPage from './OrderWorkflowPage';
import portfolioData from '../data/portfolio-new.json';

function PortfolioPageNew() {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [showBuyRequestForm, setShowBuyRequestForm] = useState(false);
  const [expandedPortfolio, setExpandedPortfolio] = useState(null);
  const [showOrderWorkflow, setShowOrderWorkflow] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState(null);

  useEffect(() => {
    // Simulate loading for consistent UX
    setLoading(true);
    setTimeout(() => {
      setPortfolios(portfolioData);
      setLoading(false);
    }, 300);
  }, []);

  const categories = ['All', ...new Set(portfolios.map(p => p.category))];

  const filteredPortfolios = selectedCategory === 'All'
    ? portfolios
    : portfolios.filter(p => p.category === selectedCategory);

  const handleBuyRequest = (portfolio) => {
    setSelectedPortfolio(portfolio);
    setShowBuyRequestForm(true);
  };

  const handleCloseBuyRequest = () => {
    setShowBuyRequestForm(false);
    setSelectedPortfolio(null);
  };

  const handleBuyRequestSuccess = (createdOrder) => {
    setShowBuyRequestForm(false);
    setSelectedPortfolio(null);
    setCreatedOrderId(createdOrder.id);
    setShowOrderWorkflow(true);
  };

  const handleCloseOrderWorkflow = () => {
    setShowOrderWorkflow(false);
    setCreatedOrderId(null);
  };

  const toggleExpand = (portfolioId) => {
    setExpandedPortfolio(expandedPortfolio === portfolioId ? null : portfolioId);
  };

  if (loading) {
    return (
      <div className="portfolio-page">
        <div className="loading-spinner">Loading portfolios...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="portfolio-page">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="portfolio-page">
      <div className="page-header">
        <h1>📂 Solution Portfolios</h1>
        <p>Browse our comprehensive portfolio of solutions with integrated skills and certifications</p>
      </div>

      {/* Category Filter */}
      <div className="category-filter-section">
        <div className="filter-header">
          <h3>Filter by Category</h3>
          <span className="filter-count">{filteredPortfolios.length} solution{filteredPortfolios.length !== 1 ? 's' : ''} found</span>
        </div>
        <div className="category-filter">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
              <span className="category-count">
                ({category === 'All' ? portfolios.length : portfolios.filter(p => p.category === category).length})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="portfolio-grid">
        {filteredPortfolios.map(portfolio => (
          <div key={portfolio.id} className="portfolio-card">
            <div className="portfolio-header">
              <div className="portfolio-category">{portfolio.category}</div>
              <h2>{portfolio.title}</h2>
              <p className="portfolio-description">{portfolio.description}</p>
            </div>

            {/* Skills Summary */}
            <div className="portfolio-section">
              <h4>
                💼 Skills: {portfolio.skills?.length || 0} available
              </h4>
            </div>

            {/* Certifications Summary */}
            <div className="portfolio-section">
              <h4>
                🎓 Certifications: {portfolio.certifications?.length || 0} available
              </h4>
            </div>

            {/* Expand/Collapse Details */}
            {expandedPortfolio === portfolio.id && (
              <div className="portfolio-expanded">
                {/* Full Skills List */}
                <div className="expanded-section">
                  <h4>All Skills</h4>
                  <div className="skills-list">
                    {portfolio.skills?.map(skill => (
                      <div key={skill.id} className="skill-item">
                        <strong>{skill.name}</strong>
                        <span className="skill-level">{skill.level}</span>
                        <p className="skill-desc">{skill.description}</p>
                        <div className="tech-tags">
                          {skill.relatedTechnologies?.map(tech => (
                            <span key={tech} className="tech-tag">{tech}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Full Certifications List */}
                <div className="expanded-section">
                  <h4>All Certifications</h4>
                  <div className="cert-list">
                    {portfolio.certifications?.map(cert => (
                      <div key={cert.id} className="cert-item">
                        <strong>{cert.name}</strong>
                        <span className="cert-provider">{cert.provider}</span>
                        <p className="cert-desc">{cert.description}</p>
                        <div className="cert-details">
                          <span>Validity: {cert.validityPeriod}</span>
                          <span>Category: {cert.category}</span>
                        </div>
                        {cert.autoSelectedForSkill && (
                          <div className="auto-select-info">
                            ✅ Auto-selected with relevant skills
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Use Cases */}
                {portfolio.useCases && (
                  <div className="expanded-section">
                    <h4>Use Cases</h4>
                    <ul className="use-cases">
                      {portfolio.useCases.map((useCase, index) => (
                        <li key={index}>{useCase}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Case Studies */}
                {portfolio.caseStudies && portfolio.caseStudies.length > 0 && (
                  <div className="expanded-section">
                    <h4>Case Studies</h4>
                    {portfolio.caseStudies.map((study, index) => (
                      <div key={index} className="case-study">
                        <h5>{study.client} - {study.industry}</h5>
                        <p><strong>Challenge:</strong> {study.challenge}</p>
                        <p><strong>Solution:</strong> {study.solution}</p>
                        <p><strong>Results:</strong> {study.results}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Technologies */}
                {portfolio.technologies && (
                  <div className="expanded-section">
                    <h4>Technologies</h4>
                    <div className="tech-tags">
                      {portfolio.technologies.map(tech => (
                        <span key={tech} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="portfolio-actions">
              <button
                className="btn-expand"
                onClick={() => toggleExpand(portfolio.id)}
              >
                {expandedPortfolio === portfolio.id ? '▲ Show Less' : '▼ Show Details'}
              </button>
              <button
                className="btn-buy-request"
                onClick={() => handleBuyRequest(portfolio)}
              >
                🛒 Place Buy Request
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Buy Request Form Modal */}
      {showBuyRequestForm && selectedPortfolio && (
        <BuyRequestForm
          portfolio={selectedPortfolio}
          onClose={handleCloseBuyRequest}
          onSuccess={handleBuyRequestSuccess}
        />
      )}

      {/* Order Workflow Modal */}
      {showOrderWorkflow && createdOrderId && (
        <OrderWorkflowPage
          orderId={createdOrderId}
          onClose={handleCloseOrderWorkflow}
        />
      )}
    </div>
  );
}

export default PortfolioPageNew;
