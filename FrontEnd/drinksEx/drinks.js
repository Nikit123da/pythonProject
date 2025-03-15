let drinkWindow = document.getElementById("drinksWindow");
let drinksArr = []; //all the drinks
let ingridientsArr = [];
let messurmentsArr = [];
let selectedValue = document.getElementById("select"); 


(function addTitles(url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list') {
    fetch(url)
        .then(response => response.json()) 
        .then(data => {
            data.drinks.forEach(element => {
                 // Accessing `drinks` array in the response
                addToSearch(element.strIngredient1); // Assuming `strIngredient1` is the property for ingredient names
            });
        })
        .catch(error => console.log("Error fetching data:", error)); // Added error handling
})();

function filterDrinks(selectedValue)
{
    drinkWindow.innerHTML = '';
    let drink = selectedValue.value;
    let i = 1,j=1;
    fetch(('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+drink).trim())
    .then(response => response.json())
    .then(data =>
        data.drinks.forEach(element =>
        {   
            if(element.strIngredient+i != null)
            {
                ingridientsArr.push(element.strIngredient+i);
                i++;
            }

            if(element.strMeasure+j != null)
            {
                messurmentsArr.push(element.strMeasure+j)
                j++;
            }

            putCard(ingridientsArr, messurmentsArr,element.strDrinkThumb,element.strInstructions,element.strDrink);
        }
        )
    )
}

function addToSearch(value)
{
    let select = document.getElementById("select");
    let option = document.createElement("option");
    option.value = value;
    option.innerText = value;
    select.appendChild(option);
}

function putCard(ingridientsArr, messurmentsArr, imgLink, instructions, drinkName)
{
    let card = document.querySelectorAll(".main");
    let drink = document.querySelector(".drinkName");
    let image = document.querySelector(".img");
    let instr = document.querySelector(".instructions");
    let template  = document.getElementById("templateID");; //document.getElementById("templateID").content.querySelector();

    if(!template)
        console.log("null");

    let body = template.content.cloneNode(true);

    fillTable(ingridientsArr, messurmentsArr,body);
    card.appendChild(table);
    instr.innerHTML = instructions;
    image.src = imgLink;
    drink.innerHTML = drinkName;
    console.log(card); 
    drinkWindow.appendChild(card);
}

function fillTable(ingridientsArr, messurmentsArr, tableBody)
{
    //creates one row at a time with the messurment and ingridient

    let i = 0;
    for(; i < ingridientsArr.length; i++)
    {
        let row = document.createElement("tr")
        tableBody.appendChild(row);
        let ing = document.createElement("td");
        let mes = document.createElement("td");
        //updates row's values
        ing.innerHTML = ingridientsArr[i];
        mes.innerHTML = messurmentsArr[i];

        bodyRow.appendChild(ing);
        bodyRow.appendChild(mes);
    }

    return table;
}

selectedValue.addEventListener("change", function() 
{
    console.log(ingridientsArr);
    console.log(messurmentsArr);
    console.log('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+selectedValue.value);
    filterDrinks(selectedValue);
});

