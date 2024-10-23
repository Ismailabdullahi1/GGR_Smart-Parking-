<?php
// Database credentials
$host = "localhost";  // Usually 'localhost'
$dbname = "your_database_name";  // Replace with your database name
$username = "your_username";  // Replace with your database username
$password = "your_password";  // Replace with your database password

// Connect to the database
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
    exit();
}

// Check if the form was submitted with a car plate number
if (isset($_POST['car_plate'])) {
    $car_plate = $_POST['car_plate'];

    // Prepare and execute the SQL query
    $stmt = $pdo->prepare("SELECT * FROM parking_records WHERE plate_number = :plate_number");
    $stmt->execute(['plate_number' => $car_plate]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        // Car found, return details as JSON
        echo json_encode([
            'success' => true,
            'plate' => $result['plate_number'],
            'hours' => $result['hours_parked'],
            'fee' => $result['parking_fee'],
            'total' => $result['total_payment'],
            'image' => $result['image_path']
        ]);
    } else {
        // Car not found
        echo json_encode(['error' => 'Car plate not found.']);
    }
} else {
    echo json_encode(['error' => 'No car plate number provided.']);
}
