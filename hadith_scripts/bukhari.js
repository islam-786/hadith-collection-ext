const selector = {
  bookName: ".book_page_english_name",
  hadithCount: ".AllHadith .actualHadithContainer",
  chapterName: ".AllHadith .chapter .englishchapter",
  narratedBy: ".AllHadith .actualHadithContainer .hadith_narrated",
  hadithContent: ".AllHadith .actualHadithContainer .text_details",
};

function collectBukhariHadith() {
  const bookName = fetchContent(selector.bookName);
  const data = [];

  for (var i = 0; i < countCollection(selector.hadithCount); i++) {
    let hadith = {};
    hadith.book = bookName;
    hadith.NumberInBook = i + 1;
    hadith.chapter = getChapterName(selector.chapterName, i);
    hadith.narratedBy = fetchNarratedBy(selector.narratedBy, i);
    hadith.text = fetchHadithContent(selector.hadithContent, i);

    data.push(hadith);
  }

  console.log(data);
}

function bukhariHadithScript() {
  renderHadithCollectionButton(collectBukhariHadith);
}
