

var geocoder;
var map;

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
}

function loadScript() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyARj_MG0Cmym_kUwUq_kpfAzkLZNGE67Hs&callback=initialize';
    document.body.appendChild(script);
}

window.onload = loadScript;

