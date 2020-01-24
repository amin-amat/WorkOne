<!DOCTYPE html>
<html>
<head>
<title> PHP TEST </title>
<script>
// List Contributors 
  function showProjectCont(str) {
    if (str == "") {
      document.getElementById("listingDisplay").innerHTML = "";
      return false;
    } else { 
      if (window.XMLHttpRequest) {
// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
      } else {
// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          document.getElementById("listingDisplay").innerHTML = xmlhttp.responseText;
        }
      }
      xmlhttp.open("GET","getcontributors.php?q="+str,true);
      xmlhttp.send();
    }
  }
// List Projects 
  function showContributor(str) {
    if (str == "") {
      document.getElementById("listingCon").innerHTML = "";
      return false;
    } else { 
      if (window.XMLHttpRequest) {
// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
      } else {
// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          document.getElementById("listingCon").innerHTML = xmlhttp.responseText;
        }
      }
      xmlhttp.open("GET","getprojects.php?log="+str,true);
      xmlhttp.send();
    }
  }
</script>
<style>
   #one {
    float: left;
    margin-right: 60px;
  }
   table {
    width: 40%;
    border-collapse: collapse;
  }
   table, td, th {
    border: 1px solid lightgrey;
    padding: 5px;
  }
   th {
    text-align: left;
  }
   #listingDisplay {
    float: left;
    width: 48%;
    display: block;
    min-height: 300px;
  }
   #listingCon {
    float: left;
    width: 40%;
    display: block;
  }
</style>
</head>
<body>
<?php
// Lets start with the initial curl
$curl = curl_init('https://api.github.com/search/repositories?q=wordpress+language:php?page=10&per_page=300');
curl_setopt($curl, CURLOPT_HEADER, 0);           // Option to include the header along with body
curl_setopt($curl, CURLOPT_USERAGENT, 'aminamat');	// github username used to facilitate authentication
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
$headers    = array();
$headers[]  = 'Accept: application/vnd.github.v3.text-match+json';
curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);

echo "Starting process...";

$output = curl_exec($curl);
curl_close($curl);

$json = json_decode($output);
$a    = array(); // wordpress projects
$b    = array(); // contributors url
$c    = array(); // contributors id
$d    = array(); // contributors login id

