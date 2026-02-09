import React from 'react';
import { Network, Users, FileText, Wrench, Activity, X } from 'lucide-react';
import { Page } from '../types';

interface SidebarProps {
  currentPage: Page;
  setPage: (page: Page) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, setPage, isOpen, onClose }) => {
  const menuItems = [
    { id: Page.IT_INFRASTRUCTURE, label: 'مرکز فرماندهی IT', icon: Network },
    { id: Page.HUMAN_RESOURCES, label: 'سرمایه انسانی', icon: Users },
    { id: Page.CONTRACTS, label: 'مدیریت کلان پیمان‌ها', icon: FileText },
    { id: Page.TECHNICAL, label: 'کنترل پروژه فنی', icon: Wrench },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sidebar Container */}
      <div className={`fixed top-0 right-0 h-full w-72 bg-card border-l border-border flex flex-col p-6 z-50 transition-transform duration-300 transform md:relative md:translate-x-0 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Mobile Close Button */}
        <button onClick={onClose} className="absolute top-4 left-4 p-2 text-gray-400 md:hidden hover:text-white">
          <X className="w-6 h-6" />
        </button>

        {/* Logo Area */}
        <div className="flex items-center gap-4 mb-12 px-2 text-primary">
          <div className="relative">
             <div className="absolute inset-0 bg-primary blur-md opacity-50 animate-pulse"></div>
             <Activity className="w-10 h-10 relative z-10" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tighter text-white">پترو<span className="text-primary">ویژن</span></h1>
            <span className="text-[10px] tracking-widest text-muted-foreground block">پنل مدیریت ارشد</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-3">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setPage(item.id);
                onClose(); // Close drawer on mobile selection
              }}
              className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300 group relative overflow-hidden
                ${currentPage === item.id 
                  ? 'bg-primary/10 border-r-2 border-primary text-primary' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                }`}
            >
              {currentPage === item.id && (
                <div className="absolute inset-0 bg-primary/5 animate-pulse"></div>
              )}
              <item.icon className={`w-5 h-5 transition-transform duration-500 ${currentPage === item.id ? 'text-primary scale-110' : 'group-hover:text-primary'}`} />
              <span className="font-bold text-sm tracking-wide">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer Status */}
        <div className="mt-auto pt-6 border-t border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] text-muted-foreground font-bold">وضعیت سیستم</span>
            <span className="flex items-center gap-1.5 text-[10px] text-emeraldGreen font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emeraldGreen animate-pulse"></span>
              پایدار
            </span>
          </div>
          <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-primary w-[98%] animate-pulse"></div>
          </div>
          <div className="text-[10px] text-muted-foreground mt-2 font-mono text-left opacity-50" dir="ltr">v2.4.0-RC</div>
        </div>
      </div>
    </>
  );
};