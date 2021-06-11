const fetch = require("node-fetch");

baseUrl = "https://www.googleapis.com/books/v1/volumes?q="
apiKey = "AIzaSyAAOCTRfoHkv8KW7h3BjVvIe-z_NIZYgig"

function fetchBooks(query) {
  fetch(this.baseUrl+`${query}&projection=lite&key=${this.apiKey}`)
    .then(res => res.json())
    .then(data => {
        displayData(data)
    //   const filteredData = data.items.filter(volume => volume.volumeInfo.publisher).slice(0,5)
           
    //   filteredData.forEach((volume, index) => console.log((index+1) + ") " + volume.volumeInfo.title))
    //   console.log(filteredData.length)
    })
}

function getBooks(){
  console.log("enter search term")
  process.openStdin().on('data',function(res){ //'on' instead of 'listeners'
    console.log("you entered " + res)
    fetchBooks(res)
  })
//   addBook()
}

function addBook(data){
    let myBooks = []
    console.log("Please enter a number of the book you want to add to your cart")
    
    process.openStdin().on('data',function(res){ //'on' instead of 'listeners'
      myBooks.push(data[parseInt(res)-1])  
      console.log(myBooks)
    })
}

function displayData(data){
    const filteredData = data.items.filter(volume => volume.volumeInfo.publisher).slice(0,5)
           
    filteredData.forEach((volume, index) => console.log((index+1) + ") " + volume.volumeInfo.title))
    console.log(filteredData.length)
    addBook(filteredData)
        // const readline = require('readline').createInterface({
        //   input: process.stdin,
        //   output: process.stdout
        // })
        // readline.question(`Enter a search term`, (name) => {
        //   this.fetchBooks(name) 
        //   readline.close()
        // })
        
}


getBooks()