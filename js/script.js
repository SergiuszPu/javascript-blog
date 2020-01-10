'use strict'

const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tagCloud-link').innerHTML),
    authorCloudLink: Handlebars.compile(document.querySelector('#template-authorCloud-link').innerHTML)
}

const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleTagSelector = '.post-tags a',
    optTagsListSelector = '.tags.list',
    optAuthorsListSelector = '.list.authors',
    optArticleAuthorSelector = '.post-author',
    optArticleAuthorSelectorLink = '.post-author a ',
    optCloudClassCount = 5,
    optCloudClassPrefix = 'tag-size-';

const titleClickHandler = function (event) {
    //console.log('Link was clicked!');
    //console.log(event);

    /* remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
    for (let activeLink of activeLinks) {
        activeLink.classList.remove('active');
        //console.log(activeLink);
    }
    /* add class 'active' to the clicked link */
    const clickedElement = this;
    clickedElement.classList.add('active');
    //console.log(clickedElement);

    /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('article.active');
    for (let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
        //console.log(activeArticle);
    }

    /* get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    //console.log(articleSelector);

    /* find the correct article using the selector (value of 'href' attribute) */
    const correctArticle = document.querySelector(articleSelector);
    //console.log(correctArticle);

    /* add class 'active' to the correct article */
    correctArticle.classList.add('active');
    //console.log(correctArticle);
}

function generateTitleLinks(customSelector = '') {

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector)
    titleList.innerHTML = '';
    /*console.log(titleList);*/

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector)
    //console.log(optArticleSelector + customSelector);

    for (let article of articles) {
        //console.log(article);

        /* get the article id */
        const articleId = article.getAttribute('id')
        //console.log(articleId);

        /* find the title element */
        /* get the title from the title element */
        const articleTitle = article.querySelector(optTitleSelector).innerHTML;

        /* create HTML of the link */
        //const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

        //with handlebars
        const linkHTMLData = { id: articleId, title: articleTitle };
        const linkHTML = templates.articleLink(linkHTMLData);

        /* insert link into titleList */
        titleList.innerHTML += linkHTML;
        //console.log(customSelector);
    }

    const links = document.querySelectorAll('.titles a');
    for (let link of links) {
        link.addEventListener('click', titleClickHandler);
    }
}
generateTitleLinks();

function calculateTagsParams(tags) {
    const params = {
        max: 0,
        min: 999999
    }

    for (let tag in tags) {
        console.log(tag + ' is used ' + tags[tag] + ' times');

        if (tags[tag] > params.max) {
            params.max = tags[tag];
        }
        if (tags[tag] < params.min) {
            params.min = tags[tag];
        }

    }

    return params
}
function calculateTagClass(count, params) {

    const normalizedCount = count - params.min;

    const normalizedMax = params.max - params.min;

    const percentage = normalizedCount / normalizedMax;

    const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);

    return optCloudClassPrefix + classNumber;
}

function generateTags() {

    /* [NEW] create a new variable allTags with an empty array/object */
    let allTags = {};
    //console.log(allTags);


    /* find all articles */
    /* START LOOP: for every article: */
    const articles = document.querySelectorAll('.post')
    console.log(articles);

    for (let article of articles) {

        /* find tags wrapper */
        const tagsList = article.querySelector(optArticleTagsSelector);
        console.log(tagsList);

        /* make html variable with empty string */
        let html = '';
        console.log(html);

        /* get tags from data-tags attribute */
        const articleTags = article.getAttribute('data-tags');
        //console.log(articleTags);

        /* split tags into array */
        /* START LOOP: for each tag */
        const articleTagsArray = articleTags.split(' ');

        for (let tag of articleTagsArray) {
            console.log(articleTagsArray);
            console.log(tag);

            /* generate HTML of the link */
            //const linkHtml = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>' + ' ';
            //console.log(linkHtml);

            //with handlebars
            const linkHTMLData = {
                id: tag,
                title: tag
            };

            const linkHTML = templates.tagLink(linkHTMLData);
            /* add generated code to html variable */
            html += linkHTML;


            /* [NEW] check if this link is NOT already in allTags */
            /* [NEW] add generated code to allTags array */
            // jak to czytamy!!! jeżeli AllTags nie ma klucza tag

            //if (!allTags[tag])
            if (!allTags.hasOwnProperty(tag)) {
                allTags[tag] = 1;
            } else {
                allTags[tag]++;
            }
            /* END LOOP: for each tag */
        }

        tagsList.innerHTML = html;
    }
    /* insert HTML of all the links into the tags wrapper */
    /* END LOOP: for every article: */
    //tagsList.innerHTML = html;

    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector('.tags');

    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams', tagsParams);


    /* [NEW] crate variable for all links HTML code */
    //let allTagsHTML = ' ';

    //hith handlebars
    const allTagsData = {
        tags: []
    };

    for (let tag in allTags) {

        //allTagsHTML += '<li class ="tag-size-' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + ' (' + allTags[tag] + ') </li>';
        //allTagsHTML += '<li><a href="#tag-' + tag + '">' + tag + ' (' + allTags[tag] + ') ' + '</a></li>';
        //console.log(allTagsHTML);
        //const tagLinkHTML = '<li><a href="#tag-" class ="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + ' (' + allTags[tag] + ') </a></li>';

        //with hadlebars
        allTagsData.tags.push({
            tag: tag,
            count: allTags[tag],
            className: calculateTagClass(allTags[tag], tagsParams)
        });

        // without handlebars
        //allTagsHTML += tagLinkHTML;

    }

    /* [NEW] add html from allTags to tagList */
    //tagList.innerHTML = allTags.join(' ');
    //tagList.innerHTML = allTagsHTML;

    //with handlebars
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
    console.log(allTagsData);


    //console.log(allTags);

}

