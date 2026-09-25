import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getApp } from "./apps";
import type { AppId, Rect, WindowState } from "./types";

export type SnapZone = "left" | "right" | "maximize" | null;

interface WindowStore {
  windows: WindowState[];
  topZ: number;
  snapPreview: Rect | null;
  snapZone: SnapZone;
  rememberedRects: Partial<Record<AppId, Rect>>;
  openApp: (appId: AppId, defaultRect: Rect) => void;
  openAppCentered: (appId: AppId) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  toggleMaximize: (id: string, viewport: Rect) => void;
  updateRect: (id: string, rect: Rect) => void;
  setSnapPreview: (rect: Rect | null, zone: SnapZone) => void;
  isOpen: (appId: AppId) => boolean;
}

let idCounter = 0;

export const useWindowStore = create<WindowStore>()(
  persist(
    (set, get) => ({
      windows: [],
      topZ: 10,
      snapPreview: null,
      snapZone: null,
      rememberedRects: {},

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

        // A visitor's last-used size/position for this app wins over the
        // caller's freshly computed default, so returning to an app puts
        // it back roughly where they left it.
        const rect = get().rememberedRects[appId] ?? defaultRect;

        const id = `win-${appId}-${idCounter++}`;
        set((state) => ({
          topZ: state.topZ + 1,
          windows: [
            ...state.windows,
            {
              id,
              appId,
              rect,
              prevRect: null,
              minimized: false,
              maximized: false,
              zIndex: state.topZ + 1,
            },
          ],
        }));
      },

      openAppCentered: (appId) => {
        const { defaultSize } = getApp(appId);
        const rect: Rect = {
          x: window.innerWidth / 2 - defaultSize.width / 2,
          y: Math.max(24, window.innerHeight / 2 - defaultSize.height / 2 - 40),
          width: Math.min(defaultSize.width, window.innerWidth - 80),
          height: Math.min(defaultSize.height, window.innerHeight - 160),
        };
        get().openApp(appId, rect);
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
        set((state) => {
          const win = state.windows.find((w) => w.id === id);
          return {
            windows: state.windows.map((w) => (w.id === id ? { ...w, rect } : w)),
            rememberedRects: win
              ? { ...state.rememberedRects, [win.appId]: rect }
              : state.rememberedRects,
          };
        }),

      setSnapPreview: (rect, zone) => set({ snapPreview: rect, snapZone: zone }),

      isOpen: (appId) => get().windows.some((w) => w.appId === appId),
    }),
    {
      name: "dh-desktop-windows",
      partialize: (state) => ({ rememberedRects: state.rememberedRects }),
    }
  )
);
