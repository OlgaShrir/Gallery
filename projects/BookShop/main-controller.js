function init(){
    buildPrimaryDataBase();
}

function renderTable(books){
    console.log(books);
     
    var strHTML = books.map(function (book){
        return `
        <tr>
            <th scope="row">${book.id}</th>
            <td>${book.title}</td>
            <td>${book.autor}</td>
            <td>${book.price}</td>
            <td>${book.image}</td>
            <td>
                <button onclick="showReadBookModal(${book.id})">Read</button>
                <button onclick="getIdForDeleteBook(${book.id})">Delete</button>
            </td>
        </tr>`
    })

    $('tbody').html(strHTML.join(''));
}

function showAddBookModal(){    
    var $modal = $('.add-book');
    $modal.show();
}

function showReadBookModal(id){
    var $modal = $('.read');
    $modal.show();
}

function getIdForDeleteBook(id){
    onDeleteBook(id);
    
}

