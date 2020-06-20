const selector = {
  countStart: "#ext-hadith-count-start",
  overallCount: "#ext-hadith-overall-count",
  hadithCount: "overAllHadithCount",
  startHadith: "startHadith",
  totalPages: "totalPages",
};

const classes = {
  chapter: "chapter",
  hadith: "actualHadithContainer",
};

let currentHadithCollect = false;

async function collectCoreHadith() {
  const data = await getBukhariHadithCollection();

  await setStorage(selector.hadithCount, data.overallCount);
  $(selector.overallCount).val(data.overallCount - 1);
  console.log(data.hadiths);

  downloadJSON(data.hadiths, data.bookNumber);

  if (!currentHadithCollect) {
    const totalPages = await getStorage(selector.totalPages, 0);
    const url = window.location.href;
    const currentPage = parseInt(url.substr(-1));

    if (currentPage < totalPages) {
      extNextPage();
    } else {
      await removeStorage(selector.startHadith);
      await removeStorage(selector.hadithCount);
      await removeStorage(selector.startHadith);
      await removeStorage(selector.totalPages);
    }
  } else {
    currentHadithCollect = false;
  }
}

function collectCurrentHadith() {
  currentHadithCollect = true;
  collectCoreHadith();
  stopHadithCollection();
}

async function startCollectingCoreHadith() {
  const totalPages = parseInt($(selector.countStart).val());
  await setStorage(selector.totalPages, totalPages);
  await setStorage(selector.startHadith, "start");
  collectCoreHadith();
}

async function stopHadithCollection() {
  await removeStorage(selector.startHadith);
  await removeStorage(selector.startHadith);
  await removeStorage(selector.totalPages);
}

async function coreHadithScript() {
  const isStart = await getStorage(selector.startHadith, "stop");
  if (isStart == "start") {
    renderHadithCollectionStart(stopHadithCollection);
    collectCoreHadith();
  } else {
    renderHadithCollectionButton(
      startCollectingCoreHadith,
      collectCurrentHadith
    );
  }
}
