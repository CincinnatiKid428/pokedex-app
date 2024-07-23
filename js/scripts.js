// Create IIFE to declare the pokemonList[] and return access to functions 
let pokemonRepository = (function(){

    console.log('pokemonRepository|Starting IIFE');

    //*Pokemon list array to hold Pokemon objects & URL of Pokemon API 
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

    // Loading message element
    let elementLoadingMessage = document.querySelector('.loading-message');
    
    // Array of keys to use to compare to objects added in add() to ensure proper type
    let pokemonItemKeys = ['name', 'detailsUrl'];

    // Function to show the loading message
    function showLoadingMessage(){
        console.log('pokemonRepository.showLoadingMessage()|Removing .hidden class to classlist of loading message element');
        elementLoadingMessage.classList.remove('hidden');
    }

    // Function to hide the loading message
    function hideLoadingMessage(){
        console.log('pokemonRepository.hideLoadingMessage()|Adding .hidden class to classlist of loading message element');
        elementLoadingMessage.classList.add('hidden');
    }


    // Function to fetch a list of Pokemon from https://pokeapi.co/api/v2/pokemon/ 
    function loadList() {
        console.log("pokemonRepository.loadList()| Called, fetching data from "+apiUrl);
        showLoadingMessage();

        return fetch(apiUrl).then(function(response){ //fetch returns a promise
            return response.json(); // .json() returns a promise 
        }).then(function(jsonData) {

            // forEach object in the parsed JSON Pokemon data...
            jsonData.results.forEach(function(item){
                // Create a simple Pokemon object with name & detailsUrl
                let pokemon = { 
                    name: item.name,
                    detailsUrl: item.url
                };
                // Add the Pokemon object to the repository list
                add(pokemon);
            });
            hideLoadingMessage();
            
        }).catch(function(e) {
            hideLoadingMessage();
            console.error(e);
        })
    } // end loadList()


    // Function to fetch details about single/list? of Pokemon
    function loadDetails(pokemon){

        showLoadingMessage();

        let url = pokemon.detailsUrl; 
        return fetch(url).then(function(response) { // fetch returns promise to load external details
            return response.json(); // .json also returns a promise with parsed JSON data
        }).then(function(details) {

            hideLoadingMessage();

            // Add the details from the resolved promise to the Pokemon item
            pokemon.imageUrl = details.sprites.front_default;
            pokemon.height = details.height;
            pokemon.types = details.types;

        }).catch(function(e) {
            hideLoadingMessage();
            console.error('pokemonRepository.loadDetails()|ERROR|'+e);
        });

    } // end loadDetails()


    // Function to add a Pokemon to the end of the list
    function add(item) {

        //console.log('pokemonRepository.add()|Trying to add :'+item+' to pokemonList: '+pokemonList);

        // Check if item is an object and has the correct number of keys
        if( (typeof(item) === 'object') && (Object.keys(item).length === pokemonItemKeys.length) ) {

            let keyCompareResult = true;
            // Compare every item in keys array to ensure they are identical to the pokemonItemKeys array
            for(let i=0; i<pokemonItemKeys.length; i++){

                if(Object.keys(item)[i] !== pokemonItemKeys[i]) {

                    console.log('pokemonRepository.add()| Invalid key found: Object.keys(item)['+i+']!==pokemonItemKeys['+i+']: '+(Object.keys(item)[i] +'!=='+ pokemonItemKeys[i]));
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


    // Function to add a Pokemon item to the Pokemon unordered list as a new button with event listener
    function addListItem(pokemon) {

        // Get the DOM node for the pokmeon list
        let elementPokemonList = document.querySelector('.pokemon-list');
        console.log('pokemonRepository.addListItem()|elementPokemonList = '+elementPokemonList);

        // Create new <li> to be appended to the elementPokemonList
        let listItem = document.createElement('li');

        // Create new <button> to be appended to the listItem
        let button = document.createElement('button');

        // Capitalize first letter of Pokemon's name and set button innerText
        let firstLetter = pokemon.name.charAt(0).toUpperCase(); 
        let restOfName = pokemon.name.slice(1);
        button.innerText = firstLetter + restOfName;

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
        loadDetails(pokemon).then(function(){
            console.log('pokemonRepository.showDetails()|'+JSON.stringify(pokemon));
        });
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
        //console.log('pokemonRepository.getAll()|Returning pokemonList with length: '+pokemonList.length);
        return pokemonList;
    }


    /* Return object with references to the functions:
        loadList()
        loadDetails()
        add()
        addListItem()
        contains()
        getAll()

     addListenerToListItem() & showDetails() will be used from within IIFE scope 
    */
    return {
        loadList:loadList,
        loadDetails:loadDetails,
        add:add,
        addListItem:addListItem,
        contains:contains,
        getAll:getAll
    };
})(); //end-IIFE

let tallHeight = 0.7;

// Load the Pokemon list
pokemonRepository.loadList().then(function(){
    console.log('Resolved promise on loadList()|Data should be loaded. Size of loaded pokemon list should be 20: '+pokemonRepository.getAll().length);
    
    // forEach Pokemon in the pokemonList array ...
    pokemonRepository.getAll().forEach(function(pokemon) {
        // Add the Pokemon to the HTML page in the <ul> with class pokemon-list
        pokemonRepository.addListItem(pokemon);
        });
}).catch(function(e) {
    console.error('Rejected promise on loadList()|'+e);
});
