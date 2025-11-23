import React, { useState, useEffect } from 'react';
import staticDataService from './services/staticDataService';
import Header from './components/Header';
import Sidebar from './components/SidebarNew';
import Dashboard from './components/Dashboard';
import PortfolioPageNew from './components/PortfolioPageNew';
import EngagementsPageNew from './components/EngagementsPageNew';
import BuyRequestsPage from './components/BuyRequestsPage';
import IncubationPage from './components/IncubationPage';
import FloatingChatBot from './components/FloatingChatBot';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState('dashboard');
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
          {activeView === 'dashboard' && <Dashboard stats={stats} />}
          {activeView === 'portfolio' && <PortfolioPageNew />}
          {activeView === 'buy-requests' && <BuyRequestsPage />}
          {activeView === 'engagements' && <EngagementsPageNew />}
          {activeView === 'incubation' && <IncubationPage />}
          <Footer onNavigate={setActiveView} />
        </main>
      </div>
      <FloatingChatBot onNavigate={setActiveView} />
    </div>
  );
}

export default App;
