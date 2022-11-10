import Geolocation from '@react-native-community/geolocation';
import { useEffect, useRef, useState } from 'react';
import { Location } from '../interfaces/appInterfaces';

export const useLocation = () => {

    const [hasLocation, setHasLocation] = useState(false);
    const [initiaLocation, setInitiaLocation] = useState<Location>({latitude:0,longitude:0});
    const [userLocation, setuserLocation] = useState<Location>({latitude:0,longitude:0});
    const [routeLines, setRouteLines] = useState<Location[]>([]);
    const isMounted = useRef(true);
    const watchId = useRef<number>();
    
    useEffect(() => {
      getCurrentLocation()
        .then( location => {
          if( !isMounted.current )
            return;
          setInitiaLocation(location);
          setuserLocation(location);
          setRouteLines(routes => [ ...routes,location ]);
          setHasLocation( true );
        });
      }, []);

      useEffect(() => {
        isMounted.current = true;
        return () => {
          isMounted.current = false;
        }
      }, [])
            

      const getCurrentLocation = (): Promise<Location> => {
        return new Promise((resolve,reject) => {
            Geolocation.getCurrentPosition(
              ({coords}) => {
                  resolve({
                      latitude: coords.latitude,
                      longitude: coords.longitude
                  });

              },
              (err) => {
                reject({err});
              },
              {
                enableHighAccuracy: true
              }
          );
        })
      }

      const followUserLocation = () => {
        watchId.current = Geolocation.watchPosition(
          ({coords}) => {
            if( !isMounted.current )
              return;

            setuserLocation(coords);
            setRouteLines([ ...routeLines,coords ]);
          },
          (err) => { console.log(err) },
          {
            enableHighAccuracy: true,
            distanceFilter:10
          }
        );
      }
      const stopFollowUserLocation = () => {
        if( watchId.current )
          Geolocation.clearWatch(watchId.current);
      }
    
    return {
        hasLocation,
        initiaLocation,
        getCurrentLocation,
        followUserLocation,
        userLocation,
        stopFollowUserLocation,
        routeLines
    }
}
