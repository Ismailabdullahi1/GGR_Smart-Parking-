<?php
$servername = "localhost"; // Your database server
$username = "your_username"; // Your database username
$password = "your_password"; // Your database password
$dbname = "your_database_name"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch parking data
$sql = "SELECT total_spots, available_spots FROM parking WHERE id = 1"; // Adjust as necessary
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo json_encode($row);
} else {
    echo json_encode(["total_spots" => 0, "available_spots" => 0]);
}

$conn->close();
?>
