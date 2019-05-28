function getQuestion (){
    transitionBack();
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
    answerC.setAttribute("onClick", "changeCSS(" + aCCount +")");
    answerC.setAttribute("id", "ansCID" + aCCount);
    answerC.setAttribute("name", "ansName" + aCCount);
    questDiv.appendChild(answerC);

    var answerCLab = document.createElement("label");
    answerCLab.setAttribute("for", "ansCID" + aCCount);
    answerCLab.setAttribute("id", "ansCLabID" + aCCount);
    answerCLab.innerHTML = jsonResponse.results[0].correct_answer;
    questDiv.appendChild(answerCLab)
    document.getElementById("Question").innerHTML += "</br>";

    for(var i = 0; i< jsonResponse.results[0].incorrect_answers.length; i++)
    {
        var answerW = document.createElement("input");
        answerW.setAttribute("type", "radio");
        answerW.setAttribute("onClick", "changeCSS(" + wACount +")");
        answerW.setAttribute("id", "ansWID" + wACount);
        answerW.setAttribute("name", "ansName" + aCCount);
        questDiv.appendChild(answerW)
        var answerWLab = document.createElement("label");
        answerWLab.setAttribute("for", "ansWID" + wACount);
        answerWLab.setAttribute("id", "ansWLabID" + wACount);
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
    transitionBack();
    createFooter();
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

function changeCSS(value){
    var answerC = document.getElementById("ansCLabID" + value);
    var answerW = document.getElementById("ansWLabID" + value);
    var questions = document.getElementById("Question"); 
    var changeScreen = document.getElementById('body');

    //questions.style.backgroundColor = "blue";
    if(answerC != null)
    {
        answerC.style.color = "green";
        changeScreen.style.backgroundColor = "green";
    }
    if(answerW != null)
    {
        answerW.style.color = "red";
        changeScreen.style.backgroundColor = "red";
    }
    document.getElementById('icon').style.animationPlayState = "running";
    document.getElementById('icon1').style.animationPlayState = "running";
    
}

function setCSS(){
    var head = document.getElementById('header');
    var container = document.getElementById('container');

    head.style.textAlign = "center";
    container.style.marginLeft = "10%";
    container.style.marginRight = "10%";
    container.style.backgroundColor = "lightblue";
}

function transitionBack(){
    var changeScreen = document.getElementById('body');

    changeScreen.style.backgroundColor = "azure";
    document.getElementById('icon').style.animationPlayState = "paused";
    document.getElementById('icon1').style.animationPlayState = "paused";
}

function createFooter(){
    var footCreate = document.getElementsByClassName('foot')[0];
    footCreate.style.backgroundColor = "black";
    footCreate.style.color = "white";
    footCreate.style.height = "80px";
    footCreate.style.paddingLeft = "10px";
    footCreate.style.paddingRight = "10px";
    footCreate.style.marginLeft = "10%";
    footCreate.style.marginRight = "10%";
    footCreate.style.textAlign = "right";
    footCreate.style.justifyContent = "center";
    footCreate.innerHTML = "<a href='https://opentdb.com/api_config.php'>Click here to access the trivia Site." + 
        "</a></br>Author: Collin Steel</br>CIT261";
    footCreate.style.fontSize = "18px";
    document.getElementsByTagName('a')[0].style.color = "white";

}