"use strict";

var counter = 0;
var grid = ["a", "b"];

$(document).ready(function() {
    //check jsfile
    console.log("js connected");

    //reload page 
    $("#reloadPageBtn").on('click', reloadPage);

    //load plants
    requestPlants(0);

    //load more plants button
    $("#morePlants").on("click", function() {
        var length = $("#plants > div").length;
        requestPlants(length);
    });

    //login and register
    $("#popupRegister button").on("click", registerUser);
    $("#popupLogin button").on("click", loginUser);

    //hide logout button
    $("#logout").hide();
    $("#logout").on("click", logoutUser);
});

var reloadPage = function() {
    window.location.reload();
};

function requestPlants(start) {
    var end = start + 6;
    fetch("/load_plants", {
            method: "post",
            headers: new Headers({ "Content-Type": "application/json" }),
            body: JSON.stringify({
                start,
                end
            })
        }).then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            //iterate over plants
            data.plants.forEach(function(plant) {
                var html = "";
                if (counter == 0) {
                    html += "<div class='ui-block-a'>";
                    counter++;
                } else {
                    html += "<div class='ui-block-b'>";
                    counter--;
                }
                html += "<a href='#popupPlant" + plant["id"] + "' data-rel='popup' data-position-to='window' class='ui-btn ui-corner-all ui-shadow' data-transition='pop'>" + plant["name"] + "</br>" + plant["latinName"] + "</a>" +
                    "<div data-role='popup' id='popupPlant" + plant["id"] + "' data-theme='a' class='ui-corner-all'>" +
                    "<form>" +
                    "<div style='padding:10px 20px;'>" +
                    "<h3>" + plant["name"] + "</h3>" +
                    "<h3>" + plant["latinName"] + "</h3>" +
                    "<h3>" + plant["age"] + "</h3>" +
                    "<h3>" + plant["size"] + "</h3>" +
                    "<button type='submit' class='ui-btn ui-corner-all ui-shadow ui-btn-b ui-btn-icon-left ui-icon-check'>Bestel</button>" +
                    "</div>" +
                    "</form>" +
                    "</div>";
                $("#plants").append(html).enhanceWithin();
            });
        });
};


function registerUser(e) {
    e.preventDefault();
    var jsonForm = $("#popupRegister input").serializeArray().reduce(function(accumulator, currentValue) {
        accumulator[currentValue.name] = currentValue.value;
        return accumulator;
    }, {});
    $.ajax({
        type: "post",
        contentType: "application/json",
        url: "/register_user",
        data: JSON.stringify(jsonForm)
    }).success(function(data) {
        $("#popupRegister").popup("close");
        var username = $("#usernameRegister").val();
        $("#placeholderUsername").html("Welkom " + username);
        $("#login").toggle();
        $("#logout").show();
        //popup naam
        //logout button
        //$("aside").toggle("");
    })
};

function loginUser(e) {
    e.preventDefault();
    var jsonForm = $("#popupLogin input").serializeArray().reduce(function(accumulator, currentValue) {
        accumulator[currentValue.name] = currentValue.value;
        return accumulator;
    }, {});
    $.ajax({
        type: "post",
        contentType: "application/json",
        url: "/login_user",
        data: JSON.stringify(jsonForm)
    }).success(function(data) {
        $("#popupLogin").popup("close");
        $("#login").toggle();
        $("#logout").show();
        console.log(data);
        //popup naam
        //id van naam uit login form? zelfde bij register ---------------------------------------------------------------
        console.log($("#usernameLogin"));
        //logout button
        //$("aside").toggle("");
    })
};

function logoutUser(e) {
    e.preventDefault();
    $("#placeholderUsername").html("");
    $("#login").toggle();
    $("#logout").toggle();

}




// var marker;

// function initMap() {
//     var map = new google.maps.Map(document.getElementById('map'), {
//         zoom: 13,
//         center: { lat: 59.325, lng: 18.070 }
//     });

//     marker = new google.maps.Marker({
//         map: map,
//         draggable: true,
//         animation: google.maps.Animation.DROP,
//         position: { lat: 59.327, lng: 18.067 }
//     });
//     marker.addListener('click', toggleBounce);
// }

// function toggleBounce() {
//     if (marker.getAnimation() !== null) {
//         marker.setAnimation(null);
//     } else {
//         marker.setAnimation(google.maps.Animation.BOUNCE);
//     }
// }