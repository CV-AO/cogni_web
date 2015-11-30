<!DOCTYPE html>
<html>
<head>
    <title>Previous Next Functionality</title>
    <script type="text/javascript">
var b = document.getElementById("c").previousElementSibling;

document.getElementById("result").innerHTML += b.innerHTML;  
    </script>
</head>

<body>
<div id="a">A</div>
<div id="b">B</div>
<div id="c">c</div>

<div id="result">Resultado: </div>
</body>
</html>