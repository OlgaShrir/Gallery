'use strict'

function init(){
    buildProjectsDataBase();
    var projects = getProjects();
    renderProjects(projects);
}


function renderProjects(projects){
    var strHTML = projects.map(function(project){

        return `
        <div class="col-md-4 col-sm-6 portfolio-item" onclick="renderModal(${project.id})">
            <a class="portfolio-link" data-toggle="modal" href="#portfolioModal">
                <div class="portfolio-hover">
                    <div class="portfolio-hover-content">
                        <i class="fa fa-plus fa-3x"></i>
                    </div>
                </div>
                <img class="img-fluid" src="${project.galImg}" alt="">
            </a>
            <div class="portfolio-caption">
                <h4 >${project.name}</h4>
                <p class="text-muted">${project.title}</p>
            </div>
        </div>`
    })
    document.querySelector('.project').innerHTML = strHTML;
}

function renderModal(idProj){
    var projects = getProjects();

    var project = projects.find( function(element){
        return element.id === idProj
    })

    console.log('project', project);

    var strHTML = `
    <h2>${project.name}</h2>
 
    <p class="item-intro text-muted">${project.subTitle}</p>
    <a href="${project.url}">
        <img class="img-fluid d-block mx-auto" src="${project.galImg}" alt="">
    </a>
    <p>${project.desc}</p>
    <ul class="list-inline">
        <li>Date: ${project.publishedAt}</li>
        <li>Category: ${project.labels}</li>
    </ul>
    <button class="btn btn-primary" data-dismiss="modal" type="button">
        <i class="fa fa-times"></i>
        Close Project</button>
    `

    document.querySelector('.modal-body').innerHTML = strHTML;    
}


function onSumbit(){
    var body = document.querySelector('#message').value;
    var subject = document.querySelector('#subject').value;
    var name = document.querySelector('#name').value;
    var myEmail = `olga.shrir@gmail.com`

    var url = `https://mail.google.com/mail/?view=cm&fs=1&to=${myEmail}&su=${subject}-${name}&body=${body}`;

    window.open(url,'_blank')
}