<?php
//* DB CONNECTION FUNCTION
function db_connect() {
    require "config.php";
    $connection = mysqli_connect($host, $username, $password, $dbname);
    if(!$connection) {
        die("Connection failed: " . mysqli_connect_error());
    }
    return $connection;
}