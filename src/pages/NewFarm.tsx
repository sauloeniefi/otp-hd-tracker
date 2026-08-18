import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

import type {
  Farm,
  PokemonCatch,
} from "../types/tracker";

interface NewFarmProps {
  onSave: (farm: Farm) => void;
}

interface FormItem {
  name: string;
  quantity: string;
  unitValue: string;
}

export function NewFarm({ onSave }: NewFarmProps) {
  const [items, setItems] = useState<FormItem[]>([
    {
      name: "",
      quantity: "",
      unitValue: "",
    },
  ]);

  function updateItem(
    index: number,
    field: keyof FormItem,
    value: string
  ) {
    setItems((current) =>
      current.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );
  }

  function addItem() {
    setItems((current) => [
      ...current,
      {
        name: "",
        quantity: "",
        unitValue: "",
      },
    ]);
  }

  function removeItem(index: number) {
    setItems((current) =>
      current.filter((_, i) => i !== index)
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const catches: PokemonCatch[] = items
      .filter(
        (item) =>
          item.name &&
          Number(item.quantity) > 0 &&
          Number(item.unitValue) > 0
      )
      .map((item) => {
        const quantity = Number(item.quantity);
        const unitValue = Number(item.unitValue);

        return {
          id: crypto.randomUUID(),
          name: item.name,
          quantity,
          unitValue,
          total: quantity * unitValue,
        };
      });

    if (catches.length === 0) {
      return;
    }

    const farm: Farm = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      catches,
      total: catches.reduce(
        (sum, item) => sum + item.total,
        0
      ),
    };

    onSave(farm);

    setItems([
      {
        name: "",
        quantity: "",
        unitValue: "",
      },
    ]);
  }

  const total = items.reduce(
    (sum, item) =>
      sum +
      Number(item.quantity || 0) *
        Number(item.unitValue || 0),
    0
  );

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <header>
        <p className="text-sm text-zinc-400">
          Nova entrada
        </p>

        <h1 className="text-3xl font-bold">
          Registrar Farm
        </h1>
      </header>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl bg-zinc-900 p-4"
          >
            <div className="mb-3 flex justify-between">
              <span className="font-semibold">
                Pokémon
              </span>

              {items.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="text-red-400"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>

            <div className="space-y-3">
              <input
                value={item.name}
                onChange={(e) =>
                  updateItem(
                    index,
                    "name",
                    e.target.value
                  )
                }
                placeholder="Ex: Croagunk"
                className="w-full rounded-xl bg-zinc-800 px-4 py-3 outline-none"
              />

              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  updateItem(
                    index,
                    "quantity",
                    e.target.value
                  )
                }
                placeholder="Quantidade"
                className="w-full rounded-xl bg-zinc-800 px-4 py-3 outline-none"
              />

              <input
                type="number"
                min="1"
                value={item.unitValue}
                onChange={(e) =>
                  updateItem(
                    index,
                    "unitValue",
                    e.target.value
                  )
                }
                placeholder="Valor por unidade em HDs"
                className="w-full rounded-xl bg-zinc-800 px-4 py-3 outline-none"
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addItem}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-zinc-800 py-4"
        >
          <Plus size={20} />
          Adicionar Pokémon
        </button>

        <div className="rounded-2xl bg-violet-600 p-5">
          <p className="text-sm text-violet-200">
            Total da farm
          </p>

          <p className="text-3xl font-bold">
            {total.toLocaleString("pt-BR")} HDs
          </p>
        </div>

        <button
          type="submit"
          className="w-full rounded-2xl bg-white py-4 font-bold text-black"
        >
          Salvar Farm
        </button>
      </form>
    </div>
  );
}