<!DOCTYPE html>
<html>
<head>
</head>
<body>
<?php
 $log = $_GET['log'];

 $servername = "localhost";
 $username = "aminamat_usr";
 $password = "dk6q6nvtkmo7";
 $dbname = "aminamat_dbtest";

 $conn = new mysqli($servername, $username, $password, $dbname);
  if (!$conn) {
    die('Could not connect: ' . mysqli_error($conn));
 }

 $query = "SELECT project FROM Project_Contributors WHERE login = '". $log ."' ";
 //$query = "SELECT project FROM Project_Contributors WHERE login = 'nacin' ";

 $result = mysqli_query($conn,$query)
  or die("Error: ".mysqli_error($conn));

 echo "<table>";
 while($row = mysqli_fetch_array($result)) {
    echo "<tr>";
    echo "<td>" . $row['project'] . "</td>";
    echo "</tr>";
 }
 echo "</table>";
 mysqli_close($conn);
 //$conn->close();
?>
</body>
</html>