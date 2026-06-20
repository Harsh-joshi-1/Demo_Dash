export interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  created_at?: string;
}

export interface EventItem {
  id: string;
  title: string;
  time: string;
}

export interface ScheduleItem {
  id: string;
  title: string;
  time: string;
}

export interface StatItem {
  label: string;
  value: number;
  total: number;
  color?: string;
}
