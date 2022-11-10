    
    //map settings
                   let map = L.map('map', {
                        center: [10.0, 5.0],
                        minZoom: 2,
                        zoom: 2,
                    })  

                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {  
                        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                        subdomains: ['a', 'b', 'c'],
                    }).addTo(map)  //add openstreatmaps to leaflet

                    let markerClusters = L.markerClusterGroup()
                    for (let marker of markers) {
                        //generate a html popup for each mark
                        let popup = marker.key +
                        '<br />' +                            
                        '<b>Geo Names:</b><br /> ' +
                        '<div style="margin-left: 10px"><a href="' + marker.mappedTo.url + '" target="blank">' + marker.mappedTo.url + "</a></div>"

                        let m = L.marker([marker.mappedTo.coordinates.latitude, marker.mappedTo.coordinates.longitude], {}).bindPopup(popup).on('click', function(e){markerSelected(marker)});  //generate a marker and bind popup and select callback to it
                        m.getPopup().on('remove', function(e){markerUnselected()})//when a popup is unselected call markerUnselected function

                        markerClusters.addLayer(m)
                    }

                    map.addLayer(markerClusters)  //add marker cluster to map


                    function markerSelected(marker){  //is called when a marker is selected
                        $('.toc_map#key').text(marker.key);  //set the place name in the toc
                        $('.toc_map#details').text(marker.mappedTo.description);    //set the place details in the toc
                        $('.toc_map#coordinates').text(marker.mappedTo.coordinates.latitude + ', ' + marker.mappedTo.coordinates.longitude); //set the coordinates in the toc

                        let places = registerPlace.text.body.list.item;  //get the places out of the place resiter

                        //check for each place if its name matches the one of the selected marker
                        for(let place of places){
                            if(place.note[0].placeName["#text"] == marker.key){ 
                                $('.toc_map#writings').text(place.note[1].p);  //if it is a match display the writings in the toc
                            }
                        }

                    }

                    function markerUnselected(){  //when a marker is unselected clear the left side
                        $('.toc_map').text('');
                    }