generateTags();



function tagClickHandler() {
    //console.log(event);

    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    //console.log(this);

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    //console.log('clickedElement:', clickedElement);

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    //console.log('tag-', tag);


    /* find all tag links with class active */
    /* START LOOP: for each active tag link */
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
    for (let activeTag of activeTags) {

        /* remove class active */
        activeTag.classList.remove('active');

        //console.log(activeTags);
        /* END LOOP: for each active tag link */
    }

    /* find all tag links with "href" attribute equal to the "href" constant */
    /* START LOOP: for each found tag link */
    const tagLinks = document.querySelectorAll('a[href^="#tag-' + tag + '"]');
    //console.log('tagLinks:', tagLinks);

    for (let tagLink of tagLinks) {
        /* add class active */
        tagLink.classList.add('active');

        /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */

    generateTitleLinks('[data-tags~="' + tag + '"]');
    //console.log(generateTitleLinks);

}


function addClickListenersToTags() {

    /* find all links to tags */
    const tagLinks = document.querySelectorAll(optArticleTagSelector);
    //console.log('tagLinks:', tagLinks);

    /* START LOOP: for each link */
    /* add tagClickHandler as event listener for that link */
    /* END LOOP: for each link */
    for (let tag of tagLinks) {
        tag.addEventListener('click', tagClickHandler);
        //console.log(tag);

    }
}


addClickListenersToTags()

generateTitleLinks();


function generateAuthors() {

    let allAuthors = {};
    console.log(allAuthors);


    const articles = document.querySelectorAll(optArticleSelector)


    for (let article of articles) {
        const authorsList = article.querySelector(optArticleAuthorSelector);
        //console.log(authorsList);

        let html = '';
        //console.log(html);

        const articleAuthors = article.getAttribute('data-author');
        //console.log(articleAuthors);

        //const linkHtml = '<li><a href="#author-' + articleAuthors + '">' + articleAuthors + '</a></li>' + ' ';
        //console.log(linkHtml);

        const linkHTMLData = { id: articleAuthors, title: articleAuthors };
        const linkHtml = templates.authorLink(linkHTMLData);

        html += linkHtml;

        if (!allAuthors.hasOwnProperty(articleAuthors)) {
            allAuthors[articleAuthors] = 1;
        } else {
            allAuthors[articleAuthors]++;
        }

        authorsList.innerHTML = html;

        const authorList = document.querySelector(optAuthorsListSelector);

        const authorsParams = calculateTagsParams(allAuthors);
        console.log('authorsParams', authorsParams);

        let allAuthorsHTML = ' ';

        for (let author in allAuthors) {
            const authorLinkHTML = '<li><a href="#tag-" class ="' + calculateTagClass(allAuthors[author], authorsParams) + '">' + author + ' (' + allAuthors[author] + ') </a></li>';

            allAuthorsHTML += authorLinkHTML;
        }

        authorList.innerHTML = allAuthorsHTML;

    }

}
generateAuthors()

function authorClickHandler(event) {
    //console.log(event);

    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    //console.log(this);

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    //console.log('clickedElement:', clickedElement);

    /* make a new constant "author" and extract author from the "href" constant */
    const author = href.replace('#author-', '');
    //console.log(author);

    const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
    for (let activeAuthor of activeAuthors) {
        //console.log(activeAuthor);

        activeAuthor.classList.remove('active');
    }

    const authorLinks = document.querySelectorAll('a[href^="#author-' + author + '"]');
    //console.log(authorLinks);

    for (let authorLink of authorLinks) {
        //console.log(authorLink);

        /* add class active */
        authorLink.classList.add('active');
        /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {

    const authorLinks = document.querySelectorAll(optArticleAuthorSelectorLink);
    //console.log('authorLinks:', authorLinks);

    for (let author of authorLinks) {
        author.addEventListener('click', authorClickHandler);
    }
}
addClickListenersToAuthors()