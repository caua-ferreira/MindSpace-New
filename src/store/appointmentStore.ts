import { create } from 'zustand';
import { Appointment } from '../types';
import { supabase } from '../lib/supabase';

interface AppointmentStore {
  appointments: Appointment[];
  isLoading: boolean;
  error: string | null;
  addAppointment: (appointment: Appointment) => Promise<void>;
  updateAppointment: (appointment: Appointment) => Promise<void>;
  deleteAppointment: (id: string) => Promise<void>;
  fetchAppointments: () => Promise<void>;
  getAppointmentsByDate: (date: string) => Appointment[];
  getAppointmentsByDateRange: (startDate: string, endDate: string) => Appointment[];
}

export const useAppointmentStore = create<AppointmentStore>((set, get) => ({
  appointments: [],
  isLoading: false,
  error: null,

  fetchAppointments: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('date', { ascending: true });

      if (error) throw error;

      set({ appointments: data as Appointment[], isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
  
  addAppointment: async (appointment: Appointment) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('appointments')
        .insert([appointment])
        .select()
        .single();

      if (error) throw error;

      set(state => ({
        appointments: [...state.appointments, data as Appointment],
        isLoading: false
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
  
  updateAppointment: async (appointment: Appointment) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('appointments')
        .update(appointment)
        .eq('id', appointment.id)
        .select()
        .single();

      if (error) throw error;

      set(state => ({
        appointments: state.appointments.map(app =>
          app.id === appointment.id ? (data as Appointment) : app
        ),
        isLoading: false
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
  
  deleteAppointment: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase
        .from('appointments')
        .delete()
        .eq('id', id);

      if (error) throw error;

      set(state => ({
        appointments: state.appointments.filter(app => app.id !== id),
        isLoading: false
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
  
  getAppointmentsByDate: (date: string) => {
    return get().appointments.filter(app => app.date === date);
  },
  
  getAppointmentsByDateRange: (startDate: string, endDate: string) => {
    return get().appointments.filter(
      app => app.date >= startDate && app.date <= endDate
    );
  }
}));