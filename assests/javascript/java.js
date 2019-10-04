// Accessing the data from firebase, getting the array of objects
// getting the values from the objects, placing them into html elements
// and finally appending them to the table
var ref = database.ref()

// event listener 
ref.on('value', gotData);

// this function gets called every time there is a change in value *---'


function gotData(data) {
    var trainData = (data.val());
    console.log(trainData);
    var keyID = Object.keys(trainData);
    console.log(keyID);
    for (var i = 0; i < keyID.length; i++) {
        var t = keyID[i];
        var trainName = trainData[t].trainName;
        var trainDestination = trainData[t].trainDestination;
        var trainMinutes = trainData[t].trainMinutes;
        var trainOne = trainData[t].trainFirst;
        var trainTwo = trainData[t].trainSecond;
               // MOMENT THAT PULLS THE CURRENT TIME
               var timeNow = moment();
               var nowHour =  moment().format('HH');
               var nowMinutes =  moment().format('mm');
               timeNow.set({
                   'hour': nowHour,
                   'minute': nowMinutes
                   });
               console.log(timeNow);
       
               // THIS IS ANOTHER MOMENT THAT INPUTS THE FIRST ARRIVAL TIME
               var startTime = moment()
               startTime.set({
               'hour': trainOne,
               'minute': trainTwo,
               });
               console.log(startTime);
   
               if (timeNow < startTime) {
                   console.log(startTime)
                   var minutesAway = startTime.diff(timeNow, 'minutes');
                   console.log(minutesAway);
                   var nextArrival = startTime.format('hh:mm a');
               } else {
                   while (timeNow >= startTime) {
                       startTime.add(trainMinutes, 'minutes');
                       if (startTime >= timeNow) {
                       var minutesAway = startTime.diff(timeNow, 'minutes');
                       console.log(minutesAway);
                       var nextArrival = startTime.format('hh:mm a');  
                       }
                   };   
               };
                       
        var newRow = "<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainMinutes + "</td><td>" + minutesAway + "</td><td>" + nextArrival + "</td></tr>"
        $(".table").append(newRow);
    }
    ref.off('value', gotData);
}


//
$(document).ready(function () {
    $("#buttonSubmit").on("click", function () {
        ref.off('value', gotData);
        $("<tr>,<td>").empty();
        var train = $("#inputTrain").val().trim();
        var destination = $("#inputDestination").val().trim();
        var time = $("#inputState").val().trim();
        var time = time.split(":");
        console.log(time);
        var timeOne = time[0];
        console.log(timeOne);
        var timeTwo = time[1];
        console.log(timeTwo);
        var minutes = $("#inputMinutes").val().trim();
        console.log(train)
        console.log(destination)
        console.log(time)
        console.log(minutes)
            // MOMENT THAT PULLS THE CURRENT TIME
            var timeNow = moment();
            var nowHour =  moment().format('HH');
            var nowMinutes =  moment().format('mm');
            timeNow.set({
                'hour': nowHour,
                'minute': nowMinutes
                });
            console.log(timeNow);
    
            // THIS IS ANOTHER MOMENT THAT INPUTS THE FIRST ARRIVAL TIME
            var startTime = moment()
            startTime.set({
            'hour': timeOne,
            'minute': timeTwo,
            });
            console.log(startTime);

            if (timeNow < startTime) {
                console.log(startTime)
                var minutesAway = startTime.diff(timeNow, 'minutes');
                console.log(minutesAway);
                var nextArrival = startTime.format('hh:mm a');
            } else {
                while (timeNow >= startTime) {
                    startTime.add(minutes, 'minutes');
                    if (startTime >= timeNow) {
                    var minutesAway = startTime.diff(timeNow, 'minutes');
                    console.log(minutesAway);
                    var nextArrival = startTime.format('hh:mm a');  
                    }
                };   
            };
                
    
        var newRow = "<tr><td>" + train + "</td><td>" + destination + "</td><td>" + minutes + "</td><td>" + minutesAway + "</td><td>" + nextArrival + "</td></tr>"
        $(".table").append(newRow);
        firebase.database().ref().push().set({
        trainName: train,
        trainDestination: destination,
        trainFirst: timeOne,
        trainSecond: timeTwo,
        trainMinutes: minutes
        });
    });
});
