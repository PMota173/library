
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



const myLibrary = [];

function addBookToLibrary(book) {
  myLibrary.push(book);
  
}
Book.prototype.toggleRead = function() {
    this.read = !this.read; 
};

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    
    addBookToLibrary(this);
}


const hobbit = new Book("hobbit", "jrr tolkien", 408, true);
const sociedade = new Book("sociedade do anel", "jrr tolkien", 808, true);
const socie2dade = new Book("sociedade do anel", "jrr tolkien", 808, true);
const book1 = new Book("1984", "George Orwell", 328, true);
const book2 = new Book("To Kill a Mockingbird", "Harper Lee", 281, true);


console.log(myLibrary);