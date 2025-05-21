import { create } from 'zustand';
import { Psychologist } from '../types';
import { supabase } from '../lib/supabase';

interface PsychologistStore {
  psychologists: Psychologist[];
  isLoading: boolean;
  error: string | null;
  fetchPsychologists: () => Promise<void>;
  addPsychologist: (psychologist: Psychologist) => Promise<void>;
  updatePsychologist: (psychologist: Psychologist) => Promise<void>;
  deletePsychologist: (id: string) => Promise<void>;
}

export const usePsychologistStore = create<PsychologistStore>((set) => ({
  psychologists: [],
  isLoading: false,
  error: null,

  fetchPsychologists: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('psychologists')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;

      set({ psychologists: data as Psychologist[], isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  addPsychologist: async (psychologist: Psychologist) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('psychologists')
        .insert([psychologist])
        .select()
        .single();

      if (error) throw error;

      set(state => ({
        psychologists: [...state.psychologists, data as Psychologist],
        isLoading: false
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  updatePsychologist: async (psychologist: Psychologist) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('psychologists')
        .update(psychologist)
        .eq('id', psychologist.id)
        .select()
        .single();

      if (error) throw error;

      set(state => ({
        psychologists: state.psychologists.map(p =>
          p.id === psychologist.id ? (data as Psychologist) : p
        ),
        isLoading: false
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  deletePsychologist: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase
        .from('psychologists')
        .delete()
        .eq('id', id);

      if (error) throw error;

      set(state => ({
        psychologists: state.psychologists.filter(p => p.id !== id),
        isLoading: false
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  }
}));