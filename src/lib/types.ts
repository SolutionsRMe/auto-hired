export interface Job {
  id: string;
  title: string;
  description: string;
  url?: string;
  [key: string]: any;
}
