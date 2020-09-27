<?php

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Deepmap Home</title>
    <style>
        body{
            background-image: url('media/maps/DerwentWaterMap.jpg');
            background-position-x: -50px;
            background-position-y: -50px;

        }
        #title{
            position: absolute;
            top: 0px;
            width: 50%;
            left: 25%;
            text-align: center;
            z-index: 100;
            line-height: 70%;
            color: white;
            text-shadow: 1px 1px #000;
        }
        .wrapper{
            width: 100%;
            height: 100%;
            background-color: rgba(20,20,20,0.8);
            position: absolute;
            top: 0px;
            bottom: 0px;
            left: 0px;
            right: 0px;
        }
        .tile{
            width:49%;
            height:40%;
            display: inline-block;
            float:left;
        }
        .topleft{
        }
        .topright{
        }
        .bottomleft{
        }
        .bottomright{
        }
        .button{
            width:60%;
            height:60%;
            display: inline-block;
            border: 1px solid #000000;
            -moz-box-shadow: inset 2px 2px 2px rgba(255, 255, 255, .4), inset -2px -2px 2px rgba(0, 0, 0, .4);
            -webkit-box-shadow: inset 2px 2px 2px rgba(255, 255, 255, .4), inset -2px -2px 2px rgba(0, 0, 0, .4);
            box-shadow: inset 5px 5px 5px rgba(255, 255, 255, .4), inset -5px -5px 5px rgba(0, 0, 0, .4);
            margin: 20%;
        }
        .topleftbutton{
            background:linear-gradient(
                    rgba(10, 10, 10, 0.45),
                    rgba(10, 10, 10, 0.45)
            ),url('http://wp.lancs.ac.uk/lakesdeepmap/files/2015/11/cropped-Tilberthwaite-painty.jpg');
            background-size: cover;

        }
        .toprightbutton{
            background:linear-gradient(
                    rgba(10, 10, 10, 0.45),
                    rgba(10, 10, 10, 0.45)
            ),url('media/crosth1a.PNG');
            background-size: cover;
        }
        .bottomleftbutton{
            background:linear-gradient(
                    rgba(10, 10, 10, 0.45),
                    rgba(10, 10, 10, 0.45)
            ),url('media/screen1.PNG');
            background-size: cover;
        }
        .bottomrightbutton{
            background:linear-gradient(
                    rgba(10, 10, 10, 0.45),
                    rgba(10, 10, 10, 0.45)
            ),url('media/screen2.PNG');
            background-size: cover;
        }
        .text{
            color: white;
            text-align: center;
            /*background-color: rgba(20,20,20,0.5);*/
            width: 100%;
            height: 100%;
            text-shadow: 1px 1px #333;

        }
        .toplefttext{
        }
        .toprighttext{
        }
        .bottomlefttext{
        }
        .bottomrighttext{
        }
    </style>
</head>
<body>
<div id="title"><h1>Deep Map Case Studies of the English Lake District</h1>
<h3>Alexander Reinhold</h3>
    <h3>a.reinhold1@lancaster.ac.uk</h3></div>
<div class="wrapper">
<div class="topleft tile">
    <a href="http://wp.lancs.ac.uk/lakesdeepmap/">
        <div class="topleftbutton button">
            <div class="toplefttext text">
                <h2>GEOSPATIAL INNOVATION IN THE DIGITAL HUMANITIES</h2>
                <h3>A Deep Map of the English Lake District</h3>
                <h4>Project Website</h4>
            </div>
        </div>
    </a>
</div>
    <div class="topright tile">
        <a href="survey.php?page=crosthwaite">
            <div class="toprightbutton button">
            <div class="toprighttext text">
                <h2>EXPLORING DEEP MAPPING CONCEPTS:</h2>
                <h3>CROSTHWAITE’S MAP AND WEST’S PICTURESQUE STATIONS</h3>
            </div>
            </div>
        </a>
    </div>
    <div class="bottomleft tile">
        <a href="survey.php?page=lakedistrictwriting">
            <div class="bottomleftbutton button">
            <div class="bottomlefttext text">
                <h2>DEEP MAP OF LAKE DISTRICT WRITING</h2>
                <h3>Explore Spatial Relations in the Corpus of Lake District Writing</h3>
            </div>
            </div>
        </a>
    </div>
    <div class="bottomright tile">
        <a href="survey.php?page=journey">
            <div class="bottomrightbutton button">
            <div class="bottomrighttext text">
                <h2>JOURNEY THROUGH THE TEXT</h2>
                <h3>A Spatial Experience of the Lake District Corpus</h3>
            </div>
            </div>
        </a>
    </div>
</div>
</body>
</html>