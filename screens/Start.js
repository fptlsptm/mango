import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { TextInput,Button,Alert,AsyncStorage,Linking,BackHandler} from 'react-native';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {url,alerts} from '../common.js';
import {login,update_side} from "../actions";
import Axios from "axios";
import { connect,useDispatch, useSelector } from 'react-redux';

export default function Start(props){
    const [ch_com, setCh_com] = React.useState("N");
    const dispatch = useDispatch();
    const form = new FormData();
    React.useEffect(() => {
        const urls = url+"check/get_check/"+props.mem_userid;
        Axios.get(urls).then(res=>{
            setCh_com(res.data.ch_com);
        });    
    },[]);
    const nextEvent = () =>{
        //console.log(ch_com);
        //props.navigation.navigate("Ckeck1",{idx:1});
        if(ch_com == "N"){
            props.navigation.navigate("Ckeck1",{idx:1});
        }else{
            alerts("이미 설문에 참여하셨습니다.");
            props.navigation.navigate("Main");
        }
    }
    return(
        <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={styles.welcomeContainer}>
                <View style={styles.main_box}>
                    <Image source={require('../assets/images/logo.png')} style={styles.welcomeImage} />
                    <Text style={styles.content_text}>
                        정확한 생리주기 예측 등 여성을 위한 맞춤형 생리 관리서비스를 제공하기 위해 생망고
                        최초 가입 시 산부인과 진료명(진단명), 생리 중 증상 및 통증부위, 약 복용 경험등의
                        사용자 설문을 수행합니다.   
                    </Text>
                    <Text style={styles.content_text}>
                        또한 생리기간 동안 부위 별 통증지수, 심리적 양상 및 일별 진통제 복용 현황
                        등을 조사하여 동일 연령대와 비교한 나의 통증 및 복용 현황 등 생리관련 전반적인
                        레포트를 제공합니다  
                    </Text> 
                </View>
                <Text style={styles.subject_text}>설문에 참여하시겠습니까?</Text>
                <TouchableOpacity style={styles.nextEvent} onPress={nextEvent}>
                    <Text style={styles.buttons}>참여할게요!</Text>
                </TouchableOpacity> 
                <TouchableOpacity style={styles.nextEvent2} onPress={()=>props.navigation.navigate("Main")}>
                    <Text style={styles.buttons2}>다음에 할게요</Text>
                </TouchableOpacity>     
            </View>
        </ScrollView>
        </View>
    );
}
let mapStateToProps = (state) =>{
    return {
        mem_userid: state.auth_con.mem_userid,
        mem_id: state.auth_con.mem_id
    };
}  
Start = connect(mapStateToProps)(Start);


let lineHeight = 30;
if (Platform.OS === 'ios'){
    lineHeight = 40;
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
