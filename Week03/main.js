function loopFunction (){
    var value = document.getElementById('loopIn').value;
    foriLoop(value);

    forInObjectLoop();

    var bed = whileLoop();

    document.getElementById('loopOut').value = doWhileLoop(bed) + "</br>";    
    document.getElementById('loopOut').value = objectProperties() + "</br>";    
}

function foriLoop(value){
    for(var i = 0; i < value.length; i++)
    {        
        if(i == 3)
            document.getElementById('loopOut').value = "4th array position"  + '\n';
        else     
            document.getElementById('loopOut').value = value[i]  + '\n';
    }
}

function forInObjectLoop(){
    var car = {part1:"door", part2:"mirror", part3:"seat"};
    car.part1 = "door jam";
    var i = 0;
    for(c in car)
    {
        switch(car[c]){
            case "door":
                document.getElementById('carText').innerHTML += car[c] + "panel" + "</br>";
                break;
            case "mirror":
                document.getElementById('carText').innerHTML += "side" + car[c] + "</br>";
                break;
            case "seat":
                document.getElementById('carText').innerHTML += car[c] + "belt" + "</br>";
                car[car.length] = "adding one";
                break;
            default:
                document.getElementById('carText').innerHTML += "Default </br>";
                break;

        }
    }

}

function whileLoop(){
    var bed = ["blanket", "sheets", "pillows"];
    var i = 0;
    while(bed[i])
    {
        document.getElementById('carText').innerHTML += bed[i] + "</br>";
        i++;
    }

    return bed;
}

function doWhileLoop(bed){
    var i = 0;
    bed[bed.length] = "Mattress";
    do{
        document.getElementById('carText').innerHTML += bed[i] + "</br>";
        i++;
    }while(bed[i])

    
}

function clearP(){
    document.getElementById('carText').innerHTML = "";
}

function clearTA(){
    document.getElementById('loopOut').value = "";
}

function sportsButton(){
    var sport = document.getElementById('sportType').value;
    var teamname = document.getElementById('sportName').value;
    var location = document.getElementById('sportLoc').value;

    document.getElementById('teamInfo').innerHTML = objectProperties(sport, location, teamname).locName();
}

function objectProperties(sport, location, teamname){

    var objectedSaved = {
        sportstype: sport,
        teamname: teamname,
        location: location,
        locName: function() {
            return this.location + " " + this.teamname;
        }

    }
    return objectedSaved;
    
}