import {
    useEffect,
    useRef,
    useState,
} from "react";

import {
    Check,
    ChevronDown,
    Search,
} from "lucide-react";

import type {
    Pokemon,
} from "../types/pokemon";

interface PokemonConfigAutocompleteProps {
    value: string;
    options: Pokemon[];
    disabledIds?: number[];
    onChange: (pokemonId: string) => void;
    placeholder?: string;
}

export function PokemonConfigAutocomplete({
                                              value,
                                              options,
                                              disabledIds = [],
                                              onChange,
                                              placeholder = "Buscar Pokémon...",
                                          }: PokemonConfigAutocompleteProps) {
    const [open, setOpen] =
        useState(false);

    const [search, setSearch] =
        useState("");

    const containerRef =
        useRef<HTMLDivElement>(null);

    const selectedPokemon =
        options.find(
            (pokemon) =>
                pokemon.id ===
                Number(value)
        );

    useEffect(() => {
        function handleClickOutside(
            event: MouseEvent
        ) {
            if (
                containerRef.current &&
                !containerRef.current.contains(
                    event.target as Node
                )
            ) {
                setOpen(false);
            }
        }

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    const filteredOptions = [...options]
        .sort(
            (a, b) =>
                a.id - b.id
        )
        .filter((pokemon) => {
            const normalizedSearch =
                normalizeText(search);

            if (!normalizedSearch) {
                return true;
            }

            const name =
                normalizeText(
                    pokemon.name
                );

            const id =
                String(pokemon.id);

            return (
                name.includes(
                    normalizedSearch
                ) ||
                id.includes(
                    normalizedSearch
                )
            );
        })
        .filter((pokemon) => {
            if (
                pokemon.id ===
                Number(value)
            ) {
                return true;
            }

            return !disabledIds.includes(
                pokemon.id
            );
        });

    function handleSelect(
        pokemon: Pokemon
    ) {
        onChange(
            String(pokemon.id)
        );

        setSearch("");
        setOpen(false);
    }

    function handleOpen() {
        setOpen(true);
        setSearch("");
    }

    function normalizeText(
        text: string
    ) {
        return text
            .normalize("NFD")
            .replace(
                /[\u0300-\u036f]/g,
                ""
            )
            .toLowerCase();
    }

    return (
        <div
            ref={containerRef}
            className="relative"
        >
            <button
                type="button"
                onClick={handleOpen}
                className="flex w-full items-center justify-between rounded-xl bg-zinc-800 px-4 py-3 text-left outline-none transition hover:bg-zinc-700"
            >
                <div className="flex min-w-0 items-center gap-3">
                    {selectedPokemon ? (
                        <>
                            <img
                                src={
                                    selectedPokemon.icon
                                }
                                alt={
                                    selectedPokemon.name
                                }
                                className="h-10 w-10 shrink-0 object-contain"
                            />

                            <div className="min-w-0">
                                <p className="truncate font-medium">
                                    {
                                        selectedPokemon.name
                                    }
                                </p>

                                <p className="text-xs text-zinc-500">
                                    #
                                    {String(
                                        selectedPokemon.id
                                    ).padStart(
                                        3,
                                        "0"
                                    )}
                                </p>
                            </div>
                        </>
                    ) : (
                        <>
                            <Search
                                size={18}
                                className="shrink-0 text-zinc-500"
                            />

                            <p className="text-zinc-500">
                                {placeholder}
                            </p>
                        </>
                    )}
                </div>

                <ChevronDown
                    size={18}
                    className={`shrink-0 text-zinc-500 transition ${
                        open
                            ? "rotate-180"
                            : ""
                    }`}
                />
            </button>

            {open && (
                <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl">
                    <div className="border-b border-zinc-800 p-2">
                        <div className="flex items-center gap-2 rounded-xl bg-zinc-800 px-3">
                            <Search
                                size={18}
                                className="shrink-0 text-zinc-500"
                            />

                            <input
                                autoFocus
                                type="text"
                                value={search}
                                onChange={(
                                    event
                                ) =>
                                    setSearch(
                                        event
                                            .target
                                            .value
                                    )
                                }
                                placeholder="Digite o nome ou número..."
                                className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-zinc-500"
                            />
                        </div>
                    </div>

                    <div className="max-h-72 overflow-y-auto">
                        {filteredOptions.length ===
                        0 ? (
                            <div className="p-6 text-center text-sm text-zinc-500">
                                Nenhum Pokémon encontrado.
                            </div>
                        ) : (
                            filteredOptions.map(
                                (
                                    pokemon
                                ) => {
                                    const selected =
                                        pokemon.id ===
                                        Number(
                                            value
                                        );

                                    return (
                                        <button
                                            key={
                                                pokemon.id
                                            }
                                            type="button"
                                            onClick={() =>
                                                handleSelect(
                                                    pokemon
                                                )
                                            }
                                            className="flex w-full items-center justify-between px-4 py-2.5 text-left transition hover:bg-zinc-800"
                                        >
                                            <div className="flex min-w-0 items-center gap-3">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center">
                                                    <img
                                                        src={
                                                            pokemon.icon
                                                        }
                                                        alt={
                                                            pokemon.name
                                                        }
                                                        className="h-10 w-10 object-contain"
                                                        loading="lazy"
                                                    />
                                                </div>

                                                <div className="min-w-0">
                                                    <p className="truncate font-medium">
                                                        {
                                                            pokemon.name
                                                        }
                                                    </p>

                                                    <p className="text-xs text-zinc-500">
                                                        #
                                                        {String(
                                                            pokemon.id
                                                        ).padStart(
                                                            3,
                                                            "0"
                                                        )}
                                                    </p>
                                                </div>
                                            </div>

                                            {selected && (
                                                <Check
                                                    size={
                                                        18
                                                    }
                                                    className="shrink-0 text-violet-400"
                                                />
                                            )}
                                        </button>
                                    );
                                }
                            )
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}