
window.onload=function(){

    $('#year').textContent = new Date().getFullYear();

    let ps= $$('article p');
    for(let p of ps){
        p.style.display='none';
    }

    let fps= $$('article time+p');
    for(let p of fps){
        p.style.display='block';

    }

    let buttonsmore = $$('article .more');

    for(let button of buttonsmore){
        button.addEventListener('click',more);

    }   

    let buttonsfav = $$('article .fav');
    for(let button of buttonsfav){
        button.addEventListener('click',fav);

    }

    handleComments();

    
    initializeTable();
    

}

function more(event){
    let button = event.currentTarget;
    let article = button.closest('article');
    let ps = $$('p',article);
    if(button.textContent== 'Tovább olvasom' ){
        for(let p of ps){
            p.style.display='block';
        }
        button.textContent='Kevesebbet olvasok';
    }else{
        for(let p of ps){
            p.style.display='none';
        }
        let firstP = $('time+p',article);
        if(firstP){
            firstP.style.display='block';
        }
        button.textContent='Tovább olvasom';
    }

}

function fav(event){
    let button = event.currentTarget;
    let article = button.closest('article');
    let favoriteList= $('#favorites');
    let articleId = article.id;

    //check if article is already in the favorite 
    let existingItem = $(`#favorites li[data-id="${articleId}"]`);
    if(existingItem){
        existingItem.remove();
        button.textContent=' Kedvencekhez adom ❤️';
    }else{
        let listItem = document.createElement('li');
        let anchor = document.createElement('a');
        anchor.textContent = article.querySelector('h2').textContent;
        anchor.href = '#${articleId}';
        listItem.appendChild(anchor);
        listItem.setAttribute('data-id',articleId);
        favoriteList.appendChild(listItem);
        button.textContent='Eltávolítom a kedvencekből 💔';
    }

}


function handleComments() {
    // Kiválasztja az összes "Hozzászólás" gombot
    let addCommentButtons = $$('article .add-comment');

    // Minden gombhoz eseménykezelőt rendel
    for (let button of addCommentButtons) {
        button.addEventListener('click', event => {
            let article = button.closest('article'); // Az aktuális cikk
            let commentInput = article.querySelector('.comment-input'); // Szövegmező
            let commentsList = article.querySelector('.comments-list'); // Hozzászólások listája

            let commentText = commentInput.value.trim(); // Szövegmező tartalma
            if (commentText === '') {
                alert('A hozzászólás nem lehet üres!');
                return;
            }

            // Új hozzászólás létrehozása
            let listItem = document.createElement('li');
            listItem.textContent = commentText;

            // Törlés gomb létrehozása
            let deleteButton = document.createElement('button');
            deleteButton.textContent = 'Törlés';
            deleteButton.classList.add('delete-comment');

            // Törlés eseménykezelő
            deleteButton.addEventListener('click', () => {
                listItem.remove();
            });

            // Hozzászólás hozzáadása a listához
            listItem.appendChild(deleteButton);
            commentsList.appendChild(listItem);

            // Szövegmező ürítése
            commentInput.value = '';
        });
    }
}


// Frissíti az oszlopok összegét
function updateSums() {
    let table = document.getElementById("editable-table");
    let sumCol3 = 0, sumCol4 = 0, sumCol5 = 0;

    const rows = table.querySelectorAll("tbody tr");
    for (let row of rows) {
        let cells = row.querySelectorAll("td");
        sumCol3 += parseFloat(cells[2]?.textContent) || 0;
        sumCol4 += parseFloat(cells[3]?.textContent) || 0;
        sumCol5 += parseFloat(cells[4]?.textContent) || 0;
    }

    document.getElementById("sum-col-3").textContent = sumCol3;
    document.getElementById("sum-col-4").textContent = sumCol4;
    document.getElementById("sum-col-5").textContent = sumCol5;
}

// Szerkesztés funkció
function editRow(event) {
    let button = event.currentTarget;
    let row = button.closest("tr");

    if (!row) {
        console.error("Nem található a sor!");
        return;
    }

    let cells = row.querySelectorAll("td:not(:last-child)");
    cells.forEach(cell => {
        let currentValue = cell.textContent;
        let input = document.createElement("input");
        input.type = "text";
        input.value = currentValue;
        cell.textContent = "";
        cell.appendChild(input);
    });

    button.textContent = "💾";
    button.classList.remove("edit-row");
    button.classList.add("save-row");
}

// Mentés funkció
function saveRow(event) {
    let button = event.currentTarget;
    let row = button.closest("tr");

    if (!row) {
        console.error("Nem található a sor!");
        return;
    }

    let cells = row.querySelectorAll("td:not(:last-child)");
    cells.forEach(cell => {
        let input = cell.querySelector("input");
        if (input) {
            cell.textContent = input.value;
        }
    });

    button.textContent = "✏️";
    button.classList.remove("save-row");
    button.classList.add("edit-row");

    updateSums();
}

// Törlés funkció
function deleteRow(event) {
    let button = event.currentTarget;
    let row = button.closest("tr");

    if (!row) {
        console.error("Nem található a sor!");
        return;
    }

    row.remove();
    updateSums();
}

// Új sor hozzáadása
function addRow() {
    let table = document.getElementById("editable-table");
    let newRow = document.createElement("tr");

    for (let i = 1; i <= 5; i++) {
        let cell = document.createElement("td");
        let input = document.getElementById(`new-col-${i}`);
        cell.textContent = input.value || (i > 2 ? "0" : "");
        newRow.appendChild(cell);
        input.value = ""; // Szövegmezők ürítése
    }

    let actionCell = document.createElement("td");
    actionCell.innerHTML = `
        <button class="edit-row">✏️</button>
        <button class="delete-row">❌</button>
    `;
    newRow.appendChild(actionCell);

    table.querySelector("tbody").appendChild(newRow);
    updateSums();
}

// Táblázat inicializálása
function initializeTable(event) {
    const table = document.getElementById("editable-table");
    const addRowButton = document.getElementById("add-row");

    table.addEventListener("click", event => {
        if (event.target.classList.contains("edit-row")) {
            editRow(event);
        } else if (event.target.classList.contains("save-row")) {
            saveRow(event);
        } else if (event.target.classList.contains("delete-row")) {
            deleteRow(event);
        }
    });

    addRowButton.addEventListener("click", addRow);

    // Kezdeti összeg frissítése
    updateSums();
}




