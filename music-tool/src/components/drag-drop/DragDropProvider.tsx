import { useRef, useState } from "react";
import { DragDropContext, type DragItem } from "@/index";

/**
 * Die Providerfunktion, die den globalen Context zur Verfuegung stellt.
 * 
 * **Es werden folgende Funktionen fuer den DragStart und Drop bereitgestellt:**
 * 
 * - startDrag
 * - dropTo
 * 
 * **Aufruf:**
 * ```ts
   <DragDropProvider>
      <App />
    </DragDropProvider>
 * ``` 
 */
export function DragDropProvider({ children }: { children: React.ReactNode }) {
  /**
   * Das Item, was verschoben werden soll. Es steht global zur Verfuegung.
   */
  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);
  /**
   * Die Liste mit allen Items, woher das zu verschiebene Item stammt.
   * Die Liste ist wichtig, damit ich beim Drop weiss, was evtl. manipuliert werden soll. Z.B. herausloeschen aus der 
   * originalen Liste beim Drop. Drop kennt diese Liste nicht, weshalb sie sich beim startDrag gemerkt werden muss.
   */
  const [listDraggedItem, setListDraggedItem] = useState<DragItem[] | null>(null);
  /**
   * Die setterFunktion fuer die originale Liste.
   * Sie ist wichtig, damit beim Drop die Liste bei Bedarf angepasst werden kann.
   * Sie ist eine Referenz und wird beim Rendern nicht erneut gesetzt.
   */
  const setterListItemsRef = useRef<Function | null>(null);
  /**
   * Die global zur Verfuegung stehende Funktion fuer das Event `onDragStart`.
   * 
   * - Es wird sich das aktuelle zu draggende Item gemerkt.
   * - Es wird sich die originale Liste gemerkt (wo sich das Item original befindet).
   * - Es wird sich die Setterfunktion fuer die originale Liste gemerkt.
   * 
   * @param item Das zu draggende Item.
   * @param listItems Die dazugehoerige Liste.
   * @param setter Der dazugehoerige Setter.
   */
  const startDrag = (
    item: DragItem,
    listItems: DragItem[],
    setter?: Function | null
  ) => {
    // console.log(`Start Drag: `, item, " - ", listDraggedItem);
    setDraggedItem(item);
    setListDraggedItem(listItems);
    if (setter) setterListItemsRef.current = setter;
  };
  /**
   * Die Funktion, die beim Drop aufgerufen wird.
   * 
   * Damit das Dropping so flexible ist wie moeglich, wird eine Callbackfunktion bereitgestellt. Diese wird in der
   * entsprechenden DropZone definiert und bekommt das zu draggende Item, die originale Liste und den Setter fuer die originale Liste.
   * 
   * Die entsprechende Funktionalitaet ist selbst verantwortlich, was mit den Daten geschieht. Z.B. einfuegen in die neue Liste und 
   * herausloeschen aus der originalen (Verschiebung des Items).
   * 
   * @param target Die ID der DropZone.
   * @param callbackDrop Die Callbackfunktion zum manipulieren der Daten bei Dropereignis.
   */
  function dropTo(
    target: string,
    callbackDrop: (
      item: DragItem | null,
      listItems: DragItem[],
      setter: Function
    ) => void
  ) {
    console.log("Dropped", draggedItem, " into: ", target, " - ", listDraggedItem);

    // Die Callbackfunktion handhabt die Logik beim Einfuegen.
    callbackDrop(draggedItem, listDraggedItem!, setterListItemsRef.current!);

    // Kein globales Item mehr zum verschieben.
    setDraggedItem(null);
  }

  return (
    <>
      <DragDropContext.Provider value={{ draggedItem, startDrag, dropTo }}>
        {children}
      </DragDropContext.Provider>
    </>
  );
}