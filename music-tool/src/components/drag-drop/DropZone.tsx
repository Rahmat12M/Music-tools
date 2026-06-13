import { useContext } from "react";
import { DragDropContext, type DragItem } from "@/index";

/**
 * Die Komponente fuer die Dropzone. Diese Komponente hat als Kindelemente DraggableItem's.
 * 
 * **Die Komponente stellt das Grundgeruest fuer das Dropping bereit.**
 * 
 * - onDragOver
 * - onDrop
 * 
 * Es wird zusaetzlich das Styling mit uebergeben, um die DropZone entsprechend darzustellen.
 * 
 * Die Callbackfunktion wird an die globale Funktio `dropTo` aus dem `Provider` weitergereicht.
 * 
 * **Aufruf:**
 * ```ts
    interface musicItemTyp extends DragItem {
      genre: string;
    }

    const [right, setRight] = useState<musicItemTyp[]>([
      { id: "4", label: "Item 4", genre: "Classic" },
      { id: "5", label: "Item 5", genre: "Country" },
    ]);

    const dropZoneStyle: React.CSSProperties = {
      width: "200px",
      minHeight: "200px",
      padding: "10px",
      border: "2px dashed gray",
    };

    function handleDropRight(
      item: musicItemTyp | null,
      listItems: musicItemTyp[],
      setter: React.Dispatch<React.SetStateAction<musicItemTyp[]>>
    ) {
      if (!setter) return;

      setter(listItems?.filter((prev) => prev.id !== item?.id));
      setRight((prev) => [...prev, item!]);
      console.log("handleDropRight: ", item, " - ", listItems);
    }

    function handleFileDropRight(files: FileList) {
    console.log("Drop Files: ", files);

    const newFileItems = Array.from(files).map((file) => {
      return {
        id: crypto.randomUUID(),
        label: 'File: ' + file.name,
        genre: "File"
      }
    });

    setRight((prev) => [...prev, ...newFileItems]);
  }

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
      callbackFileDrop={handleFileDropMiddle}
    >
      <DraggableItem ...>
        ...
      </DraggableItem>
    </DropZone>
 * ```
 * 
 * - Da in der globalen Funktion `dropTo` aus dem `Provider` auf das Interface `DragItem` zugegriffen wird (Basistyp),
 * muessen die Parameter auf den eigentlichen Typen `z.B. musicType` gecastet werden, damit auch mit diesen Typen gearbeitet
 * werden kann.
 * 
 * In unserem Beispiel:
 * ```ts
    callbackDrop={(item, listItems, setter) =>
      handleDropLeft(
        item as musicItemTyp | null,
        listItems as musicItemTyp[],
        setter as React.Dispatch<React.SetStateAction<musicItemTyp[]>>
      )
    }
 * ```
 * 
 * @param id Die ID der Dropzone.
 * @param style Fuer das individuelle Styling der DropZone
 * @param callbackDrop Die Callbackfunktion, die an die globale Funktion `dropTo` weitergereicht wird. 
 * @param callbackFileDrop Die Callbackfunktion, die Dateiendropping aus einem externen Dateiexplorer handelt.
 */
function DropZone({
  id,
  style,
  callbackDrop,
  callbackFileDrop,
  children,
}: {
  id: string;
  style?: React.CSSProperties
  callbackDrop: (
    item: DragItem | null,
    listItems: DragItem[],
    setter: Function
  ) => void;
  callbackFileDrop?: (files: FileList) => void
  children?: React.ReactNode;
}) {
  const { dropTo } = useContext(DragDropContext);

  /**
   * Verhindere die Defaulthandhabung.
   * Hier evtl. Erweiterung bei dem Ereignis `onDragOver`
   */
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  /**
   * Funktion fuer das `onDrop` - Ereignis.
   * - Diese verhindert die Defaulthandhabung.
   * - Aufruf der globalen Funktion `dropTo` aus dem `Provider`.
   */  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log(`handleDrop: `, e.target);

    // Pruefe, ob Dateien vorhanden sind.
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      callbackFileDrop?.(e.dataTransfer.files);
      return;
    }

    dropTo(id, callbackDrop);
  };

  return (
    <>
      <div onDragOver={handleDragOver} onDrop={handleDrop} style={style}>
        {children}
      </div>
    </>
  );
}

export default DropZone;
