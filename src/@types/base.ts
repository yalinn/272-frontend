export type User = {
  id: string;
  full_name: string;
  department: number;
  user_type: string;
  roles: string[];
};

export type HaysevRequest = {
  id: string;
  status: "pending" | "processing" | "success" | "rejected";
  title: string;
  description: string;
  start_time: string;
  organizer_id: string;
  author: string;
  created_at: string;
  isMine?: boolean;
};