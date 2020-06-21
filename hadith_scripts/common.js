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
          <button id="ext-stop-btn">Stop</button>\
      </div>'
  );
  $("#ext-stop-btn").click(callback);
}

function extNextPage() {
  let url = window.location.href;
  const urlArr = url.split("/");
  const pageNumber = urlArr[urlArr.length - 1];
  const nextPage = parseInt(pageNumber) + 1;
  const newUrl = url.replace(pageNumber, nextPage);

  window.location = newUrl;
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
  const urlArr = url.split("/");
  const pageNumber = urlArr[urlArr.length - 1];
  return parseInt(pageNumber);
}

function fetchContent(selector) {
  let text = $(selector).text();
  text = removeCharacters(text, ["'", "`"]);
  return removeWhiteSpaces(text);
}

function filterChapterName(text) {
  let content = removeCharacters(text, [
    "Chapter:",
    "Chapter.",
    "Chapter",
    "بَابُ",
    "باب",
  ]);
  return removeWhiteSpaces(content);
}

function filterHadithRef(text) {
  let content = removeCharacters(text, ["Reference", ":", "Sahih al-Bukhari"]);
  return removeWhiteSpaces(content);
}

function filterNarratedBy(text) {
  //let narratedBy = removeCharacters(text, ["Narrated", "'", ":", "`"]);
  let narratedBy = text;
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
  if (selector.includes("index")) {
    let index = parseInt(selector.split(":")[1]);
    return node.childNodes[index];
  } else {
    for (var i = 0; i < node.childNodes.length; i++) {
      let child = node.childNodes[i];
      if (child.className == selector) {
        return child;
      }
    }
  }
}

function getChildeNodeContent(node, selector, filter = false, getLast = false) {
  let content;

  if (selector.includes("index")) {
    if (filter) {
      content = filter(node.innerText);
    } else {
      content = removeWhiteSpaces(node.innerText);
    }

    if (!getLast) {
      return content;
    }
  } else {
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
