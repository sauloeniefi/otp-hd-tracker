import type { PokemonFarmConfig } from "../types/pokemon";

const STORAGE_KEY = "otp-hd-tracker:pokemon";

export function getPokemonList(): PokemonFarmConfig[] {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
        return [];
    }

    try {
        return JSON.parse(
            stored
        ) as PokemonFarmConfig[];
    } catch {
        return [];
    }
}

export function savePokemonList(
    pokemonList: PokemonFarmConfig[]
): void {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(pokemonList)
    );
}

export function addPokemon(
    pokemon: PokemonFarmConfig
): PokemonFarmConfig[] {
    const pokemonList = getPokemonList();

    const updatedList = [
        ...pokemonList,
        pokemon,
    ];

    savePokemonList(updatedList);

    return updatedList;
}

export function updatePokemon(
    updatedPokemon: PokemonFarmConfig
): PokemonFarmConfig[] {
    const pokemonList = getPokemonList();

    const updatedList = pokemonList.map(
        (pokemon) =>
            pokemon.pokemonId ===
            updatedPokemon.pokemonId
                ? updatedPokemon
                : pokemon
    );

    savePokemonList(updatedList);

    return updatedList;
}

export function deletePokemon(
    pokemonId: number
): PokemonFarmConfig[] {
    const pokemonList = getPokemonList();

    const updatedList = pokemonList.filter(
        (pokemon) =>
            pokemon.pokemonId !== pokemonId
    );

    savePokemonList(updatedList);

    return updatedList;
}