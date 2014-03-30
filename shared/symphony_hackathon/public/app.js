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

        //
        $('#add_point').on('click', function () {
            $('#panel_search').fadeOut('fast');
            $('#panel_add_point').fadeIn('fast');

            if (!app.drag_marker) {
                app.drag_marker = new google.maps.Marker({
                    position: new google.maps.LatLng(app.map.getCenter().lat(), app.map.getCenter().lng()),
                    map: app.map,
                    animation: google.maps.Animation.DROP,
                    icon: 'http://maps.google.com/mapfiles/kml/paddle/red-blank.png',
                    draggable: true
                });
            }

            var onMarkerDragEnd = function () {
                var geocoder = new google.maps.Geocoder;

                var lat = app.drag_marker.getPosition().lat()
                  , lng = app.drag_marker.getPosition().lng();

                geocoder.geocode({
                    latLng: new google.maps.LatLng(lat, lng)
                }, function (data, status) {
                    $('#panel_add_point .field.address .value').html(data[0].formatted_address);
                });

                $('#panel_add_point input[name="lat"]').val(lat);
                $('#panel_add_point input[name="lng"]').val(lng);
            };

            google.maps.event.addListener(app.drag_marker, 'dragend', onMarkerDragEnd);
            onMarkerDragEnd();
        });

        //
        $('#add_cancel').on('click', function () {
            $('#panel_add_point').fadeOut('fast');
            $('#panel_search').fadeIn('fast');
        });

        //
        $('#add_submit').on('click', function () {
            // $('#panel_add_point').fadeOut('fast');
            // $('#panel_search').fadeIn('fast');

            var invalidField = function (el) {
                $(el).focus();
                setTimeout(function() {  $(el).addClass('error');  },0);
                setTimeout(function() {  $(el).removeClass('error');  },100);
                setTimeout(function() {  $(el).addClass('error');  },200);
                setTimeout(function() {  $(el).removeClass('error');  },300);
                setTimeout(function() {  $(el).addClass('error');  },350);
                setTimeout(function() {  $(el).removeClass('error');  },400);
            };

            var titleEl = $('#panel_add_point input[name="title"]')
              , title = titleEl.val();

            var desctiptionEl = $('#panel_add_point textarea[name="desctiption"]')
              , desctiption = desctiptionEl.val();

            if (title.length <= 5) {
                return invalidField(titleEl);
            }

            if (desctiption.length <= 10) {
                return invalidField(desctiptionEl);
            }

            var lat = $('#panel_add_point [name="lat"]').val()
              , lng = $('#panel_add_point [name="lng"]').val();

            var tags = [];
            $('#panel_add_point .field.tags .value .list .item').filter(function () {
                tags.push($(this).find('.name').text());
            });

            $.post('/api/v1/points', {
                'format': 'json',
                'point': {
                    'desctiption': desctiption,
                    'title': title,
                    'lng': lng,
                    'lat': lat,
                    'actual_to': '',
                    'actual_from': '',
                    'tags': tags.join(', '),
                    'user': {
                        'full_name': '',
                        'phone': '',
                        'email': ''
                    }
                }
            }, 'json', function (data) {
                console.log(data)
            });
        });

        //
        $('#panel_add_point .field.tags .value input[type="text"]').on('keydown', function (e) {
            if (e.keyCode == 13) {
                var name = $(this).val();

                if (!name) return;

                var html = tpl('tpl-tag-item')({
                    'name': name
                });

                $('#panel_add_point .field.tags .list').append(html);

                $(this).val('');
            }
        })
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
    },

    tags: {
        remove: function (el) {
            $(el).closest('.item').fadeOut('fast', function () {
                $(this).remove();
            })
        }
    }
};