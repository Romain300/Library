const myLibrary = [];
const container = document.querySelector("#container");
const dialog = document.querySelector("dialog");
const addBookButton = document.querySelector("#add-book");
const cancelButton = document.querySelector("#cancel-button");
const addTitle = document.querySelector("#title");
const addAuthor = document.querySelector("#author");
const addPages = document.querySelector("#pages");
const addStatus = document.querySelector("#read");
const addBookLibraryButton = document.querySelector("#add-book-to-library");
let removeButtons = document.querySelectorAll(".remove-button");
const formBook = document.querySelector("form");

// function Book(title, author, pages, read) {
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this.read = read;
//     this.info = function() {
//         return `${title} by ${author}, ${pages} pages, ${read}`;
//     };
// };

class Book {
    constructor(title, author, pages, read ) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.info = function() {
            return `${title} by ${author}, ${pages} pages, ${read}`;
             };    
    }
};


const theHobbit = new Book("The Hobbit", "J.R.R Tolkien", 295, "not read yet");

function displayBook (book) {
    newDiv = document.createElement("div");
    newDiv.classList.add("book");
    title = document.createElement("div");
    author = document.createElement("div");
    pages = document.createElement("div");
    read = document.createElement("div");
    removeButton = document.createElement("button");
    statusButton = document.createElement("button");
    divButtons = document.createElement("div");
    

    removeButton.classList.add("remove-button");
    removeButton.style.marginRight = "0.3rem";
    statusButton.classList.add("update-status");
    
    removeButton.type = "button";
    statusButton.type = 'button';

    title.textContent = `Title: ${book.title}`;
    author.textContent = `Author: ${book.author}`;
    pages.textContent = `Pages: ${book.pages}`;
    read.textContent = `Status: ${book.read}`;
    removeButton.textContent = "Remove";
    statusButton.textContent = "Status";

    removeButton.dataset.index =  myLibrary.indexOf(book);
    statusButton.dataset.index =  myLibrary.indexOf(book);

    divButtons.appendChild(removeButton);
    divButtons.appendChild(statusButton)

    newDiv.appendChild(title);
    newDiv.appendChild(author);
    newDiv.appendChild(pages);
    newDiv.appendChild(read);
    newDiv.appendChild(divButtons);

    container.appendChild(newDiv);
    
};

function handleForm() {
    if(addTitle.value !== "" && addAuthor.value !== "" && addPages.value !== "") {
        if (addStatus.checked === true) {
            const newBook = new Book(addTitle.value, addAuthor.value, addPages.value, "Read");
            myLibrary.push(newBook);
            addBookToLibrary ()
            dialog.close();
            } else {
                const newBook = new Book(addTitle.value, addAuthor.value, addPages.value, "No read yet");
                myLibrary.push(newBook);
                addBookToLibrary ();
                dialog.close();
            };
    } else {
        alert("Please fill in all fields.");  
    } ; 
};

function addBookToLibrary () {
    const children = Array.from(container.children);
    for(let child of children) {
        child.remove();
    };
    for( let book of myLibrary) {
        displayBook(book);
    };

    removeButtons = document.querySelectorAll(".remove-button");
    removeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            removeBook(button);
            addBookToLibrary ();
        });
    });

    statusButtons = document.querySelectorAll(".update-status");
    statusButtons.forEach((button) => {
        button.addEventListener("click", () => {
            changeStatus(button);
            addBookToLibrary();
        });
    });
};


function removeBook(button) {
    indexBook = button.dataset.index;
    myLibrary.splice(indexBook, 1);
};

function changeStatus(button) {
    indexBook = button.dataset.index;
    myLibrary[indexBook].read = myLibrary[indexBook].read === "Read" ? "No read yet" : "Read";
    
};

addBookButton.addEventListener("click", () => {
    formBook.reset();
    dialog.showModal();
});

cancelButton.addEventListener("click", () => {
    dialog.close();
});

addBookLibraryButton.addEventListener("click", () => {
    handleForm();
});

myLibrary.push(theHobbit);
addBookToLibrary();