import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Wallpaper {
  id: string;
  label: string;
  css: string;
  image?: string;
  /** Optional portrait-cropped variant used on the phone shell instead of `image`. */
  mobileImage?: string;
}

export const WALLPAPERS: Wallpaper[] = [
  {
    id: "zootopia",
    label: "Zootopia",
    css: "linear-gradient(135deg, #2c5364, #203a43)",
    image: "/wallpapers/zootopia.jpg",
  },
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
      wallpaperId: "zootopia",
      setWallpaper: (id) => set({ wallpaperId: id }),
    }),
    { name: "dh-desktop-settings" }
  )
);
