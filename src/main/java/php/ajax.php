<?php
    ob_start();
    session_start();
    require_once 'dbconnect.php';


if (isset($_GET["answer"])){
        $question = $_GET["question"];
        $answer = $_GET["answer"];
        $query = "INSERT INTO survey_answer(idsurvey_questions,response) VALUES('$question','$answer')";
        $res = mysqli_query($conn,$query);
        if ($res) {
            $errTyp = "success";
            $errMSG = "Successfully added task.";
        } else {
            $errTyp = "danger";
            $errMSG = "Something went wrong, try again later...";
        }
}
?>