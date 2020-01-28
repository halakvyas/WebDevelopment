var pngUrl;
var db = null;

$(document).ready(function() {
const player = document.getElementById('player');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const captureButton = document.getElementById('capture');

const constraints = {
  video: true,
};

captureButton.addEventListener('click', () => {
  // Draw the video frame to the canvas.
  context.drawImage(player, 0, 0, canvas.width, canvas.height);
  pngUrl = canvas.toDataURL();
});

// Attach the video stream to the video element and autoplay.
navigator.mediaDevices.getUserMedia(constraints)
  .then((stream) => {
    player.srcObject = stream;
  });
});

function selectTab(a){
  if(a === "Demographics"){
    document.getElementById("demTab").className = "currentTab";
    document.getElementById("repTab").className = "";
    document.getElementById("HVTab").className = "";
    document.getElementById("Demographics").style.display = "block";
    document.getElementById("Report").style.display = "none";
    document.getElementById("Health").style.display = "none";
  }
  else if (a === "Health"){
    document.getElementById("demTab").className = "";
    document.getElementById("repTab").className = "";
    document.getElementById("HVTab").className = "currentTab";
    document.getElementById("Demographics").style.display = "none";
    document.getElementById("Report").style.display = "none";
    document.getElementById("Health").style.display = "block";
  }
  else if (a === "Report"){
    document.getElementById("demTab").className = "";
    document.getElementById("repTab").className = "currentTab";
    document.getElementById("HVTab").className = "";
    document.getElementById("Demographics").style.display = "none";
    document.getElementById("Report").style.display = "block";
    document.getElementById("Health").style.display = "none";
    fnDisplayData();
  }
};


function insertDB()
{
  var fname = document.getElementById('fnm').value;
  var lname = document.getElementById("lnm").value;
  var age = document.getElementById('age').value
  var gender = document.getElementById('gnd').value;
  var photo = document.getElementById('player').value;
  var med = document.getElementById('med').value;
  var note = document.getElementById('note').value;
  db = openDatabase('mydb', '1.0','Reports Database', 7*1024*1024);

  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS Reports (id INTEGER PRIMARY KEY,fn, ln, ag, gnd,ph, med, note)');
    tx.executeSql('INSERT INTO Reports (fn,ln,ag,gnd,ph,med,note) VALUES (?,?,?,?,?,?,?)',[fname,lname,age,gender,photo,med,note]);
  })
}

function fnDisplayData(){
  db.transaction(function(tx) {
      tx.executeSql('SELECT * FROM Reports', [], function(tx, results) {
        var len = results.rows.length, i,tr,tdName,tdAge,tdGender,tdPhoto,img,tdMeds,tdNotes;
        var tbody = document.getElementById('tbody');
        tbody.innerHTML="";

          for (i = 0;i < len; i++) {
          var temp = results.rows.item(i);
          tr = document.createElement("tr");

          tdName = document.createElement("td");
          tdName.innerHTML = temp['fn'] + " " + temp['ln'];
          tr.appendChild(tdName);

          tdAge = document.createElement("td");
          tdAge.innerHTML = temp['ag'];
          tr.appendChild(tdAge);

          tdGender = document.createElement("td");
          tdGender.innerHTML = temp['gnd'];
          tr.appendChild(tdGender);

          tdPhoto = document.createElement("td");
          tdPhoto.innerHTML = temp['ph'];
          tr.appendChild(tdPhoto);

          tdMeds = document.createElement("td");
          tdMeds.innerHTML = temp['med'];
          tr.appendChild(tdMeds);

          tdNotes = document.createElement("td");
          tdNotes.innerHTML = temp['note'];
          tr.appendChild(tdNotes);

          tbody.appendChild(tr);

          }

   },null);
 });
};
