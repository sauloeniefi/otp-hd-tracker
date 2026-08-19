import { useState } from "react";

import type {
  Farm,
  TrackerData,
} from "./types/tracker";

import { loadData, saveData } from "./services/storage";

import {
  BottomNavigation,
  type Page,
} from "./components/BottomNavigation";

import { Dashboard } from "./pages/Dashboard";
import { Goal } from "./pages/Goal";
import { NewFarm } from "./pages/NewFarm";
import { History } from "./pages/History";
import { Reports } from "./pages/Reports";
import { Pokemon } from "./pages/Pokemon";

function App() {
  const [data, setData] = useState<TrackerData>(
    loadData()
  );

  const [page, setPage] =
    useState<Page>("dashboard");

  function updateData(newData: TrackerData) {
    setData(newData);
    saveData(newData);
  }

  function saveGoal(target: number) {
    updateData({
      ...data,
      goal: {
        month: new Date()
          .toISOString()
          .slice(0, 7),
        target,
      },
    });

    setPage("dashboard");
  }

  function addFarm(farm: Farm) {
    updateData({
      ...data,
      farms: [...data.farms, farm],
    });

    setPage("dashboard");
  }

  function deleteFarm(id: string) {
    updateData({
      ...data,
      farms: data.farms.filter(
        (farm) => farm.id !== id
      ),
    });
  }

  function renderPage() {
    switch (page) {
      case "goal":
        return (
            <Goal
                data={data}
                onSave={saveGoal}
            />
        );

      case "new-farm":
        return (
            <NewFarm onSave={addFarm} />
        );

      case "history":
        return (
            <History
                farms={data.farms}
                onDelete={deleteFarm}
            />
        );

      case "reports":
        return <Reports data={data} />;

      case "pokemon":
        return <Pokemon />;

      default:
        return <Dashboard data={data} />;
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <main className="mx-auto max-w-5xl px-4 pb-28 pt-6 sm:px-6">
        {renderPage()}
      </main>

      <BottomNavigation
        page={page}
        onChange={setPage}
      />
    </div>
  );
}

export default App;