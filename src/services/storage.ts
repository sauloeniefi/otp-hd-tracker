import type { TrackerData } from "../types/tracker";

const STORAGE_KEY = "ot-hd-tracker";

const defaultData: TrackerData = {
  goal: null,
  farms: [],
};

export function loadData(): TrackerData {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return defaultData;
  }

  try {
    return JSON.parse(stored) as TrackerData;
  } catch {
    return defaultData;
  }
}

export function saveData(data: TrackerData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function clearData(): void {
  localStorage.removeItem(STORAGE_KEY);
}