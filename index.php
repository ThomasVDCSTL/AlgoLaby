<?php
$nom_page='index';
include_once 'header.php';

?>


    <article id="container" style="width: 2500px;height: 200px">
        <button onclick="faisUnTruc()" style="width: 100%;height: 200px;font-size: 100px">Play</button>
    </article>
    <article id="container" style="width: 2500px;height: 200px">
        <button onclick="faisUnAutreTruc()" style="width: 100%;height: 200px;font-size: 100px">Play but faster</button>
    </article>


<script src="labyrinthes.js"></script>
<script src="init_laby.js"></script>

    <script src="main.js"></script>




<?php include_once 'footer.php';?>