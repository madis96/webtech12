$( document ).ready(function() {
    loadSideMenu();

    loadMainPage();

    //sideMenuHandler();
});

function addCarSubmitHandler(){
  $("form").on("submit", function(e){
    e.preventDefault();

    $.ajax({
      type: "post",
      url: "addCar",
      data: $("form").serialize(),
      success: function(){
        $(".pageContent").empty();
        listCarsPage();
      },
      error: function(){
        alert("Error");
      }
    });
  });
}

function addManufacturerSubmitHandler(){
  $("form").on("submit", function(e){
    e.preventDefault();

    $.ajax({
      type: "post",
      url: "addManufacturers",
      data: $("form").serialize(),
      success: function(){
        $(".pageContent").empty();
        listManufacturersPage();
      },
      error: function(){
        alert("Error");
      }
    });
  });
}


/*--------------------------------------------------------
    handle of which sideMenu button was pressed
--------------------------------------------------------*/
function sideMenuButtonHandler(){
  $(".menuButton").on("click", function()
  {
    if(!$(this).hasClass("selected"))
    {
      setPageContent(this.id);
      $(this).addClass("selected");
      $(".menuButton").not(this).removeClass("selected");
    }
  });
}

/*--------------------------------------------------------
    remove sideMenu buttons selected class,
    and load mainPage (if usr click on the img logo)
-------------------------------------------------------*/
function imgClickHandler(){
  $(".imgBox").on("click", function()
  {
    setPageContent("mainPage");
    $(".menuButton").removeClass("selected");
  });
}

/*--------------------------------------------------------
    sideMenu handler functions
    (click on buttons or logo)
--------------------------------------------------------*/
function sideMenuHandler(){
  sideMenuButtonHandler();
  imgClickHandler();
}

/*--------------------------------------------------------
    handle of which page needs to be loaded
--------------------------------------------------------*/
function setPageContent(content){
  $(".pageContent").empty();
  switch(content)
  {
    case "1":
      //$(".pageContent").load("carList.html");
      listCarsPage();
      break;
    case "2":
      //$(".pageContent").load("manufacturerList.html");
      listManufacturersPage();
      break;
    case "3":
      //$(".pageContent").load("addCar.html");
      loadAddCarPage();
      break;
    case "4":
      //$(".pageContent").load("addManufacturer.html");
      loadAddManufacturerPage();
      break;
    case "5":
      //$(".pageContent").load("lastVisitedManufacturer.html");
      listLastVisited();
      break;
    case "mainPage":
      loadMainPage();
      break;
  }
}

/*--------------------------------------------------------
    mainPage content (img, welcomeText, and some text)
--------------------------------------------------------*/
function loadMainPage(){
    var pageContent = $(".pageContent");
		var mainImg = $("<div>").addClass("mainImg").appendTo(pageContent);
    var img = $("<img>").appendTo(mainImg);
    $(img).attr("src","images/logo.jpg");
    var welcomeText = $("<div>").addClass("welcomeText").appendTo(pageContent);
    var loremIpsum = $("<div>").addClass("loremIpsum").appendTo(pageContent);
		$(welcomeText).html("Welcome in my page!");
    $(loremIpsum).load("lorem.html");
}

/*--------------------------------------------------------
    sideMenu (if need to be loaded dinamically)
--------------------------------------------------------*/
function loadSideMenu(){
  var menuButtons = ["List cars", "List manufacturers", "Add car", "Add manufacturer", "Last visited Manufacturer"];
  //var body = document.getElementsByTagName("BODY");
  var body = $("body");
  var sideBar = $("<div>").addClass("sideBar").appendTo(body);
  var imgBox = $("<div>").addClass("imgBox").appendTo(sideBar);
  var img = $("<img>").appendTo(imgBox);
    $(img).attr("src","images/logo.jpg");
  var menuName = $("<div>").addClass("menuName").appendTo(sideBar);
    $(menuName).html("Side Menu")
  $.each(menuButtons, function(index, value){
    var menuButton = $("<div>").addClass("menuButton").appendTo(sideBar);
    $(menuButton).attr("id", index + 1);
    $(menuButton).html(value);
  });

  var authorDesc = $("<div>").addClass("authorDesc").appendTo(body);
    authorDesc.html("Mádi Szilárd - BQ1IXF");
  var pageContent = $("<div>").addClass("pageContent").appendTo(body);

  sideMenuHandler();
}

