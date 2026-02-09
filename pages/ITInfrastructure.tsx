import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from 'recharts';
import { Wifi, Globe, Server, ShieldCheck, Activity, Eye, AlertTriangle, Cpu, Radio } from 'lucide-react';

const networkData = Array.from({ length: 30 }, (_, i) => ({
  time: i,
  speed: Math.floor(Math.random() * 200) + 800, // 800-1000 Mbps
  latency: Math.floor(Math.random() * 10) + 20, // 20-30ms
}));

const cpuData = Array.from({ length: 20 }, (_, i) => ({
  time: i,
  load: Math.floor(Math.random() * 30) + 40,
}));

export const ITInfrastructure: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 h-full p-4 md:p-8 overflow-y-auto">
      
      {/* Header Stat Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Stat Card 1: Internet */}
        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Globe className="w-24 h-24 text-primary" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2 text-primary">
              <Wifi className="w-4 h-4" />
              <span className="text-xs font-bold tracking-widest">پهنای باند اینترنت</span>
            </div>
            <div className="text-4xl font-mono font-bold text-white mb-1">10<span className="text-lg text-gray-500">Gbps</span></div>
            <div className="flex items-center gap-2 text-[10px] text-emeraldGreen">
              <span className="w-2 h-2 rounded-full bg-emeraldGreen animate-pulse"></span>
              لینک فیبر نوری متصل
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-transparent opacity-50"></div>
        </div>

        {/* Stat Card 2: Server Health */}
        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Server className="w-24 h-24 text-purple-500" />
          </div>
          <div className="relative z-10">
             <div className="flex items-center gap-2 mb-2 text-purple-400">
              <Cpu className="w-4 h-4" />
              <span className="text-xs font-bold tracking-widest">سامانه‌های مرکزی</span>
            </div>
            <div className="text-4xl font-mono font-bold text-white mb-1">99.9<span className="text-lg text-gray-500">%</span></div>
             <div className="text-[10px] text-gray-400">پایداری (Uptime) سالیانه</div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-transparent opacity-50"></div>
        </div>

         {/* Stat Card 3: Active Users */}
         <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Activity className="w-24 h-24 text-emeraldGreen" />
          </div>
          <div className="relative z-10">
             <div className="flex items-center gap-2 mb-2 text-emeraldGreen">
              <Radio className="w-4 h-4" />
              <span className="text-xs font-bold tracking-widest">نشست‌های فعال</span>
            </div>
            <div className="text-4xl font-mono font-bold text-white mb-1">1,248</div>
             <div className="text-[10px] text-gray-400">کاربران شبکه و VPN</div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emeraldGreen to-transparent opacity-50"></div>
        </div>

        {/* Stat Card 4: Security */}
        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group border-alertRed/30">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <ShieldCheck className="w-24 h-24 text-alertRed" />
          </div>
          <div className="relative z-10">
             <div className="flex items-center gap-2 mb-2 text-alertRed">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-xs font-bold tracking-widest">سطح تهدیدات</span>
            </div>
            <div className="text-4xl font-mono font-bold text-white mb-1">ایمن</div>
             <div className="text-[10px] text-gray-400">یکپارچگی فایروال: ۱۰۰٪</div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-alertRed to-transparent opacity-50"></div>
        </div>
      </div>

      {/* Main Dashboard Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-96">
        
        {/* Network Traffic Chart */}
        <div className="col-span-1 lg:col-span-2 glass-panel rounded-2xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-white font-bold flex items-center gap-2">
              <Activity className="text-primary" />
              ترافیک شبکه (لحظه‌ای)
            </h3>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-white/5 rounded text-xs text-gray-400">دانلود</span>
              <span className="px-2 py-1 bg-white/5 rounded text-xs text-gray-400">آپلود</span>
            </div>
          </div>
          <div className="flex-1 w-full min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={networkData}>
                <defs>
                  <linearGradient id="colorSpeed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00F0FF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00F0FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#050505', borderColor: '#333', color: '#fff', borderRadius: '8px', textAlign: 'right', fontFamily: 'Vazirmatn' }}
                  itemStyle={{ color: '#00F0FF' }}
                  labelStyle={{ display: 'none' }}
                  formatter={(value) => [`${value} مگابیت`, 'سرعت']}
                />
                <Area type="monotone" dataKey="speed" stroke="#00F0FF" strokeWidth={2} fillOpacity={1} fill="url(#colorSpeed)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CCTV Command Center Widget */}
        <div className="col-span-1 glass-panel rounded-2xl p-0 overflow-hidden flex flex-col relative">
           {/* Background Scanner Effect */}
           <div className="absolute inset-0 bg-[url('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3Z4eHR6b3Z4eHR6b3Z4eHR6b3Z4eHR6b3Z4eHR6b3Z4eHR6b3Z4eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKsH2YqK8G3v8He/giphy.gif')] opacity-5 bg-cover grayscale mix-blend-overlay"></div>
           
           <div className="p-6 relative z-10 h-full flex flex-col">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-white font-bold flex items-center gap-2">
                   <Eye className="text-emeraldGreen" />
                   وضعیت نظارت تصویری
                 </h3>
                 <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
              </div>

              {/* Central HUD Circle */}
              <div className="flex-1 flex items-center justify-center relative my-4">
                 {/* Outer Ring */}
                 <div className="w-48 h-48 rounded-full border-2 border-dashed border-gray-700 animate-[spin_10s_linear_infinite]"></div>
                 {/* Inner Ring */}
                 <div className="w-40 h-40 rounded-full border border-primary absolute opacity-30"></div>
                 {/* Data */}
                 <div className="absolute text-center">
                    <div className="text-5xl font-mono font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">88</div>
                    <div className="text-xs text-primary mt-1 tracking-widest">دوربین کل</div>
                 </div>
              </div>

              {/* Status Footer */}
              <div className="grid grid-cols-2 gap-4 mt-auto">
                 <div className="bg-emeraldGreen/10 border border-emeraldGreen/20 p-3 rounded-xl text-center">
                    <div className="text-2xl font-bold text-emeraldGreen">85</div>
                    <div className="text-[10px] text-gray-400">آنلاین</div>
                 </div>
                 <div className="bg-alertRed/10 border border-alertRed/20 p-3 rounded-xl text-center">
                    <div className="text-2xl font-bold text-alertRed">3</div>
                    <div className="text-[10px] text-gray-400">آفلاین</div>
                 </div>
              </div>
           </div>
        </div>

      </div>

      {/* Bottom Grid: Server Racks & Logs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-auto md:h-64">
        <div className="glass-panel rounded-2xl p-6">
           <h3 className="text-white font-bold mb-4 text-sm flex items-center gap-2">
             <Cpu className="w-4 h-4 text-purple-500"/>
             بار پردازشی سرورها (Load Balancer)
           </h3>
           <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={cpuData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                    <Line type="stepAfter" dataKey="load" stroke="#A855F7" strokeWidth={2} dot={false} />
                 </LineChart>
              </ResponsiveContainer>
           </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-scan opacity-20"></div>
           <h3 className="text-white font-bold mb-4 text-sm">لاگ سیستم امنیتی</h3>
           <div className="space-y-3 font-mono text-xs overflow-hidden" dir="ltr">
              <div className="flex justify-between text-gray-400 border-b border-gray-800 pb-1">
                 <span>10:42:15</span>
                 <span className="text-emeraldGreen">AUTH_SUCCESS</span>
                 <span>User: admin_root</span>
              </div>
              <div className="flex justify-between text-gray-400 border-b border-gray-800 pb-1">
                 <span>10:41:55</span>
                 <span className="text-emeraldGreen">SVC_RESTART</span>
                 <span>Service: nginx_proxy</span>
              </div>
              <div className="flex justify-between text-gray-400 border-b border-gray-800 pb-1">
                 <span>10:38:12</span>
                 <span className="text-neonAmber">PORT_SCAN</span>
                 <span>IP: 192.168.1.105</span>
              </div>
              <div className="flex justify-between text-gray-400 border-b border-gray-800 pb-1">
                 <span>10:35:00</span>
                 <span className="text-blue-400">BACKUP_DONE</span>
                 <span>db_finance_01</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};