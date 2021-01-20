const selector = {
  countStart: "#ext-hadith-count-start",
  startHadith: "startHadith",
  totalPages: "totalPages",
};

const classes = {
  chapter: "chapter",
  hadith: "actualHadithContainer",
};

let currentHadithCollect = false;

async function collectCoreHadith() {
  //const data = await getBukhariUrduHadithCollection();
  let data;

  const pathname = window.location.pathname;
  if (pathname.includes("bukhari")) {
    data = await getBukhariHadithCollection();
  } else if (pathname.includes("muslim")) {
    data = await getMuslimHadithCollection();
  } else if (pathname.includes("nasai")) {
    data = await getNasaiHadithCollection();
  }

  //console.log(data);
  downloadJSON(data.hadiths, data.bookNumber);

  if (!currentHadithCollect) {
    const totalPages = await getStorage(selector.totalPages, 0);
    const url = window.location.href;
    const urlArr = url.split("/");
    const pageNumber = urlArr[urlArr.length - 1];
    const currentPage = parseInt(pageNumber);

    if (currentPage < totalPages) {
      extNextPage();
    } else {
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
