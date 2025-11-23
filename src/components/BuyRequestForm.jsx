import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BuyRequestForm.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function BuyRequestForm({ portfolio, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    portfolioId: portfolio.id,
    requestedBy: '',
    selectedSkills: [],
    quantity: 1,
    duration: '3 months',
    budget: '',
    businessJustification: '',
    priority: 'Medium'
  });

  const [autoSelectedCertifications, setAutoSelectedCertifications] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Auto-select certifications based on selected skills
  useEffect(() => {
    if (formData.selectedSkills.length > 0) {
      const autoCerts = [];
      portfolio.certifications?.forEach(cert => {
        if (cert.autoSelectedForSkill &&
            cert.autoSelectedForSkill.some(skillId => formData.selectedSkills.includes(skillId))) {
          if (!autoCerts.includes(cert.id)) {
            autoCerts.push(cert.id);
          }
        }
      });
      setAutoSelectedCertifications(autoCerts);
    } else {
      setAutoSelectedCertifications([]);
    }
  }, [formData.selectedSkills, portfolio.certifications]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSkillToggle = (skillId) => {
    setFormData(prev => ({
      ...prev,
      selectedSkills: prev.selectedSkills.includes(skillId)
        ? prev.selectedSkills.filter(id => id !== skillId)
        : [...prev.selectedSkills, skillId]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.selectedSkills.length === 0) {
      setError('Please select at least one skill');
      return;
    }

    if (!formData.requestedBy.trim()) {
      setError('Please enter your name');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/buy-requests`, {
        ...formData,
        autoSelectedCertifications
      });

      onSuccess(response.data);
    } catch (err) {
      console.error('Error submitting buy request:', err);
      setError('Failed to submit buy request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const getCertificationsBySkillId = (skillId) => {
    return portfolio.certifications?.filter(cert =>
      cert.autoSelectedForSkill && cert.autoSelectedForSkill.includes(skillId)
    ) || [];
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content buy-request-form" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>🛒 Place Buy Request</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="portfolio-summary">
          <h3>{portfolio.title}</h3>
          <span className="category-badge">{portfolio.category}</span>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Requestor Name */}
          <div className="form-group">
            <label htmlFor="requestedBy">
              Your Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="requestedBy"
              name="requestedBy"
              value={formData.requestedBy}
              onChange={handleInputChange}
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Select Skills */}
          <div className="form-group">
            <label>
              Select Skills <span className="required">*</span>
            </label>
            <p className="help-text">
              Choose the skills you need. Certifications will be automatically selected.
            </p>
            <div className="skills-selection">
              {portfolio.skills?.map(skill => {
                const isSelected = formData.selectedSkills.includes(skill.id);
                const relatedCerts = getCertificationsBySkillId(skill.id);

                return (
                  <div key={skill.id} className="skill-checkbox-item">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSkillToggle(skill.id)}
                      />
                      <div className="skill-info">
                        <strong>{skill.name}</strong>
                        <span className="skill-level">{skill.level}</span>
                        <p className="skill-desc">{skill.description}</p>
                        {relatedCerts.length > 0 && (
                          <div className="auto-cert-info">
                            ✅ Auto-selects: {relatedCerts.map(c => c.name).join(', ')}
                          </div>
                        )}
                      </div>
                    </label>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Auto-Selected Certifications */}
          {autoSelectedCertifications.length > 0 && (
            <div className="form-group auto-selected-section">
              <label>🎓 Auto-Selected Certifications</label>
              <div className="cert-list-readonly">
                {autoSelectedCertifications.map(certId => {
                  const cert = portfolio.certifications?.find(c => c.id === certId);
                  return cert ? (
                    <div key={cert.id} className="cert-item-readonly">
                      <strong>{cert.name}</strong>
                      <span className="cert-provider">{cert.provider}</span>
                      <span className="cert-validity">{cert.validityPeriod}</span>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="quantity">Quantity (Resources)</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                max="100"
                value={formData.quantity}
                onChange={handleInputChange}
              />
            </div>

            {/* Duration */}
            <div className="form-group">
              <label htmlFor="duration">Duration</label>
              <select
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
              >
                <option value="1 month">1 month</option>
                <option value="3 months">3 months</option>
                <option value="6 months">6 months</option>
                <option value="12 months">12 months</option>
                <option value="18 months">18 months</option>
                <option value="24 months">24 months</option>
              </select>
            </div>
          </div>

          {/* Budget */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="budget">Estimated Budget (USD)</label>
              <input
                type="number"
                id="budget"
                name="budget"
                min="0"
                step="1000"
                value={formData.budget}
                onChange={handleInputChange}
                placeholder="e.g., 100000"
              />
            </div>

            {/* Priority */}
            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
          </div>

          {/* Business Justification */}
          <div className="form-group">
            <label htmlFor="businessJustification">Business Justification</label>
            <textarea
              id="businessJustification"
              name="businessJustification"
              rows="4"
              value={formData.businessJustification}
              onChange={handleInputChange}
              placeholder="Explain the business need for this request..."
            />
          </div>

          {/* Workflow Info */}
          <div className="workflow-info">
            <h4>📋 Workflow Process</h4>
            <div className="workflow-steps">
              <div className="workflow-step">1. Draft</div>
              <div className="workflow-arrow">→</div>
              <div className="workflow-step">2. Pending Approval</div>
              <div className="workflow-arrow">→</div>
              <div className="workflow-step">3. Approved</div>
              <div className="workflow-arrow">→</div>
              <div className="workflow-step">4. In Fulfillment</div>
              <div className="workflow-arrow">→</div>
              <div className="workflow-step">5. Fulfilled</div>
            </div>
            <p className="workflow-note">
              Your request will start as "Draft" and move through approval workflow.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="error-message">{error}</div>
          )}

          {/* Form Actions */}
          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn-submit"
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Submit Buy Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BuyRequestForm;
