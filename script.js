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




