
function initialize() 
{
  var contents = document.querySelectorAll('main .biography-content');
  contents.forEach(function(content) 
  {
    content.style.display = 'none';
  });
  var contents = document.querySelectorAll('main .artworks-content');
  contents.forEach(function(content) 
  {
    content.style.display = 'none';
  });
  var contents = document.querySelectorAll('main .links-content');
  contents.forEach(function(content) 
  {
    content.style.display = 'none';
  });
  var contents = document.querySelectorAll('main .exhibitions-content');
  contents.forEach(function(content) 
  {
    content.style.display = 'none';
  });
  var contents = document.querySelectorAll('main .administration-content');
  contents.forEach(function(content)
  {
    content.style.display = 'none';
  });
}

function showSection(sectionId)
{
  var sections = document.querySelectorAll('aside .section');
  sections.forEach(function(section) 
    {
      section.style.display = 'none';
    });
  initialize();
  document.getElementById(sectionId).style.display = 'block';
}

function showBiographyContent(contentId) 
{
  initialize();
  document.getElementById(contentId).style.display = 'block';
}

function showArtworksContent(contentId) 
{
  initialize();
  document.getElementById(contentId).style.display = 'block';
}

function showExhibitionsContent(contentId) 
{
  initialize();
  document.getElementById(contentId).style.display = 'block';
}

function showLinksContent(contentId) 
{
  initialize();
  document.getElementById(contentId).style.display = 'block';
}

function showAdministrationContent(contentId) 
{
  initialize();
  document.getElementById(contentId).style.display = 'block';
}
