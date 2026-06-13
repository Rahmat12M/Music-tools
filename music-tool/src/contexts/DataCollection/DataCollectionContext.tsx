import { defaultDataCollection, type DataCollectionType } from "@/index";
import { createContext } from "react";

/**
 * Hier die Sammlung mit allen Datensaetzen, wie Endpunkte etc.
 * 
 * | key | value |
 * | :-- | :---- |
 * |/login | http://localhost:3000/login |
 * |/logout | http://localhost:3000/logout |
 */
export const DataCollection = createContext<DataCollectionType>(defaultDataCollection);