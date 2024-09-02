let pokemonRepository=function(){console.log("pokemonRepository|Starting IIFE");let e=[],t="https://pokeapi.co/api/v2/pokemon/",o=document.querySelector(".loading-message"),n=["name","detailsUrl"];function i(e){let t;return e.charAt(0).toUpperCase()+e.slice(1)}function s(){console.log("pokemonRepository.showLoadingMessage()|Removing .hidden class to classlist of loading message element"),o.classList.remove("hidden")}function a(){console.log("pokemonRepository.hideLoadingMessage()|Adding .hidden class to classlist of loading message element"),o.classList.add("hidden")}function l(e){return s(),fetch(e.detailsUrl).then(function(e){return e.json()}).then(function(t){a(),e.imageFrontUrl=t.sprites.front_default,e.imageBackUrl=t.sprites.back_default,e.order=t.order,e.height=t.height,e.types=t.types,e.abilities=t.abilities}).catch(function(e){a(),console.error("pokemonRepository.loadDetails()|ERROR|"+e),alert("Error while loading Pokemon information :"+e)})}function d(t){if("object"==typeof t&&Object.keys(t).length===n.length){let o=!0;for(let i=0;i<n.length;i++)if(Object.keys(t)[i]!==n[i]){console.log("pokemonRepository.add()| Invalid key found: Object.keys(item)["+i+"]!==pokemonItemKeys["+i+"]: "+Object.keys(t)[i]+"!=="+n[i]),o=!1;break}o?e.push(t):console.log("* pokemonRepository.add() | Invalid pokemon object format, cannot add to list!")}}function r(){return e}return window.addEventListener("keydown",e=>{console.log("Escape key pressed");let t=document.querySelector("#modal-container");"Escape"===e.key&&t.classList.contains("is-visible")&&(document.querySelector("#modal-container").classList.remove("is-visible"),console.log("hideDetails()| Modal should be hidden now"))}),{loadList:function e(){return console.log("pokemonRepository.loadList()| Called, fetching data from "+t),s(),fetch(t).then(function(e){return e.json()}).then(function(e){e.results.forEach(function(e){d({name:e.name,detailsUrl:e.url})}),a()}).catch(function(e){console.error(e),alert("Error fetching data from "+t+" : "+e),a()})},loadDetails:l,add:d,addListItem:function e(t){let o=document.querySelector("#list-for-pokemon"),n=document.createElement("li");n.classList.add("list-group-item"),n.classList.add("row");let s=document.createElement("button");s.innerText=i(t.name),s.classList.add("btn"),s.classList.add("btn-outline-dark"),s.classList.add("col-8"),s.classList.add("col-sm-6"),s.setAttribute("data-toggle","modal"),s.setAttribute("data-target","#pokemonModal"),n.appendChild(s),o.appendChild(n),function e(t,o){t.addEventListener("click",function(e){var t;let n,s,a,d;console.log("* Event handler | clicked "+o.name+" button"),t=o,n=document.querySelector(".modal-title"),s=document.querySelector("#pokemonInfo"),a=$("#pokemonFrontImg"),d=$("#pokemonBackImg"),n.innerText="Loading...",$("#pokemonInfo").empty(),a.attr("src","img/loading-spinner-32x32.gif"),d.attr("src","img/loading-spinner-32x32.gif"),l(t).then(function(){n.innerText=i(t.name),a.attr("src",t.imageFrontUrl),d.attr("src",t.imageBackUrl);let e=document.createElement("li");e.classList.add("row");let o=document.createElement("div");o.classList.add("col-6"),o.classList.add("h5"),o.classList.add("text-right"),o.innerText="Height:";let l=document.createElement("div");l.classList.add("col-6"),l.classList.add("h5"),l.classList.add("text-left"),l.innerText=t.height,e.appendChild(o),e.appendChild(l),s.appendChild(e);let r=document.createElement("li");r.classList.add("row");let c=document.createElement("div");c.classList.add("col-6"),c.classList.add("h5"),c.classList.add("text-right"),c.innerText="Types:";let p=document.createElement("td");p.classList.add("col-6"),p.classList.add("h5"),p.classList.add("text-left");let m=[];t.types.forEach(e=>{m.push(i(e.type.name))}),p.innerText=m.toString().replaceAll(",",", "),r.appendChild(c),r.appendChild(p),s.appendChild(r);let g=document.createElement("li");g.classList.add("row");let h=document.createElement("div");h.classList.add("col-6"),h.classList.add("h5"),h.classList.add("text-right"),h.innerText="Abilities:";let u=document.createElement("td");u.classList.add("col-6"),u.classList.add("h5"),u.classList.add("text-left");let f=[];t.abilities.forEach(e=>{f.push(i(e.ability.name))}),u.innerText=f.toString().replaceAll(",",", "),g.appendChild(h),g.appendChild(u),s.appendChild(g)})})}(s,t)},contains:function t(o){console.log("* pokemonRepository.contains() | Function called to search for "+o);let n=[];n=e.filter(e=>e.name.toLowerCase()===o.toString().toLowerCase()),console.log("* pokemonRepository.contains() | isInListResult is "+n),n.length>0?console.log("* pokemonRepository.contains() | "+o.toString().toUpperCase()+" was found in the list."):console.log("* pokemonRepository.contains() | "+o.toString().toUpperCase()+" was not found in the list.")},getAll:r}}();pokemonRepository.loadList().then(function(){console.log("Resolved promise on loadList()|Data should be loaded. Size of loaded pokemon list should be 20: "+pokemonRepository.getAll().length),pokemonRepository.getAll().forEach(function(e){pokemonRepository.addListItem(e)})}).catch(function(e){console.error("Rejected promise on loadList()|"+e),alert("Error loading data into list: "+e)});