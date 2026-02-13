import { create } from "zustand";
import { supabase } from "../lib/supabase/supabase";

export const useMemories = create((set, get) => ({
  // state
  memories: [],
  loading: false,

  // actions
  fetchMemories: async () => {
    set({ loading: true });
    try {
      // TODO: Implement API call
      const { data, error } = await supabase
        .from("memories")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      set({ memories: data });
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      set({ loading: false });
    }
  },

  addMemory: async (memory) => {
    set({ loading: true });
    try {
      const { data, error } = await supabase.from("memories").insert([memory]).select().single();
      if (error) throw error;
      set({ memories: [...get().memories, data] });
      return { success: true, data };
    } catch (error) {
      console.error("Error adding memory:", error);
      return { success: false, error: error.message };
    } finally {
      set({ loading: false });
    }
  },

  uploadPhoto: async (file) => {
    // TODO: Implement photo upload
    set({ loading: true });
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("memory-photos")
        .upload(fileName, file);
      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("memory-photos").getPublicUrl(fileName);

      return { success: true, publicUrl };
    } catch (error) {
      console.error("Error uploading photo:", error);
      return { success: false, error: error.message };
    } finally {
      set({ loading: false });
    }
  },

  subscribe: () => {
    // TODO: Implement subscription
    const subscription = supabase
      .channel("memories-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "memories" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            // New memory added
            set((state) => ({
              memories: [payload.new, ...state.memories],
            }));
          } else if (payload.eventType === "DELETE") {
            // Memory deleted
            set((state) => ({
              memories: state.memories.filter((m) => m.id !== payload.old.id),
            }));
          }
        },
      )
      .subscribe();

    return subscription;
  },
}));
