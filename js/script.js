'use strict'

const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleTagSelector = '.post-tags a',
    optTagsListSelector = '.tags.list',
    optAuthorsListSelector = '.list.authors a',
    optArticleAuthorSelector = '.post-author',
    optArticleAuthorSelectorLink = '.post-author a';

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
    const correctArticle = document.querySelector(articleSelector);
    console.log(correctArticle);

    /* add class 'active' to the correct article */
    correctArticle.classList.add('active');
    console.log(correctArticle);
}

function generateTitleLinks(customSelector = '') {

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector)
    titleList.innerHTML = '';
    /*console.log(titleList);*/

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector)
    for (let article of articles) {
        console.log(article);

        /* get the article id */
        const articleId = article.getAttribute('id')
        //console.log(articleId);

        /* find the title element */
        /* get the title from the title element */
        const articleTitle = article.querySelector(optTitleSelector).innerHTML;

        /* create HTML of the link */
        const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

        /* insert link into titleList */
        titleList.innerHTML += linkHTML;
        console.log(customSelector);
    }

    const links = document.querySelectorAll('.titles a');
    for (let link of links) {
        link.addEventListener('click', titleClickHandler);
    }
}
generateTitleLinks();


function generateTags() {

    /* [NEW] create a new variable allTags with an empty array */
    let allTags = [];

    /* find all articles */
    /* START LOOP: for every article: */
    const articles = document.querySelectorAll('.post')
    for (let article of articles) {

        /* find tags wrapper */
        const tagsList = article.querySelector(optArticleTagsSelector);
        /*console.log(tagsList);*/

        /* make html variable with empty string */
        let html = '';
        /*console.log(html);*/

        /* get tags from data-tags attribute */
        const articleTags = article.getAttribute('data-tags');
        //console.log(articleTags);

        /* split tags into array */
        /* START LOOP: for each tag */
        const articleTagsArray = articleTags.split(' ');
        for (let tag of articleTagsArray) {
            console.log(tag);
            console.log(articleTagsArray);

            /* generate HTML of the link */
            const linkHtml = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>' + ' ';
            /*console.log(linkHtml);*/

            /* add generated code to html variable */
            /* END LOOP: for each tag */
            html += linkHtml;
        }

        /* insert HTML of all the links into the tags wrapper */
        /* END LOOP: for every article: */
        tagsList.innerHTML = html;
    }

}
generateTags()



function tagClickHandler(event) {
    console.log(event);

    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log(this);

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log('clickedElement:', clickedElement);

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    console.log(tag);


    /* find all tag links with class active */
    /* START LOOP: for each active tag link */
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
    for (let activeTag of activeTags) {
        console.log(activeTags);

        /* remove class active */
        activeTag.classList.remove('active');

        /* END LOOP: for each active tag link */
    }

    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll('a[href^="#tag-' + tag + '"]');
    console.log('tagLinks:', tagLinks);

    /* START LOOP: for each found tag link */
    for (let tagLink of tagLinks) {
        /* add class active */
        tagLink.classList.add('active');
        /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
}


function addClickListenersToTags() {

    /* find all links to tags */
    const tagLinks = document.querySelectorAll(optArticleTagSelector);
    console.log('tagLinks:', tagLinks);

    /* START LOOP: for each link */
    /* add tagClickHandler as event listener for that link */
    /* END LOOP: for each link */
    for (let tag of tagLinks) {
        tag.addEventListener('click', tagClickHandler);
    }
}


addClickListenersToTags()

generateTitleLinks();


function generateAuthors() {

    const articles = document.querySelectorAll(optArticleSelector)


    for (let article of articles) {
        const authorsList = article.querySelector(optArticleAuthorSelector);
        console.log(authorsList);

        let html = '';
        console.log(html);

        const articleAuthors = article.getAttribute('data-author');
        console.log(articleAuthors);


        const linkHtml = '<li><a href="#author-' + articleAuthors + '">' + articleAuthors + '</a></li>' + ' ';
        console.log(linkHtml);

        html += linkHtml;


        authorsList.innerHTML = html;
    }

}
generateAuthors()

function authorClickHandler(event) {
    console.log(event);

    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log(this);

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log('clickedElement:', clickedElement);

    /* make a new constant "author" and extract author from the "href" constant */
    const author = href.replace('#author-', '');
    console.log(author);

    const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
    for (let activeAuthor of activeAuthors) {
        console.log(activeAuthor);

        activeAuthor.classList.remove('active');
    }

    const authorLinks = document.querySelectorAll('a[href^="#author-' + author + '"]');
    console.log(authorLinks);

    for (let authorLink of authorLinks) {
        /* add class active */
        authorLink.classList.add('active');
        /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-authors~="' + author + '"]');
}

function addClickListenersToAuthors() {

    const authorLinks = document.querySelectorAll(optAuthorsListSelector);
    console.log('authorLinks:', authorLinks);

    for (let author of authorLinks) {
        author.addEventListener('click', authorClickHandler);
    }
}
addClickListenersToAuthors()