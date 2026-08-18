import { Trash2 } from "lucide-react";

import type { Farm } from "../types/tracker";
import { formatHds } from "../utils/formatHds";

interface HistoryProps {
  farms: Farm[];
  onDelete: (id: string) => void;
}

export function History({
  farms,
  onDelete,
}: HistoryProps) {
  const ordered = [...farms].sort(
    (a, b) =>
      new Date(b.date).getTime() -
      new Date(a.date).getTime()
  );

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm text-zinc-400">
          Histórico
        </p>

        <h1 className="text-3xl font-bold">
          Suas Farms
        </h1>
      </header>

      <div className="space-y-3">
        {ordered.map((farm) => (
          <div
            key={farm.id}
            className="rounded-2xl bg-zinc-900 p-5"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-zinc-500">
                  {new Date(
                    farm.date
                  ).toLocaleString("pt-BR")}
                </p>

                <p className="mt-1 text-xl font-bold">
                  +{formatHds(farm.total)} HDs
                </p>
              </div>

              <button
                onClick={() => onDelete(farm.id)}
                className="text-red-400"
              >
                <Trash2 size={20} />
              </button>
            </div>

            <div className="mt-4 space-y-2">
              {farm.catches.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-sm"
                >
                  <span>
                    {item.quantity}x {item.name}
                  </span>

                  <span className="text-zinc-400">
                    {formatHds(item.total)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {ordered.length === 0 && (
          <p className="text-center text-zinc-500">
            Nenhuma farm registrada.
          </p>
        )}
      </div>
    </div>
  );
}