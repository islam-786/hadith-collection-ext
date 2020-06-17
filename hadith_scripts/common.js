function renderHadithCollectionButton(callback) {
  $("#nonheader").prepend(
    '<div style="text-align:right; padding:10px 10px;">\
          <button id="ext-hadith-collection-btn">Collect Hadiths</button>\
          <button id="ext-next-page-btn">Next</button>\
      </div>'
  );
  $("#ext-hadith-collection-btn").click(callback);
  $("#ext-next-page-btn").click(extNextPage);
}

function extNextPage() {
  const url = window.location.href;
  const nextPage = parseInt(url.substr(-1)) + 1;
  const path = url.substr(0, url.length - 1);
  const newPath = path + nextPage;

  window.location = newPath;
}

function removeWhiteSpaces(text) {
  return text.replace(/\s+/g, " ").trim();
}

function fetchContent(selector) {
  const text = $(selector).text();
  return removeWhiteSpaces(text);
}

function filterChapterName(text) {
  return removeWhiteSpaces(text.replace("Chapter: ", ""));
}

function filterNarratedBy(text) {
  let narratedBy = text.replace("Narrated '", "");
  narratedBy = narratedBy.replace(":", "");
  return removeWhiteSpaces(narratedBy);
}

function filterHadithContent(text) {
  return removeWhiteSpaces(text);
}

function hadithCollection(selector) {
  return $(selector);
}

function checkClass(node, name) {
  if (node.className == name) {
    return true;
  }

  return false;
}

function getChildNode(node, selector) {
  for (var i = 0; i < node.childNodes.length; i++) {
    let child = node.childNodes[i];
    if (child.className == selector) {
      return child;
    }
  }
}

function getChildeNodeContent(node, selector, filter = false) {
  for (var i = 0; i < node.childNodes.length; i++) {
    let child = node.childNodes[i];
    if (child.className == selector) {
      if (filter) {
        return filter(child.innerText);
      }

      return removeWhiteSpaces(child.innerText);
    }
  }
}

function getTextFromChildNode(node, selector, filter = false) {
  if ($.isArray(selector)) {
    let child = node;
    for (var i = 0; i < selector.length; i++) {
      if (i == selector.length - 1) {
        return getChildeNodeContent(child, selector[i], filter);
      } else {
        child = getChildNode(child, selector[i]);
      }
    }
  } else {
    return getChildeNodeContent(node, selector, filter);
  }
}
