
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
    // Hozzászólás hozzáadása
    const addCommentButtons = document.querySelectorAll(".add-comment");

    addCommentButtons.forEach(button => {
        button.addEventListener("click", event => {
            const article = button.closest("article");
            const commentInput = article.querySelector(".comment-input");
            const commentsList = article.querySelector(".comments-list");

            const commentText = commentInput.value.trim();
            if (commentText === "") {
                alert("A hozzászólás nem lehet üres!");
                return;
            }

            // Hozzászólás hozzáadása a listához
            const listItem = document.createElement("li");
            listItem.textContent = commentText;

            // Törlés gomb hozzáadása
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Törlés";
            deleteButton.classList.add("delete-comment");
            deleteButton.addEventListener("click", () => {
                listItem.remove();
            });

            listItem.appendChild(deleteButton);
            commentsList.appendChild(listItem);

            // Szövegmező ürítése
            commentInput.value = "";
        });
    });
}