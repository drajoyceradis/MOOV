let map;
let routeLayers = [];
let vehicleMarkers = [];
let unitMarkers = [];

function initMap() {
  map = L.map("map", {
    zoomControl: false,
    preferCanvas: true
  }).setView([-20.3155, -40.3128], 12);

  L.control.zoom({ position: "bottomright" }).addTo(map);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap &copy; CARTO"
  }).addTo(map);
}

function createVehicleIcon(item) {
  return L.divIcon({
    className: "",
    html: ambulanceSvg(item.flowType, item.vehicleLabel, item.alert),
    iconSize: [72, 58],
    iconAnchor: [36, 29]
  });
}

function createUnitIcon(type) {
  const label = type === "Destino" ? "H" : "P";
  return L.divIcon({
    className: "",
    html: `<div class="unit-marker">${label}</div>`,
    iconSize: [38, 38],
    iconAnchor: [19, 19]
  });
}

function drawUnits() {
  unitMarkers.forEach(marker => marker.remove());
  unitMarkers = [];

  MOOV_DATA.units.forEach(unit => {
    const marker = L.marker(unit.coords, { icon: createUnitIcon(unit.type) })
      .addTo(map)
      .bindPopup(`<strong>${unit.name}</strong><br>${unit.type}`);
    unitMarkers.push(marker);
  });
}

function drawTransfers(transfers, onSelectTransfer) {
  routeLayers.forEach(layer => layer.remove());
  vehicleMarkers.forEach(marker => marker.remove());
  routeLayers = [];
  vehicleMarkers = [];

  transfers.forEach(item => {
    const routeColor = item.flowType === "samu" ? "#ffb13b" : "#25e1dc";

    const routeGlow = L.polyline(item.route, {
      color: routeColor,
      weight: 11,
      opacity: 0.18,
      dashArray: item.alert ? "8, 8" : null
    }).addTo(map);

    const route = L.polyline(item.route, {
      color: routeColor,
      weight: 4,
      opacity: 0.95,
      dashArray: item.alert ? "8, 8" : null
    }).addTo(map);

    routeGlow.on("click", () => onSelectTransfer(item.id));
    route.on("click", () => onSelectTransfer(item.id));
    routeLayers.push(routeGlow, route);

    const marker = L.marker(item.vehicleCoords, {
      icon: createVehicleIcon(item)
    }).addTo(map);

    marker.bindPopup(`
      <strong>${item.vehicleLabel}</strong><br>
      ${item.vehicleType}<br>
      <small>${statusLabel(item.status)}</small>
    `);

    marker.on("click", () => onSelectTransfer(item.id));
    vehicleMarkers.push(marker);
  });
}
