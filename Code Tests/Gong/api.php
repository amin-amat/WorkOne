<?php
header("Content-Type:application/json");

//* ADD IN CONNECT PHP
include('connect.php');

//* VARIABLES SETUP
$connection = db_connect();
$arr_final = [];
$result = mysqli_query($connection, "SELECT * FROM `MOCK_DATA` WHERE `country` LIKE '%United States' OR `country` LIKE '%Japan' OR `country` LIKE '%France' OR `country` LIKE '%Germany' OR `country` LIKE '%Israel';");
$arrReturn = [];

//* CHECK FOR DATA IF NO DATA, ECHO MESSAGE
    if(mysqli_num_rows($result) > 0) {

        //* LOOPS THRU DB DATA
        while($row = mysqli_fetch_assoc($result)) {

        //* GRAB/SETUP WHAT WE NEED
            $first_name = $row['first_name'];
            $last_name = $row['last_name'];
            $email = $row['email'];
            $country = $row['country'];
            
        //* FORMATTING TO THEN PUSH INTO ARRAY    
            array_push($arr_final, array('first_name' => $first_name, 'last_name' => $last_name, 'email' => $email, 'country' => $country));
        }

        //* CLOSE DB CONNECTION
        mysqli_close($connection);

        //* PREP OUTPUT
        $json_response = json_encode($arr_final);
        echo $json_response;
        
    } else {
        echo "No records found";
    }

?>