import fs from 'fs';
import path from "path";
import { UserDB } from './types';

const usersPath = path.join(process.cwd(), "data", "users.json");

export function loadUsers(): UserDB[] {
  const raw = fs.readFileSync(usersPath, "utf-8");
  return JSON.parse(raw) as UserDB[];
}

export function addUser(userData: UserDB): boolean {
  return true;
}

export function removeUser(id: number): boolean {
  return true;
}

export function loadUser(id: number): UserDB | undefined {
  return undefined;
}

export function findUserByUsername(username: string): UserDB | undefined {
  return loadUsers().find((u) => u.username === username);
}