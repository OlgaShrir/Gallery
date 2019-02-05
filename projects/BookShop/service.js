var gBooks = [];
var gId = -1;


function buildPrimaryDataBase() {

    var books = [
        { title: 'Origin', autor: 'Dan Brown', price: '19.90$', id: getNextId(), image: '🎁' },
        { title: 'The People vs. Alex Cross', autor: 'James Patterson', price: '14.90$', id: getNextId(), image: '🔮' },
        { title: 'The The Woman in the Window', autor: 'A.J. Finn', price: '17.90$', id: getNextId(), image: '💰' }
    ];

    for (var i = 0; i < books.length; i++) {
        gBooks.push(books[i]);
    }
    renderTable(gBooks);
}

function getNextId() {
    gId += 1;
    return gId;
}

function onAddBook() {
    var title = $('.title').val()
    var autor = $('.autor').val()
    var price = $('.price').val()
    var image = $('.image-adress').val()

    $('.title').val('')
    $('.autor').val('')
    $('.price').val('')
    $('.image').val('')

    var book = {title: title, autor: autor, price: price, image: image, id: getNextId()}

    gBooks.push(book);
    renderTable(gBooks);
}

function onDeleteBook(id){
    gBooks.splice(id,1);
    renderTable(gBooks);
}