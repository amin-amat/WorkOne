<!DOCTYPE html>
<html>
<head>
</head>
<body>
<?php
 $q = $_GET['q'];

 $servername = "localhost";
 $username = "aminamat_usr";
 $password = "dk6q6nvtkmo7";
 $dbname = "aminamat_dbtest";

 $conn = new mysqli($servername, $username, $password, $dbname);
  if (!$conn) {
    die('Could not connect: ' . mysqli_error($conn));
 }

 $query = "SELECT login FROM Project_Contributors WHERE project = '".$q."' ";

 $result = mysqli_query($conn,$query)
  or die("Error: ".mysqli_error($conn));

 echo "<table>";
 while($row = mysqli_fetch_array($result)) {
    echo "<tr>";
    echo "<td>" . $row['login'] . "</td>";
    echo "</tr>";
 }
 echo "</table>";
 mysqli_close($conn);
 //$conn->close();
?>
</body>
</html>