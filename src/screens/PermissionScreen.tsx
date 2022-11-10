import React, { useContext } from 'react'
import { Button, Platform, StyleSheet, Text, View } from 'react-native'
import { check, PERMISSIONS, PermissionStatus, request } from 'react-native-permissions'
import { BackButton } from '../components/BackButton'
import { PermissionContext } from '../context/PermissionsContext'

export const PermissionScreen = () => {
  const { permissions,askLocationPermission } = useContext( PermissionContext );


  return (
    <View style={styles.container}>
        <Text style={styles.title}>Es necesario el uso del GPS para usar esta aplicacion</Text>

        <BackButton 
          title='Permiso'
          onPress={ askLocationPermission }
        />

        <Text style={{color:'black'}}>
          { JSON.stringify(permissions,null,5) }
        </Text>
    </View>
  )
}


const styles = StyleSheet.create({
    container:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    },
    title:{
      color:'black',
      width:200,
      fontSize:18,
      textAlign:'center',
      marginBottom:20
    }
});