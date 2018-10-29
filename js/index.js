$( document ).ready(function() {
    //if needed to create it automatically then uncomment it!
    //loadSideMenu();

    loadMainPage();

    //sideMenu button/img(logo) click handler
    sideMenuHandler();
    /*sideMenuButtonHandler();
    imgClickHandler();*/

    //listCars table(/exit) click handler
    //carListClickHandler();
    //exitPopUpHandler();
});


//which sideMenuButton was pressed
function sideMenuButtonHandler(){
  $(".menuButton").on("click", function()
  {
    if(!$(this).hasClass("selected"))
    {
      //setPageContent($(this).html());
      setPageContent(this.id);
      $(this).addClass("selected");
      $(".menuButton").not(this).removeClass("selected");
    }
  });
}

//remove sideMenuButtons' 'selected' class
function imgClickHandler(){
  $(".imgBox").on("click", function()
  {
    setPageContent("mainPage");
    $(".menuButton").removeClass("selected");
  });
}

function sideMenuHandler(){
  sideMenuButtonHandler();
  imgClickHandler();
}

//handle which pageContent need to be loaded
function setPageContent(content){
  var pageContent;
  $(".pageContent").empty();
  switch(content)
  {
    case "1":
      pageContent = "List all cars from database";
      loadListCars();
      break;
    case "2":
      pageContent = "List all manufacturers from database";
      loadListManufacturers();
      break;
    case "3":
      pageContent = "Add car to database";
      break;
    case "4":
      pageContent = "Add manufacturer to database";
      break;
    case "mainPage":
      loadMainPage();
      break;
  }
  //$(".pageContent").html(pageContent);
}

//mainPage content (img, welcomeText, and some text)
function loadMainPage(){
    var pageContent = document.getElementsByClassName("pageContent");
		var mainImg = $("<div>").addClass("mainImg").appendTo(pageContent);
    var img = $("<img>").appendTo(mainImg);
    $(img).attr("src","images/logo.jpg");
    var welcomeText = $("<div>").addClass("welcomeText").appendTo(pageContent);
    var loremIpsum = $("<div>").addClass("loremIpsum").appendTo(pageContent);
		$(welcomeText).html("Welcome in my page!");
    $(loremIpsum).html("Here comes lorem ipsum texts");
}

//AddCar content (form with input, button, etc.)
function loadAddCar(){

}

//AddManufacturer content (form with input, button, etc.)
function loadAddManufacturer(){

}

//ListCars content (table with datas from cars)
function loadListCars(){
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

//ListManufacturers content (table with datas from manufacturers)
function loadListManufacturers(){
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

//if needed then here you can create it automatically
function loadSideMenu(){
  var menuButtons = ["List cars", "List manufacturers", "Add car", "Add manufacturer"];
  var body = document.getElementsByTagName("BODY");
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

function carListClickHandler(){
  $(".listAll tr:not(:first-child)").on("click", function(){
    popUpRemoveOnlyClick();
    var id = this.id;
    var body = document.getElementsByTagName("BODY");
    var disableClick = $("<div>").addClass("hiddenBackground").appendTo(body);
    var informationPopUp = $("<div>").addClass("informationPopUp").appendTo(body);
    var exitPopUpImgBox = $("<div>").addClass("exitPopUp").appendTo(informationPopUp);
      var exitImg = $("<img>").appendTo(exitPopUpImgBox);
      $(exitImg).attr("src", "images/exit.png");
    var imgBox = $("<div>").addClass("informationImgBox").appendTo(informationPopUp);
      var img = $("<img>").appendTo(imgBox);
      $(img).attr("src", "images/logo.jpg");
    var table = $("<div>").addClass("informationTable").appendTo(informationPopUp);

      $.getJSON('cars', function (data) {
        var carData = ['manufacturer', 'name'];
        $.each(data[id-1], function (key, value) {
            var row = $("<tr>").appendTo(table);
              var colL = $("<td>").appendTo(row);
              var colR = $("<td>").appendTo(row);
              $(colL).html(firstLetterUpperCase(key));
              $(colR).html(value);
          });
       });
    exitPopUpHandler();
  });

}

function firstLetterUpperCase(string){
  var firstChar = string.substring( 0, 1 );
  var bigFirstChar = firstChar.toUpperCase();
  return string.replace(firstChar, bigFirstChar);
}

//close popUp if press 'X' button or click outside of the popUp
function exitPopUpHandler(){
  $(".exitPopUp").on("click", function(){
    popUpRemoveOnlyClick();
  })
  $(".hiddenBackground").on("click", function(){
    popUpRemoveOnlyClick();
  })
}

//remove popUp and the hiddenBackground
function popUpRemoveOnlyClick(){
  $(".informationPopUp").remove();
  $(".hiddenBackground").remove();
}

function getAllCars(){
  $.getJSON('cars', function (data) {
       console.log(data);
   })
}

function manufacturersListClickHandler(){
  $(".listAll tr:not(:first-child)").on("click", function(){
    popUpRemoveOnlyClick();
    var id = this.id;
    var body = document.getElementsByTagName("BODY");
    var disableClick = $("<div>").addClass("hiddenBackground").appendTo(body);
    var informationPopUp = $("<div>").addClass("informationPopUp").appendTo(body);
    var exitPopUpImgBox = $("<div>").addClass("exitPopUp").appendTo(informationPopUp);
      var exitImg = $("<img>").appendTo(exitPopUpImgBox);
      $(exitImg).attr("src", "images/exit.png");
    var imgBox = $("<div>").addClass("informationImgBox").appendTo(informationPopUp);
      var img = $("<img>").appendTo(imgBox);
      $(img).attr("src", "images/logo.jpg");
    var table = $("<div>").addClass("informationTable").appendTo(informationPopUp);

      $.getJSON('manufacturers', function (data) {
        $.each(data[id-1], function (key, value) {
            var row = $("<tr>").appendTo(table);
              var colL = $("<td>").appendTo(row);
              var colR = $("<td>").appendTo(row);
              $(colL).html(firstLetterUpperCase(key));
              $(colR).html(value);
          });
       });
    exitPopUpHandler();
  });

}
