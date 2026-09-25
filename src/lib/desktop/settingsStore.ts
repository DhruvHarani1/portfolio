import { create } from "zustand";
import { persist } from "zustand/middleware";

export const WALLPAPERS = [
  { id: "aurora", label: "Aurora", css: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)" },
  { id: "sunset", label: "Sunset", css: "linear-gradient(135deg, #1a0a2e, #2d1b69, #4a2c8a)" },
  { id: "mint", label: "Mint", css: "linear-gradient(135deg, #0d1117, #0f3d2e, #145c46)" },
  { id: "midnight", label: "Midnight", css: "linear-gradient(135deg, #000000, #1D1D1F, #2C2C2E)" },
];

interface SettingsStore {
  wallpaperId: string;
  setWallpaper: (id: string) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      wallpaperId: "aurora",
      setWallpaper: (id) => set({ wallpaperId: id }),
    }),
    { name: "dh-desktop-settings" }
  )
);
