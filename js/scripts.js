// Create IIFE to declare the pokemonList[] and return access to functions 
let pokemonRepository = (function(){

    /* Pokemon list array containing Pokemon objects, each containing 
    information to display */
    let pokemonList = [];

    // Array of keys to use to compare to objects added in add() to ensure proper type
    let pokemonItemKeys = ['name', 'number', 'height', 'types', 'nextEvolution'];

    // Function to add a Pokemon to the end of the list
    function add(item) {

        // Check if item is an object and has the correct number of keys
        //console.log('* pokemonRepository.add() | typeof(item) === "object": '+(typeof(item)==="object") +' : '+ typeof(item));
        //console.log('* pokemonRepository.add() | (Object.keys(item).length === pokemonItemKeys.length): '+(Object.keys(item).length === pokemonItemKeys.length));

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
            //console.log('* pokemonRepository.add() | keyCompareResult: '+keyCompareResult);

            if(keyCompareResult) {
                pokemonList.push(item);
                console.log('* pokemonRepository.add() | Added pokemon to list: '+item.name);
            } else {
                console.log('* pokemonRepository.add() | Invalid pokemon object format, cannot add to list!');
            }
        }
    }// end add()

    // Function to add a Pokemon item to the Pokemon unordered list 
    function addListItem(pokemon) {

        // Get the DOM node for the pokmeon list
        let elementPokemonList = document.querySelector('.pokemon-list');
        console.log('elementPokemonList = '+elementPokemonList);

        // Create new <li> to be appended to the elementPokemonList
        let listItem = document.createElement('li');

        // Create new <button> to be appended to the listItem & set innerText
        let button = document.createElement('button');
        button.innerText = pokemon.name;

        // Add class pokemon-button to the new button
        button.classList.add('pokemon-button');

        // Append button to the <li>, then append the <li> to the <ul>
        listItem.appendChild(button);
        elementPokemonList.appendChild(listItem);

        // Add event listener to button
        addListenerToListItem(button, pokemon);
    }// end addListItem()

    // Function that will add event listener to a button created in addListItem()
    function addListenerToListItem(button, pokemon){
        button.addEventListener('click', function(event){
            console.log('* Event handler | clicked '+pokemon.name+' button');
            showDetails(pokemon);
        });
    }// end addListerToListItem()

    // Function will show details about passed Pokemon parameter inside event handler
    function showDetails(pokemon){
        console.log('* showDetails() | Will show '+pokemon.name+' details here later');
    }// end showDetails()

    // Function to use array filter() method to search for a Pokemon by name 
    function contains(pokemonName) {

        console.log ('* pokemonRepository.contains() | Function called to search for ' + pokemonName);


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



    
    // Build the initial pokemonList:
    add(
        {
            name:'Charmander',
            number: 4,
            height: 0.6,
            types: ['fire'],
            nextEvolution: 'Charmeleon'
        }
    );

    add(
        {
            name:'Aron',
            number: 304,
            height: 0.4, 
            types: ['steel','rock'],
            nextEvolution: 'Lairon'
        }
    );

    add(
        {
            name:'Blitzle',
            number: 522,
            height: 0.8,
            types: ['electric'],
            nextEvolution: 'Zebstrika'
        }
    );

    add(
        {
            name:'Minccino',
            number: 572,
            height: 0.4,
            types: ['normal'],
            nextEvolution: 'Cinccino'
        }
    );

    add(
        {
            name:'Shroomish',
            number: 285,
            height: 0.4,
            types: ['grass'],
            nextEvolution: 'Breloom'
        }
    );

    add(
        {
            name: 'Pikachu',
            number: 25,
            height: 0.41,
            types: ['electric'],
            nextEvolution: 'Raichu'
        }
    );
    
    add(
        {
            name: 'Raichu',
            number: 26,
            height: 0.79,
            types: ['electric'],
            nextEvolution: 'none'
        }
    );

    // Return object with references to the functions add() , addListItem(), contains() & getAll()
    // addListenerToListItem() & showDetails() will be used from within IIFE scope
    return {
        add:add,
        addListItem:addListItem,
        contains:contains,
        getAll:getAll
    };
})(); //end-IIFE

let tallHeight = 0.7;

/* forEach Pokemon in the pokemonList array ... */
pokemonRepository.getAll().forEach(function(currentPokemon) {

    // Add the Pokemon to the HTML page in the <ul> with class pokemon-list
    pokemonRepository.addListItem(currentPokemon);

}); //end forEach loop