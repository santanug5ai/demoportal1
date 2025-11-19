import React, { useState, useEffect } from 'react';
import staticDataService from '../services/staticDataService';
import './CommonPage.css';

const CertificationsPage = () => {
  const [certifications, setCertifications] = useState([]);
  const [filteredCertifications, setFilteredCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedId, setExpandedId] = useState(null);

  const categories = ['All', 'Cloud', 'DevOps', 'AI/ML', 'Security', 'Management', 'ERP', 'Data Analytics'];

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const data = await staticDataService.getCertifications();
        setCertifications(data);
        setFilteredCertifications(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching certifications:', error);
        setLoading(false);
      }
    };
    fetchCertifications();
  }, []);

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredCertifications(certifications);
    } else {
      const filtered = certifications.filter(c =>
        c.category.toLowerCase().includes(category.toLowerCase())
      );
      setFilteredCertifications(filtered);
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (loading) {
    return <div className="page-loading">Loading certifications...</div>;
  }

  return (
    <div className="common-page">
      <div className="page-header">
        <h1>🎓 TCS Certifications & Training</h1>
        <p>Professional certifications and training programs across various technologies</p>
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

      <div className="items-grid">
        {filteredCertifications.map(cert => (
          <div key={cert.id} className="item-card cert-card">
            <div className="item-header">
              <span className="item-category">{cert.category}</span>
              <span className="validity-badge">{cert.validityPeriod}</span>
            </div>

            <h3 className="item-title">{cert.name}</h3>
            <p className="provider-name">by {cert.provider}</p>
            <p className="item-description">{cert.description}</p>

            {expandedId === cert.id && (
              <div className="expanded-details">
                {cert.prerequisites && cert.prerequisites.length > 0 && (
                  <div className="detail-section">
                    <h4>Prerequisites:</h4>
                    <ul>
                      {cert.prerequisites.map((prereq, idx) => (
                        <li key={idx}>{prereq}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {cert.benefits && cert.benefits.length > 0 && (
                  <div className="detail-section">
                    <h4>Benefits:</h4>
                    <ul>
                      {cert.benefits.map((benefit, idx) => (
                        <li key={idx}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            <button
              className="expand-btn"
              onClick={() => toggleExpand(cert.id)}
            >
              {expandedId === cert.id ? 'Show Less ▲' : 'View Details ▼'}
            </button>
          </div>
        ))}
      </div>

      {filteredCertifications.length === 0 && (
        <div className="no-results">
          <p>No certifications found for this category.</p>
        </div>
      )}
    </div>
  );
};

export default CertificationsPage;
