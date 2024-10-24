// Function to dynamically change the service type
// List of services
const services = ["Fast", "Multiple Payment Options", "Scured"];
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

// payment and Booking //
  document.getElementById('payNowBtn').addEventListener('click', function() {
    // Get the selected payment method
    var selectedPaymentMethod = document.querySelector('input[name="paymentMethod"]:checked');

    // Check if a payment option was selected
    if (selectedPaymentMethod) {
      var paymentMethod = selectedPaymentMethod.value;

      // Redirect based on selected payment method
      switch(paymentMethod) {
        case 'visa':
          window.location.href = 'visa-payment.html'; // Redirect to Visa payment page
          break;
        case 'mastercard':
          window.location.href = 'mastercard-payment.html'; // Redirect to MasterCard payment page
          break;
        case 'paypal':
          window.location.href = 'paypal-payment.html'; // Redirect to PayPal payment page
          break;
        case 'applePay':
          window.location.href = 'applepay-payment.html'; // Redirect to Apple Pay payment page
          break;
        case 'bank1':
          window.location.href = 'bank1-payment.html'; // Redirect to Bank 1 payment page
          break;
        case 'bank2':
          window.location.href = 'bank2-payment.html'; // Redirect to Bank 2 payment page
          break;
        default:
          alert('Please select a payment method.');
      }
    } else {
      alert('Please select a payment method before proceeding.');
    }
  });


  document.getElementById('pay-parking-form').onsubmit = function(event) {
    event.preventDefault();
    const plateNumber = document.getElementById('car-plate').value;
  
    // Send the car plate to the PHP script
    fetch('process_payment.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'car_plate=' + encodeURIComponent(plateNumber)
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Populate the summary box with the data
        document.getElementById('plate-number').innerText = data.plate;
        document.getElementById('parking-hours').innerText = data.hours;
        document.getElementById('parking-fee').innerText = `$${data.fee}`;
        document.getElementById('total-payment').innerText = `$${data.total}`;
        document.getElementById('summary-box').style.display = 'block';
        
        // Show the car image
        const carImg = document.getElementById('car-img');
        carImg.src = data.image; // Path to the car image
        carImg.style.display = 'block';
      } else {
        alert(data.error);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    });
  };
  function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }


