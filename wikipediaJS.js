/**
 * Created by Rakesh on 11/29/2016.
 */
$(document).ready(function(){

$("#submit").click(submit);



    $("#reset").click(reset);



});




function submit(){


    //console.log("Submit clicked");
    var search = $("#inputText").val();
    if(search.trim()){

        //console.log("Search: " + search);

        var myUrl = "http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch="+search+'&callback=JSON_CALLBACK';

        $.ajax({

            url : myUrl,
            crossDomain : true,
            success: mySuccess,
            error: myError,
            type:"GET",
            dataType: "jsonp"

        });


    }

}


function reset(){
    $("#result").empty();
    $("#content").css("top", "50%");
    $("#inputText").val("");
    //console.log("Reset clicked");
}

function mySuccess(result){
    if(result.query) {
    var pageKeys = Object.keys(result.query.pages);
  //console.log("Result: " + JSON.stringify(result.query.pages[13834]));
    $("#result").empty();

        var page ='';
        for (var i = 0; i < pageKeys.length; i++) {
            //console.log("Title: " + result.query.pages[pageKeys[i]].title);

            page += "<div class='page'>";
            page += "<h2><a href='" + "https://en.wikipedia.org/?curid="+result.query.pages[pageKeys[i]].pageid+"' target = '_blank'>"+result.query.pages[pageKeys[i]].title+" </a></h2>";
            page += "<p>"+result.query.pages[pageKeys[i]].extract+"</p>";
            page += "</div>";




        }
        //console.log("Page: " + page);
        $("#content").css("top", "15%");
        $("#result").append(page);
    }else{
        reset();
       alert("No results found");


    }
}


function myError(error){

    console.log("Error: " + JSON.stringify(error));
}


$("#inputText").on('keyup', function(e){


    if(e.keyCode === 13){
        submit();
    }
});