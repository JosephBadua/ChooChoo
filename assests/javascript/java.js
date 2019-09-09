// Accessing the data from firebase, getting the array of objects
// getting the values from the objects, placing them into html elements
// and finally appending them to the table
var ref = database.ref()
ref.on('value', gotData, errData);
function gotData(data) {
var trainData = (data.val());
console.log(trainData);
var keyID = Object.keys(trainData);
console.log(keyID);
for (var i = 0; i < keyID.length; i++) {
var t = keyID[i];
var trainName = trainData[t].trainName;
var trainDestination = trainData[t].trainDestination;
var trainTime = trainData[t].trainTime;
var trainMinutes = trainData[t].trainMinutes;
console.log(trainName, trainDestination, trainTime, trainMinutes);
var newRow = "<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainMinutes + "</td></tr>" 
$(".table").append(newRow);
}
}
function errData(err) {
console.log("Error!");
console.log(err);  
}
//
// Getting the Current Time
var now = moment();

//
$(document).ready(function() {
    $("#buttonSubmit").on("click", function() {
        $("<tr>,<td>").empty();
        var train = $("#inputTrain").val().trim();
        var destination = $("#inputDestination").val().trim();
        var time = $("#inputTime").val().trim();
        var minutes = $("#inputState").val().trim();
        console.log(train)
        console.log(destination)
        console.log(time)
        console.log(minutes)
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
