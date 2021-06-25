describe('#start', function() {
    it("should increment the counter by 1 each time it is called", function() {
        let counter = 0
        start()
        expect(counter).toEqual(1)
    });
    it( "should call helper methods",function() {
        start()
        expect(greeting).toHaveBeenCalled()
    });
    it("validates user input", function () {
        let input = "book"
        let symbol = Symbol()
        // start()
        expect(input).toBeNaN()
        expect(input).not.toBeInstanceOf(Symbol)
        expect(input).not.toEqual(" ")
        expect(input).not.toContain(symbol)
    });
});

describe("getBooks", function () {
    it("should fetch data from Google Books API", async () => {
        let query = "Harry"
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
