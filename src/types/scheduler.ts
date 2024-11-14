export interface TimeSlot {
  time: string;
  date: string;
}

export interface Vote {
  userId: string;
  userName: string;
  availability: 'available' | 'maybe' | 'unavailable';
}

export interface TimeSlotVotes {
  slot: TimeSlot;
  votes: Record<string, Vote>;
}

export interface PollState {
  title: string;
  description: string;
  creator: string;
  timeSlots: TimeSlotVotes[];
}

export type UpdateType = 
  | { type: 'CREATE_POLL'; payload: Omit<PollState, 'timeSlots'> & { timeSlots: TimeSlot[] } }
  | { type: 'VOTE'; payload: { slotIndex: number; vote: Vote } };