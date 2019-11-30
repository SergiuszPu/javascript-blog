optArticleTagsSelector = '.post-tags .list';
optTagsListSelector = '.list .tags a',

function tagClickHandler(event){
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
    const activeTags = doument.querySelectorAll('a.active[href^="#tag-"]');
    for(let activetag of activeTags){
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

function addClickListenersToTags(){
  
  /* find all links to tags */
  const tagLinks = document.querySelectorAll(optArticleTagsSelector, optTagsListSelector);
  console.log('tagLinks:', tagLinks);

  /* START LOOP: for each link */
  /* add tagClickHandler as event listener for that link */
  /* END LOOP: for each link */
    for (let tag of tagLinks) {
    tag.addEventListener('click', tagClickHandler);
    }
}


addClickListenersToTags()