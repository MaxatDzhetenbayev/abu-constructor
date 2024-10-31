DG.then(function () {
  var map = DG.map("map", {
    center: [50.407414, 80.241999],
    zoom: 18,
  });
  DG.marker([50.407414, 80.241999])
    .addTo(map)
    .bindLabel(`Университет \n им. Алихана Бокейханова`, {
      static: true,
    });
});
