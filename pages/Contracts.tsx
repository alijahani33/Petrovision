import React, { useMemo } from 'react';
import { CONTRACTS } from '../data/mockData';
import { AlertTriangle, TrendingUp, DollarSign, Briefcase, Calendar, ArrowUpRight } from 'lucide-react';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Cell } from 'recharts';

// Helper for formatting currency (Billions/Trillions)
const formatCurrency = (val: number) => {
  if (val >= 1000000000000) return (val / 1000000000000).toFixed(1) + ' همت';
  if (val >= 1000000000) return (val / 1000000000).toFixed(0) + ' میلیارد';
  return val.toLocaleString();
};

export const Contracts: React.FC = () => {
  // Aggregate Calculations
  const metrics = useMemo(() => {
    const totalBudget = CONTRACTS.reduce((acc, curr) => acc + curr.totalValue, 0);
    const totalPaid = CONTRACTS.reduce((acc, curr) => acc + curr.paidAmount, 0);
    const delayedContracts = CONTRACTS.filter(c => c.status === 'Delayed').length;
    const weightedProgress = CONTRACTS.reduce((acc, curr) => acc + (curr.progress * (curr.totalValue / totalBudget)), 0);

    return { totalBudget, totalPaid, delayedContracts, weightedProgress };
  }, []);

  // Prepare Data for Scatter Matrix (Value vs Progress)
  const scatterData = CONTRACTS.map(c => ({
    x: c.progress, // X-Axis: Progress
    y: c.totalValue, // Y-Axis: Value
    z: 100, // Bubble Size
    name: c.title,
    status: c.status,
    contractor: c.contractor
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-obsidian/90 border border-glassBorder p-3 rounded-xl shadow-xl backdrop-blur-md text-right">
          <p className="text-white font-bold text-sm mb-1">{data.name}</p>
          <p className="text-gray-400 text-xs mb-2">{data.contractor}</p>
          <div className="flex flex-col gap-1 text-xs font-mono">
             <span className="text-cyberBlue">پیشرفت: {data.x}%</span>
             <span className="text-emeraldGreen">ارزش: {formatCurrency(data.y)}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col h-full p-4 md:p-8 gap-6 overflow-y-auto custom-scrollbar">
      
      {/* 1. Top Executive KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
         {/* Total Budget */}
         <div className="glass-panel p-5 rounded-2xl relative overflow-hidden group">
            <div className="absolute right-0 top-0 p-3 opacity-10">
               <DollarSign className="w-16 h-16 text-white" />
            </div>
            <p className="text-gray-400 text-[10px] font-bold tracking-widest uppercase mb-1">ارزش کل پیمان‌ها</p>
            <h3 className="text-3xl font-mono font-bold text-white tracking-tight">
               {formatCurrency(metrics.totalBudget)} <span className="text-sm text-gray-500 font-sans">تومان</span>
            </h3>
            <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
               <div className="h-1.5 flex-1 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-white" style={{ width: '100%' }}></div>
               </div>
               <span>۱۰۰٪</span>
            </div>
         </div>

         {/* Payment Status */}
         <div className="glass-panel p-5 rounded-2xl relative overflow-hidden group">
             <div className="absolute right-0 top-0 p-3 opacity-10">
               <TrendingUp className="w-16 h-16 text-emeraldGreen" />
            </div>
            <p className="text-gray-400 text-[10px] font-bold tracking-widest uppercase mb-1">مجموع پرداخت‌شده</p>
            <h3 className="text-3xl font-mono font-bold text-emeraldGreen tracking-tight">
               {formatCurrency(metrics.totalPaid)}
            </h3>
            <div className="mt-3 flex items-center gap-2 text-xs text-emeraldGreen">
               <div className="h-1.5 flex-1 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emeraldGreen" style={{ width: `${(metrics.totalPaid / metrics.totalBudget) * 100}%` }}></div>
               </div>
               <span>{((metrics.totalPaid / metrics.totalBudget) * 100).toFixed(0)}%</span>
            </div>
         </div>

         {/* Weighted Progress */}
         <div className="glass-panel p-5 rounded-2xl relative overflow-hidden group">
            <div className="absolute right-0 top-0 p-3 opacity-10">
               <ArrowUpRight className="w-16 h-16 text-cyberBlue" />
            </div>
            <p className="text-gray-400 text-[10px] font-bold tracking-widest uppercase mb-1">پیشرفت فیزیکی وزنی</p>
            <h3 className="text-3xl font-mono font-bold text-cyberBlue tracking-tight">
               {metrics.weightedProgress.toFixed(1)}<span className="text-xl">%</span>
            </h3>
            <p className="text-[10px] text-gray-500 mt-2">بر اساس وزن ریالی قرارداد</p>
         </div>

         {/* Risk Alert */}
         <div className={`glass-panel p-5 rounded-2xl relative overflow-hidden group border ${metrics.delayedContracts > 0 ? 'border-alertRed/40' : 'border-gray-800'}`}>
            <div className="absolute inset-0 bg-alertRed/5 animate-pulse-slow"></div>
            <div className="absolute right-0 top-0 p-3 opacity-20">
               <AlertTriangle className="w-16 h-16 text-alertRed" />
            </div>
            <p className="text-gray-400 text-[10px] font-bold tracking-widest uppercase mb-1">وضعیت بحرانی</p>
            <h3 className="text-3xl font-mono font-bold text-alertRed tracking-tight">
               {metrics.delayedContracts}
            </h3>
            <p className="text-xs text-white mt-1">قرارداد دارای تاخیر</p>
         </div>
      </div>

      {/* 2. Strategic Matrix & Landscape */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[400px]">
         
         {/* The Matrix Chart */}
         <div className="col-span-1 lg:col-span-2 glass-panel rounded-2xl p-6 flex flex-col relative">
            <div className="flex justify-between items-center mb-4">
               <div>
                  <h3 className="text-white font-bold flex items-center gap-2">
                     <TrendingUp className="text-cyberBlue w-5 h-5" />
                     ماتریس استراتژیک پیمان‌ها
                  </h3>
                  <p className="text-[10px] text-gray-500 mt-1">تحلیل ارزش (محور عمودی) نسبت به پیشرفت (محور افقی)</p>
               </div>
               <div className="flex gap-4 text-[10px]">
                  <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emeraldGreen"></span>فعال</div>
                  <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-alertRed"></span>تاخیر</div>
               </div>
            </div>
            
            <div className="flex-1 w-full relative" dir="ltr">
               {/* Background Quadrants */}
               <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 pointer-events-none">
                  <div className="border-r border-b border-white/5 bg-alertRed/5 flex items-start justify-start p-2 text-[10px] text-alertRed font-bold opacity-50">ارزش بالا / ابتدای کار (ریسک)</div>
                  <div className="border-b border-white/5 bg-emeraldGreen/5 flex items-start justify-end p-2 text-[10px] text-emeraldGreen font-bold opacity-50">ارزش بالا / رو به اتمام</div>
                  <div className="border-r border-white/5 flex items-end justify-start p-2 text-[10px] text-gray-600 font-bold opacity-50">ارزش کم / ابتدای کار</div>
                  <div className="flex items-end justify-end p-2 text-[10px] text-gray-600 font-bold opacity-50">ارزش کم / رو به اتمام</div>
               </div>

               <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                     <XAxis type="number" dataKey="x" name="پیشرفت" unit="%" stroke="#555" tick={{fontSize: 10}} domain={[0, 100]} />
                     <YAxis type="number" dataKey="y" name="ارزش" stroke="#555" tick={{fontSize: 10}} tickFormatter={(val) => `${val/1000000000}B`} />
                     <ZAxis type="number" dataKey="z" range={[100, 400]} />
                     <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
                     <Scatter name="Contracts" data={scatterData}>
                        {scatterData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={entry.status === 'Delayed' ? '#FF003C' : '#00FF94'} stroke="#fff" strokeWidth={1} />
                        ))}
                     </Scatter>
                  </ScatterChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* AI Analysis Box */}
         <div className="col-span-1 glass-panel rounded-2xl p-6 relative overflow-hidden bg-gradient-to-b from-white/5 to-transparent">
             <div className="absolute top-0 right-0 p-4">
                <div className="w-2 h-2 bg-cyberBlue rounded-full animate-ping"></div>
             </div>
             <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <Briefcase className="text-neonAmber w-5 h-5" />
                تحلیل هوشمند وضعیت
             </h3>
             <div className="space-y-4">
                <div className="bg-black/40 p-3 rounded-xl border-r-2 border-alertRed">
                   <h4 className="text-alertRed text-xs font-bold mb-1">تاخیر بحرانی</h4>
                   <p className="text-gray-300 text-xs leading-5">قرارداد "تامین کاتالیست" با وجود پیشرفت کم (15%)، بخش عمده‌ای از زمان بندی را از دست داده است. نیاز به مداخله فوری.</p>
                </div>
                <div className="bg-black/40 p-3 rounded-xl border-r-2 border-emeraldGreen">
                   <h4 className="text-emeraldGreen text-xs font-bold mb-1">عملکرد برتر</h4>
                   <p className="text-gray-300 text-xs leading-5">پیمانکار "تکنولوژی پیشگام" جلوتر از زمان‌بندی (98%) است. پیشنهاد می‌شود برای فاز بعدی پروژه نامزد شود.</p>
                </div>
                <div className="bg-black/40 p-3 rounded-xl border-r-2 border-cyberBlue">
                   <h4 className="text-cyberBlue text-xs font-bold mb-1">جریان نقدینگی</h4>
                   <p className="text-gray-300 text-xs leading-5">مجموع پرداختی‌ها (422B) با پیشرفت فیزیکی (Weighted 48%) همخوانی نسبی دارد.</p>
                </div>
             </div>
         </div>
      </div>

      {/* 3. Detailed Project Passports (Grid) */}
      <h3 className="text-xl font-bold text-white mt-4 mb-2 border-b border-gray-800 pb-2">شناسنامه پروژه‌های فعال (Project Passports)</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-6">
        {CONTRACTS.map((contract) => {
           const percentPaid = (contract.paidAmount / contract.totalValue) * 100;
           const isCritical = contract.status === 'Delayed';
           const statusLabel = contract.status === 'Active' ? 'فعال' : contract.status === 'Delayed' ? 'تاخیر' : 'تکمیل';

           return (
              <div key={contract.id} className={`glass-panel rounded-xl p-0 overflow-hidden group hover:border-cyberBlue/50 transition-all ${isCritical ? 'border-alertRed/30' : ''}`}>
                 {/* Card Header */}
                 <div className="p-4 bg-white/5 flex justify-between items-start border-b border-white/5">
                    <div>
                       <span className="text-[10px] text-gray-500 font-mono block mb-1">{contract.id}</span>
                       <h4 className="text-white font-bold text-sm truncate w-48">{contract.title}</h4>
                    </div>
                    <div className={`px-2 py-1 rounded text-[10px] font-bold border ${
                       isCritical 
                       ? 'bg-alertRed/10 text-alertRed border-alertRed/20' 
                       : 'bg-emeraldGreen/10 text-emeraldGreen border-emeraldGreen/20'
                    }`}>
                       {statusLabel}
                    </div>
                 </div>

                 {/* Card Body */}
                 <div className="p-4 space-y-4">
                    {/* Contractor Info */}
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400">
                          <Briefcase className="w-4 h-4" />
                       </div>
                       <div>
                          <div className="text-[10px] text-gray-500">پیمانکار اجرایی</div>
                          <div className="text-xs text-white font-medium">{contract.contractor}</div>
                       </div>
                    </div>

                    {/* Timeline */}
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400">
                          <Calendar className="w-4 h-4" />
                       </div>
                       <div className="flex-1">
                          <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                             <span>شروع: {contract.startDate}</span>
                             <span>پایان: {contract.endDate}</span>
                          </div>
                          <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                             <div className="h-full bg-cyberBlue" style={{width: `${contract.progress}%`}}></div>
                          </div>
                       </div>
                    </div>

                    {/* Financial Progress Bar (Stacked) */}
                    <div className="mt-2 bg-black/40 p-3 rounded-lg border border-white/5">
                       <div className="flex justify-between items-center mb-2">
                          <span className="text-[10px] text-gray-400">وضعیت مالی (پرداخت / کل)</span>
                          <span className="text-[10px] font-mono text-white">
                             {formatCurrency(contract.paidAmount)} / {formatCurrency(contract.totalValue)}
                          </span>
                       </div>
                       {/* The Bar */}
                       <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                          {/* Physical Progress Marker */}
                          <div 
                             className="absolute top-0 bottom-0 w-0.5 bg-white z-20 shadow-[0_0_10px_white]" 
                             style={{ left: `${contract.progress}%` }}
                             title={`پیشرفت فیزیکی: ${contract.progress}%`}
                          ></div>
                          {/* Financial Progress Fill */}
                          <div 
                             className={`absolute top-0 bottom-0 left-0 z-10 transition-all duration-1000 ${percentPaid > contract.progress ? 'bg-neonAmber' : 'bg-emeraldGreen'}`} 
                             style={{ width: `${percentPaid}%` }}
                          ></div>
                       </div>
                       <div className="flex justify-between text-[9px] text-gray-500 mt-1 font-mono">
                          <span>مالی: {percentPaid.toFixed(0)}%</span>
                          <span>فیزیکی: {contract.progress}%</span>
                       </div>
                    </div>
                 </div>
              </div>
           );
        })}
      </div>
    </div>
  );
};