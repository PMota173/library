
// Buttons for changing from dark mode to ligth
const themeBtn = document.querySelector(".theme");
const body = document.querySelector("*");
const moon = document.querySelector("#moon");
const sun = document.querySelector("#sun");
const overlay = document.querySelector("#overlay");

let theme = localStorage.getItem('theme') || 0;

sun.style.display = "";
moon.style.display = "none";

if (theme == 1 || (theme == 0 && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    body.style.filter = "invert(95%) hue-rotate(180deg)";
    overlay.style.filter = "invert(95%) hue-rotate(180deg)";
    moon.style.display = "";
    sun.style.display = "none";
}

themeBtn.addEventListener("click", () => {
    if (theme == 0) {
        body.style.filter = "invert(95%) hue-rotate(180deg)";


        overlay.style.filter = "invert(95%) hue-rotate(180deg)";


        sun.style.display = "none";
        moon.style.display = "";
        theme = 1;
        localStorage.setItem('theme', 1);
    } else {


        overlay.style.filter = "";


        body.style.filter = "";
        theme = 0;
        moon.style.display = "none";
        sun.style.display = "";
        localStorage.setItem('theme', 0);
    }
});


const libraryOnHTML = document.querySelector(".book-section");
const noBooks = document.querySelector(".no-books");


let myLibrary = [];

function saveLibraryToLocalStorage() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function loadLibraryFromLocalStorage() {
    const storedLibrary = localStorage.getItem('myLibrary');
    if (storedLibrary) {
        myLibrary = JSON.parse(storedLibrary);
    } else {
        myLibrary = [];
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    saveLibraryToLocalStorage();
    updateLibraryHtml();
}


function removeBookFromLibrary(book) {
    const index = myLibrary.indexOf(book);
    if (index !== -1) {
        myLibrary.splice(index, 1);
        saveLibraryToLocalStorage();
    }
    updateLibraryHtml();
}

toggleRead = function(book) {
    book.read = !book.read;
    saveLibraryToLocalStorage();
    updateLibraryHtml();
};

toggleReadDisplay = function(book,readElement) {
    if (book.read == true) {
        readElement.classList.add('yes');
        readElement.classList.remove('not');
        readElement.textContent = `Read`;
    }
    else {
        readElement.classList.add('not');
        readElement.classList.remove('yes');
        readElement.textContent = `Not Read`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadLibraryFromLocalStorage();
    updateLibraryHtml();
});

function updateLibraryHtml () {
    if (myLibrary.length == 0) {
        noBooks.classList.add('active');
    }
    else {
        noBooks.classList.remove('active');
    }
    
    libraryOnHTML.textContent = "";
    for (i = 0; i < myLibrary.length; i++) {
        addBookToDisplay(myLibrary[i]);
    }
}

function addBookToDisplay (book) { // ADD A BOOK OBJECT TO THE HTML FILE

    //creating divs and book structure
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book');
    
    const infoDiv = document.createElement('div');
    infoDiv.classList.add('info');

    const bookButtons = document.createElement('div');
    bookButtons.classList.add('bookOptions');



    //creating elements of the book card 
    const titleElement = document.createElement('h2');
    titleElement.textContent = book.title;
    
    const authorElement = document.createElement('h3');
    authorElement.textContent = `Author: ${book.author}`;
    
    
    const pagesElement = document.createElement('h4');
    pagesElement.textContent = `Pages: ${book.pages}`;


    //creating buttons of the book card 
    const readElement = document.createElement('button');
    toggleReadDisplay(book,readElement);

    const removeElement = document.createElement('button');
    removeElement.classList.add('remove');
    removeElement.textContent = `Remove`;

    readElement.classList.add('read');


    /* adding event listners to the book card buttons for 
        removing and changing if the book was read */


    removeElement.addEventListener('click', () => {
        removeBookFromLibrary(book);
    })

    readElement.addEventListener('click', () => {
        toggleRead(book);
        toggleReadDisplay(book,readElement);
    })
    
    //setting the child nodes
    bookDiv.appendChild(infoDiv);
    bookDiv.appendChild(bookButtons);

    //appending the book elements to information divs
    infoDiv.appendChild(titleElement);
    infoDiv.appendChild(authorElement);
    infoDiv.appendChild(pagesElement);

    bookButtons.appendChild(readElement);
    bookButtons.appendChild(removeElement);

    libraryOnHTML.appendChild(bookDiv);

}



const addButton = document.querySelector(".add");
const closeButton = document.querySelector(".close");
const form = document.querySelector(".book-form");


addButton.addEventListener('click', () => {
    openForm();
})

closeButton.addEventListener('click', () => {
    closeForm();
})

overlay.addEventListener('click', () => {
    closeForm();
})

document.getElementById('book-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;
  
    const newBook = new Book(title, author, pages, read);
    addBookToLibrary(newBook);
    updateLibraryHtml();
  
    // Optional: Clear the form after submission
    document.getElementById('book-form').reset();
    closeForm();
});



function openForm() {
    form.classList.add('active');
    overlay.classList.add('active');
}

function closeForm() {
    form.classList.remove('active');
    overlay.classList.remove('active');
}

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}


updateLibraryHtml();