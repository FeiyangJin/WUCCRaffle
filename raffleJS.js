Marquee3k.init();

var roundNumber = 1;
var studentNumber;
var csvData;
var firstPrize;
var secondPrize;
var thirdPrize;
var playTimer;
var studentid = 0;

imageDiv = document.getElementById("image_div");

refreshPage = function (){
  roundNumber = document.getElementById('round').value
  console.log("Round #: " + roundNumber)
  document.getElementById('roundTitle').innerHTML = "Round # " + roundNumber;
  document.getElementById('roundsetdiv').hidden = true;
}

document.getElementById('refresh-button').addEventListener('click',refreshPage)


//parse csv file
function loadFileAsText(){
  var fileToLoad = document.getElementById("fileToLoad").files[0];
  Papa.parse(fileToLoad, {
    delimiter: ",",
    header: false,
  	complete: function(results) {
      csvData = results;
      studentNumber = csvData.data.length;
      console.log(results);
      console.log('Total # of students: ' + studentNumber)
      document.getElementById("rafflebutton").hidden = false
      document.getElementById("raffleIntro").innerHTML = "<h3>Round #: " + roundNumber + "</h3>"
      + "<h3># of players: " + studentNumber + "</h3>"
  	}
  });
  document.getElementById('filediv').hidden = true;
}


// called when clicking start button
function updateData(){
  document.getElementById("rafflebutton").hidden = true;
  raffle();
  var frequency = 1000
  PlayTimer = setInterval(helper,frequency)
}


// called when go through all the players
function showResults(){
  //some setup
  console.log("first Prize: " + firstPrize);
  console.log("second Prize: " + secondPrize);
  console.log("third Prize: " + thirdPrize);
  document.getElementById('resultDiv').hidden = false;
  document.getElementById('setuptDiv').hidden = true;

  //show results
  var thirdname = csvData.data[thirdPrize][0];
  var thirdPhoto = csvData.data[thirdPrize][1];
  var thirdpath = "photo/" + thirdPhoto;
  var thirdImageDiv = document.getElementById("third_img");
  thirdImageDiv.innerHTML = ""
  var image = document.createElement("img");
  image.setAttribute('src',thirdpath)
  image.setAttribute('width','500')
  thirdImageDiv.appendChild(image);
  document.getElementById("third_name").innerHTML = "<h3>" + thirdname + "</h3>";


  document.getElementById('first').hidden = true;
  document.getElementById('second').hidden = true;

  if (roundNumber > 3){
    document.getElementById('second').hidden = false;
    var secondname = csvData.data[secondPrize][0];
    var secondPhoto = csvData.data[secondPrize][1];
    var secondpath = "photo/" + secondPhoto;
    var secondImageDiv = document.getElementById("second_img");
    secondImageDiv.innerHTML = ""
    var image2 = document.createElement("img");
    image2.setAttribute('src',secondpath)
    image2.setAttribute('width','500')
    secondImageDiv.appendChild(image2);
    document.getElementById("second_name").innerHTML = "<h3>" + secondname + "</h3>";
  }

  if (roundNumber > 5){
    document.getElementById('first').hidden = false;
    var firstname = csvData.data[firstPrize][0];
    var firstPhoto = csvData.data[firstPrize][1];
    var firstpath = "photo/" + firstPhoto;
    var firstImageDiv = document.getElementById("first_img");
    firstImageDiv.innerHTML = ""
    var image1 = document.createElement("img");
    image1.setAttribute('src',firstpath)
    image1.setAttribute('width','500')
    firstImageDiv.appendChild(image1);
    document.getElementById("first_name").innerHTML = "<h3>" + firstname + "</h3>";
  }
}


// settimeout helper
function helper(){
  if (studentid >= csvData.data.length){
    studentid = 0;
    clearInterval(PlayTimer);
    showResults();
  }
  else{
    console.log("the id is " + studentid);

    var name = csvData.data[studentid][0];
    var photoName = csvData.data[studentid][1];

    //update image
    var filePath = "photo/" + photoName;
    imageDiv.innerHTML = ""
    var image = document.createElement("img");
    image.setAttribute('src',filePath)
    image.setAttribute('width','500')
    image.setAttribute('height','300')
    imageDiv.appendChild(image);

    //update name
    document.getElementById("student_name").innerHTML = "<h3>" + name + "</h3>";
    studentid += 1
  }

}


// This function generate prize winner
function raffle(){
  thirdPrize = Math.floor(Math.random() * csvData.data.length)
  secondPrize = -1;
  firstPrize = -1;

  if (roundNumber > 3){
    secondPrize = Math.floor(Math.random() * csvData.data.length);
  }

  if (roundNumber > 5){
    firstPrize = Math.floor(Math.random() * csvData.data.length);
  }

}
