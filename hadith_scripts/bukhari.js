async function getBukhariHadithCollection() {
  const selector = {
    bookName: ".book_page_english_name",
    bookArabicName: ".book_page_arabic_name",
    chapterName: "englishchapter",
    arabicChapterName: "arabicchapter arabic",
    narratedBy: ["englishcontainer", "english_hadith_full", "hadith_narrated"],
    narratedByArabic: ["arabic_hadith_full arabic", "arabic_sanad arabic"],
    hadithContent: ["englishcontainer", "english_hadith_full", "text_details"],
    hadithArabicContent: [
      "arabic_hadith_full arabic",
      "arabic_text_details arabic",
    ],
    hadithCollection: ".AllHadith>div",
    hadithRefNumber: [
      "bottomItems",
      "hadith_reference",
      "index:0",
      "index:0",
      "index:1",
    ],
  };

  const bookName = fetchContent(selector.bookName);
  const bookArabicName = fetchContent(selector.bookArabicName);
  const bookNumber = fetchBookNumber();
  const data = [];
  let hadith = {};
  let hadithCount = 1;
  let currentChapter = "";
  let currentArabicChapter = "";

  hadithCollection(selector.hadithCollection).each(function (index) {
    let node = this;

    if (checkClass(node, classes.chapter)) {
      chapter = getTextFromChildNode(
        node,
        selector.chapterName,
        filterChapterName
      );

      if (chapter) {
        currentChapter = chapter;
        currentArabicChapter = getTextFromChildNode(
          node,
          selector.arabicChapterName,
          filterChapterName
        );
      }
    }

    // 4-221
    // 5 - 272, 273
    // 6 - 299, 300, 301
    // 6 329, 330
    if (checkClass(node, classes.hadith)) {
      hadith.book = bookName;
      hadith.arabicBook = bookArabicName;
      hadith.number = bookNumber;
      hadith.hadithNumber = getTextFromChildNode(
        node,
        selector.hadithRefNumber,
        filterHadithRef
      );
      hadith.NumberInBook = hadithCount;
      hadith.chapter = currentChapter;
      hadith.arabicChapter = currentArabicChapter;
      hadith.narratedBy = getTextFromChildNode(
        node,
        selector.narratedBy,
        filterNarratedBy
      );
      hadith.narratedByArabic = getTextFromChildNode(
        node,
        selector.narratedByArabic,
        filterNarratedBy
      );
      hadith.narratedByDetail = getTextFromChildNode(
        node,
        selector.narratedByArabic,
        filterNarratedBy,
        true
      );
      hadith.text = getTextFromChildNode(
        node,
        selector.hadithContent,
        filterHadithContent
      );
      hadith.arabicText = getTextFromChildNode(
        node,
        selector.hadithArabicContent,
        filterHadithContent
      );

      data.push(hadith);

      hadithCount++;
      hadith = {};
    }
  });

  return {
    hadiths: data,
    bookNumber: bookNumber,
  };
}
