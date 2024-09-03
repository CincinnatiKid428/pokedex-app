# Simple Pokedex App 

### Description
This project is a simple web application built using HTML, CSS and JavaScript (jQuery, Bootstrap and Polyfills).  It will make use of an external API call to load information about 200 Pokemon, provided by PokeAPI (https://pokeapi.co/api/v2/pokemon/), and display some basic information to the user via a modal window when the user selects a Pokemon from the list.

jQuery was used for DOM manipulation in the modal window, specifically with regards to the images of the Pokemon. 

The Bootstrap framework was used to help create the navbar, list groups and the modal window for this application.  As the first framework I worked with, it was a learning curve to see how the components worked and with specific structure.  It proved to help build the components much quicker, but I also found customizations more challenging as there are many CSS classes that may need to be overridden to achieve a certain styling.  I took advantage of ChatGPT to help identify ways to override the Bootstrap CSS for the modal window and allow for centering the title (which is aligned to the left by default).
 
## How to Use the Application
Once running live on a web server, navigate to the index.html page and upon loading you should be presented with a screen similar to this:

![Screenshot of large size screen displaying loaded index.html](/readme-img/app-lg-screen.jpg)
 
Viewed in a web browser on a desktop/laptop with ample screen size, the user will see the listing of buttons each with the name of a Pokemon.  The navbar will occupy the top portion of the window and has links to pages for demonstration purposes.  I have linked to the sites of the PokeAPI, Bootstrap and GitHub as I have used all these sites during the development process. 
The page uses responsive design and so if the user visits the application on a mobile device (iPad, mobile phone) the navbar menu will collapse into a hamburger menu (seen below in the top right) and buttons will respond and display similar to this:

![Screenshot of small size screen displaying loaded index.html](/readme-img/app-sm-screen.jpg)
 
To see information about a Pokemon in the list  the user would click, use keyboard navigation or tap on the button desired.  For example, if Charizard was selected, it would display basic information about Charizard using a modal window and would appear as follows: 

![Screenshot of modal window with details displayed](/readme-img/app-modal.jpg)
 
The title will display the name of the Pokemon, followed by a front/back sprite image of the Pokemon and finally some basic details: Height, Type and Abilities.  The details area is scrollable if the text does not fit within the confines of the modal element.  There are two close buttons, one X button in the top right of the window and the Close button in the bottom right.  To close the modal, the user can use either of these buttons, press Esc on the keyboard or click/tap outside of the modal window.
 
## Dependencies for this Project:
- fetch-polyfill (found in dist/js folder)
- promise-polyfill (found in dist/js folder)
- jQuery (CDN found in index.html):

  `<script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>`

- Bootstrap CSS (CDN found in index.html):

   `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">`

- Bootstrap Popper (CDN found in index.html):

  `<script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>`

- Bootstrap (CDN found in index.html):

  `<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>`
