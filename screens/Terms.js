import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { TextInput,Button,Alert,AsyncStorage,Linking,BackHandler} from 'react-native';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {url,alerts} from '../common.js';
import {login,update_side} from "../actions";
import Axios from "axios";
import { connect,useDispatch, useSelector } from 'react-redux';

export default function Terms(props){
    
   
    return(
        <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
       
            <Text style={styles.content_text}>
                정확한 생리주기 예측 등 여성을 위한 맞춤형 생리 관리서비스를 제공하기 위해 생망고
                최초 가입 시 산부인과 진료명(진단명), 생리 중 증상 및 통증부위, 약 복용 경험등의
                사용자 설문을 수행합니다.   
            </Text>
            
        </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    main_box:{
        marginTop:"20%",
        alignItems:"center",
        borderRadius:10,
        width:"85%",
        paddingBottom:20,
        backgroundColor: '#fff',
        zIndex:10,
        borderColor: '#f59a27',
        borderStyle: 'solid',
        borderWidth: 1,
    },
    subject_text:{
        marginTop:30,
        color:"#000",
        fontSize:16,
        letterSpacing:-1,
        textAlign:"center",
        width:"100%",
        marginBottom:30,
    },
    content_text:{
        color:"#000",
        fontSize:14,
        letterSpacing:-1,
        textAlign:"left",
        width:"85%",
        margin:20,
        marginBottom:0,
        
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
        width:"85%",height: 40, borderColor: '#ddd', borderWidth: 1 ,marginBottom:15,
    },
    nextEvent:{
        width:"85%",backgroundColor:"#f59a27",marginBottom:15,
    },
    buttons:{
        textAlign:"center",padding:10,color:"#FFF",fontSize:15
    },

    nextEvent2:{
        width:"85%",backgroundColor:"#fff",marginBottom:20,borderWidth:1,borderColor:"#f59a27"
    },
    buttons2:{
        textAlign:"center",padding:10,color:"#FFF",fontSize:15,color:"#f59a27"
    },
    
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        
    },
    welcomeContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    welcomeImage: {
        marginTop:25,
        width: 140,
        height: 59,
        marginBottom: 30,
    },

});
