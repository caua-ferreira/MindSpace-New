import { create } from 'zustand';
import { ConsultationNote } from '../types';
import { supabase } from '../lib/supabase';

interface ConsultationNoteStore {
  notes: ConsultationNote[];
  isLoading: boolean;
  error: string | null;
  fetchNotes: (appointmentId?: string) => Promise<void>;
  addNote: (note: ConsultationNote) => Promise<void>;
  updateNote: (note: ConsultationNote) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
}

export const useConsultationNoteStore = create<ConsultationNoteStore>((set) => ({
  notes: [],
  isLoading: false,
  error: null,

  fetchNotes: async (appointmentId?: string) => {
    set({ isLoading: true, error: null });
    try {
      let query = supabase
        .from('consultation_notes')
        .select('*')
        .order('created_at', { ascending: false });

      if (appointmentId) {
        query = query.eq('appointment_id', appointmentId);
      }

      const { data, error } = await query;

      if (error) throw error;

      set({ notes: data as ConsultationNote[], isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  addNote: async (note: ConsultationNote) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('consultation_notes')
        .insert([note])
        .select()
        .single();

      if (error) throw error;

      set(state => ({
        notes: [...state.notes, data as ConsultationNote],
        isLoading: false
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  updateNote: async (note: ConsultationNote) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('consultation_notes')
        .update(note)
        .eq('id', note.id)
        .select()
        .single();

      if (error) throw error;

      set(state => ({
        notes: state.notes.map(n =>
          n.id === note.id ? (data as ConsultationNote) : n
        ),
        isLoading: false
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  deleteNote: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase
        .from('consultation_notes')
        .delete()
        .eq('id', id);

      if (error) throw error;

      set(state => ({
        notes: state.notes.filter(n => n.id !== id),
        isLoading: false
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  }
}));