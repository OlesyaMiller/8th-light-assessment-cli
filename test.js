const fetch = require("node-fetch");
const prompt = require('prompt-sync')();

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
  let input = null 
  console.log("enter search term")
  console.log("to exit the program any time type 'exit'")
//   while(input !== "exit") {
    process.openStdin().on('data',function(res){ //'on' instead of 'listeners'
        input = res 
        console.log("you entered " + input + " ,inside getBooks")
        // if(input !== "") {
          fetchBooks(input)
        // } else if (input==="exit"){
        //   return 
        // }
        // else {
        //   console.log("enter correct input")
        // }
    })
  
//   addBook()
}

function addBook(data){
    // let input = null 
    // let myBooks = []
    // console.log("Please enter the number of the book you want to add to your cart")
    // while(input !== "exit")
      process.openStdin().on('data',function(res){ //'on' instead of 'listeners'  
        let input = parseInt(res) - 1
        // if(data[input]) {
        if([1,2,3,4,5].includes(input)) {
        //   if(data.ind === true) {
          // myBooks = [...myBooks, data[ind]]
          myBooks.push(data[input])
          console.log(myBooks)
          console.log("Enter another book number or type 'exit'")
          addBook(data)
        } else if (input === "cart"){
          console.log(myBooks)
          addBook(data)
        } else if (input === "exit") {
            return
        } else {
            console.log("enter correct input")
            addBook(data)
        }
      
      })
  }

function displayData(data){
//   console.log("Please enter the number of the book you want to add to your cart")
  const filteredData = data.items.filter(volume => volume.volumeInfo.publisher).slice(0,5)
           
  filteredData.forEach((volume, index) => console.log((index+1) + ") " + volume.volumeInfo.title))
  console.log(filteredData.length)
  console.log("Please enter the number of the book you want to add to your cart")
  console.log("to see you cart type 'cart' at any time")
  addBook(filteredData)
}


getBooks()