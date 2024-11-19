DG.then(function () {
  var map = DG.map("map", {
    center: [50.406763, 80.24752],
    zoom: 18,
  });
  DG.marker([50.406763, 80.24752])
    .addTo(map)
    .bindLabel(`Университет \n им. Алихана Бокейханова`, {
      static: true,
    });
});
