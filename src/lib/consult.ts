import { create } from "zustand";
import type { StudioId } from "@/data/catalog";

type ConsultState = {
  studio: StudioId;
  interests: string[];
  concerns: string[];
  setStudio: (studio: StudioId) => void;
  toggleInterest: (id: string) => void;
  addMany: (ids: string[]) => void;
  toggleConcern: (id: string) => void;
};

export const useConsult = create<ConsultState>((set, get) => ({
  studio: "wimpole",
  interests: [],
  concerns: [],
  setStudio: (studio) => set({ studio }),
  toggleInterest: (id) => {
    const current = get().interests;
    set({
      interests: current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    });
  },
  addMany: (ids) => {
    const next = new Set(get().interests);
    for (const id of ids) next.add(id);
    set({ interests: [...next] });
  },
  toggleConcern: (id) => {
    const current = get().concerns;
    set({
      concerns: current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    });
  },
}));
