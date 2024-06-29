/* Pokemon list array containing pokemon objects, each containing 
    information to display */

let pokemonList = []; 

// Adding 5 pokemon objects
pokemonList[0] = {
    name:'Charmander',
    number: 4,
    height: 0.6,
    types: ['fire'],
    nextEvolution: 'Charmeleon'
};

pokemonList[1] = {
    name:'Aron',
    number: 304,
    height: 0.4, 
    types: ['steel','rock'],
    nextEvolution: 'Lairon'
};

pokemonList[2] = {
    name:'Blitzle',
    number: 522,
    height: 0.8,
    types: ['electric'],
    nextEvolution: 'Zebstrika'
};

pokemonList[3] = {
    name:'Minccino',
    number: 572,
    height: 0.4,
    types: ['normal'],
    nextEvolution: 'Cinccino'
};

pokemonList[4] = {
    name:'Shroomish',
    number: 285,
    height: 0.4,
    types: ['grass'],
    nextEvolution: 'Breloom'
};

let tallHeight = 0.7;

/* For each Pokemon in the pokemonList array ... */
for (let i=0; i < pokemonList.length; i++) {

    // Print to html page in <p></p> tags the number, name, type and height of each Pokemon in the array
    document.write(
        '<p>#' + pokemonList[i].number 
        +' '+ pokemonList[i].name 
        +' (Type: ' + pokemonList[i].types +')'
        +' (Height: ' + pokemonList[i].height +'m)'
    );
    
    // If the Pokemon's height is over 0.7, add additional flavor text
    if(pokemonList[i].height > tallHeight) {
        document.write(' - Wow, that\'s big!');
    }

    // Closing paragraph tag
    document.write('</p>');

}; //end for loop
    