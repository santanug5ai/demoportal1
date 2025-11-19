import React, { useState, useEffect } from 'react';
import staticDataService from '../services/staticDataService';
import './PortfolioPage.css';

const PortfolioPage = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [filteredPortfolios, setFilteredPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedId, setExpandedId] = useState(null);

  const categories = ['All', 'AI/ML', 'Cloud', 'Blockchain', 'IoT', 'Security', 'Data Analytics', 'DevOps', 'Mobile', 'Automation'];

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const data = await staticDataService.getPortfolio();
        setPortfolios(data);
        setFilteredPortfolios(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching portfolios:', error);
        setLoading(false);
      }
    };
    fetchPortfolios();
  }, []);

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredPortfolios(portfolios);
    } else {
      const filtered = portfolios.filter(p =>
        p.category.toLowerCase().includes(category.toLowerCase())
      );
      setFilteredPortfolios(filtered);
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (loading) {
    return <div className="page-loading">Loading portfolios...</div>;
  }

  return (
    <div className="portfolio-page">
      <div className="page-header">
        <h1>📊 TCS Portfolio & Solutions</h1>
        <p>Explore our comprehensive solutions with real-world case studies and TCS CMI implementations</p>
      </div>

      <div className="category-filters">
        {categories.map(category => (
          <button
            key={category}
            className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => handleCategoryFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="portfolio-grid">
        {filteredPortfolios.map(portfolio => (
          <div key={portfolio.id} className="portfolio-card">
            <div className="portfolio-header">
              <span className="portfolio-category">{portfolio.category}</span>
              <span className="portfolio-id">{portfolio.id}</span>
            </div>

            <h3 className="portfolio-title">{portfolio.title}</h3>
            <p className="portfolio-description">{portfolio.description}</p>

            <div className="portfolio-technologies">
              {portfolio.technologies.slice(0, 5).map((tech, idx) => (
                <span key={idx} className="tech-tag">{tech}</span>
              ))}
              {portfolio.technologies.length > 5 && (
                <span className="tech-tag more">+{portfolio.technologies.length - 5}</span>
              )}
            </div>

            <div className="portfolio-use-cases">
              <h4>Use Cases:</h4>
              <ul>
                {portfolio.useCases.slice(0, 2).map((useCase, idx) => (
                  <li key={idx}>{useCase}</li>
                ))}
              </ul>
            </div>

            {portfolio.caseStudies && portfolio.caseStudies.length > 0 && (
              <div className="case-study-preview">
                <h4>Featured Case Study:</h4>
                <p className="client-info">
                  <strong>{portfolio.caseStudies[0].client}</strong> - {portfolio.caseStudies[0].industry}
                </p>
                {expandedId === portfolio.id ? (
                  <div className="case-study-details">
                    <p><strong>Challenge:</strong> {portfolio.caseStudies[0].challenge}</p>
                    <p><strong>Solution:</strong> {portfolio.caseStudies[0].solution}</p>
                    <p className="results"><strong>Results:</strong> {portfolio.caseStudies[0].results}</p>
                  </div>
                ) : (
                  <p className="case-study-teaser">{portfolio.caseStudies[0].challenge.substring(0, 100)}...</p>
                )}
              </div>
            )}

            <button
              className="expand-btn"
              onClick={() => toggleExpand(portfolio.id)}
            >
              {expandedId === portfolio.id ? 'Show Less ▲' : 'View Full Case Study ▼'}
            </button>
          </div>
        ))}
      </div>

      {filteredPortfolios.length === 0 && (
        <div className="no-results">
          <p>No portfolios found for this category.</p>
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;
