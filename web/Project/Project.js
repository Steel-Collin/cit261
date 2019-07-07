function setValues(){
    sessionStorage.setItem('amount', 1);
    localStorage.removeItem('results');
}
function getQuestion(){
    var count = localStorage.getItem('count' )
    if(localStorage.getItem("results") === undefined || localStorage.getItem("results") === null){
        localStorage.setItem('count', 0);
        localStorage.setItem('amount', 10);
        callAPI(10);        
    }
    else if(count >= localStorage.getItem("results").length)
    {
        localStorage.setItem('count', 0);
        localStorage.setItem('amount', 10);
        callAPI(10);        
    }
    else{
        document.getElementById('question').innerHTML = localStorage.getItem("results")[count].question;
        count++;
        localStorage.setItem('count', count);
    }
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
        var count = localStorage.getItem('count');
        document.getElementById('cat').innerHTML = jsonData.results[count].category;
        document.getElementById('question').innerHTML = jsonData.results[count].question;
        document.getElementById('question').innerHTML = jsonData.results[count].correct_answer;
        document.getElementById('question').innerHTML = jsonData.results[count].incorrect_answer[0];
        document.getElementById('question').innerHTML = jsonData.results[count].incorrect_answer[1];
        document.getElementById('question').innerHTML = jsonData.results[count].incorrect_answer[2];
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
}