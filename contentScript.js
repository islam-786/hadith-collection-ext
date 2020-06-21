$(document).ready(function () {
  const pathname = window.location.pathname;

  if (pathname.includes("bukhari")) {
    setTimeout(function () {
      coreHadithScript();
    }, 2000);
  }
});
