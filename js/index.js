$( document ).ready(function() {
    //if needed to create it automatically then uncomment it!
    //loadSideMenu();

    //loadMainPage();

    //sideMenu button/img(logo) click handler
    sideMenuButtonHandler();
    imgClickHandler();

    //listCars table(/exit) click handler
    carListClickHandler();
    exitPopUpHandler();
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

//handle which pageContent need to be loaded
function setPageContent(content){
  var pageContent;
  $(".pageContent").empty();
  switch(content)
  {
    case "1":
      pageContent = "List all cars from database";
      break;
    case "2":
      pageContent = "List all manufacturers from database";
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
  $(".pageContent").html(pageContent);
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

}

//ListManufacturers content (table with datas from manufacturers)
function loadListManufacturers(){

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
}

function carListClickHandler(){
  $(".listAll tr:not(:first-child)").on("click", function(){
    console.log("You clicked one of the car from the list! ID: " + this.id);
    var body = document.getElementsByTagName("BODY");
    var informationPopUp = $("<div>").addClass("informationPopUp").appendTo(body);
    var exitPopUpImgBox = $("<div>").addClass("exitPopUp").appendTo(informationPopUp);
      var exitImg = $("<img>").appendTo(exitPopUpImgBox);
      $(exitImg).attr("src", "images/exit.png");
    var imgBox = $("<div>").addClass("informationImgBox").appendTo(informationPopUp);
      var img = $("<img>").appendTo(imgBox);
      $(img).attr("src", "images/logo.jpg");
    var table = $("<div>").addClass("informationTable").appendTo(informationPopUp);
    var row = $("<tr>").appendTo(table);
      var colL = $("<td>").appendTo(row);
      var colR = $("<td>").appendTo(row);
      $(colL).html("Manufacturer:");
      $(colR).html("Opel");
    var available = $("<div>").addClass("available").appendTo(informationPopUp);
      $(available).html("Currently available");
  });

}

function exitPopUpHandler(){
  $(document).delegate('.exitPopUp', 'click', function()
  {
    $(".informationPopUp").remove();
  });
}
