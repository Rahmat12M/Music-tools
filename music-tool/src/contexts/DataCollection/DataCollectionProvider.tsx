import { defaultDataCollection } from "./defaultDataCollection";
import { DataCollection } from "./DataCollectionContext";
import type { ReactNode } from "react";

export function DataCollectionProvider({children}: {children: ReactNode}) {
  return (
    <DataCollection.Provider value={defaultDataCollection}>{children}</DataCollection.Provider>
  );
}