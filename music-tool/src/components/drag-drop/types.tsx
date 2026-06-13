/**
 * Der Basistyp fuer alle Drag&Drop Komponenten.
 */
export interface DragItem {
  id: string | number;
}

/**
 * Der Kontexttyp mit allen globalen Eigenschaften und Funktionen.
 */
export type DragDropContextType = {
  draggedItem: DragItem | null;
  startDrag: (
    item: DragItem,
    listItems: DragItem[],
    setter: Function | null
  ) => void;
  dropTo: (
    target: string,
    callbackDrop: (
      item: DragItem | null,
      listItems: DragItem[],
      setter: Function
    ) => void
  ) => void;
};