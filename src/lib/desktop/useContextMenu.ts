"use client";

import { useState } from "react";
import type { ContextMenuItem } from "@/components/desktop/ContextMenu";

interface MenuState {
  x: number;
  y: number;
  items: ContextMenuItem[];
}

export function useContextMenu() {
  const [menu, setMenu] = useState<MenuState | null>(null);

  function open(e: React.MouseEvent, items: ContextMenuItem[]) {
    e.preventDefault();
    e.stopPropagation();
    setMenu({ x: e.clientX, y: e.clientY, items });
  }

  function close() {
    setMenu(null);
  }

  return { menu, open, close };
}
