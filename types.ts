export enum Page {
  IT_INFRASTRUCTURE = 'IT_INFRASTRUCTURE',
  HUMAN_RESOURCES = 'HUMAN_RESOURCES',
  CONTRACTS = 'CONTRACTS',
  TECHNICAL = 'TECHNICAL'
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  unit: string;
  avatar: string;
}

export interface Contract {
  id: string;
  title: string;
  contractor: string;
  totalValue: number;
  paidAmount: number;
  startDate: string;
  endDate: string;
  progress: number; // 0-100
  status: 'Active' | 'Delayed' | 'Completed';
}

export interface Task {
  id: string;
  title: string;
  progressAdded: number; // e.g., +5%
  status: 'Completed' | 'In Progress' | 'Pending';
  date: string;
}

export interface Contractor {
  id: string;
  name: string;
  workshopLocation: string;
  progress: number;
  supervisor: string;
  status: 'Active' | 'Halted' | 'Review';
  recentTasks: Task[];
}

export interface Camera {
  id: string;
  location: string;
  status: 'Active' | 'Malfunction' | 'Offline';
}