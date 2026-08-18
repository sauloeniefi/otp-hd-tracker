import { useMemo } from "react";
import { TrendingUp, Target, Wallet, Clock } from "lucide-react";

import type { TrackerData } from "../types/tracker";
import {
  getProgress,
  getRemaining,
  getTotalFarmed,
} from "../utils/calculations";
import { formatHds } from "../utils/formatHds";

interface DashboardProps {
  data: TrackerData;
}

export function Dashboard({ data }: DashboardProps) {
  const target = data.goal?.target ?? 0;

  const farmed = useMemo(
    () => getTotalFarmed(data.farms),
    [data.farms]
  );

  const remaining = getRemaining(target, farmed);
  const progress = getProgress(target, farmed);

  const recentFarms = [...data.farms]
    .sort(
      (a, b) =>
        new Date(b.date).getTime() -
        new Date(a.date).getTime()
    )
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm text-zinc-400">
          Seu progresso
        </p>

        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>
      </header>

      <section className="rounded-3xl bg-zinc-900 p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-zinc-400">
              Meta mensal
            </p>

            <p className="text-3xl font-bold">
              {formatHds(target)} HDs
            </p>
          </div>

          <Target className="text-violet-400" size={32} />
        </div>

        <div className="mb-2 flex justify-between text-sm">
          <span className="text-zinc-400">
            {formatHds(farmed)} farmados
          </span>

          <span className="font-semibold">
            {progress.toFixed(1)}%
          </span>
        </div>

        <div className="h-4 overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-full rounded-full bg-violet-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </section>

      <div className="grid grid-cols-2 gap-4">
        <Stat
          icon={<Wallet size={20} />}
          label="Farmado"
          value={formatHds(farmed)}
        />

        <Stat
          icon={<Clock size={20} />}
          label="Falta"
          value={formatHds(remaining)}
        />
      </div>

      <section>
        <div className="mb-3 flex items-center gap-2">
          <TrendingUp size={20} />

          <h2 className="font-semibold">
            Últimas farms
          </h2>
        </div>

        <div className="space-y-3">
          {recentFarms.map((farm) => (
            <div
              key={farm.id}
              className="rounded-2xl bg-zinc-900 p-4"
            >
              <div className="flex justify-between">
                <span className="text-sm text-zinc-400">
                  {new Date(farm.date).toLocaleDateString(
                    "pt-BR"
                  )}
                </span>

                <strong>
                  +{formatHds(farm.total)}
                </strong>
              </div>

              <div className="mt-2 text-sm text-zinc-300">
                {farm.catches
                  .map(
                    (item) =>
                      `${item.quantity}x ${item.name}`
                  )
                  .join(" • ")}
              </div>
            </div>
          ))}

          {recentFarms.length === 0 && (
            <div className="rounded-2xl bg-zinc-900 p-6 text-center text-zinc-500">
              Nenhuma farm registrada.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-zinc-900 p-5">
      <div className="mb-3 text-violet-400">
        {icon}
      </div>

      <p className="text-sm text-zinc-400">
        {label}
      </p>

      <p className="text-2xl font-bold">
        {value}
      </p>
    </div>
  );
}