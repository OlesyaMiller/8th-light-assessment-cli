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

    filterData(data){
        const filteredData = data.items.filter(volume => volume.volumeInfo.publisher && volume.volumeInfo.authors).slice(0,5)
        filteredData.forEach((volume, index) => this.displayVolumeData(index, volume.volumeInfo))
        this.addBook(filteredData)
    }

    displayVolumeData(ind, volume) {
        console.log((ind + 1) + ")")
        console.log("Title: " + volume.title)
        console.log("Authors:")
        volume.authors.forEach(author => console.log("  " + author))
        console.log("Publisher: " + volume.publisher)
        console.log("")
    }

    addBook(data){
        console.log("")
        console.log("To add a book to your reading list enter the number of the book")
        console.log("To see your reading list type 'list'")
        console.log("To start a new search type 'search'")

        let input = prompt("Type your input here: ")
        console.log("")
        input = input.toLowerCase()

        if(Number(input) >= 1 && Number(input) <= data.length){
            this.myBooks.push(data[Number(input) - 1])
            console.log("The book has been successfully added to your collection!")
            this.addBook(data)
        } else if (input === "list"){
            console.log("")
            console.log("YOUR READING LIST:")
            this.myBooks.length === 0 ? console.log("Your reading list is empty") : this.myBooks.forEach((book, ind) => this.displayVolumeData(ind, book.volumeInfo))
            this.addBook(data)
        } else if (input === "search") {
            this.getBooks()
        } else if (input === "exit") {
            return
        } else {
            console.log("PLEASE ENTER CORRECT INPUT")
            this.addBook(data)
        }
      }
      
    getBooks(){
        console.log("Welcome to the Book Finder app!")  
        console.log("To exit the program at any time type 'exit'")  
        const term = prompt('Type your input here: ')
        console.log("")
        if(term === "exit") {
            return
        } 
        else if (term.trim() === "" || Number(term)) {
            console.log("PLEASE ENTER CORRECT INPUT")
            this.getBooks()
        } 
        else {
            this.fetchBooks(term)
        }
    }
      
}

const newSearch = new BookSearch([])
newSearch.getBooks()