/*--------------------------------------------------------
    sListCars content (table with datas from cars)
--------------------------------------------------------*/
function listCarsPage(){
  var pageContent = $(".pageContent");
  var list = $("<table>").addClass("listAll").appendTo(pageContent);
  var thL = $("<th>").appendTo(list);
  var thR = $("<th>").appendTo(list);
  $(thL).html("Manufacturer");
  $(thR).html("Car name");

  $.getJSON('cars', function (data) {
       $.each(data, function (key, value) {
         var row = $("<tr>").attr("id",key + 1).appendTo(list);
         var colL = $("<td>").attr("id", key + 1 + "L").appendTo(row);
         var colR = $("<td>").attr("id", key + 1 + "R").appendTo(row);
         $(colL).html(value.manufacturer);
         $(colR).html(value.name);
      });
      carListClickHandler();
   });
}

/*--------------------------------------------------------
    handle the click on the carList
--------------------------------------------------------*/
function carListClickHandler(){
 $(".listAll tr:not(:first-child)").on("click", function(){
   popUpRemoveOnlyClick();
   var id = this.id;
   var body = $("body");
   var disableClick = $("<div>").addClass("hiddenBackground").appendTo(body);
   var informationPopUp = $("<div>").addClass("informationPopUp").appendTo(body);
   var exitPopUpImgBox = $("<div>").addClass("exitPopUp").appendTo(informationPopUp);
     var exitImg = $("<img>").appendTo(exitPopUpImgBox);
     $(exitImg).attr("src", "images/exit.png");
   var imgBox = $("<div>").addClass("informationImgBox").appendTo(informationPopUp);
     var img = $("<img>").appendTo(imgBox);
     $(img).attr("src", "images/car.png");
   var table = $("<div>").addClass("informationTable").appendTo(informationPopUp);

     $.getJSON('cars', function (data) {
       $.each(data[id-1], function (key, value) {
           var row = $("<tr>").appendTo(table);
             var colL = $("<td>").appendTo(row);
             var colR = $("<td>").appendTo(row);
             $(colL).html(firstLetterUpperCase(key));
             $(colR).html(value);
         });
         document.cookie = "name=" + data[id-1].manufacturer;
      });
   exitPopUpHandler();
 });
}

/*--------------------------------------------------------
    ListManufacturers content
    (table with datas from manufacturers)
--------------------------------------------------------*/
function listManufacturersPage(){
  var pageContent = $(".pageContent");
  var list = $("<table>").addClass("listAll").appendTo(pageContent);
  var thL = $("<th>").appendTo(list);
  $(thL).html("Manufacturer name");

  $.getJSON('manufacturers', function (data) {
       $.each(data, function (key, value) {
         var row = $("<tr>").attr("id",key).appendTo(list);
         var colL = $("<td>").attr("id", key + 1 + "L").appendTo(row);
         $(colL).html(value.name);
      });
      manufacturersListClickHandler()
   });
}

/*--------------------------------------------------------
    handle the click on the manufacturerList
--------------------------------------------------------*/
 function manufacturersListClickHandler(){
   $(".listAll tr:not(:first-child)").on("click", function(){
     popUpRemoveOnlyClick();
     var id = this.id;
     var body = $("body");
     var disableClick = $("<div>").addClass("hiddenBackground").appendTo(body);
     var informationPopUp = $("<div>").addClass("informationPopUp").appendTo(body);
     var exitPopUpImgBox = $("<div>").addClass("exitPopUp").appendTo(informationPopUp);
       var exitImg = $("<img>").appendTo(exitPopUpImgBox);
       $(exitImg).attr("src", "images/exit.png");
     var imgBox = $("<div>").addClass("informationImgBox").appendTo(informationPopUp);
       var img = $("<img>").appendTo(imgBox);
        $(img).attr("src", "images/manufacturers.png");

     var table = $("<div>").addClass("informationTable").appendTo(informationPopUp);

       $.getJSON('manufacturers', function (data) {
         $.each(data[id], function (key, value) {
             var row = $("<tr>").appendTo(table);
               var colL = $("<td>").appendTo(row);
               var colR = $("<td>").appendTo(row);
               $(colL).html(firstLetterUpperCase(key));
               $(colR).html(value);
           });
           document.cookie = "name=" + data[id].name;
           getCarsByCookies();
        });
     exitPopUpHandler();
   });
 }

 /*--------------------------------------------------------
     select Cars from the server where manufacturer is
     same asthe saved manufacturer (in cookies)
 --------------------------------------------------------*/
 function getCarsByCookies(){
   var carsInList = "";
   var counter = 0;
   $.getJSON('manufacturer', function(data){
     $.each(data, function(key, value){
       counter++;
       carsInList = appendToString(carsInList, value.name);
     });
     if(counter > 0)
      console.log(carsInList);
    else
      console.log("No cars from this manufacturer" + data);
   });
 }

 /*--------------------------------------------------------
     load lastVisitedManufacturer page
 --------------------------------------------------------*/
