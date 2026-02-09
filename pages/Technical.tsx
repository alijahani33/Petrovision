import React from 'react';
import { CONTRACTORS } from '../data/mockData';
import { MapPin, HardHat, Activity, Radar, Zap } from 'lucide-react';

export const Technical: React.FC = () => {
  // SVG Configuration
  const radius = 70;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="flex flex-col h-full p-4 md:p-8 gap-8 overflow-y-auto custom-scrollbar">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-glassBorder pb-6">
        <div>
           <h2 className="text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
             <Radar className="w-8 h-8 text-primary animate-spin-slow" />
             کنترل پروژه و عملیات فنی
           </h2>
           <p className="text-gray-500 font-mono text-xs tracking-wider">PROJECT EXECUTION & TECHNICAL OPERATIONS</p>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
           <div className="flex items-center gap-2 text-xs text-emeraldGreen bg-emeraldGreen/10 px-3 py-1.5 rounded-lg border border-emeraldGreen/20 shadow-[0_0_10px_rgba(0,255,148,0.2)]">
              <span className="w-2 h-2 bg-emeraldGreen rounded-full animate-pulse"></span>
              ۲ پروژه فعال
           </div>
           <div className="flex items-center gap-2 text-xs text-alertRed bg-alertRed/10 px-3 py-1.5 rounded-lg border border-alertRed/20">
              <span className="w-2 h-2 bg-alertRed rounded-full"></span>
              ۱ پروژه متوقف
           </div>
        </div>
      </div>
      
      {/* Site Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {CONTRACTORS.map(contractor => {
          // Calculate offset based on progress
          const strokeDashoffset = circumference - (contractor.progress / 100) * circumference;
          const statusColor = contractor.status === 'Active' ? '#00FF94' : contractor.status === 'Halted' ? '#FF003C' : '#FFB800';
          const statusTextClass = contractor.status === 'Active' ? 'text-emeraldGreen' : contractor.status === 'Halted' ? 'text-alertRed' : 'text-neonAmber';
          
          return (
            <div key={contractor.id} className="glass-panel rounded-3xl overflow-hidden flex flex-col group relative transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] hover:border-primary/40 hover:-translate-y-1">
              
              {/* Top Section: Progress Chart */}
              <div className="p-6 relative flex flex-col items-center">
                 {/* Status Badge */}
                 <div className="absolute top-4 right-4">
                    <div className={`px-2 py-1 rounded text-[10px] font-bold border bg-opacity-10 border-opacity-20 ${statusTextClass.replace('text-', 'bg-')} ${statusTextClass.replace('text-', 'border-')} ${statusTextClass}`}>
                      {contractor.status === 'Active' ? 'فعال' : contractor.status === 'Halted' ? 'متوقف' : 'بازبینی'}
                    </div>
                 </div>

                 {/* Corrected Circular Progress SVG */}
                 <div className="relative w-48 h-48 my-2">
                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-primary/5 rounded-full blur-2xl transform scale-75"></div>
                    
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 180 180">
                       {/* Track */}
                       <circle
                          cx="90" cy="90" r={radius}
                          fill="none"
                          stroke="#1a1f2e"
                          strokeWidth="12"
                       />
                       {/* Progress Indicator */}
                       <circle
                          cx="90" cy="90" r={radius}
                          fill="none"
                          stroke={statusColor}
                          strokeWidth="12"
                          strokeDasharray={circumference}
                          strokeDashoffset={strokeDashoffset}
                          strokeLinecap="round"
                          className="transition-all duration-1000 ease-out"
                          style={{ filter: `drop-shadow(0 0 8px ${statusColor})` }}
                       />
                    </svg>
                    
                    {/* Center Info */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                       <span className="text-4xl font-mono font-bold text-white tracking-tighter drop-shadow-md">{contractor.progress}%</span>
                       <span className="text-[9px] text-gray-400 uppercase tracking-widest mt-1">پیشرفت</span>
                    </div>
                 </div>

                 <div className="text-center w-full mt-2">
                    <h3 className="text-white font-bold text-lg truncate px-2">{contractor.name}</h3>
                    <div className="flex items-center justify-center text-gray-500 text-xs gap-1 font-mono mt-1">
                       <MapPin className="w-3 h-3 text-primary" />
                       {contractor.workshopLocation}
                    </div>
                 </div>
              </div>

              {/* Middle: Timeline / Tasks */}
              <div className="flex-1 bg-black/40 border-t border-white/5 p-5 relative overflow-hidden">
                 {/* Decorative line */}
                 <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary/20 to-transparent"></div>
                 
                 <h4 className="text-[10px] text-gray-400 font-bold mb-4 flex items-center gap-2 uppercase tracking-wider">
                    <Activity className="w-3 h-3 text-primary" />
                    فعالیت‌های اخیر
                 </h4>
                 
                 <div className="space-y-4">
                    {contractor.recentTasks.map((task) => (
                       <div key={task.id} className="flex gap-3 group/task">
                          <div className="mt-1 flex flex-col items-center">
                             <div className={`w-2 h-2 rounded-full ${
                                task.status === 'Completed' ? 'bg-primary shadow-[0_0_8px_#00F0FF]' :
                                task.status === 'In Progress' ? 'bg-neonAmber animate-pulse' :
                                'bg-gray-700'
                             }`}></div>
                             <div className="w-0.5 h-full bg-white/5 mt-1 group-last/task:hidden"></div>
                          </div>
                          <div className="flex-1 pb-1">
                             <div className="flex justify-between items-start">
                                <span className="text-xs text-gray-300 font-medium leading-tight group-hover/task:text-white transition-colors">
                                   {task.title}
                                </span>
                             </div>
                             <div className="flex justify-between items-center mt-1">
                                <span className="text-[10px] text-gray-600 font-mono">{task.date}</span>
                                {task.progressAdded > 0 && (
                                   <span className="text-[9px] text-emeraldGreen font-mono bg-emeraldGreen/10 px-1 rounded">+{task.progressAdded}%</span>
                                )}
                             </div>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

              {/* Bottom: Supervisor */}
              <div className="p-4 bg-white/5 border-t border-white/5 flex items-center justify-between backdrop-blur-sm">
                 <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-gray-800 to-black rounded-xl border border-white/10 shadow-inner">
                       <HardHat className="w-4 h-4 text-gray-300" />
                    </div>
                    <div>
                       <div className="text-[9px] text-gray-500 font-bold tracking-wider">سرپرست کارگاه</div>
                       <div className="text-xs font-bold text-white">{contractor.supervisor}</div>
                    </div>
                 </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Enhanced Satellite Map Visualization */}
      <div className="glass-panel rounded-3xl p-1 relative overflow-hidden h-[350px] group border-primary/20">
         {/* Real Satellite Image Background */}
         <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] ease-linear group-hover:scale-105"
         
         ></div>
         
         {/* Tactical Grid Overlay */}
         <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
         <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/50"></div>

         {/* Scanning Effect */}
         <div className="absolute top-0 left-0 w-full h-1 bg-primary/30 shadow-[0_0_20px_#00F0FF] animate-scan opacity-40"></div>

         {/* UI Overlays */}
         <div className="absolute top-6 left-6 z-10" dir="ltr">
             <div className="flex items-center gap-2 mb-1">
                <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_#FF003C]"></span>
                <h3 className="text-xl font-bold text-white tracking-widest font-sans">فید زنده ماهواره‌ای</h3>
             </div>
             <p className="text-xs text-primary font-mono">LAT: 29.5926 N | LNG: 52.5836 E | ZOOM: 18x</p>
         </div>

         {/* Map Markers (Simulated) */}
         <div className="absolute top-1/3 left-1/4 group/marker cursor-pointer">
            <div className="relative flex items-center justify-center">
               <div className="w-4 h-4 bg-emeraldGreen rounded-full border-2 border-white animate-ping absolute opacity-75"></div>
               <div className="w-4 h-4 bg-emeraldGreen rounded-full border-2 border-white relative z-10 shadow-[0_0_15px_#00FF94]"></div>
               {/* Tooltip */}
               <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/80 backdrop-blur border border-emeraldGreen/50 px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover/marker:opacity-100 transition-opacity">
                  <div className="text-white font-bold text-xs">سایت A: اتیلن غرب</div>
                  <div className="text-emeraldGreen text-[10px] font-mono">فعال - ۸۲٪</div>
               </div>
            </div>
         </div>

         <div className="absolute bottom-1/3 right-1/4 group/marker cursor-pointer">
            <div className="relative flex items-center justify-center">
               <div className="w-4 h-4 bg-neonAmber rounded-full border-2 border-white animate-pulse relative z-10 shadow-[0_0_15px_#FFB800]"></div>
               <div className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/80 backdrop-blur border border-neonAmber/50 px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover/marker:opacity-100 transition-opacity text-right">
                  <div className="text-white font-bold text-xs">سایت B: مخازن</div>
                  <div className="text-neonAmber text-[10px] font-mono">بازبینی - ۴۵٪</div>
               </div>
            </div>
         </div>

         <div className="absolute top-1/2 right-1/3 group/marker cursor-pointer">
             <div className="w-3 h-3 bg-white/50 rounded-full border border-white"></div>
         </div>

         {/* Bottom Status Bar */}
         <div className="absolute bottom-6 right-6 z-10 flex flex-col items-end">
             <div className="flex gap-1 mb-2">
                {[1,2,3,4,5].map(i => (
                   <div key={i} className={`w-8 h-1 rounded-full ${i <= 4 ? 'bg-primary' : 'bg-gray-700'}`}></div>
                ))}
             </div>
             <div className="flex items-center gap-2 text-xs font-mono text-gray-300 bg-black/60 px-3 py-1 rounded-full border border-white/10" dir="ltr">
                <Zap className="w-3 h-3 text-yellow-400" />
                سیگنال: 98%
             </div>
         </div>
      </div>
    </div>
  );
};