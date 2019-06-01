function startup(){
    document.getElementById('header').addEventListener('click', displayStuff);
}

function displayStuff(){
    document.getElementById('display2').innerHTML = "This is from with in the javascript file.";
}