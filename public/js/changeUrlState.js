window.addEventListener("load", function (e) {
  if (this.location.hash) {
    let newUrl = "http://localhost:5501/forkify.html";

    window.history.pushState({ path: newUrl }, "", newUrl);
  }
});
