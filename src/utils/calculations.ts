import type { Farm } from "../types/tracker";

export function getTotalFarmed(farms: Farm[]): number {
  return farms.reduce((total, farm) => total + farm.total, 0);
}

export function getRemaining(
  target: number,
  farmed: number
): number {
  return Math.max(target - farmed, 0);
}

export function getProgress(
  target: number,
  farmed: number
): number {
  if (target <= 0) {
    return 0;
  }

  return Math.min((farmed / target) * 100, 100);
}

export function getAveragePerFarm(farms: Farm[]): number {
  if (farms.length === 0) {
    return 0;
  }

  return getTotalFarmed(farms) / farms.length;
}