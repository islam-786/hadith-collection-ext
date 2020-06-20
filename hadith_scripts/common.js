function renderHadithCollectionButton(callback, currentHadithCallback) {
  $("#nonheader").prepend(
    '<div style="text-align:right; padding:10px 10px;">\
          <input type="number" value=0 id="ext-hadith-count-start" />\
          <button id="ext-hadith-collection-btn">Start Collection</button>\
          <button id="ext-collect-current-hadith-btn">Collect Current Hadith</button>\
      </div>'
  );
  $("#ext-hadith-collection-btn").click(callback);
  $("#ext-collect-current-hadith-btn").click(currentHadithCallback);
}

function renderHadithCollectionStart(callback) {
  $("#nonheader").prepend(
    '<div style="text-align:right; padding:10px 10px;">\
          <input type="number" value=0 id="ext-hadith-overall-count" />\
          <button id="ext-stop-btn">Stop</button>\
      </div>'
  );
  $("#ext-stop-btn").click(callback);
}

function extNextPage() {
  const url = window.location.href;
  const nextPage = parseInt(url.substr(-1)) + 1;
  const path = url.substr(0, url.length - 1);
  const newPath = path + nextPage;

  window.location = newPath;
}

function removeCharacters(text, charArray) {
  let content = text;
  for (var i = 0; i < charArray.length; i++) {
    var re = new RegExp(charArray[i], "g");
    content = content.replace(re, " ");
  }

  return content;
}

function removeWhiteSpaces(text) {
  return text.replace(/\s+/g, " ").trim();
}

function fetchBookNumber() {
  const url = window.location.href;
  return parseInt(url.substr(-1));
}

function fetchContent(selector) {
  const text = $(selector).text();
  return removeWhiteSpaces(text);
}

function filterChapterName(text) {
  let content = removeCharacters(text, [
    "Chapter:",
    "Chapter.",
    "بَابُ",
    "باب",
  ]);
  return removeWhiteSpaces(content);
}

function filterNarratedBy(text) {
  let narratedBy = removeCharacters(text, ["Narrated", "'", ":", "`"]);
  return removeWhiteSpaces(narratedBy);
}

function filterHadithContent(text) {
  //let content = text.replace(/\"/g, '\\"');
  let content = text.replace(/Qur'an/g, "Quran");
  return removeWhiteSpaces(content);
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

function getChildeNodeContent(node, selector, filter = false, getLast = false) {
  let content;
  for (var i = 0; i < node.childNodes.length; i++) {
    let child = node.childNodes[i];
    if (child.className == selector) {
      if (filter) {
        content = filter(child.innerText);
      } else {
        content = removeWhiteSpaces(child.innerText);
      }

      if (!getLast) {
        return content;
      }
    }
  }

  return content;
}

function getTextFromChildNode(node, selector, filter = false, getLast = false) {
  if ($.isArray(selector)) {
    let child = node;
    for (var i = 0; i < selector.length; i++) {
      if (i == selector.length - 1) {
        return getChildeNodeContent(child, selector[i], filter, getLast);
      } else {
        child = getChildNode(child, selector[i]);
      }
    }
  } else {
    return getChildeNodeContent(node, selector, filter);
  }
}
