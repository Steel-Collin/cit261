function getQuestion (){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
        {
            callbackResponse(this);
            //getFromTextFile(this);
        }
    };
    xhttp.open("GET", "https://opentdb.com/api.php?amount=1&difficulty=medium&type=multiple", true);
    //xhttp.open("GET", "TextFile.txt", true);
    xhttp.send();
    
}

function callbackResponse(resp){
    var jsonResponse = JSON.parse(resp.responseText);
    document.getElementById("Question").innerHTML = jsonResponse.results[0].question;
    document.getElementById("Answers").innerHTML = jsonResponse.results[0].correct_answer;
    for(var i = 0; i< jsonResponse.results[0].incorrect_answers.length; i++)
    {
        document.getElementById("Answers").innerHTML += "</br>" + jsonResponse.results[0].incorrect_answers[i];
    }
}

function getFromTextFile(resp){
    document.getElementById("Question").innerHTML = resp.responseText;
}