const form = document.getElementById('vote-form');

form.addEventListener('submit', (e) => {
  const choice = document.querySelector('input[name="os"]:checked').value;
  const data = {os: choice };

  fetch('http://localhost:3000/poll', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.log(err));


  e.preventDefault();
});




let dataPoints = [
  { label: "Windows", y: 0},
  { label: "MacOS", y: 0},
  { label: "Linux", y: 0},
  { label: "Other", y: 0},
];

const chartContainer = document.querySelector('#chartContainer');
if(chartContainer) {
  var chart = new CanvasJS.Chart("chartContainer", {
    theme: "theme1",  //"light1", "light2", "dark1", "dark2"
    animationEnabled: true, // change to true		
    title:{
      text: "OS Results"
    },
    data: [
      {
        // Change type to "bar", "area", "spline", "pie",etc.
        type: "column",
        dataPoints: dataPoints
      }
    ]
  });
  chart.render();
}




// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

var pusher = new Pusher('7da030596ec30481026d', {
  cluster: 'us2',
  encrypted: true
});

var channel = pusher.subscribe('os-poll');

channel.bind('os-vote', function(data) {
  console.log('received the changes')
  dataPoints = dataPoints.map(x => {
    if(x.label == data.os) {
      x.y += data.points;
      return x;
    }else{
      return x;
    }
  });
  chart.render();
});