'use strict'

const titleClickHandler = function (event) {
    console.log('Link was clicked!');
    console.log(event);

    /* remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
    for (let activeLink of activeLinks) {
        activeLink.classList.remove('active');
        console.log(activeLink);
    }
    /* add class 'active' to the clicked link */
    const clickedElement = this;
    clickedElement.classList.add('active');
    console.log(clickedElement);
    
    /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('article.active');
    for (let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
        console.log(activeArticle);
    }

    /* get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    console.log(articleSelector);
 
    /* find the correct article using the selector (value of 'href' attribute) */
    const correctArticle = document.querySelectorAll(articleSelector);
    console.log(correctArticle);
    
    /* add class 'active' to the correct article */
    correctArticle.classList.add('active');
    console.log(correctArticle);
    
}
const links = document.querySelectorAll('.titles a');
for (let link of links) {
    link.addEventListener('click', titleClickHandler);
}