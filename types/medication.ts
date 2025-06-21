export interface Medication {
  id: string;
  name: string;
  dosage: string;
  scheduleTime: string;
  takenToday: boolean;
  userId: string;
  createdAt: string;
}

export interface Reminder {
  id: string;
  medicationId: string;
  time: string;
  status: 'pending' | 'taken' | 'missed';
}

export interface Caregiver {
  id: string;
  name: string;
  email: string;
  linkedUser: string;
}

export interface AdherenceData {
  date: string;
  taken: number;
  total: number;
  percentage: number;
}