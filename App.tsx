import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ITInfrastructure } from './pages/ITInfrastructure';
import { HumanResources } from './pages/HumanResources';
import { Contracts } from './pages/Contracts';
import { Technical } from './pages/Technical';
import { AIAssistant } from './components/AIAssistant';
import { Page } from './types';
import { Menu } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>(Page.IT_INFRASTRUCTURE);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case Page.IT_INFRASTRUCTURE:
        return <ITInfrastructure />;
      case Page.HUMAN_RESOURCES:
        return <HumanResources />;
      case Page.CONTRACTS:
        return <Contracts />;
      case Page.TECHNICAL:
        return <Technical />;
      default:
        return <ITInfrastructure />;
    }
  };

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden font-sans relative" dir="rtl">
      {/* Mobile Header */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-card/80 border-b border-border flex items-center justify-between px-4 md:hidden z-30 backdrop-blur-md">
         <h1 className="font-bold text-lg text-white">پترو<span className="text-primary">ویژن</span></h1>
         <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-white">
           <Menu className="w-6 h-6" />
         </button>
      </div>

      {/* Sidebar Navigation */}
      <Sidebar 
        currentPage={currentPage} 
        setPage={setCurrentPage} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <main className="flex-1 relative bg-background w-full pt-16 md:pt-0">
        {/* Futuristic Background Elements */}
        <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none"></div>
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[128px] pointer-events-none"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[128px] pointer-events-none"></div>

        {/* Content Container */}
        <div className="relative z-10 h-full overflow-hidden">
          {renderPage()}
        </div>
      </main>

      {/* AI Assistant Overlay */}
      <AIAssistant />
    </div>
  );
}

export default App;