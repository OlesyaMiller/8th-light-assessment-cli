const fetch = require('node-fetch');
const prompt = require('prompt-sync')({sigint: true});

class BookSearch {

    constructor() {
      this.myBooks = []
    }

    baseUrl = "https://www.googleapis.com/books/v1/volumes?q="
    apiKey = "AIzaSyAAOCTRfoHkv8KW7h3BjVvIe-z_NIZYgig"

    getBooks(query) {
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

    interactionWithUser(helperArg){
        console.log(`To add ${helperArg} book to your reading list enter the number of the book`)
        console.log("To see your reading list type 'list'")
        console.log("To start a new search type 'search'")
    }

    addBook(data, helperArg = ''){
        console.log("")
        this.interactionWithUser(helperArg)
        let input = prompt("")
        input = input.toLowerCase()
        console.log("")
        this.validateAndAddBook(data, input)
        if (input === "list") {
            console.log("")
            console.log("YOUR READING LIST:")
            this.myBooks.length === 0 ? console.log("Your reading list is empty") : this.myBooks.forEach((book, ind) => this.displayVolumeData(ind, book.volumeInfo))
            this.addBook(data, "another")
        } else if (input === "search") {
            this.handleSearchInput()
        } else if (input === "exit") {
            return
        } else if (Number(input) >= data.length) {
            console.log(`The book number ${Number(input)} doesn't exist. Please enter correct book number`)
            this.handleCorrectBookNumberInput(data)
        } else {
            console.log("PLEASE ENTER CORRECT INPUT inside addBook")
            this.addBook(data, "another")
        }
      }

      validateAndAddBook(data, input){
          if(Number(input) >= 1 && Number(input) <= data.length){
              this.myBooks.push(data[Number(input) - 1])
              console.log("The book has been successfully added to your collection!")
              this.addBook(data, "another")
          }
      }

      handleCorrectBookNumberInput(data) {
          let input = prompt("")
          console.log("")
          // if(Number(input) >= 1 && Number(input) <= data.length){
          //     this.myBooks.push(data[Number(input) - 1])
          //     console.log("The book has been successfully added to your collection!")
          //     this.addBook(data,"another")
          // }
          this.validateAndAddBook(data, input)
      }

      handleSearchInput(){
          this.greetingHelper()
          let input = prompt('')
          console.log("")
          if(input === "exit") {
              return
          }
          else if (input.trim() === "" || Number(input)) {
              console.log("PLEASE ENTER CORRECT INPUT")
              this.handleSearchInput()
          }
          else {
              this.getBooks(input)
          }
      }

      greeting(){
          console.log("Welcome to the Book Finder app!")
          console.log("To exit the program at any time type 'exit'")
          this.greetingHelper()
      }

      greetingHelper() {
          console.log('Enter the title or the author name of the book')
      }

      start(){
        this.greeting()
        let input = prompt('')
        console.log("")
        if(input === "exit") {
            return
        } 
        else if (input.trim() === "" || Number(input)) {
            console.log("PLEASE ENTER CORRECT INPUT")
            this.start()
        } 
        else {
            this.getBooks(input)
        }
    }
      
}

const newSearch = new BookSearch([])
newSearch.start()