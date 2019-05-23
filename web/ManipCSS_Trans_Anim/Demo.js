function test()
{
    if(sessionStorage.getItem("wACount") === null)
        wACount = 0;
    else
        wACount = sessionStorage.getItem("wACount");    

    sessionStorage.setItem("wACount") = 100;



    if(localStorage.getItem("wACount") === null)
        wACount = 0;
    else
        wACount = localStorage.getItem("wACount");    

    localStorage.setItem("wACount") = 100;
}
/*
w3School
Definition and Usage 

The localStorage and sessionStorage properties allow to save key/value pairs in a web browser.

The localStorage object stores data with no expiration date. The data will not be deleted when the browser is closed, and will be available the next day, week, or year.

The localStorage property is read-only.

The sessionStorage object stores data for only one session (the data is deleted when the browser tab is closed).
*/