<?php
session_start(); // crea una conexion con la base de datos.


$servername = "localhost"; 
$dbname = "registration";  // Name of database in SQL
$dbuser = "root";        // Default XAMPP user
$dbpass = "";            // Default XAMPP password

// Create connection
$conn = new mysqli($servername, $dbuser, $dbpass, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

//  toma el valor del formulario html.
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $input_user = $_POST['username'];
    $input_pass = $_POST['password'];

    // Fetch user by username
    $sql = "SELECT * FROM users WHERE username = ?"; // sintaxis de SQL, selecciona todo lo de la tabla "USERS" solamente comparando el username.
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $input_user); 
    $stmt->execute(); 
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {  // verificar si hay algo en esa tabla, si hay al menos un usuario para comparar.
        $user = $result->fetch_assoc(); // verifica que el usuario exsta o no 

        // Verify password against hash
        if (password_verify($input_pass, $user['password'])) { // Compara lo que el usuario pone en el campo con la contraseña que existe en la base de datos
            $_SESSION['username'] = $user['username'];// tipo de cifrado de cifrado de contraseñas

            // Redirect to welcome page
            header("Location: index.html"); // si el usuario y contraseña estan bien te redirecciona a la pagina principal
            exit();
        } else {

            // Wrong password
            header("Location: login.html?error=Incorrect password");
            exit();
        }
    } else {
        // Username not found
        header("Location: login.html?error=User does not exist"); 
        exit();

        
    }
} 

?>