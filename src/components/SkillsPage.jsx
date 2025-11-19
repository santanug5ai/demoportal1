import React, { useState, useEffect } from 'react';
import staticDataService from '../services/staticDataService';
import './CommonPage.css';

const SkillsPage = () => {
  const [skills, setSkills] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Technical', 'Domain', 'Soft Skills'];

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await staticDataService.getSkills();
        setSkills(data);
        setFilteredSkills(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching skills:', error);
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredSkills(skills);
    } else {
      const filtered = skills.filter(s => s.category === category);
      setFilteredSkills(filtered);
    }
  };

  if (loading) {
    return <div className="page-loading">Loading skills...</div>;
  }

  return (
    <div className="common-page">
      <div className="page-header">
        <h1>⚡ TCS Skills & Expertise</h1>
        <p>Our comprehensive skill portfolio across technologies and domains</p>
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
        {filteredSkills.map(skill => (
          <div key={skill.id} className="item-card skill-card">
            <div className="item-header">
              <span className="item-category">{skill.category}</span>
              <span className={`demand-badge ${skill.demandLevel.toLowerCase()}`}>
                {skill.demandLevel} Demand
              </span>
            </div>

            <h3 className="item-title">{skill.name}</h3>

            <div className="skill-level">
              <span className="level-label">Expertise Level:</span>
              <span className={`level-badge ${skill.level.toLowerCase()}`}>
                {skill.level}
              </span>
            </div>

            <p className="item-description">{skill.description}</p>

            {skill.relatedTechnologies && (
              <div className="tech-tags">
                <h4>Technologies:</h4>
                <div className="tags-container">
                  {skill.relatedTechnologies.map((tech, idx) => (
                    <span key={idx} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredSkills.length === 0 && (
        <div className="no-results">
          <p>No skills found for this category.</p>
        </div>
      )}
    </div>
  );
};

export default SkillsPage;
