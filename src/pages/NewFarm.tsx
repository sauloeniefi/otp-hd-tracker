import { useEffect, useState } from "react";

import { Plus, Trash2 } from "lucide-react";

import type {
  Pokemon,
  PokemonFarmConfig,
} from "../types/pokemon";

import { pokemonList } from "../data/pokemon";

import { getPokemonList } from "../services/pokemonStorage";

import type {
  Farm,
  PokemonCatch,
} from "../types/tracker";

import { PokemonAutocomplete } from "../components/PokemonAutocomplete";

interface NewFarmProps {
  onSave: (farm: Farm) => void;
}

interface FormItem {
  pokemonId: string;
  quantity: string;
}

export function NewFarm({
                          onSave,
                        }: NewFarmProps) {
  const [pokemonConfigs, setPokemonConfigs] =
      useState<PokemonFarmConfig[]>([]);

  const [items, setItems] =
      useState<FormItem[]>([
        {
          pokemonId: "",
          quantity: "",
        },
      ]);

  useEffect(() => {
    setPokemonConfigs(getPokemonList());
  }, []);

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
        pokemonId: "",
        quantity: "",
      },
    ]);
  }

  function removeItem(index: number) {
    setItems((current) =>
        current.filter((_, i) => i !== index)
    );
  }

  function getPokemonConfig(
      pokemonId: string
  ): PokemonFarmConfig | undefined {
    return pokemonConfigs.find(
        (config) =>
            config.pokemonId === Number(pokemonId)
    );
  }

  function getPokemon(
      pokemonId: string
  ): Pokemon | undefined {
    return pokemonList.find(
        (pokemon) =>
            pokemon.id === Number(pokemonId)
    );
  }

  function handleSubmit(
      e: React.FormEvent
  ) {
    e.preventDefault();

    const catches: PokemonCatch[] =
        items
            .filter(
                (item) =>
                    item.pokemonId &&
                    Number(item.quantity) > 0
            )
            .map((item) => {
              const pokemon = getPokemon(
                  item.pokemonId
              );

              const config =
                  getPokemonConfig(
                      item.pokemonId
                  );

              if (!pokemon || !config) {
                throw new Error(
                    "Pokémon não encontrado ou não configurado"
                );
              }

              const quantity =
                  Number(item.quantity);

              return {
                id: crypto.randomUUID(),
                name: pokemon.name,
                quantity,
                unitValue: config.value,
                total:
                    quantity * config.value,
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
          (sum, item) =>
              sum + item.total,
          0
      ),
    };

    onSave(farm);

    setItems([
      {
        pokemonId: "",
        quantity: "",
      },
    ]);
  }

  const total = items.reduce(
      (sum, item) => {
        const config =
            getPokemonConfig(
                item.pokemonId
            );

        if (!config) {
          return sum;
        }

        return (
            sum +
            Number(item.quantity || 0) *
            config.value
        );
      },
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
          {items.map((item, index) => {
            const pokemon = getPokemon(
                item.pokemonId
            );

            const config =
                getPokemonConfig(
                    item.pokemonId
                );

            const itemTotal =
                pokemon && config
                    ? Number(
                    item.quantity || 0
                ) * config.value
                    : 0;

            return (
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
                            onClick={() =>
                                removeItem(index)
                            }
                            className="text-red-400"
                        >
                          <Trash2 size={18} />
                        </button>
                    )}
                  </div>

                  <div className="space-y-3">
                    <PokemonAutocomplete
                        value={
                          item.pokemonId
                        }
                        options={pokemonList}
                        configs={
                          pokemonConfigs
                        }
                        onChange={(
                            pokemonId
                        ) =>
                            updateItem(
                                index,
                                "pokemonId",
                                pokemonId
                            )
                        }
                    />

                    {pokemon &&
                        config && (
                            <div className="flex justify-between rounded-xl bg-zinc-800 px-4 py-3 text-sm">
                      <span className="text-zinc-400">
                        Valor por unidade
                      </span>

                              <span className="font-semibold">
                        {config.value.toLocaleString(
                            "pt-BR"
                        )}{" "}
                                HDs
                      </span>
                            </div>
                        )}

                    <input
                        type="number"
                        min="1"
                        value={
                          item.quantity
                        }
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

                    {itemTotal > 0 && (
                        <div className="text-right text-sm text-zinc-400">
                          Total:{" "}
                          <span className="font-semibold text-white">
                      {itemTotal.toLocaleString(
                          "pt-BR"
                      )}{" "}
                            HDs
                    </span>
                        </div>
                    )}
                  </div>
                </div>
            );
          })}

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
              {total.toLocaleString(
                  "pt-BR"
              )}{" "}
              HDs
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