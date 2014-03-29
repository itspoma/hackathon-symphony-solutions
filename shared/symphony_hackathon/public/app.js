window.tpl = function (elementId) {
    return doT.template(document.getElementById(elementId).text.trim());
};

var markers = {
    'car': 'http://mapicons.nicolasmollet.com/wp-content/uploads/mapicons/shape-default/color-9d7050/shapecolor-color/shadow-1/border-dark/symbolstyle-white/symbolshadowstyle-dark/gradient-no/car.png',
    'first-aid': 'http://mapicons.nicolasmollet.com/wp-content/uploads/mapicons/shape-default/color-f34648/shapecolor-color/shadow-1/border-dark/symbolstyle-white/symbolshadowstyle-dark/gradient-no/firstaid.png',
    'social-help': 'http://mapicons.nicolasmollet.com/wp-content/uploads/mapicons/shape-default/color-f34648/shapecolor-color/shadow-1/border-dark/symbolstyle-white/symbolshadowstyle-dark/gradient-no/sozialeeinrichtung.png',
    'theft': 'http://mapicons.nicolasmollet.com/wp-content/uploads/mapicons/shape-default/color-c03638/shapecolor-color/shadow-1/border-dark/symbolstyle-white/symbolshadowstyle-dark/gradient-no/theft.png',
    'fire': 'http://mapicons.nicolasmollet.com/wp-content/uploads/mapicons/shape-default/color-c03638/shapecolor-color/shadow-1/border-dark/symbolstyle-white/symbolshadowstyle-dark/gradient-no/fire.png',
    'car-accident': 'http://mapicons.nicolasmollet.com/wp-content/uploads/mapicons/shape-default/color-c03638/shapecolor-color/shadow-1/border-dark/symbolstyle-white/symbolshadowstyle-dark/gradient-no/caraccident.png',
    'shooting': 'http://mapicons.nicolasmollet.com/wp-content/uploads/mapicons/shape-default/color-c03638/shapecolor-color/shadow-1/border-dark/symbolstyle-white/symbolshadowstyle-dark/gradient-no/shooting.png'
};

var app = {
    init: function () {
        app.initMap();
        app.bindEvents();

        app.update();

        var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';

        for (var i=0; i<=10; i++) {
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(49.8416016+i*0.001, 24.0148105+i*0.01),
                map: app.map,
                title: 'test',
                animation: google.maps.Animation.DROP,
                icon: markers['fire']
            });

            google.maps.event.addListener(marker, 'click', function (marker, i) {
                // infowindow.setContent(locations[i][0]);
                // infowindow.open(map, marker);
                alert(1);
                // var infowindow = new google.maps.InfoWindow({
                //     content: 'Hello, World!!'
                // });
                // infowindow.open(app.map, marker);
            });

        }
    },

    initMap: function () {
        app.map = new google.maps.Map(document.getElementById('map'), {
            center: new google.maps.LatLng(49.8416016, 24.0148105),
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControlOptions: {
                position: google.maps.ControlPosition.BOTTOM_CENTER
            },
            panControlOptions: {
                position: google.maps.ControlPosition.LEFT_CENTER
            },
            zoomControlOptions: {
                position: google.maps.ControlPosition.LEFT_CENTER
            },
            streetViewControl: false,
            streetViewControlOptions: {
                position: google.maps.ControlPosition.LEFT_CENTER
            }
        });

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                app.map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
            }, function() {
                // 
            });
        }
    },

    bindEvents: function () {
        //
        $('#filter-tags .item').on('click', function () {
            $(this).toggleClass('selected');

            app.update();
        });
    },

    update: function () {
        $('#results .preloader').show();
        $('#results .item').remove();
        $('#results-title span').html('&hellip;');
        $('#results-counts span').html('&hellip;');

        //
        setTimeout(function (){
            $('#results .preloader').hide();

            var count = _.random(0,20);

            $('#results-title span').text(count);
            $('#results-counts span').text(count);

            for (var i=0; i<=count; i++) {
                $('#results').append(tpl('tpl-result-item')());
            }
        }, 2000);
    }
};