$servername = "localhost";
$username   = "[usr]";
$password   = "[pwd]";
$dbname     = "[dbname]";
$conn       = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
$sql = "TRUNCATE TABLE Projects";
if ($conn->query($sql) === TRUE) {
//echo "Success.."; Keep it blank for now.
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "TRUNCATE TABLE Project_Contributors";

if ($conn->query($sql) === TRUE) {
//echo "Success.."; Keep it blank for now.
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();

echo "Looping through projects...";

// loop though the 100 projects and prep
for ($i = 0; $i < 101; $i++) {
//WORDPRESS PROJECTS name, description, id, the owner id, the project homepage, and the watcher, forks, and stargazers counts.
	$a[$i][] = $json->items[$i]->name; 					      // 0
	$a[$i][] = $json->items[$i]->description; 			  // 1
	$a[$i][] = $json->items[$i]->id; 					        // 2
 	$a[$i][] = $json->items[$i]->owner->id; 			    // 3
 	$a[$i][] = $json->items[$i]->owner->html_url; 		// 4
 	$a[$i][] = $json->items[$i]->owner->starred_url; 	// 5
 	$a[$i][] = $json->items[$i]->watchers_count; 		  // 6
 	$a[$i][] = $json->items[$i]->forks_count; 			  // 7
 	$a[$i][] = $json->items[$i]->stargazers_count; 		// 8
 	$a[$i][] = $json->items[$i]->contributors_url; 		// 9

// separating the contribute url for reference
 	$contribute_url = $json->items[$i]->contributors_url;
//prepping array b to add in urls
 	$b[$i] = $contribute_url;
} 

echo "Compiling project contributors....";

$c = array();
$d = array();

for ($j = 0; $j < 100; $j++) {
	$contribute_url  = $b[$j];
	$contribute      = (string)$contribute_url;
	$curl            = curl_init($contribute.'?access_token=2756d2206a54952c682e5fca1b20014d10974e84'); // github auth token used to avoid data rate limit
	curl_setopt($curl, CURLOPT_HEADER, 0);  
	curl_setopt($curl, CURLOPT_USERAGENT, 'aminamat');
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	$output          = curl_exec($curl);
	curl_close($curl);
	$json            = json_decode($output);
  $c[$j]           = $json;

  if($j === 25){
    echo "25%...";
  }
  elseif($j === 50){
    echo "50%...";
  }
  elseif($j === 75){
    echo "75%...";
  }
  else{
    echo ".";
  }
}

//Uncomment for reference use
//echo sizeof($c[0]);
//print_r ($c);
//echo (string)$c[0][0]->login;
//echo (string)$c[0][0]->id;
//echo (string)$c[0][1]->login;

// Opening database connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

echo "Submitting projects to database....";

//WORDPRESS PROJECTS name, description, id, the owner id, the project homepage, and the watcher, forks, and stargazers counts.
for ($n = 0; $n < 100; $n++) {
   $name              = (string)$a[$n][0];
   $description       = addslashes((string)$a[$n][1]);
   $project_id        = (string)$a[$n][2];
   $owner_id          = (string)$a[$n][3];
   $project_home      = (string)$a[$n][4];
   $watcher_count     = (string)$a[$n][6];
   $fork_count        = (string)$a[$n][7];
   $stargazers_count  = (string)$a[$n][8];
   $sql               = "INSERT INTO Projects (name, description, project_id, owner_id, project_home, watcher_count, fork_count, stargazers_count)
                        VALUES ('$name', '$description', '$project_id', '$owner_id', '$project_home', '$watcher_count', '$fork_count', '$stargazers_count');";

   mysqli_next_result($conn);

   //Databae Connection Check
   if ($conn->query($sql) === TRUE) {
    //echo "Success.."; Keep it blank for now.
   } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
   }
}

echo "Submitting contributors to database....";

//PROJECT CONTRIBUTORS contributor login, id, and the project id

//loop through the 100 projects
for ($i=0; $i < 100; $i++) {
	  $c_count = sizeof($c[$i]);
	
    // loop through the contributors list for each project
	  for ($j=0; $j < $c_count; $j++) {
		  $login    = (string)$c[$i][$j]->login;
		  $login_id = (string)$c[$i][$j]->id;
		  $project  =  (string)$a[$i][2];
      $sql       = "INSERT INTO Project_Contributors (login, login_id, project) VALUES ('".$login."', '".$login_id."', '".$project."');";
	
	    mysqli_next_result($conn);	

    //Databae Connection Check
   if ($conn->query($sql) === TRUE) {
    //echo "Success.."; Keep it blank for now.
   } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
   }

	  }

}

$conn->close();

echo "Done";
echo "<br><br>";

// Opening database connection
$conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
    }
//Contributors by Project
$query       = "SELECT project_id FROM Projects";
$stmt        = $conn->query($query);
$dropdown    = "<div id=\"one\"><h1>Select a Project to view collaborators</h1>";
$dropdown   .= "<form>";
$dropdown   .= "<select name='projects' onchange=\"showProjectCont(this.value)\">";
$options     = "";
$dropdown   .= "\r\n<option selected value=\"selected\">Choose Project ID</option>";

foreach ($stmt as $row) {
  $dropdown .= "\r\n<option value='{$row['project_id']}'>{$row['project_id']}</option>";
}
$dropdown   .= "\r\n</select>";
$dropdown   .= "</form></div>";

$conn->close();
echo $dropdown;

// Opening database connection
$conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
 }
//Project by Contributors
$query2     = "SELECT login FROM Project_Contributors";
$stmt2      = $conn->query($query2);
$dropdown2  = "<div id=\"two\"><h1>Select a Contributor to view projects</h1>";
$dropdown2 .= "<form>";
$dropdown2 .= "<select name='contributors' onchange=\"showContributor(this.value)\">";
$options2   = "";
$dropdown2 .= "\r\n<option selected value=\"selected\">Choose Contributor</option>";

foreach ($stmt2 as $row2) {
  $dropdown2 .= "\r\n<option value='{$row2['login']}'>{$row2['login']}</option>";
}
$dropdown2 .= "\r\n</select>";
$dropdown2 .= "</form></div>";

$conn->close();
echo $dropdown2;

?>

<div id="listingDisplay"></div>
<div id="listingCon"></div>
</body>
</html>
