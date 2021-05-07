import mapboxgl from 'mapbox-gl';
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import solarCalculator from './solar-calculator'

const TOKEN = 'pk.eyJ1IjoiZGF2aWQtYiIsImEiOiJja28wZWt6M2YwY3d5MnBvaWs2c3gyejFrIn0.QESsL61dLc3e-AIfKi6k8w';
const PAGE_MAP_ID = 'map';

// mapbox setup
mapboxgl.accessToken = TOKEN;

var map = new mapboxgl.Map({
    container: PAGE_MAP_ID,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-71.0782263, 42.3816688],
    zoom: 12
});

// setup geocode search
map.addControl(new mapboxgl.NavigationControl());
map.addControl(
    new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
    })
);

// setup polygon draw
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

// seems to fix the intermittent map display issue on page load
var mapDiv = document.getElementById(PAGE_MAP_ID);
if (mapDiv.style.visibility === true) {
    map.resize();
}

// calculates area of the drawn polygon then determines the total solar panels and nominal power for the given area
// updates the html elements with calculations
function updateArea(e) {
    var geoJsondata = draw.getAll();
    var areaHtml = document.getElementById('area');
    var solarPanelsHtml = document.getElementById('solar-panels');
    var nominalPowerHtml = document.getElementById('nominal-power');

    if (geoJsondata.features.length > 0) {
        var solarData = solarCalculator(geoJsondata);

        areaHtml.innerHTML = solarData.roundedArea + ' square meters';
        solarPanelsHtml.innerHTML = solarData.totalPanels.toString();
        nominalPowerHtml.innerHTML = solarData.nominalPower + ' W';
    } else {
        areaHtml.innerHTML = '';
        solarPanelsHtml.innerHTML = '';
        nominalPowerHtml.innerHTML = '';
    }
}