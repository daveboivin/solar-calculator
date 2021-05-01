# solar-calculator
The Solar Calculator web application enables users to estimate the Nominal Power of a solar installation.

Users can search for an address on a map, draw a solar installation on the map and calculate the Nominal Power of the drawn solar installation.

### Setup
- install a recent version of node.js on your computer
  - you will use this for building, bundling and running this web application

### Building the Application
- using a terminal, run the command `npx webpack`
  - this will use webpack to bundle all of our .js files so we can run them in the web browser

### Running the Application
- The application will run out of the project src/ directory
- using a terminal, run the command `npx http-server src`
  - From your browser, navigate to the application at `http://127.0.0.1:8080`


### Third party services and tools used
- mapbox components for all map functionality - map panel, geocode search, polygon draw
- turf.js for measuring the area of the polygon drawn on the map
- webpack to bundle all of our .js files
- node.js for the development javascript runtime

### Nominal Power Calculation