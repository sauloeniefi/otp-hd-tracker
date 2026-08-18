import { useState } from "react";
import type { TrackerData } from "../types/tracker";
import { formatHds } from "../utils/formatHds";

interface GoalProps {
  data: TrackerData;
  onSave: (target: number) => void;
}

export function Goal({ data, onSave }: GoalProps) {
  const [value, setValue] = useState(
    data.goal?.target?.toString() ?? ""
  );

  const month = new Date().toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const target = Number(value);

    if (!target || target <= 0) {
      return;
    }

    onSave(target);
  }

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <header>
        <p className="text-sm text-zinc-400">
          Configuração
        </p>

        <h1 className="text-3xl font-bold">
          Meta mensal
        </h1>
      </header>

      <div className="rounded-3xl bg-zinc-900 p-6">
        <p className="text-sm capitalize text-zinc-400">
          {month}
        </p>

        <p className="mt-2 text-3xl font-bold">
          {data.goal
            ? formatHds(data.goal.target)
            : "Nenhuma meta"}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <label className="block">
          <span className="mb-2 block text-sm text-zinc-400">
            Quantos HDs você quer farmar?
          </span>

          <input
            type="number"
            min="1"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="100000"
            className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-4 text-xl outline-none focus:border-violet-500"
          />
        </label>

        <button
          type="submit"
          className="w-full rounded-2xl bg-violet-600 py-4 font-semibold transition hover:bg-violet-500"
        >
          Salvar meta
        </button>
      </form>
    </div>
  );
}