  const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

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
}

generateTitleLinks();
