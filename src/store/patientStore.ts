import { create } from 'zustand';
import { Patient } from '../types';
import { supabase } from '../lib/supabase';

interface PatientStore {
  patients: Patient[];
  isLoading: boolean;
  error: string | null;
  fetchPatients: () => Promise<void>;
  addPatient: (patient: Patient) => Promise<void>;
  updatePatient: (patient: Patient) => Promise<void>;
  deletePatient: (id: string) => Promise<void>;
}

export const usePatientStore = create<PatientStore>((set) => ({
  patients: [],
  isLoading: false,
  error: null,

  fetchPatients: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .order('full_name', { ascending: true });

      if (error) throw error;

      set({ patients: data as Patient[], isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  addPatient: async (patient: Patient) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('patients')
        .insert([patient])
        .select()
        .single();

      if (error) throw error;

      set(state => ({
        patients: [...state.patients, data as Patient],
        isLoading: false
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  updatePatient: async (patient: Patient) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('patients')
        .update(patient)
        .eq('id', patient.id)
        .select()
        .single();

      if (error) throw error;

      set(state => ({
        patients: state.patients.map(p =>
          p.id === patient.id ? (data as Patient) : p
        ),
        isLoading: false
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  deletePatient: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase
        .from('patients')
        .delete()
        .eq('id', id);

      if (error) throw error;

      set(state => ({
        patients: state.patients.filter(p => p.id !== id),
        isLoading: false
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  }
}));