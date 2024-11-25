function initMap() {
    let map;
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: { lat: 39.8283, lng: -98.5795 }, // Center of US
    });

    // // Fetch data from Sheets API
    // getSpreadsheetData().then((data) => {
    //     data.forEach((row) => {
    //         const [timestamp, name, email, rsvp, city, lat, lng, message] = row;
    //         const position = { lat: parseFloat(lat), lng: parseFloat(lng) };
    //         const marker = new google.maps.Marker({
    //             position,
    //             map,
    //             title: city,
    //         });

    //         const infowindow = new google.maps.InfoWindow({
    //             content: `<h3>${city}</h3><p>${message}</p>`,
    //         });

    //         marker.addListener("click", () => infowindow.open(map, marker));
    //     });
    // }).catch((error) => console.error("Error fetching data:", error));
}

// Ensure initMap is globally accessible
window.initMap = initMap;