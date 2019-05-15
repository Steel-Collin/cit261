function getQuestion (){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
        {
            callbackResponse(this);
        }
    };
    xhttp.open("GET", "https://opentdb.com/api.php?amount=20&difficulty=medium&type=multiple", true);
    xhttp.send();
    
}

function callbackResponse(resp){
    var jsonResponse = JSON.parse(resp.responseText);
    document.getElementById("jsonText").innerHTML = JSON.stringify(jsonResponse);
    for(var t = 0; t < 20; t++)
    {
        if(t != 0)
        {
            document.getElementById("Question").innerHTML += "</br>" + jsonResponse.results[t].question +
            "</br>" + jsonResponse.results[t].correct_answer;
        }
        else
        {
            document.getElementById("Question").innerHTML += jsonResponse.results[t].question + "</br>" + 
            jsonResponse.results[t].correct_answer;
        }
        for(var i = 0; i< jsonResponse.results[0].incorrect_answers.length; i++)
        {
            document.getElementById("Question").innerHTML += "</br>" + jsonResponse.results[t].incorrect_answers[i];
        }

        document.getElementById("Question").innerHTML += "</br>" + "</br>";
        
    }
}

function getFromTextFile(resp){
    document.getElementById("Question").innerHTML = resp.responseText;
}