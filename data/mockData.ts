import { Medication, AdherenceData } from '@/types/medication';

export const mockMedications: Medication[] = [
  {
    id: '1',
    name: 'Lisinopril',
    dosage: '10mg',
    scheduleTime: '08:00',
    takenToday: false,
    userId: 'user1',
    createdAt: '2024-01-15T08:00:00Z',
  },
  {
    id: '2',
    name: 'Metformin',
    dosage: '500mg',
    scheduleTime: '12:00',
    takenToday: true,
    userId: 'user1',
    createdAt: '2024-01-15T12:00:00Z',
  },
  {
    id: '3',
    name: 'Atorvastatin',
    dosage: '20mg',
    scheduleTime: '20:00',
    takenToday: false,
    userId: 'user1',
    createdAt: '2024-01-15T20:00:00Z',
  },
  {
    id: '4',
    name: 'Aspirin',
    dosage: '81mg',
    scheduleTime: '09:00',
    takenToday: false,
    userId: 'user1',
    createdAt: '2024-01-15T09:00:00Z',
  },
];

export const mockAdherenceData: AdherenceData[] = [
  { date: '2024-01-08', taken: 3, total: 4, percentage: 75 },
  { date: '2024-01-09', taken: 4, total: 4, percentage: 100 },
  { date: '2024-01-10', taken: 2, total: 4, percentage: 50 },
  { date: '2024-01-11', taken: 4, total: 4, percentage: 100 },
  { date: '2024-01-12', taken: 3, total: 4, percentage: 75 },
  { date: '2024-01-13', taken: 4, total: 4, percentage: 100 },
  { date: '2024-01-14', taken: 2, total: 4, percentage: 50 },
];