// Create IIFE to declare the pokemonList[] and return access to functions 
let pokemonRepository = (function(){

    //*Pokemon list array to hold Pokemon objects & URL of Pokemon API 
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=200';

    let elementLoadingMessage = document.querySelector('.loading-message');
    
    // Array of keys to use to compare to objects added in add() to ensure proper type
    let pokemonItemKeys = ['name', 'detailsUrl'];


    function firstLetterCaps(name) {
        let firstLetter = name.charAt(0).toUpperCase(); 
        let restOfName = name.slice(1);
        return firstLetter + restOfName;
    }

    function showLoadingMessage(){
        elementLoadingMessage.classList.remove('hidden');
    }

    function hideLoadingMessage(){
        elementLoadingMessage.classList.add('hidden');
    }

    // Function to fetch a list of Pokemon from https://pokeapi.co/api/v2/pokemon/ 
    function loadList() {
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
            console.error(e);
            alert('Error fetching data from '+apiUrl+' : '+e);
            hideLoadingMessage();
        })
    }


    // Function to fetch details about single/list? of Pokemon
    function loadDetails(pokemon){

        showLoadingMessage();

        let url = pokemon.detailsUrl; 
        return fetch(url).then(function(response) { // fetch returns promise to load external details
            return response.json(); // .json also returns a promise with parsed JSON data
        }).then(function(details) {

            hideLoadingMessage();

            // Add the details from the resolved promise to the Pokemon item
            pokemon.imageFrontUrl = details.sprites.front_default;
            pokemon.imageBackUrl = details.sprites.back_default;
            pokemon.order = details.order;
            pokemon.height = details.height;
            pokemon.types = details.types;
            pokemon.abilities = details.abilities;

        }).catch(function(e) {
            hideLoadingMessage();
            console.error('pokemonRepository.loadDetails()|ERROR|'+e);
            alert('Error while loading Pokemon information :'+e)
        });

    }


    // Function to add a Pokemon to the end of the list
    function add(item) {

        // Check if item is an object and has the correct number of keys
        if( (typeof(item) === 'object') && (Object.keys(item).length === pokemonItemKeys.length) ) {

            let keyCompareResult = true;
            // Compare every item in keys array to ensure they are identical to the pokemonItemKeys array
            for(let i=0; i<pokemonItemKeys.length; i++){

                if(Object.keys(item)[i] !== pokemonItemKeys[i]) {

                    console.error('pokemonRepository.add()| Invalid key found: Object.keys(item)['+i+']!==pokemonItemKeys['+i+']: '+(Object.keys(item)[i] +'!=='+ pokemonItemKeys[i]));
                    keyCompareResult = false;
                    break;
                }
            }

            // If keyCompareResult is still true, then we have proper pokemon object structure and add the item

            if(keyCompareResult) {
                pokemonList.push(item);
            } else {
                console.error('* pokemonRepository.add() | Invalid pokemon object format, cannot add to list!');
                alert('Something went wrong loading the Pokemon data into list.');
            }
        }
    }


    // Function to add a Pokemon item to the Pokemon unordered list as a new button with event listener
    function addListItem(pokemon) {


        let elementPokemonList = document.querySelector('#list-for-pokemon');
        let listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.classList.add('border-0');
        listItem.classList.add('row');        
        
        let button = document.createElement('button');
        button.innerText = firstLetterCaps(pokemon.name);
        button.classList.add('btn');
        button.classList.add('btn-outline-dark');
        button.classList.add('col-8');
        button.classList.add('col-sm-6');

        // Add attributes data-toggle and data-target to <button>
        button.setAttribute("data-toggle","modal");
        button.setAttribute("data-target","#pokemonModal");

        listItem.appendChild(button);
        elementPokemonList.appendChild(listItem);

        // Add event listener to button that will make call to showDetails()
        addListenerToListItem(button, pokemon);
    }


    // Function that will add event listener to a button created in addListItem()
    function addListenerToListItem(button, pokemon){
        button.addEventListener('click', function(event){
            showDetails(pokemon);
        });
    }


    // Function will show details in a modal about pokemon argument
    function showDetails(pokemon){

        // DOM elements selected
        let modalTitle = document.querySelector('.modal-title');
        let modalInfo = document.querySelector('#pokemonInfo');
        let modalFrontImg = $('#pokemonFrontImg');
        let modalBackImg = $('#pokemonBackImg');

        //Clear out any existing content from prior use of modal
        modalTitle.innerText = "Loading...";
        $('#pokemonInfo').empty();

        //Reset images back to loading spinner GIF
        modalFrontImg.attr('src', "img/loading-spinner-32x32.gif");
        modalBackImg.attr('src', "img/loading-spinner-32x32.gif");

        //Load pokemon details & prepare the modal with buttons and data from the Pokemon object argument
        loadDetails(pokemon).then(function(){
        
            //Title for modal with Pokemon name
            modalTitle.innerText = firstLetterCaps(pokemon.name);

            //Set Pokemon image src attribute with dynamic URLs
            modalFrontImg.attr('src', pokemon.imageFrontUrl);
            modalBackImg.attr('src', pokemon.imageBackUrl);

            //Add Pokemon info each as a list-group-item <li>

        //--Height-------------------------------------
            let heightRow = document.createElement('li');
            heightRow.classList.add('row');

            let heightLabel = document.createElement('div');
            heightLabel.classList.add('col-6');
            heightLabel.classList.add('h5');
            heightLabel.classList.add('text-right')
            heightLabel.innerText = 'Height:';

            let heightValue = document.createElement('div');
            heightValue.classList.add('col-6');
            heightValue.classList.add('h5');
            heightValue.classList.add('text-left');
            heightValue.innerText = pokemon.height;

            //Add height to the modal body
            heightRow.appendChild(heightLabel);
            heightRow.appendChild(heightValue);
            modalInfo.appendChild(heightRow);

        //--Types-------------------------------------
            let typesRow = document.createElement('li');
            typesRow.classList.add('row');

            let typesLabel = document.createElement('div');
            typesLabel.classList.add('col-6');
            typesLabel.classList.add('h5');
            typesLabel.classList.add('text-right');
            typesLabel.innerText = 'Types:';

            let typesValue = document.createElement('td');
            typesValue.classList.add('col-6');
            typesValue.classList.add('h5');
            typesValue.classList.add('text-left');

            //Array object holding all Pokemon types as strings
            let typesObj = []; 

            //Store all the types in typesObj
            pokemon.types.forEach((item)=> {
                typesObj.push(firstLetterCaps(item.type.name));
            });

            //Formatting to add space after the comma
            typesValue.innerText = typesObj.toString().replaceAll(",",", ");

            //Add types to the modal body
            typesRow.appendChild(typesLabel);
            typesRow.appendChild(typesValue);
            modalInfo.appendChild(typesRow);

        //--Abilities-------------------------------------
            let abilitiesRow = document.createElement('li');
            abilitiesRow.classList.add('row');

            let abilitiesLabel = document.createElement('div');
            abilitiesLabel.classList.add('col-6');
            abilitiesLabel.classList.add('h5');
            abilitiesLabel.classList.add('text-right');
            abilitiesLabel.innerText = 'Abilities:';

            let abilitiesValue = document.createElement('td');
            abilitiesValue.classList.add('col-6');
            abilitiesValue.classList.add('h5');
            abilitiesValue.classList.add('text-left');

            //Array object holding all Pokemon abilities as strings
            let abilitiesObj = []; 

            //Store all the abilities in abilitiesObj
            pokemon.abilities.forEach((item)=> {
                abilitiesObj.push(firstLetterCaps(item.ability.name));
            });

            //Formatting to add space after the comma
            abilitiesValue.innerText = abilitiesObj.toString().replaceAll(",",", ");

            //Add abilities to the modal body
            abilitiesRow.appendChild(abilitiesLabel);
            abilitiesRow.appendChild(abilitiesValue);
            modalInfo.appendChild(abilitiesRow);

        //--New info would be added here--//

        });
    }


    function hideDetails(){
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
    }


    // Function to use array filter() method to search for a Pokemon by name 
    // NOTE: This function is not used by the application but was part of the building of the project
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


    function getAll(){
        return pokemonList;
    }

    
//Event listener for Escape key to close a modal window
window.addEventListener('keydown',(e)=> {
    let modalContainer = document.querySelector('#modal-container');
    if(e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideDetails();
    }
});

    /* Return object with references to the functions:
        loadList()
        loadDetails()
        add()
        addListItem()
        contains() --not used
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



// Load the Pokemon list
pokemonRepository.loadList().then(function(){
    
    // forEach Pokemon in the pokemonList array ...
    pokemonRepository.getAll().forEach(function(pokemon) {
        // Add the Pokemon to the HTML page in the <ul> with class pokemon-list
        pokemonRepository.addListItem(pokemon);
        });
}).catch(function(e) {
    console.error('Rejected promise on loadList()|'+e);
    alert('Error loading data into list: '+e);
});
