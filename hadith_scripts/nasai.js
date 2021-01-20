async function getNasaiHadithCollection() {
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
    hadithGrade: [
      "bottomItems",
      "hadith_annotation",
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
      hadith.bookNumber = bookNumber;
      hadith.grade = getTextFromChildNode(
        node,
        selector.hadithGrade,
        filterHadithGradeNasai
      );
      hadith.hadithNumber = getTextFromChildNode(
        node,
        selector.hadithRefNumber,
        filterHadithRefNasai
      );
      hadith.NumberInBook = hadithCount;
      hadith.chapter = currentChapter;
      hadith.arabicChapter = currentArabicChapter;
      hadith.narratedBy =
        getTextFromChildNode(node, selector.narratedBy, filterNarratedBy) ||
        "Not found";
      hadith.narratedByArabic =
        getTextFromChildNode(
          node,
          selector.narratedByArabic,
          filterNarratedBy
        ) || "Not found";
      hadith.narratedByDetail =
        getTextFromChildNode(
          node,
          selector.narratedByArabic,
          filterNarratedBy,
          true
        ) || "Not found";
      hadith.text =
        getTextFromChildNode(
          node,
          selector.hadithContent,
          filterHadithContent
        ) || "Not found";
      hadith.arabicText =
        getTextFromChildNode(
          node,
          selector.hadithArabicContent,
          filterHadithContent
        ) || "Not found";

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

function filterHadithRefNasai(text) {
  let content = removeCharacters(text, [
    "Reference",
    ":",
    "Sunan an-Nasa'i",
    "Arabic",
    "/",
    "English ",
    "book reference",
    "Vol.",
    " 1,",
    "Book 1,",
    "Book",
    "Hadith",
    "reference",
  ]);
  return removeWhiteSpaces(content);
}

function filterHadithGradeNasai(text) {
  let content = removeCharacters(text, ["Grade", ":"]);
  return removeWhiteSpaces(content);
}
