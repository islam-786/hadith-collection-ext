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

function countCollection(selector) {
  return $(selector).length;
}

function getChapterName(selector, index) {
  const chapter = $(selector)[index];
  return removeWhiteSpaces(chapter.textContent.replace("Chapter: ", ""));
}

function fetchNarratedBy(selector, index) {
  const narratedBy = $(selector)[index];
  let text = narratedBy.textContent.replace("Narrated '", "");
  text = text.replace(":", "");
  return removeWhiteSpaces(text);
}

function fetchHadithContent(selector, index) {
  const hadith = $(selector)[index];
  return removeWhiteSpaces(hadith.textContent);
}
