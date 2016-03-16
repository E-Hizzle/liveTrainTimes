$(document).ready(function(){

    var charmander = new Firebase("https://live-train-times.firebaseio.com/")

    // Submit Button Click Listener
    $("#submitButton").on("click", function(){
      var trainName = $("#trainNameInput").val().trim();
      var destination = $("#destinationInput").val().trim();
      var firstTrain = moment($("#firstTrainTimeInput").val().trim(), "HH:mm").format("X");
      var frequency = $("#frequencyInput").val().trim();

      // console.log(this);

      console.log(firstTrain)
      //Firebase pushes
      charmander.push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
      })

      //Empties input boxes after submit
      $("#trainNameInput").val("");
      $("#destinationInput").val("");
      $("#firstTrainTimeInput").val("");
      $("#frequencyInput").val("");

      //Magic
      return false;

    });

  //Listener for data pushed to firebase.
  charmander.on("child_added", function(childSnapshot) {

    //Firebase Variables
    var fireName = childSnapshot.val().trainName;
    var fireDestination = childSnapshot.val().destination;
    var fireFirstTrain = childSnapshot.val().firstTrain;
    var fireFrequency = childSnapshot.val().frequency;

    //Moment.js
    //Not necessarily part of the program, but converts military time to standard time.

    var time = fireFirstTrain 
    time = time.split(':');
    var hours = Number(time[0]);
    var minutes = Number(time[1]);
    var seconds = Number(time[2]);
    var timeValue = "" + ((hours >12) ? hours - 12 : hours); 
    timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes; 
    timeValue += (hours >= 12) ? "pm" : "am"; 

    var minutesAway = "";

              //current time - next arrival(formatted in minutes).

    var nextArrival = "";

              //first arrival + frequency until diffence > current time.
              //fireFirstArrival + fireFrequency
              //if nextArrival < currentTime
              //+ frequency
              //elseif nextArrival found.


    var firstTimeConverted = moment(fireFirstTrain,"hh:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % fireFrequency; 
    var tMinutesTillTrain = fireFrequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm")

    $("#trainTable > tbody").append("<tr class='active'><td>" + fireName + "</td><td>" + fireDestination + "</td><td>" + "Every " + fireFrequency + " Minutes" + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");

  });

});