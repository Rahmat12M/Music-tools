import { DraggableItem, DropZone, type DragItem } from "@/index";
import { useState } from "react";

interface musicItemTyp extends DragItem {
  label: string,
  genre: string
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

function PrototypeDragDropWithContext2() {
  const [middle, setMiddle] = useState<musicItemTyp[]>([
    { id: "6", label: "Item 6", genre: "Pop" },
    { id: "7", label: "Item 7", genre: "Pop" },
    { id: "8", label: "Item 8", genre: "Rock" },
  ]);

  function handleDropMiddle(
    item: musicItemTyp | null,
    listItems: musicItemTyp[],
    setter: React.Dispatch<React.SetStateAction<musicItemTyp[]>>
  ) {
    console.log('setter: ', setter, ' listItems: ', listItems, ' item: ', item);
    if(!setter || !item || !listItems) return;
    setter(listItems?.filter((prev) => prev.id !== item?.id));
    setMiddle((prev) => [...prev, item!]);
  }

  function handleFileDropMiddle(files: FileList) {
    console.log("Drop Files: ", files);

    const newFileItems = Array.from(files).map((file) => {
      return {
        id: crypto.randomUUID(),
        label: 'File: ' + file.name,
        genre: "File"
      }
    });

    setMiddle((prev) => [...prev, ...newFileItems]);
  }

  return (
    <>
      <DropZone
        id="middle"
        style={dropZoneStyle}
        callbackDrop={(item, listItems, setter) =>
          handleDropMiddle(
            item as musicItemTyp | null,
            listItems as musicItemTyp[],
            setter as React.Dispatch<React.SetStateAction<musicItemTyp[]>>
          )
        }
        callbackFileDrop={handleFileDropMiddle}
      >
        <h3>Section Middle</h3>
        {middle.map((item) => (
          <DraggableItem
            key={item.id}
            item={item}
            listItems={middle}
            setter={setMiddle}
          >
            <div style={itemStyle}>{item.label}-{item.genre}</div>
          </DraggableItem>
        ))}
      </DropZone>
    </>
  );
}

export default PrototypeDragDropWithContext2;
