$( document ).ready(function() {
    loadSideMenu();

    loadMainPage();

    //sideMenuHandler();
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
    /*$.get('', function (file, state) {
      if(state == 'success')
        console.log(file);
    });*/
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
      $(".pageContent").load("carList.html");
      break;
    case "2":
      $(".pageContent").load("manufacturerList.html");
      break;
    case "3":
      $(".pageContent").load("addCar.html");
      break;
    case "4":
      $(".pageContent").load("addManufacturer.html");
      break;
    case "5":
      $(".pageContent").load("lastVisitedManufacturer.html");
      break;
    case "mainPage":
      loadMainPage();
      break;
  }
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

//if needed then here you can create it automatically
function loadSideMenu(){
  var menuButtons = ["List cars", "List manufacturers", "Add car", "Add manufacturer", "Last visited Manufacturer"];
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

function firstLetterUpperCase(string){
  var firstChar = string.substring( 0, 1 );
  var bigFirstChar = firstChar.toUpperCase();
  return string.replace(firstChar, bigFirstChar);
}

function firstLetterLowerCase(string){
  var firstChar = string.substring( 0, 1 );
  var lowFirstChar = firstChar.toLowerCase();
  return string.replace(firstChar, lowFirstChar);
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
