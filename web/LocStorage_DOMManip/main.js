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
    var questDiv = document.getElementById('Question');
    var ansDiv = document.getElementById('Answers');
    var qcount = 0;
    var aCCount = 0;
    var wACount = 0;
    if(localStorage.getItem("qcount") === null)
        qcount = 0;
    else
        qcount = localStorage.getItem("qcount");    
    if(sessionStorage.getItem("aCCount") === null)
        aCCount = 0;
    else
        aCCount = sessionStorage.getItem("aCCount");    
    if(sessionStorage.getItem("wACount") === null)
        wACount = 0;
    else
        wACount = sessionStorage.getItem("wACount");    
    
    var nameLab = document.createElement("label");
    var displayValue = parseInt(qcount) + 1;
    nameLab.innerHTML = "This is question " + displayValue + ".</br>";
    var questText = document.createElement("input");
    questText.setAttribute("type", "text");
    questText.setAttribute("readonly", "readonly");
    questText.setAttribute("id", "quest" + qcount);    
    questText.setAttribute("size", "100");
    questText.setAttribute("value", jsonResponse.results[0].question);
    questDiv.appendChild(questText);
    questDiv.insertBefore(nameLab,questText);
    document.getElementById("Question").innerHTML += "</br>";
    qcount++;
    localStorage.setItem("qcount", qcount);

    var answerC = document.createElement("input");
    answerC.setAttribute("type", "radio");
    answerC.setAttribute("id", "ansCID" + aCCount);
    answerC.setAttribute("name", "ansName" + aCCount);
    questDiv.appendChild(answerC);

    var answerCLab = document.createElement("label");
    answerCLab.setAttribute("for", "ansCLabID" + aCCount);
    answerCLab.innerHTML = jsonResponse.results[0].correct_answer;
    questDiv.appendChild(answerCLab)
    document.getElementById("Question").innerHTML += "</br>";

    for(var i = 0; i< jsonResponse.results[0].incorrect_answers.length; i++)
    {
        var answerW = document.createElement("input");
        answerW.setAttribute("type", "radio");
        answerW.setAttribute("id", "ansWID" + wACount);
        answerW.setAttribute("name", "ansName" + aCCount);
        questDiv.appendChild(answerW)
        var answerWLab = document.createElement("label");
        answerWLab.setAttribute("for", "ansWLabID" + wACount);
        answerWLab.innerHTML = jsonResponse.results[0].incorrect_answers[i];
        questDiv.appendChild(answerWLab)
        wACount++;
        document.getElementById("Question").innerHTML += "</br>";
    }

    aCCount++;
    sessionStorage.setItem("aCCount", aCCount);
    sessionStorage.setItem("wACount", wACount);
    document.getElementById("Question").innerHTML += "</br>";
        
}

function clearQuestions(){
    var divValue = document.getElementById("Question");
    while(divValue.firstChild)
    {
        divValue.removeChild(divValue.firstChild);
    }
    if(localStorage.getItem("qcount") !== null)
    {
        localStorage.setItem("qcount", 0);
    }
    if(localStorage.getItem("aCCount") !== null)
    {
        sessionStorage.setItem("aCCount", 0);
        sessionStorage.setItem("wACount", 0);
    }
}
function getFromTextFile(resp){
    document.getElementById("Question").innerHTML = resp.responseText;
}