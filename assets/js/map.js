function loadGoogleMapsAPI() {
    const script = document.createElement("script");
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDFfSJjhoHZ9H7l7AlH2qtamQEWorEIf1k&callback=initMap";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
}

// Call this function when the page loads
loadGoogleMapsAPI();

// Your Google Sheets CSV link or API fetch
const SHEET_API_URL = 'https://sheets.googleapis.com/v4/spreadsheets/1OAm8bZG1l7nOVbFq3FU2eOw6rLXz9S3tPjztXkUK3ew/values/Sheet1!A2:G?key=AIzaSyDFfSJjhoHZ9H7l7AlH2qtamQEWorEIf1k';

function initMap() {
    // Initialize the map
    var isMobile = window.innerWidth <= 768; // Check if the screen width is 768px or less
    var zoomLevel = isMobile ? 1.5: 2.25; // Set zoom level based on screen size

    // Wrap the map element with the new wrapper class
    const mapElement = document.getElementById("map");
    const mapWrapper = document.createElement("div");
    mapWrapper.className = "map-wrapper";
    mapWrapper.style.marginTop = "30px"; // Add padding top
    // add bodrder
    // mapWrapper.style.border = "5px solid #506f21";
    mapElement.parentNode.insertBefore(mapWrapper, mapElement);
    mapWrapper.appendChild(mapElement);

    const map = new google.maps.Map(mapElement, {
      zoom: zoomLevel,
      center: { lat: 35.0, lng: -160.0 }, 
      mapTypeControl: false,  // Disable the map type (satellite, terrain, etc.)
      zoomControl: false,     // Disable the zoom controls (+/-)
      streetViewControl: false,  // Disable the street view button
      fullscreenControl: false,  // Disable the fullscreen button
    });

    // Custom map style
    // https://snazzymaps.com/style/151/ultra-light-with-labels
    const mapStyle = [
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#e9e9e9"
                },
                {
                    "lightness": 17
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#f5f5f5"
                },
                {
                    "lightness": 20
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "lightness": 17
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "lightness": 29
                },
                {
                    "weight": 0.2
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "lightness": 18
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "lightness": 16
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#f5f5f5"
                },
                {
                    "lightness": 21
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#dedede"
                },
                {
                    "lightness": 21
                }
            ]
        },
        {
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#ffffff"
                },
                {
                    "lightness": 16
                }
            ]
        },
        {
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "saturation": 36
                },
                {
                    "color": "#333333"
                },
                {
                    "lightness": 40
                }
            ]
        },
        {
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#f2f2f2"
                },
                {
                    "lightness": 19
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#fefefe"
                },
                {
                    "lightness": 20
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#fefefe"
                },
                {
                    "lightness": 17
                },
                {
                    "weight": 1.2
                }
            ]
        }
    ];

    const retroMapType = new google.maps.StyledMapType(mapStyle, { name: "Retro" });
    // Apply the retro style to the map
    map.mapTypes.set('retro', retroMapType);
    map.setMapTypeId('retro');

    fetch(SHEET_API_URL)
    .then((response) => response.json())
    .then((data) => {
        const cities = data.values.slice(1); // Skip the header row
        const geocoder = new google.maps.Geocoder();

        cities.forEach((row) => {
            const city = row[4];
            if (city) {
                geocoder.geocode({ address: city }, (results, status) => {
                    if (status === 'OK') {
                        // Log the result for debugging
                        console.log(`City: ${city}, Location: ${results[0].geometry.location}`);

                        // Create a marker
                        const marker = new google.maps.Marker({
                            map: map,
                            position: results[0].geometry.location,
                            title: city,
                            icon: {
                                // star
                                path: 'M 0,-24 6,-7.5 24,-7.5 10,3 15,21 0,9 -15,21 -10,3 -24,-7.5 -6,-7.5 z',
                                // location pin
                                // path: 'M 0,-24 C -14,-24 -24,-14 -24,0 -24,12 -12,24 0,36 12,24 24,12 24,0 24,-14 14,-24 0,-24 z',
                                fillColor: '#506f21',
                                fillOpacity: 0.8,
                                scale: 0.5,
                                strokeWeight: 0
                            }
                        });

                        // Create a corresponding HTML element for the city
                        const cityElement = document.createElement("div");
                        cityElement.className = "city-marker"; // Add a class for styling
                        cityElement.dataset.city = city; // Store city name
                        cityElement.style.display = "none"; // Initially hidden

                        // Add to the document (for example, to a container)
                        document.body.appendChild(cityElement);
                        cityElements.push(cityElement);
                    } else {
                        console.error('Geocode error for city "' + city + '": ' + status);
                    }
                });
            }
        });
        // Set up IntersectionObserver
        const intersectionObserver = new IntersectionObserver((entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    const city = entry.target.dataset.city;
                    console.log(`City in view: ${city}`); // Log city for debugging
                    entry.target.classList.add("drop"); // Add animation class
                    intersectionObserver.unobserve(entry.target); // Stop observing
                }
            }
        });
        // Observe all created city elements
        cityElements.forEach((el) => {
            intersectionObserver.observe(el);
        });
    })
    .catch((error) => console.error('Error fetching the spreadsheet:', error));
}

// Initialize the map
window.initMap = initMap;