import React, { useState } from 'react';
import { EMPLOYEES } from '../data/mockData';
import { Users, Briefcase, Search, Filter } from 'lucide-react';

const UNITS = ['IT', 'HR', 'Technical', 'Finance', 'Logistics'];

export const HumanResources: React.FC = () => {
  const [selectedUnit, setSelectedUnit] = useState<string | null>('IT');

  const filteredEmployees = selectedUnit 
    ? EMPLOYEES.filter(e => e.unit === selectedUnit)
    : [];

  return (
    <div className="flex flex-col h-full p-4 md:p-8 gap-6 overflow-hidden">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-panel p-6 rounded-2xl flex items-center justify-between relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1 bg-primary"></div>
          <div>
            <div className="text-gray-400 text-xs font-bold tracking-widest mb-1">کل پرسنل</div>
            <div className="text-3xl font-mono font-bold text-white">2,543</div>
          </div>
          <Users className="w-8 h-8 text-primary opacity-50" />
        </div>

        <div className="glass-panel p-6 rounded-2xl flex items-center justify-between relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1 bg-emeraldGreen"></div>
          <div>
            <div className="text-gray-400 text-xs font-bold tracking-widest mb-1">حاضرین امروز</div>
            <div className="text-3xl font-mono font-bold text-white">2,410</div>
          </div>
          <div className="w-8 h-8 rounded-full border-2 border-emeraldGreen flex items-center justify-center text-emeraldGreen text-xs font-bold">95%</div>
        </div>

        <div className="glass-panel p-6 rounded-2xl flex items-center justify-between relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1 bg-neonAmber"></div>
          <div>
            <div className="text-gray-400 text-xs font-bold tracking-widest mb-1">مرخصی / ماموریت</div>
            <div className="text-3xl font-mono font-bold text-white">133</div>
          </div>
          <Briefcase className="w-8 h-8 text-neonAmber opacity-50" />
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
        
        {/* Sidebar / Filters (Top on Mobile, Side on Desktop) */}
        <div className="col-span-1 lg:col-span-3 glass-panel rounded-2xl p-4 flex flex-col h-full overflow-hidden">
          <div className="flex items-center gap-2 mb-6 px-2 text-white font-bold border-b border-gray-800 pb-4">
            <Filter className="w-4 h-4 text-primary" />
            دپارتمان‌ها
          </div>
          <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar">
            {UNITS.map(unit => (
              <button
                key={unit}
                onClick={() => setSelectedUnit(unit)}
                className={`w-full flex items-center justify-between p-4 rounded-xl transition-all border group ${
                  selectedUnit === unit 
                    ? 'bg-primary/10 border-primary/50 text-white shadow-[0_0_20px_rgba(0,240,255,0.15)]' 
                    : 'bg-transparent border-transparent text-gray-500 hover:bg-white/5 hover:text-gray-300'
                }`}
              >
                <span className="font-medium text-sm">{unit === 'IT' ? 'فناوری اطلاعات' : unit === 'HR' ? 'منابع انسانی' : unit === 'Technical' ? 'فنی و مهندسی' : unit === 'Finance' ? 'مالی' : 'لجستیک'}</span>
                {selectedUnit === unit && <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>}
              </button>
            ))}
          </div>
        </div>

        {/* List View */}
        <div className="col-span-1 lg:col-span-9 glass-panel rounded-2xl overflow-hidden flex flex-col h-full relative">
          {/* List Header */}
          <div className="p-6 border-b border-white/5 bg-black/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
             <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                   <span className="w-2 h-6 bg-primary rounded-sm"></span>
                   پرسنل واحد: {selectedUnit === 'IT' ? 'فناوری اطلاعات' : selectedUnit === 'HR' ? 'منابع انسانی' : selectedUnit}
                </h3>
             </div>
             <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="جستجو نام یا کد پرسنلی..." 
                  className="bg-black/40 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary w-full md:w-64"
                />
             </div>
          </div>

          {/* List Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
             {filteredEmployees.map(emp => (
               <div key={emp.id} className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-white/5 to-transparent border border-white/5 hover:border-primary/30 transition-all group">
                 <div className="flex items-center gap-4">
                    <div className="relative">
                       <img src={emp.avatar} alt={emp.name} className="w-12 h-12 rounded-xl object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                       <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emeraldGreen rounded-full border-2 border-black"></div>
                    </div>
                    <div>
                      <h4 className="text-white font-bold">{emp.name}</h4>
                      <p className="text-xs text-primary mt-1">{emp.role}</p>
                    </div>
                 </div>
                 
                 <div className="flex-1 border-t border-dashed border-gray-800 md:border-none my-2 md:my-0"></div>

                 <div className="flex items-center justify-between md:gap-8">
                    <div className="text-right md:text-left">
                       <div className="text-[10px] text-gray-500">تاریخ استخدام</div>
                       <div className="text-xs text-gray-300 font-mono">1398/05/20</div>
                    </div>
                    <div className="px-3 py-1.5 bg-black/40 rounded-lg text-xs font-mono text-gray-400 border border-white/5 group-hover:text-white group-hover:border-primary/50 transition-colors">
                      ID: {emp.id}
                    </div>
                 </div>
               </div>
             ))}
          </div>
        </div>

      </div>
    </div>
  );
};