export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  date: number;
}

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  CANCELLED = 'CANCELLED',
  DONE = 'DONE',
}
