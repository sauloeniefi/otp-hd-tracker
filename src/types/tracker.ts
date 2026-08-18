export interface PokemonCatch {
  id: string;
  name: string;
  quantity: number;
  unitValue: number;
  total: number;
}

export interface Farm {
  id: string;
  date: string;
  catches: PokemonCatch[];
  total: number;
}

export interface MonthlyGoal {
  month: string;
  target: number;
}

export interface TrackerData {
  goal: MonthlyGoal | null;
  farms: Farm[];
}