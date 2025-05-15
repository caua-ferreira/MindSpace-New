import { ReactNode } from 'react';

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
  sessionNotes?: string;
  diagnosis?: string;
  treatment?: string;
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
  totalSpent?: number;
  lastAppointment?: string;
  upcomingAppointment?: string;
  preferredPsychologist?: string;
  medicalHistory?: string[];
  documents?: Document[];
}

export interface Psychologist {
  id: string;
  name: string;
  email: string;
  phone: string;
  licenseNumber: string;
  specializations: string[];
  availability: Availability[];
  bio: string;
  hourlyRate: number;
  profileImage?: string;
  status: 'active' | 'inactive';
  totalPatients?: number;
  totalAppointments?: number;
  averageRating?: number;
  revenueStats?: {
    monthly: number;
    yearly: number;
  };
  appointmentTypes?: {
    inPerson: number;
    online: number;
  };
}

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: string;
}

export interface Availability {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

export interface DashboardStats {
  totalAppointments: number;
  completedAppointments: number;
  cancelledAppointments: number;
  totalRevenue: number;
  upcomingAppointments: number;
  activePatients: number;
  activePsychologists: number;
  revenueByType?: {
    insurance: number;
    private: number;
  };
  appointmentsByType?: {
    inPerson: number;
    online: number;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'psychologist' | 'receptionist' | 'financial';
  permissions: string[];
  lastLogin?: string;
  status: 'active' | 'inactive';
}

export type ThemeMode = 'light' | 'dark';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
}