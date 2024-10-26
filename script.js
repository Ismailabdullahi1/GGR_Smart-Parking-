// All JS of the system is here //


// Function to dynamically change the service type
const services = [ "Fast", "More Options", "Secured"];
let currentServiceIndex = 0;

// Function to update the service type
function updateServiceType() {
    const serviceTypeElement = document.getElementById("service-type");
    serviceTypeElement.textContent = services[currentServiceIndex];

    // Update index for next word
    currentServiceIndex = (currentServiceIndex + 1) % services.length; // Loop back to the start
}

// Call the updateServiceType function every 3 seconds
setInterval(updateServiceType, 2000);


// Get the menu toggle button and nav menu
const menuToggle = document.getElementById('mobileMenu');
const navMenu = document.querySelector('.navMenu');

// Add click event listener to the menu toggle
menuToggle.addEventListener('click', () => {
    // Toggle the 'active' class on the nav menu
    navMenu.classList.toggle('active');
});




//Pay Parkig page // 
document.getElementById('pay-parking-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission
  
  // Get the entered car plate number (for simulation)
  const carPlate = document.getElementById('car-plate').value;
  
  // Populate the summary box with dummy data
  document.getElementById('plate-number').textContent = carPlate;
  document.getElementById('parking-hours').textContent = '3 hours';
  document.getElementById('parking-fee').textContent = '$2 ';
  document.getElementById('total-payment').textContent = '$2';

  // Show the summary box and car image
  document.getElementById('summary-box').style.display = 'block';
  document.getElementById('car-img').style.display = 'block';
});


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

document.getElementById("pay-now").addEventListener("click", function() {
  const paymentOption = document.getElementById("payment-option").value;

  let paymentLink;

  switch (paymentOption) {
      case "Visa and MasterCard":
          paymentLink = "https://example.com/credit-card"; 
          break;
      case "Waafi":
          paymentLink = "https://waafi.com/#booking-reservations"; 
          break;
      case "Dahab Plus":
          paymentLink = "https://www.dahabplus.com/"; 
          break;
      case "Dahab Plus":
          paymentLink = "https://www.dahabplus.com/"; 
          break;
      case "primier Wallet":
          paymentLink = "https://premierwallets.com/"; 
          break;
      case "IBS":
          paymentLink = "https://www.ebesa.so/";
          break;
      case "yeel_pay":
          paymentLink = "https://yeel.io/"; 
          break;
          
      default:
          alert("Please select a payment option.");
          return; // Exit the function if no valid option is selected
  }

  // Redirect to the chosen payment link
  window.location.href = paymentLink;
});

  

 // Get modal element
 const modal = document.getElementById("confirmationModal");

 // Get close button
 const closeModal = document.getElementById("closeModal");

 // Get okay button
 const okayButton = document.getElementById("okayButton");

 // Get form element
 const contactForm = document.getElementById("contactForm");

 // Show modal when form is submitted
 contactForm.onsubmit = function (event) {
     event.preventDefault(); // Prevent form submission
     modal.style.display = "block"; // Show the modal
 };

 // Close modal when user clicks on <span> (x)
 closeModal.onclick = function () {
     modal.style.display = "none";
 };

 // Close modal when user clicks okay
 okayButton.onclick = function () {
     modal.style.display = "none";
 };

 // Close modal when user clicks outside of the modal
 window.onclick = function (event) {
     if (event.target === modal) {
         modal.style.display = "none";
     }
 };



//parking availbity//
function fetchParkingData() {
  fetch('parking availbity.php')
      .then(response => response.json())
      .then(data => {
          document.getElementById('totalSpots').innerText = data.total_spots;
          document.getElementById('availableSpots').innerText = data.available_spots;
      })
      .catch(error => console.error('Error fetching data:', error));
}

// Fetch parking data every 5 seconds
setInterval(fetchParkingData, 5000);
// Fetch data on initial load
fetchParkingData();

