import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { TextInput,Button,Alert,AsyncStorage,Linking,BackHandler} from 'react-native';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {url} from '../common.js';
import {update_side} from "../actions";
import Axios from "axios";
import { connect,useDispatch, useSelector } from 'react-redux';

export default function Complete(props){
    
    const [mem_userid, setmem_userid] = React.useState('');
    const [mem_password, setmem_password] = React.useState('');
    const [or_idx, setOr_idx] = React.useState('');
    const dispatch = useDispatch();
    const form = new FormData();
    React.useEffect(()=>{
        const backAction = () => {
          Alert.alert("망고", "앱을종료합니까?", [
            {
              text: "아니요",
              onPress: () => null,
              style: "cancel"
            },
            { text: "종료", onPress: () => BackHandler.exitApp() }
          ]);
          return true;
        };
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
        return () => backHandler.remove();
    },[]);
    const nextEvent = () =>{
        dispatch(update_side());
        props.navigation.replace("Main");
    }

    return(
        <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.welcomeContainer}>
                <Image source={require('../assets/images/logo.png')} style={styles.welcomeImage} />
                <Text style={styles.subject_text}>200 포인트 적립</Text>
                <Text style={styles.subject_mini}>포인트는 향후 다양한 쿠폰으로 교환할 수 있습니다.</Text>
                <TouchableOpacity style={styles.nextEvent} onPress={nextEvent}>
                    <Text style={styles.buttons}>확인</Text>
                </TouchableOpacity>     
            </View>
        </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    subject_text:{
        marginTop:40,
        color:"#000",
        fontSize:18,
        letterSpacing:-1,
        textAlign:"center",
        width:300,
        marginBottom:10
    },
    subject_mini:{
        color:"#000",
        fontSize:15,
        letterSpacing:-1,
        textAlign:"center",
        width:300,
        marginBottom:50
        
    },
    textm:{
        marginLeft:10,
        marginRight:10,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    textInputs:{
        width:280,height: 40, borderColor: '#ddd', borderWidth: 1 ,marginBottom:15,padding:5
    },
    buttons:{
        width:280,height: 40,textAlign:"center",marginBottom:10,padding:10,backgroundColor:"#f59a27",color:"#FFF",fontSize:15,borderRadius:20
    },
    buttons_son:{
        width:280,height: 35,textAlign:"center",marginTop:0,padding:7,backgroundColor:"#2196f3",color:"#FFF",
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 10,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 140,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 140,
        height: 55,
        marginBottom: 30,
    },

});
