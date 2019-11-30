optArticleTagsSelector = '.post-tags .list';

function generateTags(){
  
  /* find all articles */
    /* START LOOP: for every article: */
    const articles = document.querySelectorAll('.post')
    for (let article of articles){

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
      for (let tag of articleTagsArray){
      //console.log(tag);
      //console.log(articleTagsArray);
    
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