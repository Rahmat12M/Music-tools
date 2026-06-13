import { useContext } from "react";
import { DragDropContext, type DragItem } from "@/index";

/**
 * Die Komponente, die ein Draggable Item bereitstellt.
 * 
 * **Diese Komponente stellt die Grundstruktur fuer ein Draggable Item bereit:**
 * 
 * - `onDragStart` - ruft die Funktion `startDrag` aus dem Context `DragDropContext` auf.
 * - draggable - Das Element ist draggable
 * 
 * > Die Komponente ist eine generische Komponent und bekommt seinen Typen beim definieren zugewiesen. Der generische Typ
 * muss vom Typ **DragItem** abgeleitet sein
 * 
 * **Aufruf:**
 * ```ts
   const [left, setLeft] = useState<musicItemTyp[]>([
       { id: "1", label: "Item 1", genre: "Pop" },
       { id: "2", label: "Item 2", genre: "Pop" },
       { id: "3", label: "Item 3", genre: "Rock" },
     ]);
     
   {left.map((item) => (
      <DraggableItem
        key={item.id}
        item={item}
        listItems={left}
        setter={setLeft}
      >
        <div style={itemStyle}>{item.label}</div>
      </DraggableItem>
    ))}
 * ```
 * 
 * @param item Das Item, welches verschoben werden soll. Wird im Provider hinterlegt. Das Item muss abgeleitet 
 * vom Type DragItem sein. **D.h., es muss eine id: string enthalten.**
 * @param listItems Die originale Liste, wo das Item drin ist. Wird im Provider hinterlegt.
 * @param setter Die Setterfunktion, um die globale Liste zu manipulieren. Wir im Provider hinterlegt.
 */
function DraggableItem<T extends DragItem>({
  item,
  listItems,
  setter,
  children,
}: {
  item: T;
  listItems: T[];
  setter: Function;
  children: React.ReactNode;
}) {
  const { startDrag } = useContext(DragDropContext);

  return (
    <>
      <div
        draggable
        onDragStart={() =>
          startDrag(
            item,
            listItems,
            setter 
          )
        }
      >
        {children}
      </div>
    </>
  );
}

export default DraggableItem;
