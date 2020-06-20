async function setStorage(key, value) {
  const data = {};
  data[key] = value;
  chrome.storage.sync.set(data);
}

async function getStorage(key, defaultValue) {
  let data;
  chrome.storage.sync.get(key, function (storageData) {
    data = storageData[key];
  });

  await sleep(100);

  if (!data) {
    data = defaultValue;
  }

  return data;
}

async function removeStorage(key) {
  const data = {};
  data[key] = null;
  chrome.storage.sync.set(data);
  await sleep(100);
}

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
