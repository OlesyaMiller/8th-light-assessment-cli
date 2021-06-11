const fetch = require("node-fetch");

class BookSearch {

    baseUrl = "https://www.googleapis.com/books/v1/volumes?q="
    apiKey = "AIzaSyAAOCTRfoHkv8KW7h3BjVvIe-z_NIZYgig"

    fetchBooks(query) {
        fetch(this.baseUrl+`${query}&projection=lite&key=${this.apiKey}`)
          .then(res => res.json())
          .then(data => {
            //   console.log(data.items[0].volumeInfo)
              const filteredData = data.items.filter(volume => volume.volumeInfo.publisher).slice(0,5)
           
              filteredData.forEach((volume, index) => console.log((index+1) + ") " + volume.volumeInfo.title))
              console.log(filteredData.length)
          })
    }

    getInput(){
        // let query
        // console.log("enter search term")
        // process.openStdin().on('data',function(res){ //on instead of 'listeners'
            // console.log(res.toString())
            // this.fetchBooks(res.toString().trim())
            // console.log("you entered " + res.toString())
            // return res.toString()
        // })
        // console.log("you entered " + query)        
        // return query
        const readline = require('readline').createInterface({
          input: process.stdin,
          output: process.stdout
        })

        let title 
        readline.question(`What's your name?`, (name) => {
          title = name            
          readline.close()
        })
        return title
    }

    displayData(){
        // console.log("enter search term")
        // const query = this.getInput()
        // this.fetchBooks(term)
        const readline = require('readline').createInterface({
          input: process.stdin,
          output: process.stdout
        })
          
        // let name 
        readline.question(`Enter a search term`, (name) => {
          // console.log(`Hi ${name}!`)
          this.fetchBooks(name) 
                   
        //   readline.close()
        })
        
    }
}

const newSearch = new BookSearch()
newSearch.displayData()