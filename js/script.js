const titleClickHandler = function (event) {
    console.log('Link was clicked!');
    console.log(event);

    /* remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
    for (let activeLink of activeLinks) {
        activeLink.classList.remove('active');
        console.log(link)
    }

    /* add class 'active' to the clicked link */
    const clickedElement = this;
    clickedElement.classList.add('active');
    console.log('clickedElement (with plus): ' + clickedElement);

    /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('article.active');
    for (let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href')
    console.log(articleSelector);

    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector)
    console.log(targetArticle)

    /* add class 'active' to the correct article */
    targetArticle.classList.add('active')
}

const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';
    optArticleTagsSelector = '.post-tags';

function generateTitleLinks() {


    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector)
    titleList.innerHTML = '';

    /* for each article */
    const articles = document.querySelectorAll('.post')
    for (let article of articles) {

        /* get the article id */
        const articleId = article.getAttribute('id')
        console.log(articleId);

        /* find the title element */
        /* get the title from the title element */
        /* create HTML of the link */
        const articleTitle = article.querySelector(optTitleSelector).innerHTML;
        const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
        /* insert link into titleList */
        titleList.innerHTML += linkHTML;
    }
    const links = document.querySelectorAll('.titles a');

    for (let link of links) {
        link.addEventListener('click', titleClickHandler);
    }
}

generateTitleLinks();


function generateTags() {
    /* find all articles */
    /* START LOOP: for every article: */
    const articles = document.querySelectorAll('.article')
    for (let article of articles) {

        /* find tags wrapper */
        const tagList = article.querySelector(optArticleTagsSelector)
        tagList.innerHTML = '';

        /* make html variable with empty string */
        let html = ' ';
        /* get tags from data-tags attribute  ????????????????????? */
        let articleTags = aricle.getAttribute('data-tags')
        console.log(articleTags);
        /* split tags into array */
        const articleTagsArray = articleTags.split(' ');
        console.log('articleTagsArray',  articleTagsArray);


        /* START LOOP: for each tag */
        for(let tag of articleTagsArray){
            console.log(tag);
            /* generate HTML of the link */
            const linkHTML = '<li><a href="#' + articleTags + '"></a></li>';
        
            /* add generated code to html variable */
            html += linkHTML;
            console.log(html);
        /* END LOOP: for each tag */
        }
        /* insert HTML of all the links into the tags wrapper */
        taglist.innerHTML = html;
    /* END LOOP: for every article: */
    }
}

generateTags();