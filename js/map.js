

var geocoder;
var map;

function LeftControl(controlDiv, map) {
    // Set CSS for the control border.
    var controlUI = document.createElement("div");
    controlUI.id = "doListView";
    controlUI.style.cursor = "pointer";
    controlUI.style.margin = "22px";
    controlUI.style.width = "70px";
    controlUI.style.height = "70px";
    controlDiv.appendChild(controlUI);
    // Set CSS for the control interior. 
    var controlIcon = document.createElement("div");
    controlIcon.style.background = "url('images/listview.svg') no-repeat center";
    controlIcon.style.width = "70px";
    controlIcon.style.height = "70px";
    controlUI.appendChild(controlIcon);
    // Setup the click event listeners
    controlUI.addEventListener("click", function () {
        // Go to list view
        window.location.href = 'ricerca.html';
    });
}

function RightControl(controlDiv, map) {
    // Set CSS for the control border.
    var controlUI = document.createElement("div");
    controlUI.id = "doFilterMap";
    controlUI.style.cursor = "pointer";
    controlUI.style.margin = "22px";
    controlUI.style.width = "70px";
    controlUI.style.height = "70px";
    controlDiv.appendChild(controlUI);
    // Set CSS for the control interior. 
    var controlIcon = document.createElement("div");
    controlIcon.style.background = "url('images/filter-btn.svg') no-repeat center";
    controlIcon.style.width = "70px";
    controlIcon.style.height = "70px";
    controlUI.appendChild(controlIcon);
    // Setup the click event listeners
    controlUI.addEventListener("click", function () {
        $('#do-filter-modal').modal('show'); 
    });
}

function initialize() {
    var locations = [
        ['DESCRIPTION', 41.926979, 12.517385, 3],
        ['DESCRIPTION', 41.914873, 12.506486, 2],
        ['DESCRIPTION', 61.918574, 12.507201, 1]
    ];


    window.map = new google.maps.Map(document.getElementById('map'), {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        fullscreenControl: false
    });

    // InfoWindow content
    var contentString = `
    <div class="do-gallery-items">
        <div class="do-gallery-item"
            style="background: url(&quot;images/girl.png&quot;) 0% 0% / cover no-repeat; width:100%;height:200px;">
            <div class="do-top"></div>
            <div class="do-item-info">
                <div class="do-item-info-top">
                    <div class="do-left-wrap">
                        <h1>Carolina </h1>
                        <p>23 anni / Milano</p>
                        <p>DONNA</p>
                    </div>
                  
                </div>
              
            </div>
            
        </div>
        <div class="do-profile"> <a href="#">Vedi profilo</a> </div>
        
    </div>`;
    var infowindow = new google.maps.InfoWindow();

    var bounds = new google.maps.LatLngBounds();

    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            icon: 'images/heart.svg',
            map: map
        });

        bounds.extend(marker.position);

        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infowindow.setContent(contentString);
                infowindow.open(map, marker);
            }
        })(marker, i));
    }

    map.fitBounds(bounds);

    var listener = google.maps.event.addListener(map, "idle", function () {
        map.setZoom(3);
        google.maps.event.removeListener(listener);
    });

    // Controls 
    // Create the DIV to hold the control and call the LeftControl()  , RightControl()
    // constructor passing in this DIV. 
    var leftControlDiv = document.createElement("div");
    var leftControl = new LeftControl(leftControlDiv, map);
    var rightControlDiv = document.createElement("div");
    var rightControl = new RightControl(rightControlDiv, map);
    leftControlDiv.index = 1; rightControlDiv.index = 2; map.controls[google.maps.ControlPosition.TOP_LEFT].push(leftControlDiv); map.controls[google.maps.ControlPosition.TOP_RIGHT].push(rightControlDiv);
}

function loadScript() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyARj_MG0Cmym_kUwUq_kpfAzkLZNGE67Hs&callback=initialize';
    document.body.appendChild(script);
}

window.onload = loadScript;

