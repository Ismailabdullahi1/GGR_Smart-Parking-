document.getElementById('calculate').onclick = async () => {
    const name = document.getElementById('full-name').value;
    const plate = document.getElementById('car-plate').value;
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    const duration = Math.floor((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
    const parkingFee = 2; 
    const totalPayment = duration * parkingFee;

    // Show modal with booking summary
    document.getElementById('summary-name').innerText = `Name: ${name}`;
    document.getElementById('summary-plate').innerText = `Plate: ${plate}`;
    document.getElementById('summary-dates').innerText = `From: ${startDate} To: ${endDate}`;
    document.getElementById('summary-duration').innerText = `Duration: ${duration} day(s)`;
    document.getElementById('summary-fee').innerText = `Total Fee: $${totalPayment}`;

    // Display the modal
    document.getElementById('modal').style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Disable background scrolling
};

// Close modal when the "x" button is clicked
document.getElementById('close-modal').onclick = function() {
    document.getElementById('modal').style.display = 'none'; // Hide modal
    document.body.style.overflow = 'auto'; // Enable background scrolling
};

// Handle form submission
document.getElementById('summary-form').onsubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const paymentOption = document.getElementById('payment-option').value;

    // Validate payment option selection
    if (!paymentOption) {
        alert('Please select a payment method.');
        return;
    }

    // Example: Handle booking data submission via fetch to your PHP file
    const formData = new FormData();
    formData.append('name', document.getElementById('full-name').value);
    formData.append('plate', document.getElementById('car-plate').value);
    formData.append('startDate', document.getElementById('start-date').value);
    formData.append('endDate', document.getElementById('end-date').value);
    formData.append('duration', Math.floor((new Date(document.getElementById('end-date').value) - new Date(document.getElementById('start-date').value)) / (1000 * 60 * 60 * 24)));
    formData.append('parkingFee', 2); // Assume a fixed fee
    formData.append('totalPayment', Math.floor((new Date(document.getElementById('end-date').value) - new Date(document.getElementById('start-date').value)) / (1000 * 60 * 60 * 24)) * 2);
    formData.append('paymentOption', paymentOption);

    try {
        const response = await fetch('booking.php', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        if (result.status === 'success') {
            alert('Booking was successful!');

            // Redirect to payment integration
            window.location.href = 'https://your-payment-integration-url.com';
        } else {
            alert(result.message);
        }
    } catch (error) {
        alert('Error occurred: ' + error.message);
    }
};
