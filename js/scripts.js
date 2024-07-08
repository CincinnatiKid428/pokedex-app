/* Create IIFE to declare the pokemonList[] and return access to functions */
let pokemonRepository = (function(){

    /* Pokemon list array containing pokemon objects, each containing 
    information to display */
    let pokemonList = []; 

    // Function to add a pokemon to the end of the list
    function add(item) {
        pokemonList.push(item);
    }

    // Function to return the pokemonList
    function getAll(){
        return pokemonList;
    }

    // Build thevinitial pokemonList with the 5 pokemon:
    pokemonList.push( 
        {
            name:'Charmander',
            number: 4,
            height: 0.6,
            types: ['fire'],
            nextEvolution: 'Charmeleon'
        }
    );

    pokemonList.push(
        {
            name:'Aron',
            number: 304,
            height: 0.4, 
            types: ['steel','rock'],
            nextEvolution: 'Lairon'
        }
    );

    pokemonList.push(
        {
            name:'Blitzle',
            number: 522,
            height: 0.8,
            types: ['electric'],
            nextEvolution: 'Zebstrika'
        }
    );

    pokemonList.push(
        {
            name:'Minccino',
            number: 572,
            height: 0.4,
            types: ['normal'],
            nextEvolution: 'Cinccino'
        }
    );

    pokemonList.push(
        {
            name:'Shroomish',
            number: 285,
            height: 0.4,
            types: ['grass'],
            nextEvolution: 'Breloom'
        }
    );

    // Return object with references to the functions add() & getAll()
    return {
        add:add,
        getAll:getAll
    };
})();



let tallHeight = 0.7;

/* forEach Pokemon in the pokemonList array ... */

//console.log('* * Checking what value is in pokemonRepository = ' + pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function(currentPokemon) {

    // Print to html page in <p></p> tags the number, name, type and height of each Pokemon in the array
    document.write(
        '<p>#' + currentPokemon.number 
        +' '+ currentPokemon.name 
        +' (Type: ' + currentPokemon.types +')'
        +' (Height: ' + currentPokemon.height +'m)'
    );
    
    // If the Pokemon's height is over 0.7, add additional flavor text
    if(currentPokemon.height > tallHeight) {
        document.write(' - Wow, that\'s big!');
    }

    // Closing paragraph tag
    document.write('</p>');

}); //end forEach loop