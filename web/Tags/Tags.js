function startup(){
    document.getElementById('header').addEventListener('click', displayStuff);
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