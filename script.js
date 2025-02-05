// buttons for changing theme
const themeBtn = document.querySelector(".theme");
const body = document.querySelector("*");
const moon = document.querySelector("#moon");
const sun = document.querySelector("#sun");
const overlay = document.querySelector("#overlay");

let theme = localStorage.getItem('theme') || 0;

sun.style.display = "";
moon.style.display = "none";

// addept to system preference W
// and to the previou theme when page is reloaded
if (theme == 1 || (theme == 0 && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    body.style.filter = "invert(95%) hue-rotate(180deg)";
    overlay.style.filter = "invert(95%) hue-rotate(180deg)";
    moon.style.display = "";
    sun.style.display = "none";
}

// switching themes with button
// the dark theme is implemented with css filter property
themeBtn.addEventListener("click", () => {
    if (theme == 0) {
        body.style.filter = "invert(95%) hue-rotate(180deg)";
        overlay.style.filter = "invert(95%) hue-rotate(180deg)";

        sun.style.display = "none";
        moon.style.display = "";
        theme = 1;
        localStorage.setItem('theme', 1);
    } else {
        body.style.filter = "";
        overlay.style.filter = "";

        theme = 0;
        moon.style.display = "none";
        sun.style.display = "";
        localStorage.setItem('theme', 0);
    }
});


// html element to display messenge when no books are 
const noBooks = document.querySelector(".no-books");

// list of book objects
let myLibrary = [];
const libraryOnHTML = document.querySelector(".book-section");


// book object
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// functions to set a local storage for the books
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

// adds the book to the array myLibrary and uses other 
// functions to display on screen
function addBookToLibrary(book) {
    myLibrary.push(book);
    saveLibraryToLocalStorage();
    updateLibraryHtml();
}

// remove book from the array
function removeBookFromLibrary(book) {
    const index = myLibrary.indexOf(book);
    if (index !== -1) {
        myLibrary.splice(index, 1);
        saveLibraryToLocalStorage();
    }
    updateLibraryHtml();
}

// switching the read or not read button on the book card 
toggleRead = function(book) {
    book.read = !book.read;
    saveLibraryToLocalStorage();
    updateLibraryHtml();
};

// changes the classes of the read button
// that changes the style of the button
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

// local storage update 
document.addEventListener('DOMContentLoaded', () => {
    loadLibraryFromLocalStorage();
    updateLibraryHtml();
});

// the function that is responsible for updating the 
// book section when something happens, looping through the
// myLibrary array and displaying the book objects
function updateLibraryHtml () {
    // showing the 'no books added' on html when the array is empty
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

// create the book card with html elements and classes 
// styled on the css file
function addBookToDisplay (book) { 

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


    // setting event listeners to the book card buttons for 
    // removing and the read status

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

    // appending the buttons to buttons div
    bookButtons.appendChild(readElement);
    bookButtons.appendChild(removeElement);

    //appending created book to book section div
    libraryOnHTML.appendChild(bookDiv);
}

// buttons for the pop up  form for adding books
const addButton = document.querySelector(".add");
const closeButton = document.querySelector(".close");
const form = document.querySelector(".book-form");

// opening form
addButton.addEventListener('click', () => {
    openForm();
})

//closing form
closeButton.addEventListener('click', () => {
    closeForm();
})
overlay.addEventListener('click', () => {
    closeForm();
})

function openForm() {
    form.classList.add('active');
    overlay.classList.add('active');
}

function closeForm() {
    form.classList.remove('active');
    overlay.classList.remove('active');
}

// getting form values and creating a book object with it
document.getElementById('book-form').addEventListener('submit', function(event) {
    //prevents page reload
    event.preventDefault();
  
    // creating book object
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;
  
    const newBook = new Book(title, author, pages, read);

    addBookToLibrary(newBook);
    updateLibraryHtml();
  
    // clearing form 
    document.getElementById('book-form').reset();
    closeForm();
});

updateLibraryHtml(); // updating the book section when page is loaded