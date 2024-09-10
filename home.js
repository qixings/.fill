// Check if Geolocation is supported
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
} else {
    alert("Geolocation is not supported by this browser.");
}

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    // Send coordinates to backend or use third-party API to determine location
    fetch(`https://your-location-api.com?lat=${latitude}&lon=${longitude}`)
    .then(response => response.json())
    .then(data => {
        document.querySelector('.location-selected span').innerText = `Delivering to ${data.city}`;
    });
}


function showSuggestions(query) {
    if (query.length === 0) {
        document.getElementById("suggestions").innerHTML = "";
        return;
    }
 
    fetch(`/api/search-suggestions?q=${query}`)
    .then(response => response.json())
    .then(data => {
        let suggestionsHtml = '';
        data.suggestions.forEach(suggestion => {
            suggestionsHtml += `<div>${suggestion}</div>`;
        });
        document.getElementById("suggestions").innerHTML = suggestionsHtml;
    });
 }


 var recognition = new webkitSpeechRecognition();
recognition.onresult = function(event) {
    var query = event.results[0][0].transcript;
    document.querySelector('.search-input').value = query;
    showSuggestions(query);  // trigger suggestion display
};


const banners = [
    { text: "Latest Fashion Trends", subtext: "Get up to 50% off", link: "/fashion" },
    { text: "Best Tech Gadgets", subtext: "Save on Top Gadgets", link: "/tech" }
];

let currentBanner = 0;
setInterval(() => {
    document.querySelector("#hero-content h1").innerText = banners[currentBanner].text;
    document.querySelector("#hero-content p").innerText = banners[currentBanner].subtext;
    document.querySelector("#hero-content .cta-btn").href = banners[currentBanner].link;
    currentBanner = (currentBanner + 1) % banners.length;
}, 5000);  // 5 seconds rotation


var swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
    autoplay: { delay: 3000 }
});


function quickView(productId) {
    fetch(`/api/get-product-details?productId=${productId}`)
    .then(response => response.json())
    .then(data => {
        document.querySelector('.product-details').innerHTML = `
            <img src="${data.image}" alt="${data.name}">
            <h3>${data.name}</h3>
            <p>${data.price}</p>
            <p>${data.description}</p>
        `;
        document.getElementById("quick-view-modal").style.display = "block";
    });
 }
 
 // Close Modal
 document.querySelector(".close").onclick = function() {
    document.getElementById("quick-view-modal").style.display = "none";
 };


 const socket = new WebSocket('wss://your-websocket-server');
socket.onmessage = function(event) {
   const stockData = JSON.parse(event.data);
   document.querySelector(`#stock-${stockData.productId}`).innerText = `Only ${stockData.stock} left in stock!`;
};


function showPurchaseNotification(product, user) {
    const notification = document.createElement('div');
    notification.className = 'purchase-notification';
    notification.innerText = `${user} just bought ${product}`;
    document.getElementById('purchase-notifications').appendChild(notification);
 
    setTimeout(() => {
        notification.remove();
    }, 5000);  // Display for 5 seconds
 }


 document.addEventListener("DOMContentLoaded", function() {
    const lazyImages = document.querySelectorAll('.lazyload');
    lazyImages.forEach(img => {
        const realSrc = img.getAttribute('data-src');
        img.setAttribute('src', realSrc);
    });
 });