import { create } from "zustand";
import { supabase } from "../lib/supabase/supabase";


export const useLoveNoteStore = create((set) => ({
  // State
  sending: false,
  error: null,
  sentNotes: [],
  loading: false,

  // Actions
  sendLoveNote: async (message, fromName = "Your Love") => {
    set({ sending: true, error: null });

    try {
      const { data, error } = await supabase
        .from("love_notes_sent")
        .insert([{ message, from_name: fromName }])
        .select()
        .single();

      if (error) throw error;

      // Add to local state
      set((state) => ({
        sentNotes: [data, ...state.sentNotes],
        sending: false,
      }));

      return { success: true, data };
    } catch (err) {
      set({ error: err.message, sending: false });
      console.error("Error sending love note:", err);
      return { success: false, error: err.message };
    }
  },

  fetchSentNotes: async () => {
    set({ loading: true, error: null });

    try {
      const { data, error } = await supabase
        .from("love_notes_sent")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      set({ sentNotes: data || [], loading: false });
      return { success: true, data };
    } catch (err) {
      set({ error: err.message, loading: false });
      console.error("Error fetching notes:", err);
      return { success: false, error: err.message };
    }
  },
}));
