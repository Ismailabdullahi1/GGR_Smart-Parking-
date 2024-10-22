// Function to dynamically change the service type
// List of services
const services = ["Fast", "MuMultiple Payment Options", "Scured"];
let currentServiceIndex = 0;

// Function to dynamically change the service type
function changeServiceAutomatically() {
  document.getElementById('service-type').textContent = services[currentServiceIndex];
  currentServiceIndex = (currentServiceIndex + 1) % services.length; // Loop through the services
}

// Set interval to change the service type every 3 seconds (3000 milliseconds)
setInterval(changeServiceAutomatically, 3000);

// Initialize with the first service type on page load
window.onload = function() {
  changeServiceAutomatically();
};
