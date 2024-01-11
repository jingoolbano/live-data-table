import { create } from "zustand";

export const useTheme = create(set => ({
  darkmode : false,
  updateTheme : () => set((state)=> ({darkmode: !state.darkmode}))
}))


