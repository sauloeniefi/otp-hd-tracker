import {useEffect, useState} from "react";

import type {FormEvent} from "react";

import type {PokemonFarmConfig} from "../types/pokemon";

import {PokemonConfigAutocomplete} from "../components/PokemonConfigAutocomplete";

import {pokemonList} from "../data/pokemon";

import {
    addPokemon,
    deletePokemon,
    getPokemonList,
    updatePokemon,
} from "../services/pokemonStorage";

export function Pokemon() {
    const [configs, setConfigs] =
        useState<PokemonFarmConfig[]>(
            () => getPokemonList()
        );

    const [selectedPokemonId, setSelectedPokemonId] =
        useState("");

    const [value, setValue] =
        useState("");

    const [editingId, setEditingId] =
        useState<number | null>(null);

    const [error, setError] =
        useState("");

    useEffect(() => {
        setConfigs(getPokemonList());
    }, []);

    const configuredPokemonIds =
        configs
            .map(
                (config) =>
                    config.pokemonId
            )
            .filter(
                (id) =>
                    id !== editingId
            );

    const selectedPokemon = pokemonList.find(
        (pokemon) =>
            pokemon.id ===
            Number(selectedPokemonId)
    );

    function resetForm() {
        setSelectedPokemonId("");
        setValue("");
        setEditingId(null);
        setError("");
    }

    function handleSubmit(
        event: FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        setError("");

        const pokemonId =
            Number(selectedPokemonId);

        const numericValue = Number(value);

        if (!pokemonId) {
            setError(
                "Selecione um Pokémon."
            );

            return;
        }

        if (
            !Number.isFinite(numericValue) ||
            numericValue <= 0
        ) {
            setError(
                "Informe um valor de HDs válido."
            );

            return;
        }

        const alreadyConfigured =
            configs.some(
                (config) =>
                    config.pokemonId ===
                    pokemonId &&
                    config.pokemonId !==
                    editingId
            );

        if (alreadyConfigured) {
            setError(
                "Esse Pokémon já está configurado."
            );

            return;
        }

        const config: PokemonFarmConfig = {
            pokemonId,
            value: numericValue,
        };

        let updatedList: PokemonFarmConfig[];

        if (editingId !== null) {
            updatedList =
                updatePokemon(config);
        } else {
            updatedList =
                addPokemon(config);
        }

        setConfigs(updatedList);

        resetForm();
    }

    function handleEdit(
        config: PokemonFarmConfig
    ) {
        setEditingId(config.pokemonId);

        setSelectedPokemonId(
            String(config.pokemonId)
        );

        setValue(
            String(config.value)
        );

        setError("");

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    function handleDelete(
        config: PokemonFarmConfig
    ) {
        const pokemon =
            pokemonList.find(
                (pokemon) =>
                    pokemon.id ===
                    config.pokemonId
            );

        if (!pokemon) {
            return;
        }

        const confirmed =
            window.confirm(
                `Deseja excluir ${pokemon.name}?`
            );

        if (!confirmed) {
            return;
        }

        const updatedList =
            deletePokemon(
                config.pokemonId
            );

        setConfigs(updatedList);

        if (
            editingId ===
            config.pokemonId
        ) {
            resetForm();
        }
    }

    return (
        <div className="mx-auto max-w-lg space-y-6">
            <header>
                <p className="text-sm text-zinc-400">
                    Configuração
                </p>

                <h1 className="text-3xl font-bold">
                    Pokémon
                </h1>

                <p className="mt-2 text-sm text-zinc-500">
                    Configure quanto cada Pokémon
                    vale nas suas farms.
                </p>
            </header>

            <form
                onSubmit={handleSubmit}
                className="space-y-5 rounded-2xl bg-zinc-900 p-5"
            >
                <div>
                    <h2 className="text-lg font-semibold">
                        {editingId !== null
                            ? "Editar Pokémon"
                            : "Configurar Pokémon"}
                    </h2>

                    <p className="mt-1 text-sm text-zinc-500">
                        Selecione um Pokémon da
                        Pokédex e informe seu valor.
                    </p>
                </div>

                {error && (
                    <div className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-400">
                        {error}
                    </div>
                )}

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Pokémon
                    </label>

                    <PokemonConfigAutocomplete
                        value={selectedPokemonId}
                        options={pokemonList}
                        disabledIds={
                            configuredPokemonIds
                        }
                        onChange={
                            setSelectedPokemonId
                        }
                        placeholder="Buscar Pokémon..."
                    />
                </div>

                {selectedPokemon && (
                    <div className="flex items-center gap-4 rounded-2xl bg-zinc-800 p-4">
                        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-zinc-900">
                            <img
                                src={
                                    selectedPokemon.icon
                                }
                                alt={
                                    selectedPokemon.name
                                }
                                className="h-16 w-16 object-contain"
                            />
                        </div>

                        <div>
                            <p className="font-semibold">
                                {
                                    selectedPokemon.name
                                }
                            </p>

                            <p className="text-sm text-zinc-500">
                                Nº{" "}
                                {String(
                                    selectedPokemon.id
                                ).padStart(
                                    3,
                                    "0"
                                )}
                            </p>
                        </div>
                    </div>
                )}

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Valor em HDs
                    </label>

                    <input
                        type="number"
                        min="1"
                        step="1"
                        value={value}
                        onChange={(event) =>
                            setValue(
                                event.target.value
                            )
                        }
                        placeholder="Ex.: 50"
                        className="w-full rounded-xl bg-zinc-800 px-4 py-3 outline-none transition focus:ring-2 focus:ring-violet-500"
                    />

                    <p className="mt-2 text-xs text-zinc-500">
                        Quanto você recebe por cada
                        Pokémon capturado.
                    </p>
                </div>

                <div className="flex gap-3">
                    <button
                        type="submit"
                        className="flex-1 rounded-xl bg-violet-600 py-3 font-semibold transition hover:bg-violet-500"
                    >
                        {editingId !== null
                            ? "Salvar alterações"
                            : "Configurar Pokémon"}
                    </button>

                    {editingId !== null && (
                        <button
                            type="button"
                            onClick={resetForm}
                            className="rounded-xl bg-zinc-800 px-5 py-3 font-semibold transition hover:bg-zinc-700"
                        >
                            Cancelar
                        </button>
                    )}
                </div>
            </form>

            <section className="space-y-3">
                <div>
                    <h2 className="text-lg font-semibold">
                        Pokémon configurados
                    </h2>

                    <p className="text-sm text-zinc-500">
                        {configs.length}{" "}
                        Pokémon configurados
                    </p>
                </div>

                {configs.length === 0 ? (
                    <div className="rounded-2xl bg-zinc-900 p-8 text-center">
                        <p className="text-zinc-400">
                            Nenhum Pokémon
                            configurado.
                        </p>

                        <p className="mt-1 text-sm text-zinc-600">
                            Selecione um Pokémon
                            acima para começar.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {[...configs]
                            .sort(
                                (a, b) =>
                                    a.pokemonId - b.pokemonId
                            )
                            .map((config) => {
                                const pokemon =
                                    pokemonList.find(
                                        (pokemon) =>
                                            pokemon.id ===
                                            config.pokemonId
                                    );

                                if (!pokemon) {
                                    return null;
                                }

                                return (
                                    <div
                                        key={
                                            config.pokemonId
                                        }
                                        className="flex items-center gap-3 rounded-2xl bg-zinc-900 p-3"
                                    >
                                        <div
                                            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-zinc-800">
                                            <img
                                                src={
                                                    pokemon.icon
                                                }
                                                alt={
                                                    pokemon.name
                                                }
                                                className="h-12 w-12 object-contain"
                                            />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <p className="truncate font-medium">
                                                {
                                                    pokemon.name
                                                }
                                            </p>

                                            <p className="text-sm text-zinc-500">
                                                {config.value.toLocaleString(
                                                    "pt-BR"
                                                )}{" "}
                                                HDs
                                            </p>
                                        </div>

                                        <div className="flex gap-1">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleEdit(
                                                        config
                                                    )
                                                }
                                                className="rounded-lg px-3 py-2 text-sm text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                                            >
                                                Editar
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDelete(
                                                        config
                                                    )
                                                }
                                                className="rounded-lg px-3 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
                                            >
                                                Excluir
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                )}
            </section>
        </div>
    );
}