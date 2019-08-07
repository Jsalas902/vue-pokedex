const app = new Vue({
    el: '#app',
    data() {
        return {
            pokemons: [],
            typeColor: {
                "grass": "#78C850",
                "poison": "#A040A0",
                "fire": "#F08030",
                "flying": "#A890F0",
                "water": "#6890F0",
                "bug": "#A8B820",
                "normal": "#A8A878",
                "electric": "#F8D030",
            }
        }
    },
    methods: {
        removePokemon(pokemonToDelete) {
            this.pokemons = this.pokemons
                .filter(pokemon => pokemon !== pokemonToDelete);
        }
    },
    created() {
        fetch('data/pokemons.json')
            .then(response => response.json())
            .then(pokemons => this.pokemons = pokemons);
    }
});