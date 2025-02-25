// Assuming cityElements should be a collection of elements with a specific class or ID
// Example: Collecting all elements with the class 'city-element'
let cityElements = Array.from(document.querySelectorAll('.city-element'));

// Load Google Maps API asynchronously
function loadGoogleMapsAPI() {
    // Suppress console warnings from Google Maps API
    const originalWarn = console.warn;
    console.warn = function() {
        if (!(arguments[0].includes && arguments[0].includes('Google Maps'))) {
            originalWarn.apply(console, arguments);
        }
    };

    const script = document.createElement("script");
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDFfSJjhoHZ9H7l7AlH2qtamQEWorEIf1k&callback=initMap";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
}

// Call this function when the page loads
document.addEventListener("DOMContentLoaded", loadGoogleMapsAPI);

// Your Google Sheets CSV link or API fetch
const SHEET_API_URL = 'https://sheets.googleapis.com/v4/spreadsheets/1OAm8bZG1l7nOVbFq3FU2eOw6rLXz9S3tPjztXkUK3ew/values/Sheet1!A2:J?key=AIzaSyDFfSJjhoHZ9H7l7AlH2qtamQEWorEIf1k';

class GeocodeDB {
    constructor() {
        this.geocodeData = [];
        this.SHEET_ID = '1OAm8bZG1l7nOVbFq3FU2eOw6rLXz9S3tPjztXkUK3ew';
        this.API_KEY = 'AIzaSyDFfSJjhoHZ9H7l7AlH2qtamQEWorEIf1k';
    }

    async init() {
        try {
            // Read from Google Sheets
            const response = await fetch(
                `https://sheets.googleapis.com/v4/spreadsheets/${this.SHEET_ID}/values/Sheet2!A2:C?key=${this.API_KEY}`
            );
            const data = await response.json();
            this.geocodeData = data.values || [];
        } catch (error) {
            console.error('Error initializing GeocodeDB:', error);
        }
    }

    get(city) {
        const found = this.geocodeData.find(row => row[0] === city);
        return found ? { lat: parseFloat(found[1]), lng: parseFloat(found[2]) } : null;
    }

    async set(city, lat, lng) {
        try {
            // Add to local array
            this.geocodeData.push([city, lat.toString(), lng.toString()]);
            console.log('Geocode added:', city);
        } catch (error) {
            console.error('Error adding geocode:', error);
        }
    }

}

// Create instance and initialize
const geocodeDB = new GeocodeDB();
geocodeDB.init();

function callGeoCodeAPI(city) {
    return new Promise((resolve, reject) => {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: city }, function (results, status) {
            if (status === 'OK') {
                resolve(results[0].geometry.location);
                geocodeDB.set(city, results[0].geometry.location.lat(), results[0].geometry.location.lng());
            } else {
                reject(status);
            }
        });
    });
}

function initMap() {
    // Initialize the map
    var isMobile = window.innerWidth <= 768; // Check if the screen width is 768px or less
    var zoomLevel = isMobile ? 3 : 3.7; // Set zoom level based on screen size
    var isFullScreen = window.innerWidth >= 1280; // Check if the screen width is 1024px or more
    zoomLevel = isFullScreen ? 4 : zoomLevel; // Set zoom level based on screen size
    // Wrap the map element with the new wrapper class
    const mapElement = document.getElementById("map");
    const mapWrapper = document.createElement("div");
    mapWrapper.className = "map-wrapper";
    mapElement.parentNode.insertBefore(mapWrapper, mapElement);
    mapWrapper.appendChild(mapElement);

    const map = new google.maps.Map(mapElement, {
        zoom: zoomLevel,
        center: { lat: 39.8283, lng: -98.5795 }, // Center the map on the USA
        mapTypeControl: false,  // Disable the map type (satellite, terrain, etc.)
        zoomControl: false,     // Disable the zoom controls (+/-)
        streetViewControl: false,  // Disable the street view button
        fullscreenControl: false,  // Disable the fullscreen button
    });

    // Custom map style
    // https://snazzymaps.com/style/151/ultra-light-with-labels
    const mapStyle = [
        {
            "featureType": "poi",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "stylers": [
                {
                    "saturation": -70
                },
                {
                    "lightness": 37
                },
                {
                    "gamma": 1.15
                }
            ]
        },
        {
            "elementType": "labels",
            "stylers": [
                {
                    "gamma": 0.26
                },
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "stylers": [
                {
                    "lightness": 0
                },
                {
                    "saturation": 0
                },
                {
                    "hue": "#ffffff"
                },
                {
                    "gamma": 0
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
                {
                    "lightness": 20
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
                {
                    "lightness": 50
                },
                {
                    "saturation": 0
                },
                {
                    "hue": "#ffffff"
                }
            ]
        },
        {
            "featureType": "administrative.province",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "lightness": -50
                }
            ]
        },
        {
            "featureType": "administrative.province",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative.province",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        }
    ];

    const retroMapType = new google.maps.StyledMapType(mapStyle, { name: "Retro" });
    map.mapTypes.set('retro', retroMapType);
    map.setMapTypeId('retro');
     
    fetch(SHEET_API_URL)
        .then((response) => response.json())
        .then((data) => {
            const cities = data.values; // Skip the header row
            const locationCounts = {};
            cities.forEach((row) => {
                const city = row[4];
                if (!city) return;
                let {lat, lng} = geocodeDB.get(city) || {};

                // if it's not found from the geocode db, call geocode api to get the lat and lng
                if (!lat && !lng) {
                    console.log('Geocode not found:', city);
                    callGeoCodeAPI(city)
                        .then(location => {
                            lat = location.lat();
                            lng = location.lng();
                            console.log('Geocode found:', city, lat, lng);
                        })
                        .catch(error => console.error('Geocode failed:', error, city));
                }

                if (city && !isNaN(lat) && !isNaN(lng)) {
                    const locationKey = `${lat},${lng}`;

                    if (!locationCounts[locationKey]) {
                        locationCounts[locationKey] = { count: 0, location: { lat, lng } };
                    }
                    locationCounts[locationKey].count++;

                    // Create a marker
                    const markerSvg = `
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36">
                            <path fill="#506f21" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                            ${(locationCounts[locationKey]?.count || 0) > 1 ? `
                                <circle cx="12" cy="9" r="7" fill="#506f21" />
                                <text x="12" y="11" font-family="Arial"
                                text-anchor="middle" fill="#fff" font-size="8">${locationCounts[locationKey].count}</text>
                            ` : ''}
                        </svg>
                    `;
                    const marker = new google.maps.Marker({
                        map: map,
                        position: { lat, lng },
                        title: city,
                        icon: {
                            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(markerSvg),
                            scaledSize: new google.maps.Size(36, 36)
                        } 
                    });

                    // Create a corresponding HTML element for the city
                    const cityElement = document.createElement("div");
                    cityElement.className = "city-marker"; // Add a class for styling
                    cityElement.dataset.city = city; // Store city name
                    cityElement.style.display = "none"; // Initially hidden

                    // Add to the document (for example, to a container)
                    document.body.appendChild(cityElement);
                    cityElements.push(cityElement); // Use the array method
                }
            });

            // Set up IntersectionObserver
            const intersectionObserver = new IntersectionObserver((entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        const city = entry.target.dataset.city;
                        // console.log(`City in view: ${city}`); // Log city for debugging
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