function listLastVisited(){
 var pageContent = $(".pageContent");
 var list = $("<table>").addClass("listAll").appendTo(pageContent);
 var thL = $("<th>").appendTo(list);
 var thR = $("<th>").appendTo(list);
 $(thL).html("Manufacturer");
 $(thR).html("Car name");

 $.getJSON('manufacturer', function (data) {
   var counter = 0;
      $.each(data, function (key, value) {
        counter++;
        var row = $("<tr>").attr("id",key + 1).appendTo(list);
        var colL = $("<td>").attr("id", key + 1 + "L").appendTo(row);
        var colR = $("<td>").attr("id", key + 1 + "R").appendTo(row);
        $(colL).html(value.manufacturer);
        $(colR).html(value.name);
     });
     if(counter <= 0)
     {
       var row = $("<tr>").appendTo(list);
       var colL = $("<td>").appendTo(row);
       var colR = $("<td>").appendTo(row);
         row.css("color","red");
       $(colL).html('THIS MANUFACTURER');
       $(colR).html("HAS NO CARS!");
     }
     carListClickHandler();
  });
}

/*--------------------------------------------------------
    load addManufacture page
--------------------------------------------------------*/
function loadAddManufacturerPage(){
  var manufactData = ["name", "country", "founded"];
  var manufactDataType = ["text", "text", "date"];
  var pageContent = $(".pageContent");
  var form = $("<form>").appendTo(pageContent);
  $(form).attr({
    action: "addManufacturers",
    method: "post"
  })
  var table = $("<table>").addClass("addList").appendTo(form);
  $.each(manufactData, function(key, value){
    var row = $("<tr>").appendTo(table);
    var colL = $("<td>").appendTo(row);
    var colR = $("<td>").appendTo(row);
    $(colL).html(firstLetterUpperCase(value) + ":");
    var input = $("<input>").addClass("addInput").appendTo(colR);
    $(input).attr({
        name: value,
        type: manufactDataType[key],
        required: "required"
      })
    });
  var submit = $("<input>").addClass("addInput addManufacturer").appendTo(table);
  $(submit).attr({
      type: "submit",
      value: "Add Manufacturer",
      id: "addManufacturer"
    });
    addManufacturerSubmitHandler();
}
/*
$(function(){
  $("form").on("submit", function(e){
    e.preventDefault();
    alert("teszt");
  })
})*/

/*--------------------------------------------------------
    load addCar page
--------------------------------------------------------*/
function loadAddCarPage(){
  var carData = ["name", "consumption", "color", "manufacturer", "year", "available", "horsepower"];
  var carDataType = ["text", "text", "text", "text", "number", "number", "number"];
  var pageContent = $(".pageContent");
  var form = $("<form>").appendTo(pageContent);
  $(form).attr({
    action: "addCar",
    method: "post"
  })
  var table = $("<table>").addClass("addList").appendTo(form);
  $.each(carData, function(key, value){
    var row = $("<tr>").appendTo(table);
    var colL = $("<td>").appendTo(row);
    var colR = $("<td>").appendTo(row);
      $(colL).html(firstLetterUpperCase(value) + ":");
      if(value == "manufacturer")
      {
        var input = $("<select>").addClass("addInput").appendTo(colR);
        $(input).attr({
          name: value,
          required: "required"
        })
        $.getJSON('manufacturerNames', function(data){
          $.each(data, function(key, value){
            var option = $("<option>").appendTo(input);
              $(option).attr("value", firstLetterUpperCase(value));
              $(option).html(firstLetterUpperCase(value));
          })
        })
      }
      else {
        var input = $("<input>").addClass("addInput").appendTo(colR);
        $(input).attr({
          name: value,
          type: carDataType[key],
          required: "required"
        })
      }
    });
    var submit = $("<input>").addClass("addInput").appendTo(table);
    $(submit).attr({
        type: "submit",
        value: "Add Car",
        id: "addCar"
    });
    addCarSubmitHandler();
}

/*--------------------------------------------------------
    set a string's first letter uppercase
--------------------------------------------------------*/
function firstLetterUpperCase(string){
  var firstChar = string.substring( 0, 1 );
  var bigFirstChar = firstChar.toUpperCase();
  return string.replace(firstChar, bigFirstChar);
}

/*--------------------------------------------------------
    append a string to another
--------------------------------------------------------*/
 function appendToString(string, append){
   if(string == "")
      return append;
    else
      return string.concat(", " + append);
 }

 /*--------------------------------------------------------
     close popUp if press 'X' button or click outside
     of the popUp
 --------------------------------------------------------*/
function exitPopUpHandler(){
  $(".exitPopUp").on("click", function(){
    popUpRemoveOnlyClick();
  })
  $(".hiddenBackground").on("click", function(){
    popUpRemoveOnlyClick();
  })
}

/*--------------------------------------------------------
    remove popUp and the hiddenBackground
--------------------------------------------------------*/
function popUpRemoveOnlyClick(){
  $(".informationPopUp").remove();
  $(".hiddenBackground").remove();
}
