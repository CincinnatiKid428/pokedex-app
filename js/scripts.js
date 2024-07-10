/* Create IIFE to declare the pokemonList[] and return access to functions */
let pokemonRepository = (function(){

    /* Pokemon list array containing pokemon objects, each containing 
    information to display */
    let pokemonList = [];

    // Array of keys to use to compare to objects added in add() to ensure proper type
    let pokemonItemKeys = ['name', 'number', 'height', 'types', 'nextEvolution'];

    // Function to add a pokemon to the end of the list
    function add(item) {

        // Check if item is an object and has the correct number of keys
        console.log('* pokemonRepository.add() | typeof(item) === "object": '+(typeof(item)==="object") +' : '+ typeof(item));
        console.log('* pokemonRepository.add() | (Object.keys(item).length === pokemonItemKeys.length): '+(Object.keys(item).length === pokemonItemKeys.length));

        if( (typeof(item) === 'object') && (Object.keys(item).length === pokemonItemKeys.length) ) {

            let keyCompareResult = true;
            // Compare every item in keys array to ensure they are identical to the pokemonItemKeys array
            for(let i=0; i<pokemonItemKeys.length; i++){

                if(Object.keys(item)[i] !== pokemonItemKeys[i]) {

                    console.log('* pokemonRepository.add() | Invalid key found: Object.keys(item)['+i+']!==pokemonItemKeys['+i+']: '+(Object.keys(item)[i] +'!=='+ pokemonItemKeys[i]));
                    keyCompareResult = false;
                    break;

                }//end-if

            }//end-for

            // If keyCompareResult is still true, then we have proper pokemon object structure and add the item
            console.log('* pokemonRepository.add() | keyCompareResult: '+keyCompareResult);

            if(keyCompareResult) {
                pokemonList.push(item);
                console.log('* pokemonRepository.add() | Added pokemon to list: '+item.name);
            } else {
                console.log('* pokemonRepository.add() | Invalid pokemon object format, cannot add to list!');
            }
        }
    }// end add()

    // Function to use array filter() method to search for a pokemon by name 
    function contains(pokemonName) {

        console.log ('* pokemonRepository.contains() | Function called to search for ' + pokemonName);

        /* Debugging forEach loop I used to ensure string values were 
        correct during comparisons and proper comparisons made */

        /*pokemonList.forEach(function(item) {
            if((item.name).toLowerCase() === (pokemonName).toString().toLowerCase()) {
                console.log('* pokemonRepository.contains() | CHECKING: MATCH!: '+item.name.toLowerCase()+' === '+pokemonName.toString().toLowerCase());
            } else {
                console.log('* pokemonRepository.contains() | CHECKING: '+item.name.toLowerCase()+' === '+pokemonName.toString().toLowerCase());
            }
        }); */

        // Initialize the filter() result array
        let isInListResult = [];

        isInListResult = pokemonList.filter( item => item.name.toLowerCase() === pokemonName.toString().toLowerCase() );
        console.log ('* pokemonRepository.contains() | isInListResult is ' + isInListResult);


        if(isInListResult.length > 0) {
            console.log ('* pokemonRepository.contains() | ' + (pokemonName).toString().toUpperCase() + ' was found in the list.');
        } else {
            console.log ('* pokemonRepository.contains() | ' + (pokemonName).toString().toUpperCase() + ' was not found in the list.');
        }
    }// end contains()


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

    // Return object with references to the functions add() , contains() & getAll()
    return {
        add:add,
        contains:contains,
        getAll:getAll
    };
})(); //end-IIFE



let tallHeight = 0.7;

//Test adding a valid and invalid pokemon object:

console.log('* * Trying to add valid Pikachu object');
//Valid format
pokemonRepository.add(
    {
        name: 'Pikachu',
        number: 25,
        height: 0.41,
        types: ['electric'],
        nextEvolution: 'Raichu'
    }
);

console.log('* * Trying to add invalid Raichu object');
//Invalid format
pokemonRepository.add(
    {
        name: 'Raichu',
        number: 26,
        height: 0.79,
        types: ['electric'],
        weight: 66.1
    }
);

// Search for newly added Pikachu and Raichu using pokemonRepository.contains() function
console.log('* * Trying to search for Pikachu object');
pokemonRepository.contains('pikachu');
console.log('* * Trying to search for Raichu object');
pokemonRepository.contains('raichu');

/* forEach Pokemon in the pokemonList array ... */
pokemonRepository.getAll().forEach(function(currentPokemon) {

    // Print to html page in <p></p> tags the number, name, type and height of each Pokemon in the array
    document.write(
        '<p>#' + currentPokemon.number 
        +' '+ currentPokemon.name 
        +' | Type: ' + currentPokemon.types
        +' | Height: ' + currentPokemon.height +'m'
    );
    
    // If the Pokemon's height is over 0.7, add additional flavor text
    if(currentPokemon.height > tallHeight) {
        document.write(' (Wow, that\'s big!)');
    }

    document.write(' | Evolves into: ' + currentPokemon.nextEvolution + ')');

    // Closing paragraph tag
    document.write('</p>');

}); //end forEach loop