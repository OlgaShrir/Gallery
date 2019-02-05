'use strict'

var gProjects = [];
var gId = -1;


function buildProjectsDataBase(){
    
    gProjects = [{
        id: getNextId(),
        name: 'Minesweeper',
        title: 'The best game in history',
        desc: 'The famous Minesweeper game that I\'ve built as my first project',
        url: 'projects/Minesweeper/index.html',
        publishedAt: '14.01.2019',
        labels: ['sprint', ' board-games ', ' games '],
        galImg: 'img/portfolio/01-mines-my.png',
        subTitle: 'Effort your brain',
    },
    {
        id: getNextId(),
        name: 'Book Shop',
        title: 'My version for bookstore site.',
        desc: 'The book store site that allows you to add, remove and get full information about the books (CRUD)',
        url: 'projects/BookShop/index.html',
        publishedAt: '03.02.2019',
        labels: ['book shop', ' CRUD'],
        galImg: 'img/portfolio/02-bookshop.jpg',
        subTitle: '`Reading is essential for those who seek to rise above the ordinary.` – Jim Rohn',
    }
    ];
    console.log('gProjects:',gProjects); 
}

function getNextId() {
    return ++gId;
}


function getProjects(){
    return gProjects;
}