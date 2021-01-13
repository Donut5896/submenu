import sublinks from './data.js';

const toggleBtn = document.querySelector('.toggle-btn');
const closeBtn = document.querySelector('.close-btn');
const sidebarWrapper = document.querySelector('.sidebar-wrapper');
const sidebar = document.querySelector('.sidebar-links');
const linkBtns = [...document.querySelectorAll('.link-btn')];
const submenu = document.querySelector('.submenu');
const hero = document.querySelector('.hero');
const nav = document.querySelector('.nav');

//hide and show sidebar
toggleBtn.addEventListener('click', () => {
    sidebarWrapper.classList.add('show');
});
closeBtn.addEventListener('click', () => {
    sidebarWrapper.classList.remove('show');
});

//console.table(sublinks);

//set sidebar
sidebar.innerHTML = sublinks.map( (item) => {
    //console.log(item);
    const {links, page} = item;
    
    return `
    <article>
    <h4>${page}</h4>
    <div class="sidebar-sublinks">
    ${links.map((link) => {
    //console.log(item) >> to iterate throught the links items
    return  `
    <a href="${link.url}">
    <i class="${link.icon}"></i>${link.label}</a>`;
    })
    .join('')}
    </div>
    </article>`
}).join('');

//link buttons
linkBtns.forEach((btn) => {
    btn.addEventListener('mouseover', function(e) {
        //console.log(e.currentTarget);
        const text = e.currentTarget.textContent;
        //to get properties: left, top, right, bottom, x, y, width, height.
        const tempBtn = e.currentTarget.getBoundingClientRect();
        //get center of the bottom position
        const center = (tempBtn.left + tempBtn.right) / 2 ;
        //get bottom position 
        const bottom = tempBtn.bottom - 3;
        //console.log(bottom);
        //console.log(tempBtn);

        //get the matched page
        const tempPage = sublinks.find(({page}) => page === text);
        //console.log(tempPage);

         //display position of the submenu when hover
        if(tempPage){
            const {page, links} = tempPage
            submenu.classList.add('show');
            submenu.style.left = `${center}px`;
            submenu.style.top = `${bottom}px`;

        //dynamic columns style
        let columns = 'col-2';
        if(links.length === 3){
            columns = 'col-3';
        }
        if(links.length > 3){
            columns = 'col-4';
        }



        submenu.innerHTML = `
            <section>
                <h4>${page}</h4>
                <div class="submenu-center ${columns}">
                ${links.map((link) => {
                    return `
                    <a href="${link.url}">
                    <i class="${link.icon}"></i>${link.label}
                    </a>`;
                }).join('')}
                </div>
            </section>`
        }
          
        
    });
});

//hide submenu
hero.addEventListener('mouseover', function(e) {
    submenu.classList.remove('show')
});
nav.addEventListener('mouseover', function(e) {
    if(!e.target.classList.contains('link-btn')){
        submenu.classList.remove('show');
    }
});