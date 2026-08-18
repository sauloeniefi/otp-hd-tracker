import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import type { TrackerData } from "../types/tracker";
import { getTotalFarmed } from "../utils/calculations";
import { formatHds } from "../utils/formatHds";

interface ReportsProps {
  data: TrackerData;
}

export function Reports({ data }: ReportsProps) {
  let accumulated = 0;

  const chartData = [...data.farms]
    .sort(
      (a, b) =>
        new Date(a.date).getTime() -
        new Date(b.date).getTime()
    )
    .map((farm) => {
      accumulated += farm.total;

      return {
        date: new Date(farm.date).toLocaleDateString(
          "pt-BR",
          {
            day: "2-digit",
            month: "2-digit",
          }
        ),
        total: accumulated,
      };
    });

  const total = getTotalFarmed(data.farms);

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm text-zinc-400">
          Analytics
        </p>

        <h1 className="text-3xl font-bold">
          Relatório
        </h1>
      </header>

      <div className="rounded-3xl bg-zinc-900 p-5">
        <p className="text-sm text-zinc-400">
          Evolução acumulada
        </p>

        <p className="mb-6 text-3xl font-bold">
          {formatHds(total)} HDs
        </p>

        <div className="h-64">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <LineChart data={chartData}>
              <XAxis dataKey="date" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="total"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl bg-zinc-900 p-5">
          <p className="text-sm text-zinc-400">
            Total de farms
          </p>

          <p className="text-2xl font-bold">
            {data.farms.length}
          </p>
        </div>

        <div className="rounded-2xl bg-zinc-900 p-5">
          <p className="text-sm text-zinc-400">
            Média por farm
          </p>

          <p className="text-2xl font-bold">
            {formatHds(
              data.farms.length
                ? total / data.farms.length
                : 0
            )}
          </p>
        </div>
      </div>
    </div>
  );
}