import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";

import type { PokemonFarm } from "../data/pokemon";

interface PokemonAutocompleteProps {
    value: string;
    options: PokemonFarm[];
    onChange: (pokemonId: string) => void;
    placeholder?: string;
}

export function PokemonAutocomplete({
    value,
    options,
    onChange,
    placeholder = "Buscar Pokémon...",
}: PokemonAutocompleteProps) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    const containerRef = useRef<HTMLDivElement>(null);

    const selectedPokemon = options.find(
        (pokemon) => pokemon.id === value
    );

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
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
        .sort((a, b) =>
            a.name.localeCompare(b.name, "pt-BR")
        )
        .filter((pokemon) =>
            normalizeText(pokemon.name).includes(
                normalizeText(search)
            )
        );

    function handleSelect(pokemon: PokemonFarm) {
        onChange(pokemon.id);
        setSearch("");
        setOpen(false);
    }

    function handleOpen() {
        setOpen(true);
        setSearch("");
    }

    function normalizeText(value: string): string {
        return value
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
    }

    function getPokemonIcon(icon: string) {
        return `${import.meta.env.BASE_URL}${icon}`;
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
                    {!selectedPokemon && (
                        <Search
                            size={18}
                            className="shrink-0 text-zinc-500"
                        />
                    )}

                    {selectedPokemon ? (
                        <>
                            <img
                                src={getPokemonIcon(
                                    selectedPokemon.icon
                                )}
                                alt={selectedPokemon.name}
                                className="h-10 w-10 shrink-0 object-contain"
                            />

                            <div className="min-w-0">
                                <p className="truncate font-medium">
                                    {selectedPokemon.name}
                                </p>

                                <p className="text-xs text-zinc-500">
                                    {selectedPokemon.value.toLocaleString(
                                        "pt-BR"
                                    )}{" "}
                                    HDs
                                </p>
                            </div>
                        </>
                    ) : (
                        <p className="text-zinc-500">
                            {placeholder}
                        </p>
                    )}
                </div>

                <ChevronDown
                    size={18}
                    className={`shrink-0 text-zinc-500 transition ${open ? "rotate-180" : ""
                        }`}
                />
            </button>

            {open && (
                <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl">
                    <div className="border-b border-zinc-800 p-2">
                        <div className="flex items-center gap-2 rounded-xl bg-zinc-800 px-3">
                            <Search
                                size={18}
                                className="text-zinc-500"
                            />

                            <input
                                autoFocus
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                placeholder="Digite o nome..."
                                className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-zinc-500"
                            />
                        </div>
                    </div>

                    <div className="max-h-64 overflow-y-auto">
                        {filteredOptions.length === 0 ? (
                            <div className="p-6 text-center text-sm text-zinc-500">
                                Nenhum Pokémon encontrado.
                            </div>
                        ) : (
                            filteredOptions.map((pokemon) => {
                                const selected =
                                    pokemon.id === value;

                                return (
                                    <button
                                        key={pokemon.id}
                                        type="button"
                                        onClick={() => handleSelect(pokemon)}
                                        className="flex w-full items-center justify-between px-4 py-3 text-left transition hover:bg-zinc-800"
                                    >
                                        <div className="flex min-w-0 items-center gap-3">
                                            <img
                                                src={getPokemonIcon(pokemon.icon)}
                                                alt={pokemon.name}
                                                className="h-10 w-10 shrink-0 object-contain"
                                                loading="lazy"
                                            />

                                            <div>
                                                <p className="font-medium">
                                                    {pokemon.name}
                                                </p>

                                                <p className="text-xs text-zinc-500">
                                                    {pokemon.value.toLocaleString("pt-BR")} HDs
                                                </p>
                                            </div>
                                        </div>

                                        {selected && (
                                            <Check
                                                size={18}
                                                className="text-violet-400"
                                            />
                                        )}
                                    </button>
                                );
                            })
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}