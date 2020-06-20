async function getBukhariHadithCollection() {
  const selector = {
    bookName: ".book_page_english_name",
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
    hadithCount: "overAllHadithCount",
  };

  const bookName = fetchContent(selector.bookName);
  const bookNumber = fetchBookNumber();
  const data = [];
  let overAllHadithCount = await getStorage(selector.hadithCount, 1);
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

    if (checkClass(node, classes.hadith)) {
      hadith.book = bookName;
      hadith.number = bookNumber;
      hadith.hadithNumber = overAllHadithCount;
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
      overAllHadithCount++;
      hadith = {};
    }
  });

  return {
    overallCount: overAllHadithCount,
    hadiths: data,
    bookNumber: bookNumber,
  };
}
