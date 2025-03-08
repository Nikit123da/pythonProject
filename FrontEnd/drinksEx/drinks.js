let drinkWindow = document.getElementById("drinksWindow");
let drinksArr = []; //all the drinks
let ingridientsArr = [];
let messurmentsArr = [];
let selectedValue = document.getElementById("select"); 


(function addTitles(url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list') {
    let i = '1', j = '1';
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
            

                
            buildCard(ingridientsArr, messurmentsArr,element.strDrinkThumb,element.strInstructions,element.strDrink);
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

function buildCard(ingridientsArr, messurmentsArr, imgLink, instructions, drinkName)
{


    let card = document.createElement("card");
    let img = document.createElement("img");
    let textDiv = document.createElement("div");
    let text = document.createElement("p");
    let header = document.createElement("h2");
    let table = createTable(ingridientsArr, messurmentsArr);

    header.innerHTML = drinkName;
    img.innerHTML = imgLink;
    text.innerHTML = instructions;

    card.appendChild(header);
    card.appendChild(img);
    card.appendChild(textDiv);
    textDiv.appendChild(text);
    card.appendChild(table);

    console.log(card); 
    
    drinkWindow.appendChild(card);
}

function createTable(ingridientsArr, messurmentsArr)
{
    let table = document.createElement("table");

    //creates the parameters of the table
    let tableHead = document.createElement("thead");
    let tableBody = document.createElement("tbody");
    let headRow = document.createElement("tr");
    let ingridients = document.createElement("th");
    let messurments = document.createElement("th");

    table.appendChild(tableHead);
    table.appendChild(tableBody);
    //adds the table Head Row 
    tableHead.appendChild(headRow);
    headRow.appendChild(ingridients);
    headRow.appendChild(messurments);

    //changes the values of the table head row
    ingridients.innerHTML = "Ingridients";
    messurments.innerHTML = "messurments";

    //loop for the ingridients and messures
    //creates one row at a time with the messurment and ingridient
    let i = 0;
    for(; i < ingridientsArr.length; i++)
    {
        //creates row
        let bodyRow = document.createElement("tr");
        tableBody.appendChild(bodyRow);
        let ing = document.createElement("td");
        let mes = document.createElement("td");
        bodyRow.appendChild(ing);
        bodyRow.appendChild(mes);

        //updates row's values
        ing.innerHTML = ingridientsArr[i];
        mes.innerHTML = messurmentsArr[i];
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

