var myVar = setInterval(myTimer ,10000);
function myTimer() {
    var displayed = document.getElementById('popup');
    if(displayed.style.display == "block")
    {
        displayed.style.display = "none";
    }
}

function setValues(){
    sessionStorage.setItem('amount', 1);
    localStorage.removeItem('results');
    document.getElementById('trivia').addEventListener('transitionend', changeQuestion);
    document.getElementById('instruct').addEventListener('animationend', secondAnim);
    document.getElementById('instruct2').addEventListener('animationend', thirdAnim);
    document.getElementById('instruct3').addEventListener('animationend', forthAnim);
    sessionStorage.setItem('turn', 0);
}
function getQuestion(){
    var count = localStorage.getItem('count' );
    if(localStorage.getItem("results") === undefined || localStorage.getItem("results") === null){
        localStorage.setItem('count', 0);
        localStorage.setItem('amount', 10);
        callAPI(10);    

    }
    else if(count >= JSON.parse(localStorage.getItem("results")).length)
    {
        localStorage.setItem('count', 0);
        localStorage.setItem('amount', 10);
        callAPI(10);        
    }
    else{
        var tempJson = JSON.parse(localStorage.getItem("results"));
        document.getElementById('question').innerHTML = tempJson[count].question;
        document.getElementById('ans1').innerHTML = tempJson[count].correct_answer;
        document.getElementById('ans2').innerHTML = tempJson[count].incorrect_answers[0];
        document.getElementById('ans3').innerHTML = tempJson[count].incorrect_answers[1];
        document.getElementById('ans4').innerHTML = tempJson[count].incorrect_answers[2];
        count++;
        localStorage.setItem('count', count);
        
        if(document.getElementById('trivia').style.transform == "rotateY(90deg)"){
            document.getElementById('hintbut').style.animation = "";
            document.getElementById('trivia').style.transitionDelay = "0s";
            document.getElementById('trivia').style.transform = "rotateY(0deg)";
        }
    }
    document.getElementById('ans2div').style.display = "block";
    document.getElementById('ans2').style.display = "block";
    document.getElementById('ans3').style.display = "block";
    document.getElementById('ans3div').style.display = "block";
    document.getElementById('ans4').style.display = "block";
    document.getElementById('ans4div').style.display = "block";
    
}

function callAPI(amount){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
        {
            callbackResponse(this.response);            
        }
    };
    var category = document.getElementById('catdrop').value;
    var difficulty = document.getElementById('diffdrop').value.toLowerCase();
    xhttp.open("GET", "https://opentdb.com/api.php?amount=" + amount + "&category=" + category + 
    "&difficulty=" + difficulty + "&type=multiple", true);
    xhttp.send();
    
}

function callbackResponse(response){
    var jsonData = JSON.parse(response);
    if(jsonData.response_code == 0)
    {
        localStorage.setItem('results', JSON.stringify(jsonData.results));
        var test = JSON.parse(localStorage.getItem("results")).length;
        var count = localStorage.getItem('count');
        document.getElementById('cat').innerHTML = jsonData.results[count].category;
        document.getElementById('question').innerHTML = jsonData.results[count].question;
        document.getElementById('question').style.marginLeft = "15px";
        document.getElementById('ans1').innerHTML = jsonData.results[count].correct_answer;
        document.getElementById('ans1').style.marginLeft = "40px";
        localStorage.setItem('correctanswer', 'ans1div');
        document.getElementById('ans2').innerHTML = jsonData.results[count].incorrect_answers[0];
        document.getElementById('ans2').style.marginLeft = "40px";
        document.getElementById('ans3').innerHTML = jsonData.results[count].incorrect_answers[1];
        document.getElementById('ans3').style.marginLeft = "40px";
        document.getElementById('ans4').innerHTML = jsonData.results[count].incorrect_answers[2];
        document.getElementById('ans4').style.marginLeft = "40px";
        count++;
        localStorage.setItem('count', count);
    }
    else{
        if(jsonData.response_code != "0"  && localStorage.getItem('amount') == "10"){
            localStorage.setItem('amount', 1);
            callAPI(1);
            localStorage.removeItem('results');
        }
        else{
            alert("An error occurred with the API!");
        }
    }
    if(document.getElementById('trivia').style.transform == "rotateY(90deg)"){
        document.getElementById('hintbut').style.animation = "";
        document.getElementById('trivia').style.transitionDelay = "0s";
        document.getElementById('trivia').style.transform = "rotateY(0deg)";
    }
}

function selectAnswer(answer){
    document.getElementById('trivia').style.transitionDelay = "2s";
    document.getElementById('trivia').style.transform = "rotateY(90deg)";
    sessionStorage.setItem('turn', 1);
    isAnswerCorrect(answer);
    document.getElementById('hintbut').style.animation = "none";
}

function isAnswerCorrect(answer){
    if(answer == localStorage.getItem('correctanswer')){
        document.getElementById(answer).style.backgroundColor = "lime";
        var scoreElem = document.getElementById('scorevalue');
        var score = parseInt(scoreElem.innerHTML);
        var diffvalue = document.getElementById('diffdrop').value.toLowerCase();
        switch(diffvalue){
            case "easy":
                score += 100;
                break;
            case "medium":
                score += 200;
                break;
            case "hard":
                score += 500;
                break;
            default:
                break;
        }
        
        scoreElem.innerHTML = score;
        popupBanner();
    }
    else{
        document.getElementById(answer).style.backgroundColor = "red";
    }
}

function changeQuestion(){
    if(sessionStorage.getItem('turn') == 1){
        document.getElementById('ans1div').style.backgroundColor = "rgb(27, 27, 78)";
        document.getElementById('ans2div').style.backgroundColor = "rgb(27, 27, 78)";
        document.getElementById('ans3div').style.backgroundColor = "rgb(27, 27, 78)";
        document.getElementById('ans4div').style.backgroundColor = "rgb(27, 27, 78)";
        getQuestion();
        sessionStorage.setItem('turn', 0);
        
    }
    
}

function getHint(){
    var num = Math.floor(Math.random() * 5) + 2;
    document.getElementById("ans" + num + "div").style.display = "none";
    document.getElementById("ans" + num).style.display = "none";
}

function popupBanner(){
    var score = document.getElementById('scorevalue');
    var popup = document.getElementById('popup');
    if(parseInt(score.innerHTML) >= 1000)
    {
        popup.style.display = "block";

        if(sessionStorage.getItem('level') === undefined || sessionStorage.getItem('level') === null)
            sessionStorage.setItem('level', 2);
        else
            sessionStorage.setItem('level', parseInt(sessionStorage.getItem('level')) + 1)
        popup.innerHTML = "\"Congradulations!\"  You have reached level " + sessionStorage.getItem('level');
        score.innerHTML = 0;
    }

}

function secondAnim(){
    var instruct = document.getElementById('instruct2');
    instruct.style.display = "block";
    instruct.style.animationIterationCount = "1";
}

function thirdAnim(){
    var instruct = document.getElementById('instruct3');
    instruct.style.display = "block";
    instruct.style.animationIterationCount = "1";
}

function forthAnim(){
    var instruct = document.getElementById('instruct4');
    instruct.style.display = "block";
    instruct.style.animationIterationCount = "1";
}