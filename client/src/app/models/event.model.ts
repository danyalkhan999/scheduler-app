export interface Event {
  _id?: string;
  name?: string;
  start_time: number;
  end_time: number;
  status?: 'scheduled' | 'completed' | 'cancelled';
}
