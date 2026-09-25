import { create } from "zustand";
import type { AppId, Rect, WindowState } from "./types";

interface WindowStore {
  windows: WindowState[];
  topZ: number;
  openApp: (appId: AppId, defaultRect: Rect) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  toggleMaximize: (id: string, viewport: Rect) => void;
  updateRect: (id: string, rect: Rect) => void;
  isOpen: (appId: AppId) => boolean;
}

let idCounter = 0;

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: [],
  topZ: 10,

  openApp: (appId, defaultRect) => {
    const existing = get().windows.find((w) => w.appId === appId);
    if (existing) {
      set((state) => ({
        topZ: state.topZ + 1,
        windows: state.windows.map((w) =>
          w.id === existing.id
            ? { ...w, minimized: false, zIndex: state.topZ + 1 }
            : w
        ),
      }));
      return;
    }

    const id = `win-${appId}-${idCounter++}`;
    set((state) => ({
      topZ: state.topZ + 1,
      windows: [
        ...state.windows,
        {
          id,
          appId,
          rect: defaultRect,
          prevRect: null,
          minimized: false,
          maximized: false,
          zIndex: state.topZ + 1,
        },
      ],
    }));
  },

  closeWindow: (id) =>
    set((state) => ({
      windows: state.windows.filter((w) => w.id !== id),
    })),

  focusWindow: (id) =>
    set((state) => ({
      topZ: state.topZ + 1,
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, zIndex: state.topZ + 1, minimized: false } : w
      ),
    })),

  minimizeWindow: (id) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, minimized: true } : w
      ),
    })),

  toggleMaximize: (id, viewport) =>
    set((state) => ({
      windows: state.windows.map((w) => {
        if (w.id !== id) return w;
        if (w.maximized) {
          return {
            ...w,
            maximized: false,
            rect: w.prevRect ?? w.rect,
            prevRect: null,
          };
        }
        return {
          ...w,
          maximized: true,
          prevRect: w.rect,
          rect: viewport,
        };
      }),
    })),

  updateRect: (id, rect) =>
    set((state) => ({
      windows: state.windows.map((w) => (w.id === id ? { ...w, rect } : w)),
    })),

  isOpen: (appId) => get().windows.some((w) => w.appId === appId),
}));
