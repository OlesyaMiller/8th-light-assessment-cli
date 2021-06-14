const fetch = require("node-fetch");
const prompt = require('prompt-sync')({sigint: true});

baseUrl = "https://www.googleapis.com/books/v1/volumes?q="
apiKey = "AIzaSyAAOCTRfoHkv8KW7h3BjVvIe-z_NIZYgig"
var myBooks = []

function fetchBooks(query) {
  fetch(this.baseUrl+`${query}&projection=lite&key=${this.apiKey}`)
    .then(res => res.json())
    .then(data => {
        filterData(data)
    })
}

function getBooks(){
  console.log("to exit the program any time type 'exit'")
  const term = prompt('Enter search term')
  console.log("You entered '" + term + "' inside books")
  if(term === "exit") {
    return
  } else {
    fetchBooks(term)
  }
}

function addBook(data){
  let input = prompt("Enter book number")
  console.log("To see your reading list type 'list'")
  console.log("To start a new search type 'search'")
  if([1,2,3,4,5].includes(Number(input))){
    myBooks.push(data[input - 1])
    // console.log("To add another book to your reading list enter book number from the list")
    addBook(data)
  } else if (input === "list"){
    console.log("")
    console.log("YOUR READING LIST:")
    myBooks.forEach((book, ind) => displayVolumeData(ind, book.volumeInfo))
    addBook(data)
  } else if (input === "search") {
    getBooks()
  } else if (input === "exit") {
    return
  } else {
    console.log("Please enter correct input")
    addBook(data)
  }
}

function displayVolumeData(ind, volume) {
  console.log((ind + 1) + ")")
  console.log("Title: " + volume.title)
  console.log("Author: " + volume.authors[0])
  console.log("Publisher: " + volume.publisher)
  console.log("   ")
}

function filterData(data){
  const filteredData = data.items.filter(volume => volume.volumeInfo.publisher).slice(0,5)
           
  filteredData.forEach((volume, index) => displayVolumeData(index, volume.volumeInfo))
  addBook(filteredData)
}


getBooks()