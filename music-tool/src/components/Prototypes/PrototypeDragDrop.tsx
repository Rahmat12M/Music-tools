import { useState } from "react";

type Item = {
  id: string;
  label: string;
};

const itemStyle: React.CSSProperties = {
  padding: "8px",
  margin: "5px 0",
  background: "#eee",
  cursor: "grab",
  color: "black"
};

const sectionStyle: React.CSSProperties = {
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
  const [leftItems, setLeftItems] = useState<Item[]>([
    { id: "1", label: "Item 1" },
    { id: "2", label: "Item 2" },
    { id: "3", label: "Item 3" },
  ]);

  const [rightItems, setRightItems] = useState<Item[]>([
    { id: "4", label: "Item 4" },
    { id: "5", label: "Item 5" },
  ]);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: Item) => {
    e.dataTransfer.setData("application/json", JSON.stringify(item));
  };

  const handleDropLeft = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const item: Item = JSON.parse(e.dataTransfer.getData("application/json"));

    // Wenn Item bereits links ist → nichts tun
    if (leftItems.find((i) => i.id === item.id)) return;

    // Aus rechter Liste entfernen
    setRightItems((prev) => prev.filter((i) => i.id !== item.id));

    // In linke Liste einfuegen
    setLeftItems((prev) => [...prev, item]);
  };

  const handleDropRight = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const item: Item = JSON.parse(e.dataTransfer.getData("application/json"));

    if (rightItems.find((i) => i.id === item.id)) return;

    // Aus linker Liste entfernen
    setLeftItems((prev) => prev.filter((i) => i.id !== item.id));

    // In rechte Liste einfuegen
    setRightItems((prev) => [...prev, item]);
  };

  const allowDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <div style={{ display: "flex", gap: "20px" }}>
        {/* LEFT SECTION */}
        <div
          onDrop={handleDropLeft}
          onDragOver={allowDrop}
          style={sectionStyle}
        >
          <h3>Section A</h3>
          {leftItems.map((item) => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
              style={itemStyle}
            >
              {item.label}
            </div>
          ))}
        </div>

        {/* RIGHT SECTION */}
        <div
          onDrop={handleDropRight}
          onDragOver={allowDrop}
          style={sectionStyle}
        >
          <h3>Section B</h3>
          {rightItems.map((item) => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
              style={itemStyle}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default PrototypeDragDrop;
