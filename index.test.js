import {BookSearch} from "./index";
import fetchMock from "jest-fetch-mock";
const inst = new BookSearch()

let returnedData
fetchMock(this.baseUrl+`${query}&projection=lite&key=${this.apiKey}`)
    .then(res => res.json())
    .then(data => {
        returnedData = data
    })

describe('#start', function() {
    it( "should call helper methods",function() {
        inst.start()
        expect(inst.greeting).toHaveBeenCalled()
    });
    it("validates user input", function () {
        let input = "book"
        let symbol = Symbol()
        expect(input).toBeNaN()
        expect(input).not.toBeInstanceOf(Symbol)
        expect(input).not.toEqual(" ")
        expect(input).not.toContain(symbol)
    });
});

describe("#filterData", function () {
    it("should filter returned data")
    const filteredData = inst.filterData(returnedData)
    filteredData.forEach(book => {
        expect(book).toHaveProperty("title")
        expect(book).toHaveProperty("authors")
        expect(book).toHaveProperty("publisher")
        expect(inst.handleInput()).toHaveBeenCalled()
    })

})

describe("getBooks", function () {
    it("should fetch data from Google Books API", async () => {
        let query = "Harry"
        expect(inst.getBooks(query))
        await request()
            .get(`/googleapis.com/books/v1/volumes?q=${query}&projection=lite&key=AIzaSyAAOCTRfoHkv8KW7h3BjVvIe-z_NIZYgig`)
            .expect(200)
            .then((res) => {
                res.items.forEach(item => {
                    expect(item.title || item.author).toContain(query);
                })
            })
    })
})