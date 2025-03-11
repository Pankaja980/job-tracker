export interface Job {
    id: number;
    title: string;
    company: string;
    category?: string;
    status: 'Applied' | 'Interview Scheduled' | 'Rejected' | 'Offer Received'; // ✅ Ensure fixed statuses
  }
  