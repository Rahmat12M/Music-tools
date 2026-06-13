import { createContext } from "react";
import type { DragDropContextType } from "@/index";

/**
 * Der globale Kontext fuer Drag&Drop.
 * 
 * - `draggedItem`: ist das aktuelle Item, was verschoben werden soll.
 * - `startDrag`: ist die Funktion, die beim Klick und verschieben aufgerufen wird. Ereignis `onDragStart`.
 * - `dropTo`: ist die Funktion, die beim Einfuegen (Ende von Drag&Drop) aufgerufen wird.
 */
export const DragDropContext = createContext<DragDropContextType>({
  draggedItem: null,
  startDrag: () => {},
  dropTo: () => {},
});
