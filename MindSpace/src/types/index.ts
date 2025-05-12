export interface Appointment {
  id: string;
  patientId: string;
  psychologistId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
  type: 'in-person' | 'online';
  paymentStatus: 'pending' | 'paid' | 'partial' | 'insurance';
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  preferredContact: 'email' | 'phone' | 'whatsapp';
  insuranceProvider?: string;
  insuranceNumber?: string;
  notes?: string;
  emergencyContact?: string;
  joinedAt: string;
  status: 'active' | 'inactive';
  profileImage?: string;
}

export interface Psychologist {
  id: string;
  name: string;
  email: string;
  phone: string;
  licenseNumber: string; // CRP
  specializations: string[];
  availability: Availability[];
  bio: string;
  hourlyRate: number;
  profileImage?: string;
  status: 'active' | 'inactive';
}

export interface Availability {
  dayOfWeek: number; // 0-6 (Sunday to Saturday)
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
}

export interface DashboardStats {
  totalAppointments: number;
  completedAppointments: number;
  cancelledAppointments: number;
  totalRevenue: number;
  upcomingAppointments: number;
  activePatients: number;
  activePsychologists: number;
}

export type ThemeMode = 'light' | 'dark';