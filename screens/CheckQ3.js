import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { TextInput,Button,Alert,AsyncStorage,Slider} from 'react-native';
import { Image, Platform, StyleSheet, Text,Picker, TouchableOpacity,View,Linking} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect,useDispatch, useSelector } from 'react-redux';
import Axios from "axios";
import {url,useObj,qOrder,alerts} from '../common.js';
import {update_side} from "../actions";
import { HeaderTitle } from '@react-navigation/stack';
import InputCal from '../components/InputCal';
import CheckInfo from '../components/CheckInfo';

function CheckQ3(props){


    const uesData = useObj({});
    const dispatch = useDispatch();
    const  nextEvent= async ()=>{
        const urls = url+"check/update_check/"+props.mem_userid;
        const ql = qOrder[0].length;
        const form = uesData.getData(ql);
        if(form.constructor != Array){
            await Axios.post(urls,form).then(res=>{
                console.log(res.data);
            });
            await dispatch(update_side());
            props.navigation.replace("Main");
        }else{
            alerts(form[0]+"번째 항목에 답변을해주세요");
        }
        //props.navigation.navigate("Ckeck"+(idx+1),{idx:(idx+1)});
    }
    return(
        <View style={styles.container}>
            <ScrollView style={styles.scrolls}>
                <CheckInfo uesData={uesData} idx={0}/>
            </ScrollView> 
            <TouchableOpacity style={styles.nextEvent} onPress={nextEvent}>
                <Text style={styles.buttons}>입력완료</Text>
            </TouchableOpacity>     
        </View>
    );
}
let mapStateToProps = (state) =>{
    return {
        mem_userid: state.auth_con.mem_userid,
        mem_id: state.auth_con.mem_id
    };
  }
  
CheckQ3 = connect(mapStateToProps)(CheckQ3);
export default CheckQ3;
let fontSize = 18;
let lineHeight = 40;


if (Platform.OS === 'ios'){
    fontSize = 20;
    lineHeight = 47;
} 
const styles = StyleSheet.create({
    scrolls: {
        width:"100%",
        height:500,
        backgroundColor: '#fff',
        marginBottom:15,
    },
    container: {
        paddingTop:20,
        flex: 1,
        backgroundColor: '#fff',
        alignItems:"center"
    },
    sconntainer: {
        width:"100%"
    },
    nextEvent:{
        borderRadius:30,width:"85%",backgroundColor:"#f59a27",marginBottom:20
    },
    buttons:{
       textAlign:"center",color:"#FFF",fontSize:fontSize,padding:10,
    },
    slider:{width:280},
    subject_text:{
        color:"#000",
        fontSize:16,
        letterSpacing:-1,
    },
});
// 최근생리일
// 평균생리기간
// 직종
// 