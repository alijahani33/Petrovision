import { Contract, Contractor, Employee, Camera } from '../types';

// More realistic enterprise scale numbers
export const EMPLOYEES: Employee[] = [
  { id: '1001', name: 'دکتر رضا علوی', role: 'مدیر ارشد فناوری', unit: 'IT', avatar: 'https://picsum.photos/100/100?random=1' },
  { id: '1002', name: 'مهندس سارا محمدی', role: 'رئیس امنیت سایبری', unit: 'IT', avatar: 'https://picsum.photos/100/100?random=2' },
  { id: '1003', name: 'امید زند', role: 'معمار سیستم', unit: 'IT', avatar: 'https://picsum.photos/100/100?random=3' },
  { id: '1004', name: 'لیلا کمالی', role: 'مدیر عملیات شبکه', unit: 'IT', avatar: 'https://picsum.photos/100/100?random=4' },
  { id: '1005', name: 'علی رحیمی', role: 'مدیر دیتاسنتر', unit: 'IT', avatar: 'https://picsum.photos/100/100?random=5' },
  { id: '1006', name: 'مریم حسینی', role: 'تحلیلگر ارشد داده', unit: 'IT', avatar: 'https://picsum.photos/100/100?random=6' },
  { id: '1007', name: 'کاوه آهنگر', role: 'سرپرست پشتیبانی', unit: 'IT', avatar: 'https://picsum.photos/100/100?random=7' },
  { id: '1008', name: 'نگار راد', role: 'توسعه دهنده ارشد', unit: 'IT', avatar: 'https://picsum.photos/100/100?random=8' },
  { id: '1009', name: 'پویا نوری', role: 'مدیر پروژه نرم‌افزار', unit: 'IT', avatar: 'https://picsum.photos/100/100?random=9' },
  { id: '1010', name: 'زهرا ایزدی', role: 'مشاور استراتژی IT', unit: 'IT', avatar: 'https://picsum.photos/100/100?random=10' },
  { id: '1011', name: 'دکتر محمد اکبری', role: 'معاون منابع انسانی', unit: 'HR', avatar: 'https://picsum.photos/100/100?random=11' },
  { id: '1012', name: 'فاطمه جلالی', role: 'مدیر جذب و استعداد', unit: 'HR', avatar: 'https://picsum.photos/100/100?random=12' },
];

export const CONTRACTS: Contract[] = [
  { id: 'C-2024-01', title: 'توسعه فاز ۳ پالایشگاه', contractor: 'قرارگاه سازندگی نصر', totalValue: 450000000000, paidAmount: 120000000000, startDate: '1401/01/01', endDate: '1405/01/01', progress: 35, status: 'Active' },
  { id: 'C-2024-02', title: 'اورهال توربین‌های گازی', contractor: 'توربو صنعت خاورمیانه', totalValue: 85000000000, paidAmount: 80000000000, startDate: '1402/06/01', endDate: '1403/02/01', progress: 92, status: 'Active' },
  { id: 'C-2024-03', title: 'تامین کاتالیست‌های پتروشیمی', contractor: 'شیمی گستر', totalValue: 120000000000, paidAmount: 10000000000, startDate: '1402/10/01', endDate: '1403/04/01', progress: 15, status: 'Delayed' },
  { id: 'C-2024-04', title: 'هوشمندسازی خطوط انتقال', contractor: 'تکنولوژی پیشگام', totalValue: 35000000000, paidAmount: 32000000000, startDate: '1402/01/01', endDate: '1402/12/29', progress: 98, status: 'Active' },
  { id: 'C-2024-05', title: 'لجستیک و حمل و نقل دریایی', contractor: 'مارین سرویس', totalValue: 200000000000, paidAmount: 180000000000, startDate: '1401/05/01', endDate: '1403/05/01', progress: 85, status: 'Active' },
];

export const CONTRACTORS: Contractor[] = [
  { 
    id: 'SITE-A', 
    name: 'پروژه اتیلن غرب', 
    workshopLocation: 'سایت A (عسلویه)', 
    progress: 82, 
    supervisor: 'مهندس رستمی', 
    status: 'Active',
    recentTasks: [
      { id: 't1', title: 'نصب برج تقطیر اصلی', progressAdded: 15, status: 'Completed', date: '1402/12/10' },
      { id: 't2', title: 'تست فشار خطوط لوله', progressAdded: 5, status: 'In Progress', date: '1402/12/15' },
      { id: 't3', title: 'عایق‌کاری مخازن کروی', progressAdded: 0, status: 'Pending', date: '---' }
    ]
  },
  { 
    id: 'SITE-B', 
    name: 'مخازن ذخیره سازی', 
    workshopLocation: 'سایت B (ماهشهر)', 
    progress: 45, 
    supervisor: 'مهندس کاظمی', 
    status: 'Review',
    recentTasks: [
      { id: 't1', title: 'خاکبرداری فونداسیون', progressAdded: 10, status: 'Completed', date: '1402/10/01' },
      { id: 't2', title: 'آرماتوربندی دیواره‌ها', progressAdded: 12, status: 'Completed', date: '1402/11/05' },
      { id: 't3', title: 'بتن‌ریزی سقف مخزن ۴', progressAdded: 0, status: 'Pending', date: '---' }
    ]
  },
  { 
    id: 'SITE-C', 
    name: 'نیروگاه اختصاصی', 
    workshopLocation: 'سایت C (مرکزی)', 
    progress: 96, 
    supervisor: 'مهندس شایان', 
    status: 'Active',
    recentTasks: [
      { id: 't1', title: 'نصب توربین ژنراتور ۱', progressAdded: 25, status: 'Completed', date: '1402/09/20' },
      { id: 't2', title: 'سینکرون سازی با شبکه', progressAdded: 10, status: 'Completed', date: '1402/11/15' },
      { id: 't3', title: 'تحویل موقت واحد', progressAdded: 1, status: 'In Progress', date: '1402/12/20' }
    ]
  },
  { 
    id: 'SITE-D', 
    name: 'واحد شیرین سازی', 
    workshopLocation: 'سایت D (شمالی)', 
    progress: 12, 
    supervisor: 'مهندس مقدم', 
    status: 'Halted',
    recentTasks: [
      { id: 't1', title: 'تجهیز کارگاه', progressAdded: 5, status: 'Completed', date: '1402/08/01' },
      { id: 't2', title: 'نقشه‌برداری مسیر', progressAdded: 2, status: 'Completed', date: '1402/08/15' },
      { id: 't3', title: 'خرید ورق‌های فولادی', progressAdded: 0, status: 'Pending', date: '---' }
    ]
  },
];

export const CAMERAS: Camera[] = [];