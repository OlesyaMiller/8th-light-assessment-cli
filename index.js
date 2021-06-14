const fetch = require('node-fetch');
const prompt = require('prompt-sync')({sigint: true});

class BookSearch {

    constructor(myBooks) {
      this.myBooks = myBooks
    }

    baseUrl = "https://www.googleapis.com/books/v1/volumes?q="
    apiKey = "AIzaSyAAOCTRfoHkv8KW7h3BjVvIe-z_NIZYgig"

    fetchBooks(query) {
      fetch(this.baseUrl+`${query}&projection=lite&key=${this.apiKey}`)
        .then(res => res.json())
        .then(data => {
          this.filterData(data)
        })
    }
      
    getBooks(){
      console.log("Welcome to the Book Finder app!")  
      console.log("To exit the program any time type 'exit'")  
      const term = prompt('Enter search term: ')
      if(term === "exit") {
        return
      } 
      else if (term.trim() === "" || Number(term)) {
        console.log("Please enter correct input")
        this.getBooks()
      } 
      else {
        this.fetchBooks(term)
      }
    }
      
    addBook(data){
      console.log("To add a book to your reading list enter the number of the book")
      console.log("To see your reading list type 'list'")
      console.log("To start a new search type 'search'")
      const input = prompt("Enter search term: ")

      if([1,2,3,4,5].includes(Number(input))){
        this.myBooks.push(data[input - 1])
        this.addBook(data)
      } else if (input === "list"){
        console.log("")
        console.log("YOUR READING LIST:")
        this.myBooks === [] ? console.log("[]") : this.myBooks.forEach((book, ind) => this.displayVolumeData(ind, book.volumeInfo))
        this.addBook(data)
      } else if (input === "search") {
        this.getBooks()
      } else if (input === "exit") {
        return
      } else {
        console.log("Please enter correct input")
        this.addBook(data)
      }
    }
      
    displayVolumeData(ind, volume) {
        console.log((ind + 1) + ")")
        console.log("Title: " + volume.title)
        console.log("Author: " + volume.authors[0])
        console.log("Publisher: " + volume.publisher)
        console.log("")
    }
      
    filterData(data){
        const filteredData = data.items.filter(volume => volume.volumeInfo.publisher).slice(0,5)
        filteredData.forEach((volume, index) => this.displayVolumeData(index, volume.volumeInfo))
        this.addBook(filteredData)
    }
}

const newSearch = new BookSearch([])
newSearch.getBooks()