(function(window){

const PokemonCard = {
    props: ['pokemon', 'typeColor'],
    template: '#pokemon-card-template',
    methods: {
        remove() {
            this.$emit('remove', this.pokemon);
        },
    },
};

const app = new Vue({
    el: '#app',
    data() {
        return {
            TYPE_COLOR: {
                "grass": "#78C850",
                "poison": "#A040A0",
                "fire": "#F08030",
                "flying": "#A890F0",
                "water": "#6890F0",
                "bug": "#A8B820",
                "normal": "#A8A878",
                "electric": "#F8D030",
            },
            pokemons: [],
            selectedPokemonTypes: [],
            searchText: '',
        };
    },
    computed: {
        filteredPokemons() {
            return this.pokemons
                .filter(pokemon => pokemon.name.includes(this.searchText))
                .filter(pokemon => {
                    if (this.selectedPokemonTypes.length === 0) return true;
                    return pokemon.types
                        .find(type => this.selectedPokemonTypes.includes(type));
                });
        },
    },
    methods: {
        beforeEnter: function (el) {
            el.style.opacity = 0.2
            el.style.height = '3.325'
        },
        beforeLeave: function (el) {
            el.style.opacity = 0.8
            el.style.height = '7.325'
        },
        enter: function (el, done) {
            var delay = el.dataset.index * 50
            console.log('enter delay: '+ delay)
            console.log('enter el: '+ el)
            setTimeout(function () {
                Velocity(
                el,
                { opacity: 1, height: '10.625em' },
                { complete: done }
                )
            }, delay)
        },
        leave: function (el, done) {
            var delay = el.dataset.index * 50
            console.log('leave delay: '+ delay)
            console.log('leave el: '+ el)
            setTimeout(function () {
                Velocity(
                el,
                { opacity: 0, height: '10.625em' },
                { complete: done }
                )
            }, delay)
        },
        removePokemon(pokemonToDelete) {
            this.pokemons = this.pokemons
                .filter(pokemon => pokemon !== pokemonToDelete);
        },
    },
    created() {
        fetch('data/pokemons.json')
            .then(response => response.json())
            .then(pokemons => this.pokemons = pokemons);
    },
    components: {
        PokemonCard,
    },
});

window.app = app;
})(window);