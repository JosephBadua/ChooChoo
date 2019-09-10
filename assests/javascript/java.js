// Accessing the data from firebase, getting the array of objects
// getting the values from the objects, placing them into html elements
// and finally appending them to the table
var ref = database.ref()

// event listener 
ref.on('value', gotData);

// this function gets called every time there is a change in value 
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
        //confusing I know but it works
        var trainTime = trainData[t].trainTime;
        console.log(trainTime)
        console.log(trainName, trainDestination, trainTime, trainMinutes);
        var newRow = "<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainMinutes + "</td></tr>"
        $(".table").append(newRow);
    }
    ref.off('value', gotData);
}




//
$(document).ready(function () {
    $("#buttonSubmit").on("click", function () {
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

            var timeNow = moment()
            console.log(timeNow.format('hh:mm'));
    
            //
    
            // THIS IS ANOTHER MOMENT THAT INPUTS THE FIRST ARRIVAL TIME
            var startTime = moment()
            startTime.set({
            'hour': timeOne,
            'minute': timeTwo,
            });
            console.log(startTime.format('hh:mm'))
            timeTwo = parseFloat(timeTwo);
            minutes = parseFloat(minutes)
            var nextTime = moment ()
            nextTime.set({
            'hour': timeOne,
            'minute': (timeTwo + minutes),
            })
            console.log(nextTime);
            console.log(nextTime.format('hh:mm'));
            // 
            var diff = nextTime.diff(startTime, 'minutes')
    
            // 
            console.log(diff)
            //
    
        var newRow = "<tr><td>" + train + "</td><td>" + destination + "</td><td>" + minutes + "</td></tr>"
        $(".table").append(newRow);
        var trainAdd = database.ref().push();
        trainAdd.set({
        trainName: train,
        trainDestination: destination,
        trainTime: time,
        trainMinutes: minutes
        });
    });
});
