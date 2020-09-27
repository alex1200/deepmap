<?php
$page = "";
$address = "";
if(isset($_GET["page"])){
    $page = $_GET["page"];
}
else{
    header("Location: home.php");
}

if($page == "crosthwaite"){
    $address = "http://localhost:8182/www/index.php";
    $query = "SELECT * FROM survey_question WHERE page=1;";
	$result = mysqli_query($conn,$query);
	while($row = $result->fetch_row()) {
	  $surveyArr[]=$row;
	}
}
else if($page == "lakedistrictwriting"){
    $address = "http://localhost:8182/ww2/index.php";
    $query = "SELECT * FROM survey_question WHERE page=2;";
    $result = mysqli_query($conn,$query);
    while($row = $result->fetch_row()) {
      $surveyArr[]=$row;
    }
}
else if($page == "journey"){
    $address = "http://localhost:8182/ww3/index2.php";
    $query = "SELECT * FROM survey_question WHERE page=3;";
    $result = mysqli_query($conn,$query);
    while($row = $result->fetch_row()) {
      $surveyArr[]=$row;
    }
}

include($address);



?>
