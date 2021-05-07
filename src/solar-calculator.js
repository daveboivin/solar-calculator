import turfArea from '@turf/area';

const AREA_SOLAR_PANEL = 2;
const MAX_POWER_OF_SOLAR_PANEL = 250;


/** Takes GeoJSON as data parameter and returns the Nominal Power of that area
 * example data:
 * {
           "type": "Feature",
           "geometry": {
               "type": "Polygon",
               "coordinates": [
                   [
                       [100.0, 0.0],
                       [101.0, 0.0],
                       [101.0, 1.0],
                       [100.0, 1.0],
                       [100.0, 0.0]
                   ]
               ]
           }
**/
export default function getSolarData(geoJsonData) {
    var area = turfArea(geoJsonData);
    // restrict area to 2 decimal points
    var roundedArea = Math.round(area * 100) / 100;

    var totalPanels = Math.round(roundedArea / AREA_SOLAR_PANEL);

    var nominalPower = totalPanels * MAX_POWER_OF_SOLAR_PANEL;

    return {
        roundedArea,
        totalPanels,
        nominalPower
    };
}

// an example of a unit test
// commented out because it makes webpack fail due to module load order
// export function test_getNominalPower() {
//     var geoJSON = {
//         "type": "Feature",
//         "geometry": {
//             "type": "Polygon",
//             "coordinates": [
//                 [
//                     [5.0, 0.0],
//                     [5.0, 0.0],
//                     [5.0, 1.0]
//                 ]
//             ]
//         }
//
//         var area = turfArea(geoJSON);
//         // restrict area to 2 decimal points
//         var roundedArea = Math.round(area * 100) / 100;
//
//
//         assert roundedArea === getNominalPower(geoJSON).roundedArea;
// }