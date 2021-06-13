const fetch = require("node-fetch");
const prompt = require('prompt-sync')({sigint: true});

baseUrl = "https://www.googleapis.com/books/v1/volumes?q="
apiKey = "AIzaSyAAOCTRfoHkv8KW7h3BjVvIe-z_NIZYgig"
var myBooks = []

function fetchBooks(query) {
  fetch(this.baseUrl+`${query}&projection=lite&key=${this.apiKey}`)
    .then(res => res.json())
    .then(data => {
        displayData(data)
    })
}

function getBooks(){
  let term = null 
  console.log("to exit the program any time type 'exit'")
  term = prompt('Enter serach term')
  console.log("You entered '" + term + "' inside books")
  if(term === "exit") {
    return
  } else {
    fetchBooks(term)
  }
}

function addBook(data){
  let bookNum = prompt("Enter book number")
  if([1,2,3,4,5].includes(Number(bookNum))){
    myBooks.push(data[bookNum - 1])
    console.log("Enter another book number or type 'exit'")
    console.log("To see your cart type 'cart'")
    addBook(data)
  } else if (bookNum === "cart"){
    console.log(myBooks)
    addBook(data)
  } else if (bookNum === "exit") {
    return
  } else {
    console.log("enter correct input")
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

function displayData(data){
//   console.log("Please enter the number of the book you want to add to your cart")
  const filteredData = data.items.filter(volume => volume.volumeInfo.publisher).slice(0,5)
           
  filteredData.forEach((volume, index) => displayVolumeData(index, volume.volumeInfo))
  console.log(filteredData.length)
  // console.log("Please enter the number of the book you want to add to your cart")
  // console.log("to see you cart type 'cart' at any time")
  addBook(filteredData)
}


getBooks()