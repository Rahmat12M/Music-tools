import type { DataCollectionType } from "./types";

/**
 * Eine Sammlung von fixen Werten, die Komponentenuebergreifend und zentral zur Verfuegung stehen sollen.
 */
export const defaultDataCollection: DataCollectionType = {
  '/login': 'http://localhost:3000/login',
  '/logout': 'http://localhost:3000/logout'
};