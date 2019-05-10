function loopFunction (){
    var value = ["Collin", "Karen", "spacer", "Gavin", "Lijah", "Katie", "Jarom", "Kavan"];
    foriLoop(value);

    forInObjectLoop();

    var bed = whileLoop();

    document.getElementById('toyText').value = doWhileLoop(bed) + "</br>";  
    var newObject = new objectProperties("Soccer", "Salt Lake City", "Real")  
    document.getElementById('toyText').innerHTML += newObject.location + " " + newObject.teamname + "</br>";    
}

function foriLoop(value){
    for(var i = 0; i < value.length; i++)
    {        
        if(i == 2)
            document.getElementById('loopIn').value += "Kids"  + '\n';
        else     
            document.getElementById('loopIn').value += value[i]  + '\n';
    }
}

function forInObjectLoop(){
    var favorite = {Gavin:"Guitar", Jarom:"Thomas", Kavan:"Ball"};
    var i = 0;
    for(c in favorite)
    {
        
        switch(c){
            case "Gavin":
                document.getElementById('loopOut').value += c + " Loves playing " + favorite[c] + '\n';
                break;
            case "Jarom":
                document.getElementById('loopOut').value += c + " Plays with " + favorite[c] + " the Train" + '\n';
                break;
            case "Kavan":
                document.getElementById('loopOut').value += c + " Loves Bouncing a " + favorite[c] + '\n';
                favorite["Lijah"] = "Books";
                break;
            default:
                document.getElementById('loopOut').value += "Default \n";
                break;

        }
    }

}

function whileLoop(){
    var bed = ["blanket", "sheets", "pillows"];
    var i = 0;
    while(bed[i])
    {
        document.getElementById('toyText').innerHTML += bed[i] + "</br>";
        i++;
    }

    return bed;
}

function doWhileLoop(bed){
    var i = 0;
    bed[bed.length] = "Mattress";
    do{
        document.getElementById('toyText').innerHTML += bed[i] + "</br>";
        i++;
    }while(bed[i])

    
}

function clearP(){
    document.getElementById('toyText').innerHTML = "";
}

function clearTA(){
    document.getElementById('loopIn').value = "";
    document.getElementById('loopOut').value = "";
}

function objectProperties(sport, location, teamname){
        this.sport = sport;
        this.teamname = teamname;
        this.location = location;
     
}

objectProperties.prototype.locName = function() {
    return this.location + " " + this.teamname;
};

function sportsButton(){
    var sport = document.getElementById('sportType').value;
    var teamname = document.getElementById('sportName').value;
    var location = document.getElementById('sportLoc').value;

    var sportName = new objectProperties(sport, location, teamname);
    document.getElementById('teamInfo').innerHTML = sportName.locName();
}

