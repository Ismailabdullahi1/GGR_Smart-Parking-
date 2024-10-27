<?php
header("Content-Type: application/json");

// Database configuration
$servername = "localhost";
$username = "root"; // Your MySQL username
$password = ""; // Your MySQL password
$dbname = "car_parkings"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Database connection failed: " . $conn->connect_error]));
}

// Check if this is a search request (only car_plate provided)
if (isset($_POST['car_plate']) && empty($_POST['name']) && empty($_POST['startDate']) && empty($_POST['endDate'])) {
    // Sanitize car plate input
    $car_plate = $conn->real_escape_string($_POST['car_plate']);

    // Query the database for the car plate
    $sql = "SELECT * FROM bookings WHERE car_plate = '$car_plate' LIMIT 1";
    $result = $conn->query($sql);

    if ($result && $result->num_rows > 0) {
        $booking = $result->fetch_assoc();
        echo json_encode(["status" => "found", "data" => $booking]);
    } else {
        echo json_encode(["status" => "not_found", "message" => "No booking found for the given car plate."]);
    }
}
// Otherwise, check if it's an insert request (all required booking details provided)
else if (
    isset($_POST['name'], $_POST['plate'], $_POST['startDate'], 
          $_POST['endDate'], $_POST['duration'], $_POST['parkingFee'], 
          $_POST['totalPayment'], $_POST['paymentOption'])
) {
    // Sanitize input data
    $name = $conn->real_escape_string($_POST['name']);
    $plate = $conn->real_escape_string($_POST['plate']);
    $startDate = $conn->real_escape_string($_POST['startDate']);
    $endDate = $conn->real_escape_string($_POST['endDate']);
    $duration = (int) $_POST['duration'];
    $parkingFee = (float) $_POST['parkingFee'];
    $totalPayment = (float) $_POST['totalPayment'];
    $paymentOption = $conn->real_escape_string($_POST['paymentOption']);

    // Insert data into the bookings table
    $sql = "INSERT INTO bookings (full_name, car_plate, start_date, end_date, duration, parking_fee, total_payment, payment_option) 
            VALUES ('$name', '$plate', '$startDate', '$endDate', $duration, $parkingFee, $totalPayment, '$paymentOption')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["status" => "success", "message" => "Booking successful"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error: " . $conn->error]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request or missing required data"]);
}

// Close the connection
$conn->close();
?>
