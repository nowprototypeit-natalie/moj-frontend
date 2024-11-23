if (window.GOVUKPrototypeKit && window.GOVUKPrototypeKit.documentReady) {
  window.GOVUKPrototypeKit.documentReady(function () {
    window.MOJFrontend.initAll();
  });
} else if (window.NOW_PROTOTYPE_IT && window.NOW_PROTOTYPE_IT.documentReady) {
  window.NOW_PROTOTYPE_IT.documentReady(function () {
    window.MOJFrontend.initAll();
  });
}
