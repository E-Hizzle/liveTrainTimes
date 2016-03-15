$(document).ready(function(){

    var charmander = new Firebase("https://live-train-times.firebaseio.com/")

    // Submit Button Click Listener
    $("#submitButton").on("click", function(){
      var trainName = $("#trainNameInput").val().trim();
      var destination = $("#destinationInput").val().trim();
      var firstTrain = $("#firstTrainTimeInput").val().trim();
      var frequency = $("#frequencyInput").val().trim();
      // console.log(this);

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

  charmander.on("child_added", function(childSnapshot) {

    //Firebase Variables
    var fireName = childSnapshot.val().trainName;
    var fireDestination = childSnapshot.val().destination;
    var fireFirstTrain = childSnapshot.val().firstTrain;
    var fireFrequency = childSnapshot.val().frequency;

    //Moment.js
    //Next Arrival: Current time + frequency
    //Minutes Away: Next Arrival - Current Time

    //Not necessarily part of the program, but the converts military time to conventional time.
    var time = fireFirstTrain 
    time = time.split(':');
    var hours = Number(time[0]);
    var minutes = Number(time[1]);
    var seconds = Number(time[2]);
    var timeValue = "" + ((hours >12) ? hours - 12 : hours); 
    timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes; 
    timeValue += (hours >= 12) ? "pm" : "am"; 
    console.log(timeValue)

    var nextArrival = "";
    var minutesAway = "";

    $("#trainTable > tbody").append("<tr class='active'><td>" + fireName + "</td><td>" + fireDestination + "</td><td>" + "Every " + fireFrequency + " Minutes" + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");

  });

});
