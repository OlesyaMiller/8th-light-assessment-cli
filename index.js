import fetch from 'node-fetch';
import PromptSync from 'prompt-sync';
const prompt = new PromptSync({sigint:true})
    // <script type="module" src="milsymbol-2.0.0/src/milsymbol.js"></script>
export class BookSearch {

    constructor() {
        this.myBooks = []
        this.counter = 0
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
        this.handleInput(filteredData)
    }

    displayVolumeData(ind, volume) {
        console.log((ind + 1) + ")")
        console.log("Title: " + volume.title)
        console.log("Authors:")
        volume.authors.forEach(author => console.log("  " + author))
        console.log("Publisher: " + volume.publisher)
        console.log("")
    }

    addBook(data, input) {
        this.myBooks.push(data[Number(input) - 1])
        console.log("THE BOOK HAS BEEN ADDED TO YOUR READING LIST!")
        this.handleInput(data)
    }

    handleInput(data){
        console.log("")
        this.interactionWithUser()
        let input = prompt("")
        console.log("")
        input = input.toLowerCase()
        if(Number(input) >= 1 && Number(input) <= data.length){
            this.addBook(data, input)
        } else if (input === "list") {
            this.displayReadingList()
            this.handleInput(data)
        } else if (input === "search") {
            this.start()
        } else if (input === "exit") {
            return
        } else if (Number(input) >= data.length) {
            console.log(`The book number ${Number(input)} doesn't exist. Please enter correct book number`)
            this.handleInput(data)
        } else {
            console.log("PLEASE ENTER CORRECT INPUT")
            this.handleInput(data)
        }
    }

    displayReadingList() {
        console.log("")
        console.log("YOUR READING LIST:")
        this.myBooks.length === 0 ? console.log("Your reading list is empty") : this.myBooks.forEach((book, ind) => this.displayVolumeData(ind, book.volumeInfo))
    }

    start(){
        this.counter++
        this.counter > 1 ? this.searchPrompt() : this.greeting()
        const input = prompt('')
        console.log("")
        if(input === "exit") {
            return
        }
        else if (input.trim() === "" || Number(input) || '"'.includes(input) || this.checkInputForSymbolsComb(input)) {
            console.log("PLEASE ENTER CORRECT INPUT")
            this.start()
        }
        else {
            this.getBooks(input)
        }
    }

    checkInputForSymbolsComb(input) {
        const inputToArray = input.split("")
        for(let i = 0; i < inputToArray.length; i++) {
            if("[@_!#$%^&*()<>?/|}{~:`-+=.,']".includes(inputToArray[i])) {
                return true
            }
        }
    }

    interactionWithUser(){
        console.log(`To add book to your reading list enter the number of the book`)
        console.log("To see your reading list type 'list'")
        console.log("To start a new search type 'search'")
    }

    searchPrompt() {
        console.log('Enter the title or the author of the book')
    }

    greeting(){
        console.log("Welcome to the Book Finder app!")
        console.log("To exit the program at any time type 'exit'")
        this.searchPrompt()
    }
}
const newSearch = new BookSearch()
newSearch.start()