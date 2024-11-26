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
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 2.25,
      center: { lat: 35.0, lng: -160.0 }, 
      mapTypeControl: false,  // Disable the map type (satellite, terrain, etc.)
      zoomControl: false,     // Disable the zoom controls (+/-)
      streetViewControl: false,  // Disable the street view button
      fullscreenControl: false,  // Disable the fullscreen button
    });
    // Retro style for the map
    const retroStyle = [
        {
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#f5f5f5"
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
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#757575"
                }
            ]
        },
        {
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#e8e8e8"
                }
            ]
        },
        {
            "featureType": "administrative.country",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#8a8a8a"
                }
            ]
        },
        {
            "featureType": "administrative.province",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#8a8a8a"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#dcdcdc"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#e3e3e3"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#181818"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#5e5e5e"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#f0f0f0"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#6b6b6b"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#f5f5f5"
                }
            ]
        },
        {
            "featureType": "transit.station",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#b3cde0"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#4e6d8c"
                }
            ]
        }
    ];

    const retroMapType = new google.maps.StyledMapType(retroStyle, { name: "Retro" });
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
            // const markerIcon = {
            //     path: google.maps.SymbolPath.CIRCLE,  // Circle shape
            //     fillColor: 'orange',  // Retro orange color
            //     fillOpacity: 0.8,
            //     scale: 8,  // Adjust the size of the marker
            //     strokeColor: 'black',  // Retro black border
            //     strokeWeight: 1,  // Border thickness
            // };

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
                        });

                        // Create a corresponding HTML element for the city
                        const cityElement = document.createElement("div");
                        cityElement.className = "city-marker"; // Add a class for styling
                        cityElement.dataset.city = city; // Store city name
                        cityElement.style.display = "none"; // Initially hidden

                        // Add to the document (for example, to a container)
                        document.body.appendChild(cityElement);
                        cityElements.push(cityElement);

                        // new google.maps.Marker({
                        //     map: map,
                        //     position: results[0].geometry.location,
                        //     title: city,
                        //     // icon: markerIcon,
                        // });
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