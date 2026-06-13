import { useState } from "react";
import PrototypeDragDropWithContext2 from "./PrototypeDragDropWithContext2";
import { DraggableItem, DropZone, type DragItem } from '@/index';

interface musicItemTyp extends DragItem {
  label: string,
  genre: string;
}

const itemStyle: React.CSSProperties = {
  padding: "8px",
  margin: "5px 0",
  background: "#eee",
  cursor: "grab",
  color: "black",
};

const dropZoneStyle: React.CSSProperties = {
  width: "200px",
  minHeight: "200px",
  padding: "10px",
  border: "2px dashed gray",
};

/**
 * Prototyp einer Drag n Drop Komponente.
 *
 * Als Beispiel werden zwei Divkontainer bereitgestellt, zwischen denen Kindelemente (ebenfalls DIV's) per Drag n Drop
 * verschoben werden koennen.
 *
 * Es wird fuer das Drag n Drop natives HTML5 genutzt.
 *
 * @returns
 */
function PrototypeDragDrop() {
  const [left, setLeft] = useState<musicItemTyp[]>([
    { id: "1", label: "Item 1", genre: "Pop" },
    { id: "2", label: "Item 2", genre: "Pop" },
    { id: "3", label: "Item 3", genre: "Rock" },
  ]);

  const [right, setRight] = useState<musicItemTyp[]>([
    { id: "4", label: "Item 4", genre: "Classic" },
    { id: "5", label: "Item 5", genre: "Country" },
  ]);

  function handleDropLeft(
    item: musicItemTyp | null,
    listItems: musicItemTyp[],
    setter: React.Dispatch<React.SetStateAction<musicItemTyp[]>>
  ) {
    if(!setter || !item || !listItems) return;
    
    setter(listItems?.filter((prev) => prev.id !== item?.id));
    setLeft((prev) => [...prev, item!]);
    console.log("handleDropLeft: ", item, " - ", listItems);
  }

  function handleDropRight(
    item: musicItemTyp | null,
    listItems: musicItemTyp[],
    setter: React.Dispatch<React.SetStateAction<musicItemTyp[]>>
  ) {
    if(!setter || !item || !listItems) return;

    setter(listItems?.filter((prev) => prev.id !== item?.id));
    setRight((prev) => [...prev, item!]);
    console.log("handleDropRight: ", item, " - ", listItems);
  }

  return (
    <>
      <div style={{ display: "flex", gap: "20px" }}>
        <DropZone
          id="left"
          style={dropZoneStyle}
          callbackDrop={(item, listItems, setter) =>
            handleDropLeft(
              item as musicItemTyp | null,
              listItems as musicItemTyp[],
              setter as React.Dispatch<React.SetStateAction<musicItemTyp[]>>
            )
          }
        >
          <h3>Section Left</h3>
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
        </DropZone>
        <PrototypeDragDropWithContext2 />
        <DropZone
          id="right"
          style={dropZoneStyle}
          callbackDrop={(item, listItems, setter) =>
            handleDropRight(
              item as musicItemTyp | null,
              listItems as musicItemTyp[],
              setter as React.Dispatch<React.SetStateAction<musicItemTyp[]>>
            )
          }
        >
          <h3>Section Right</h3>
          {right.map((item) => (
            <DraggableItem
              key={item.id}
              item={item}
              listItems={right}
              setter={setRight}
            >
              <div style={itemStyle}>{item.label}</div>
            </DraggableItem>
          ))}
        </DropZone>
      </div>
    </>
  );
}

export default PrototypeDragDrop;
