var app = {
    init: function () {
        app.initMap();

        for (var i=0; i<=10; i++) {
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(49.8416016+i*0.001, 24.0148105+i*0.01),
                map: app.map,
                title: 'test',
                animation: google.maps.Animation.DROP
            });
        }
    },

    initMap: function () {
        app.map = new google.maps.Map(document.getElementById('map'), {
            center: new google.maps.LatLng(49.8416016, 24.0148105),
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                app.map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
            }, function() {
                // 
            });
        }
    }
};