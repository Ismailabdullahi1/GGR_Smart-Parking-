
document.getElementById('pay-parking-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const carPlate = document.getElementById('car-plate').value;
    const summaryBox = document.getElementById('summary-box');
    const loadingOverlay = document.createElement('div');

    // Show loading overlay
    loadingOverlay.id = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-content">
            <i class="fas fa-spinner fa-spin loading-icon"></i>
            <p>Searching for your car...</p>
        </div>
    `;
    document.body.appendChild(loadingOverlay);

    // Hide summary box initially
    summaryBox.style.display = 'none';

    // Simulate a delay (e.g., 2 seconds) for loading feedback
    setTimeout(() => {
        // Perform AJAX request
        fetch('booking.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `car_plate=${encodeURIComponent(carPlate)}`
        })
        .then(response => response.json())
        .then(data => {
            document.body.removeChild(loadingOverlay); // Remove loading overlay after response is received

            if (data.status === 'found') {
                // Populate the summary box with booking details
                summaryBox.innerHTML = `
                    <p><strong>Plate Number:</strong> ${data.data.car_plate}</p>
                    <p><strong>Parking Hours:</strong> ${data.data.duration}</p>
                    <p><strong>Parking Fee:</strong> $${data.data.parking_fee}</p>
                    <p><strong>Total Payment:</strong> $${data.data.total_payment}</p>
                `;
                
               
                
                
                // Show the summary box
                summaryBox.style.display = 'block';
            } else {
                // Show a message if no car was found
                summaryBox.innerHTML = '<p>No car found with the given plate number. Please try again.</p>';
                summaryBox.style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.body.removeChild(loadingOverlay); // Ensure loading overlay is removed in case of error
            summaryBox.innerHTML = '<p>There was an error searching for your car. Please try again.</p>';
            summaryBox.style.display = 'block';
        });
    }, 1000); // Delay for 2 seconds before making the request
});

  