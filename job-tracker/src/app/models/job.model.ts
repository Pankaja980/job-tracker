export interface JobApplication {
      id: number;
      title: string;
      company: string;
      status:  "Applied" | "Interview Scheduled" | "Rejected" | "Offer Received";
      category?:string;
    }