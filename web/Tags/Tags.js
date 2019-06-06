function startup(){
    document.getElementById('header').addEventListener('click', displayStuff);
    var shapes = document.getElementById('canvas');
    var shapes2 = document.getElementById('canvas2');
    var context = shapes.getContext("2d");
    var context2 = shapes2.getContext("2d");
    context.beginPath();
    context.arc(95,50,40,0,2*Math.PI);
    context.stroke();
    var squText = shapes.getContext("2d");
    squText.font = "30px Arial";
    squText.fillText("NASA", 10, 50);
    var grad = context2.createLinearGradient(0,0,200,0);
    grad.addColorStop(0, "lime");
    grad.addColorStop(1, "white");
    context2.fillStyle = grad;
    context2.fillRect(10,10,150,80);
}

function displayStuff(){
    document.getElementById('display2').innerHTML = "This is from with in the javascript file.";
}

function retrieveImages(){
    $.ajax({
        url: 'https://api.nasa.gov/planetary/apod?api_key=hmTyoJjCdzmIQ3Y9dAYF0tOTC7FqFwaGOMW1eMnk',
        success: function (data) {
            var viewImage = "<img id='nasa1' width='350' src='" + data.hdurl + "'></br><p>" + data.explanation 
            + "</p>";            
           document.getElementById('display2').innerHTML = viewImage;
           
        },
        error: function () {
           alert("ERROR!");
  
        }
     });
}

function canDraw(){
    var can = document.getElementById("canvas3");
            var cont = can.getContext("2d");
            var imag = document.getElementById('nasa1');
            cont.drawImage(imag, 0, 0, 500, 500);
}