$('#finder').css("display", "block");

//TODO: this is the spinner that you see instead of the connected robots list. Do we ever want this?
$('#startupState').css("display", "none");

setLanguage();

var iframe = null; //a frame for snap

$('#find-button').on('click', function(e) {
  findAndConnect();
});



function updateConnectedDevices() {
  $('#robots-connected').empty();
  if (robots.length == 0) {
    $('#connection-state').css("visibility", "hidden");
    $('#startProgramming').css("visibility", "hidden");
  } else {
    $('#connection-state').css("visibility", "visible");
    if (iframe == null) {
      $('#startProgramming').css("visibility", "visible");
    }

    robots.forEach(robot => {
      displayConnectedDevice(robot);
    })
  }
}

// Display connected deivce(s)
function displayConnectedDevice(robot) {
  var deviceImage = "img/img-hummingbird-bit.svg"
  var deviceFancyName = robot.fancyName;
  var batteryDisplay = "style=\"display:inline-block\"";


  if (robot.device.name.startsWith("MB")) {
    deviceImage = "img/img-bit.svg";
    batteryDisplay = "style=\"display:none\"";
  } else if (robot.device.name.startsWith("FN")) {
    deviceImage = "img/img-finch.svg";
  }

  var el = $(

    "             <div class=\"row robot-item\">" +
    "               <div class=\"col-xs-2 img\"> <img src=\"" + deviceImage + "\" alt=\"Hummingbird Bit\" /></div>" +
    "               <div class=\"col-xs-6 name\">" + deviceFancyName + "</div>" +
    "               <div class=\"col-xs-4 buttons\">" +

    //Battery for Hummingbits and Finches only
    "                 <div style=\"display:inline-block\">" +
    "                   <span " + batteryDisplay + " class=\"button button-battery fa-stack fa-2x\"><i class=\"fas /*fa-battery-full fa-battery-half*/ /*fa-battery-quarter*/ fa-stack-2x\"></i></span>                " +

    //Calibrate button
    "                   <a class=\"button\" href=\"#\" ><span class=\"button-calibrate fa-stack fa-2x\">" +
    "                     <i class=\"fas fa-square fa-stack-2x\"></i>" +
    "                     <i class=\"fas fa-compass fa-stack-1x fa-inverse\"></i>" +
    "                   </span></a>" +
    "                  </div>" +

    //Disconnect Button
    "                 <a class=\"button\" href=\"#\"><span class=\"button-disconnect fa-stack fa-2x\">" +
    "                   <i class=\"fas fa-circle fa-stack-2x\"></i>" +
    "                   <i class=\"fas fa-minus fa-stack-1x fa-inverse\"></i>" +
    "                 </span></a>" +
    "               </div>" +
    "             </div>"


  );

  el.find('.button-disconnect').click(function() {
    console.log("button-disconnect");
    robot.disconnect();
  });

  el.find('.button-calibrate').click(function() {
    console.log("button-calibrate");

  });

  robot.displayElement = el;

  $('#robots-connected').append(el);
}


$('#startProgramming').on('click', function(e) {
  $('#startProgramming').css("visibility", "hidden");

  //<iframe src="https://snap.berkeley.edu/snap/snap.html" width="100%" height="600">blabla</iframe>
  iframe = document.createElement("iframe");
  iframe.src = "https://snap.berkeley.edu/snap/snap.html";
  iframe.width = "100%";
  iframe.height = "600";

  document.body.appendChild(iframe);
})