import mapboxgl from 'mapbox-gl';
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import turfArea from '@turf/area';

mapboxgl.accessToken = 'pk.eyJ1IjoiZGF2aWQtYiIsImEiOiJja28wZWt6M2YwY3d5MnBvaWs2c3gyejFrIn0.QESsL61dLc3e-AIfKi6k8w';

var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-71.0782263, 42.3816688],
    zoom: 12 // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());

// Add the control to the map.
map.addControl(
    new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
    })
);

var draw = new MapboxDraw({
    displayControlsDefault: false,
    controls: {
        polygon: true,
        trash: true
    },
    defaultMode: 'draw_polygon'
});

map.addControl(draw);

map.on('draw.create', updateArea);
map.on('draw.delete', updateArea);
map.on('draw.update', updateArea);

function updateArea(e) {
    var data = draw.getAll();
    var areaHtml = document.getElementById('area');
    var solarPanelsHtml = document.getElementById('solar-panels');
    var nominalPowerHtml = document.getElementById('nominal-power');

    if (data.features.length > 0) {
        var area = turfArea(data);
        // restrict area to 2 decimal points
        var roundedArea = Math.round(area * 100) / 100;
        areaHtml.innerHTML = roundedArea + ' square meters';

        var totalPanels = Math.round(roundedArea / 2);
        solarPanelsHtml.innerHTML = totalPanels.toString();

        var nominalPower = totalPanels * 250;
        nominalPowerHtml.innerHTML = nominalPower + ' W';
    } else {
        areaHtml.innerHTML = '';
        solarPanelsHtml.innerHTML = '';
        nominalPowerHtml.innerHTML = '';
    }
}