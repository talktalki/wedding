// Your Google Sheets CSV link or API fetch
const SHEET_API_URL = 'https://sheets.googleapis.com/v4/spreadsheets/1OAm8bZG1l7nOVbFq3FU2eOw6rLXz9S3tPjztXkUK3ew/values/Sheet1!A2:A?key=AIzaSyDFfSJjhoHZ9H7l7AlH2qtamQEWorEIf1k';

function initMap() {
    // Initialize the map
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 3,
      center: { lat: 39.8283, lng: -98.5795 }, // Center of the US
    });

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
                        new google.maps.Marker({
                            map: map,
                            position: results[0].geometry.location,
                            title: city,
                        });
                    } else {
                        console.error('Geocode error: ' + status);
                    }
                });
            }
        });
    })
    .catch((error) => console.error('Error fetching the spreadsheet:', error));
}

// Initialize the map
window.initMap = initMap;

//     // Geocode and pin cities
//     function geocodeAndPin(city) {
//       const geocoder = new google.maps.Geocoder();
//       geocoder.geocode({ address: city }, (results, status) => {
//         if (status === "OK") {
//           const location = results[0].geometry.location;
//           new google.maps.Marker({
//             map: map,
//             position: location,
//             title: city,
//           });
//         } else {
//           console.error(`Geocode failed for city ${city}: ${status}`);
//         }
//       });
//     }

//     // Fetch cities and pin them on the map
//     const sheetId = "1OAm8bZG1l7nOVbFq3FU2eOw6rLXz9S3tPjztXkUK3ew"; // Replace with your spreadsheet ID
//     const apiKey = "AIzaSyDFfSJjhoHZ9H7l7AlH2qtamQEWorEIf1k"; // Replace with your API key
//     const range = "Sheet1!A2:G"; // Adjust the range to include your city column
//     const sheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

//     fetch(sheetUrl)
//       .then(response => response.json())
//       .then(data => {
//         const rows = data.values;
//         const cityIndex = 4; // Assuming 'city' is in the 5th column (0-based index)
//         const cities = rows.map(row => row[cityIndex]);
//         cities.forEach(city => geocodeAndPin(city));
//       })
//       .catch(error => console.error("Error fetching spreadsheet data:", error));
//   }