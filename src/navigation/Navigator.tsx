import { createStackNavigator } from '@react-navigation/stack';
import { useContext } from 'react';
import { ActivityIndicator } from 'react-native';
import { PermissionContext } from '../context/PermissionsContext';
import { MapScreen } from '../screens/MapScreen';
import { PermissionScreen } from '../screens/PermissionScreen';

const Stack = createStackNavigator();

const Navigator = () => {

  const { permissions} =  useContext( PermissionContext );

  if( permissions.locationStatus === 'unavailable' )
    return <ActivityIndicator size={50} color={'purple'} />
 
  return (
    <Stack.Navigator
      initialRouteName='PermissionScreen'
      screenOptions={{
        headerShown:false,
        cardStyle:{
          backgroundColor:'white'
        }
      }}>
        {
          permissions.locationStatus === 'granted'
          ? <Stack.Screen name="MapScreen" component={ MapScreen } />
          : <Stack.Screen name="PermissionScreen" component={PermissionScreen} /> 
        }
    </Stack.Navigator>
  );
}

export default Navigator;