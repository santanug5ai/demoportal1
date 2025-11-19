import React, { useState, useEffect } from 'react';
import staticDataService from './services/staticDataService';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import Dashboard from './components/Dashboard';
import PortfolioPage from './components/PortfolioPage';
import SkillsPage from './components/SkillsPage';
import CertificationsPage from './components/CertificationsPage';
import EngagementsPage from './components/EngagementsPage';
import IncubationPage from './components/IncubationPage';
import ProjectsPage from './components/ProjectsPage';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState('chat');
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // Fetch initial statistics
    const fetchStats = async () => {
      try {
        const data = await staticDataService.getStatistics();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="app">
      <Header />
      <div className="app-container">
        <Sidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          activeView={activeView}
          onViewChange={setActiveView}
          stats={stats}
        />
        <main className={`main-content ${!sidebarOpen ? 'sidebar-closed' : ''}`}>
          {activeView === 'chat' && <ChatInterface />}
          {activeView === 'dashboard' && <Dashboard stats={stats} />}
          {activeView === 'portfolio' && <PortfolioPage />}
          {activeView === 'skills' && <SkillsPage />}
          {activeView === 'certifications' && <CertificationsPage />}
          {activeView === 'engagements' && <EngagementsPage />}
          {activeView === 'incubation' && <IncubationPage />}
          {activeView === 'projects' && <ProjectsPage />}
          <Footer />
        </main>
      </div>
    </div>
  );
}

export default App;
