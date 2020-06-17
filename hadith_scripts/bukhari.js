const selector = {
  bookName: ".book_page_english_name",
  chapterName: "englishchapter",
  narratedBy: ["englishcontainer", "english_hadith_full", "hadith_narrated"],
  hadithContent: ["englishcontainer", "english_hadith_full", "text_details"],
  hadithCollection: ".AllHadith>div",
};

const classes = {
  chapter: "chapter",
  hadith: "actualHadithContainer",
};

function collectBukhariHadith() {
  const bookName = fetchContent(selector.bookName);
  const data = [];
  let hadith = {};
  let hadithCount = 1;
  let currentChapter = "";

  hadithCollection(selector.hadithCollection).each(function (index) {
    let node = this;

    if (checkClass(node, classes.chapter)) {
      currentChapter = getTextFromChildNode(
        node,
        selector.chapterName,
        filterChapterName
      );
    }

    if (checkClass(node, classes.hadith)) {
      hadith.book = bookName;
      hadith.NumberInBook = hadithCount;
      hadith.chapter = currentChapter;
      hadith.narratedBy = getTextFromChildNode(
        node,
        selector.narratedBy,
        filterNarratedBy
      );
      hadith.text = getTextFromChildNode(
        node,
        selector.hadithContent,
        filterHadithContent
      );

      data.push(hadith);

      hadithCount++;
      hadith = {};
    }
  });

  console.log(data);
}

function bukhariHadithScript() {
  renderHadithCollectionButton(collectBukhariHadith);
}
