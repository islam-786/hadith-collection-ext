async function getBukhariUrduHadithCollection() {
  const selector = {
    narratedBy: ["englishcontainer", "urdu_hadith_full urdu", "urdu_sanad"],
    hadithContent: ["englishcontainer", "urdu_hadith_full urdu"],
    hadithCollection: ".AllHadith>div",
  };

  const bookNumber = fetchBookNumber();
  const data = [];
  let hadith = {};
  let hadithCount = 1;

  function filterUrduHadithContent(text) {
    let content = text.replace(hadith.narratedBy, "");
    return removeWhiteSpaces(content);
  }

  hadithCollection(selector.hadithCollection).each(function (index) {
    let node = this;

    if (checkClass(node, classes.hadith)) {
      hadith.narratedBy = getTextFromChildNode(
        node,
        selector.narratedBy,
        filterNarratedBy
      );
      hadithContent = getTextFromChildNode(
        node,
        selector.hadithContent,
        filterHadithContent
      );

      hadith.text = filterUrduHadithContent(hadithContent);
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
