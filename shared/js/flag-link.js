/* Adds a "Flag this question" GitHub issue link to every .item. */
(function(){
  var REPO_ISSUE_URL = "https://github.com/robert-tessnow-ramirez-sonar/acdc-hub-site/issues/new";
  var PAGE_TITLE = document.title;
  var PAGE_URL = window.location.href.split('#')[0];
  function ghIssueUrl(itemId, itemTitle){
    var anchorUrl = PAGE_URL + '#' + itemId;
    var title = '[' + PAGE_TITLE + '] "' + itemTitle + '" needs review';
    var body = [
      'Question: ' + itemTitle,
      'Source page: ' + PAGE_TITLE,
      'Link: ' + anchorUrl,
      '',
      'What needs updating or is no longer valid:',
      ''
    ].join('\n');
    return REPO_ISSUE_URL + '?title=' + encodeURIComponent(title) + '&body=' + encodeURIComponent(body);
  }
  document.querySelectorAll('.item').forEach(function(item){
    var heading = item.querySelector('h3');
    if(!heading || !item.id) return;
    var itemTitle = heading.textContent.trim();
    var link = document.createElement('a');
    link.className = 'flag-link';
    link.href = ghIssueUrl(item.id, itemTitle);
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = 'Flag this question \u2197';
    var statusRow = item.querySelector('.status-row');
    if(statusRow){
      statusRow.appendChild(link);
    } else {
      var row = document.createElement('div');
      row.className = 'rubric-flag-row';
      row.appendChild(link);
      item.appendChild(row);
    }
  });
})();
