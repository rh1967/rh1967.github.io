    
    //map settings
                    let mapHash = location.hash ;  //get hash
                    let markerFlag = false ;
                    let geoID ;
                    let markerTriggExt ;
                    let markerTriggExtObj ;

                    if(mapHash.length!=0) { //hash exists?                        
                        geoID = mapHash.substring(1) ;
                        console.log('geoID = ', geoID) ;
                        markerFlag = true ;
                    }                     

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
                        
                        if (markerFlag == true && marker.mappedTo.id == geoID) {
                            console.log('catch geoID') ;
                            markerTriggExt = marker ;
                            markerTriggExtObj = L.marker([markerTriggExt.mappedTo.coordinates.latitude, markerTriggExt.mappedTo.coordinates.longitude], {}).bindPopup(popup);  //generate a marker and bind popup and select callback to it ;
                        }                        

                        markerClusters.addLayer(m) ;                         
                    }

                    map.addLayer(markerClusters)  //add marker cluster to map

                    //trigger out of map
                    if (markerFlag == true) {
                        console.log('fire extern triggered marker') ;
                        
                        markerTriggExtObj.on('click', function(e){markerSelected(markerTriggExt)}) ; //generate a marker and bind popup and select callback to it
                        markerTriggExtObj.getPopup().on('remove', function(e){markerUnselected()})//when a popup is unselected call markerUnselected function
                        markerTriggExtObj.addTo(map) ;

                        markerTriggExtObj.fire('click') ;
                    }

                    function markerSelected(marker){  //is called when a marker is selected

                        console.log('marker_key', marker.key) ;
                        console.log("marker_id =", marker.mappedTo.id) ;
                        //remove last writings
                        $('.toc_map#writings').empty() ;
                        
                        $('.toc_map#key').text(marker.key);  //set the place name in the toc
                        $('.toc_map#details').text(marker.mappedTo.description);    //set the place details in the toc
                        $('.toc_map#coordinates').text(marker.mappedTo.coordinates.latitude + ', ' + marker.mappedTo.coordinates.longitude); //set the coordinates in the toc

                        let places = registerPlace ;  //get the places out of the place resiter
                        //check for each place if its name matches the one of the selected marker
                        for(let place of places){
                            console.log("geoname =", place.geoname) ;

                            if(place.geoname == marker.mappedTo.id){
                                let writings = place.writings ;                                
                                for(let writing of writings){
                                    console.log("writing =", writing) ;
                                    var writTempl = writing + "<br />" ;
                                    $('.toc_map#writings').append(writTempl) ;
                                }
                            }                                                        
                        }
                    }

                    function markerUnselected(){  //when a marker is unselected clear the left side
                        $('.toc_map').text('') ;
                        
                        if (map.hasLayer(markerTriggExtObj)) {
                            console.log('oldmarker = ', markerTriggExtObj) ;
                            map.removeLayer(markerTriggExtObj) ;
                        }
                    }