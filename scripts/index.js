"use strict"

window.onload = init;

const jokesContainer = document.getElementById("jokesContainer");
const categoriesSelect = document.getElementById("categoriesSelect");


function init(){

    const showMeTheJokes = document.getElementById("showMeTheJokes")
    showMeTheJokes.onclick = showMeTheJokesBtnClicked;

    populateCategoriesDropdown()

}

function populateCategoriesDropdown(){
    // populate categories dropdown with distrinct categories from the jokes array
    let categories = getCategoriesArray();
    for(let category of categories){
        let newOption = new Option(category, category);
        categoriesSelect.appendChild(newOption);


    }


}


function getCategoriesArray(){
    let categories = [];
    for(let dadjoke of jokes.dadJokes){
        if(categories.includes(dadjoke.category) !== true){
            categories.push(dadjoke.category)
        }
    }
    categories.sort();
    return categories
}

function addJokeToContainer(joke){
    // {
    //     "id": 1,
    //     "setup": "I'm reading a book on anti-gravity.",
    //     "punchline": "It's impossible to put down!",
    //     "category": "Science"
    //   }

    

    let accordianItemDiv = document.createElement("div");
    accordianItemDiv.className = "accordion-item";
    jokesContainer.appendChild(accordianItemDiv);

    let accordianHeader = document.createElement("h2");
    accordianHeader.className = "accordion-header";
    accordianItemDiv.appendChild(accordianHeader);

    let btn = document.createElement("button");

    
    
    btn.className = "accordion-button collapsed";
    btn.type = "button";
    
    btn.setAttribute("data-bs-toggle", "collapse")
    
    let targetId = "flush-collapse-" + joke.id

    btn.setAttribute("data-bs-target", "#" + targetId)
    
    btn.setAttribute("aria-expanded", "false") 
    
    btn.setAttribute("aria-controls", targetId)

    let btnTextNode = document.createTextNode(joke.setup);
    btn.appendChild(btnTextNode);

    accordianHeader.appendChild(btn)

    let flushCollapseDiv = document.createElement("div");
    flushCollapseDiv.id = ("id",targetId);
    flushCollapseDiv.className = "accordion-collapse collapse"
    flushCollapseDiv.setAttribute("data-bs-parent", "#jokesContainer");

    let accordianBody = document.createElement("div");
    accordianBody.className = "accordion-body";

    let accordianBodyTextNode = document.createTextNode(joke.punchline);
    accordianBody.appendChild(accordianBodyTextNode);

    flushCollapseDiv.appendChild(accordianBody);
    accordianItemDiv.appendChild(flushCollapseDiv);

}

function showMeTheJokesBtnClicked(){
    jokesContainer.innerHTML = "";

    // identify the selected category, and look through and show those jokes
    let selectedCategory = categoriesSelect.value;
    
    for(let dadJoke of jokes.dadJokes){
        if(dadJoke.category == selectedCategory){
            addJokeToContainer(dadJoke);
        }
    }


}