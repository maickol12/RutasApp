import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useLocation } from '../hooks/useLocation';
import { Fab } from './Fab';



export const Map = () => {
  
  const { 
          hasLocation,
          initiaLocation,
          getCurrentLocation,
          followUserLocation,
          userLocation,
          stopFollowUserLocation,
          routeLines
       } = useLocation();
  const [showPolyLine, setshowPolyLine] = useState(true);

  useEffect(() => {
    if( !following.current )
      return;

    mapViewRef.current?.animateCamera({
      center: userLocation
    })
  }, [ userLocation ])
  
  const mapViewRef = useRef<MapView>();
  const following = useRef<boolean>(true);

  useEffect(() => {
    followUserLocation();

    return () => {
      stopFollowUserLocation();
    }
  }, [])
  

  if( !hasLocation )
    return <ActivityIndicator size={50} color={'purple'} />

  const centerMap = async() => {
    const location = await getCurrentLocation();
    mapViewRef.current?.animateCamera({
      center: location
    });
    following.current = true;
  }

  return (
    <>
        <MapView
          ref={(el) => mapViewRef.current = el!}
          style={{flex:1}}
          initialRegion={{
            latitude: initiaLocation.latitude,
            longitude: initiaLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onTouchStart={ () => following.current = false }>
            {
              showPolyLine && (
                <Polyline  
                  coordinates={ routeLines }
                  strokeColor={'black'}
                  strokeWidth={3}/>
              )
            }
            
             {/* <Marker
                coordinate={{
                  latitude:37.78825,
                  longitude:-122.4324
                }}
                title={'Esto es un titulo'}
                description={'Esto es una descripción del mapa'}
              /> */}
        </MapView>

        <Fab 
          iconName='compass-outline'
          onPress={centerMap}
          style={{
            position:'absolute',
            bottom:20,
            right:20
          }}/>
        <Fab 
          iconName='brush-outline'
          onPress={() => setshowPolyLine(value => !value)}
          style={{
            position:'absolute',
            bottom:80,
            right:20
          }}/>
    </>
  )
}
