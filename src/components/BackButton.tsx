import React from 'react'
import { StyleProp, StyleSheet, Text, ViewStyle } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface Props {
    title: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
}

export const BackButton = ({title,onPress,style} : Props) => {
  return (
    <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        style={{
            ...style as any,
            ...styles.blackButton
        }}>
        <Text style={styles.bottonText}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    blackButton:{
        height:45,
        width:200,
        backgroundColor:'black',
        borderRadius:50,
        justifyContent:'center',
        alignItems:'center',
        shadowColor:"#000",
        shadowOffset:{
            width:0,
            height:3
        },
        shadowOpacity:0.27,
        elevation:6
    },
    bottonText:{
        color:'white',
        fontSize:18
    }
});