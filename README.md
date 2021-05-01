# solar-calculator
The Solar Calculator web application enables users to estimate the Nominal Power of a solar installation.

Users can search for an address on a map, draw a solar installation on the map and calculate the Nominal Power of the drawn solar installation.

Live Demo: https://daveboivin.com/solar-calculator/

### Setup and run the application
  - install a recent version of node.js on your computer
    - you will use this for building, bundling and hosting the web app
  - install dependencies: `npm install`
  - build and bundle the application: `npx webpack`
  - run the application: `npx http-server src`
  - From your browser, navigate to the application at `http://127.0.0.1:8080`


### Third party services and tools used
  - mapbox components for all map functionality - map panel, geocode search, polygon draw
    - https://docs.mapbox.com/mapbox-gl-js/example/mapbox-gl-geocoder/
    - https://docs.mapbox.com/mapbox-gl-js/example/mapbox-gl-draw/
  - turf.js for measuring the area of the polygon drawn on the map
    - https://turfjs.org/
  - webpack to bundle all of our .js files
    - https://webpack.js.org/
  - node.js for the development javascript runtime
    - https://nodejs.org/en/


### Nominal power calculation
  - Nominal Power = amount of solar panels * Maximum power of each solar panel
  - Nominal Power = (AreaPolygon / AreaSolarPanel) * MaxPowerOfSolarPanel

### Known issues
  - Refine calculation of total amount of solar panels for a given area to work for area of a polygon. My calculation assumes area is a rectangle.
  - Review and refine measurement for Nominal Power as I make several (probably incorrect) assumptions

### Next steps (if time wasn't an issue)
  - Utilize real solar data to refine the measurement beyond Standard Test Conditions
    - https://developer.nrel.gov/docs/solar/solar-resource-v1/
  - ** implement this equation **
    - https://photovoltaic-software.com/principle-ressources/how-calculate-solar-energy-power-pv-systems

### Other sources used
  - https://en.wikipedia.org/wiki/Nominal_power_(photovoltaic)
  - https://photovoltaic-software.com/principle-ressources/how-calculate-solar-energy-power-pv-systems
  - https://mapdwell.com/en/solar/boulder/assumptions