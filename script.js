
// Buttons for changing from dark mode to ligth
const themeBtn = document.querySelector(".theme");
const body = document.querySelector("*");
const moon = document.querySelector("#moon");
const sun = document.querySelector("#sun");

let theme = localStorage.getItem('theme') || 0;

sun.style.display = "";
moon.style.display = "none";

if (theme == 1 || (theme == 0 && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    body.style.filter = "invert(95%) hue-rotate(180deg)";
    moon.style.display = "";
    sun.style.display = "none";
}

themeBtn.addEventListener("click", () => {
    if (theme == 0) {
        body.style.filter = "invert(95%) hue-rotate(180deg)";
        sun.style.display = "none";
        moon.style.display = "";
        theme = 1;
        localStorage.setItem('theme', 1);
    } else {
        body.style.filter = "";
        theme = 0;
        moon.style.display = "none";
        sun.style.display = "";
        localStorage.setItem('theme', 0);
    }
});


const libraryOnHTML = document.querySelector(".book-section");



const myLibrary = [];

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function removeBookFromLibrary(book) {
    const index = myLibrary.indexOf(book);
    if (index !== -1) {
        myLibrary.splice(index, 1);
    }
    updateLibraryHtml();
}

toggleRead = function(book) {
    book.read = !book.read;
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

function updateLibraryHtml () {
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
addButton.addEventListener('click', () => {
    openForm();
})

function openForm() {
    
}



function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}


const hobbit = new Book("hobbit", "jrr tolkien", 408, true);
const sociedade = new Book("sociedade do anel", "jrr tolkien", 808, true);
const socie2dade = new Book("sociedade do anel", "jrr tolkien", 808, true);
const book1 = new Book("1984", "George Orwell", 328, false);
const book2 = new Book("To Kill a Mockingbird", "Harper Lee", 281, true);


console.log(myLibrary);