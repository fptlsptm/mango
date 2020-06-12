import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { TextInput,Button,Alert,AsyncStorage,Linking,BackHandler} from 'react-native';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View ,ProgressBarAndroid} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {url,colorArr,alerts} from '../common.js';
import {login,update_side} from "../actions";
import IntBar from '../components/IntBar';
import Axios from "axios";
const img = require('../assets/images/my.png')
import { connect,useDispatch, useSelector } from 'react-redux';

export default function StateBody(props){   
    const [ch_com, setCh_com] = React.useState("N");
    const [data, setData] = React.useState({});
    const dispatch = useDispatch();
    const form = new FormData();
    const [barColorArr, setBarColorArr] = React.useState(["#fff","#fff","#fff","#fff","#fff"]);
    React.useEffect(() => {
        const urls = url+"mem_check/info/"+props.mem_userid;
        const tempArr = [];
        Axios.get(urls).then(res=>{
            console.log(res.data);
            
            if(res.data == null){
                alerts("증상체크를 먼저해주세요.");
                props.navigation.replace("CheckTap"); 
            }
            else{
                const datas = res.data;
                tempArr[0] = colorArr[Number(res.data.q21)];
                tempArr[1] = colorArr[Number(res.data.q23)];
                tempArr[2] = colorArr[Number(res.data.q25)];
                tempArr[3] = colorArr[Number(res.data.q27)];
                tempArr[4] = colorArr[Number(res.data.q29)];
                setBarColorArr(tempArr);                
                (tempArr);                
                setData(datas);
                setCh_com("Y");  
            }

            // 이부분 활성화시 내상태보기에 반영
            // if(res.data.ch_com == "Y"){
            //     const datas = res.data;
            //     setCh_com("Y");
            //     tempArr[0] = colorArr[Number(res.data.q21)];
            //     tempArr[1] = colorArr[Number(res.data.q23)];
            //     tempArr[2] = colorArr[Number(res.data.q25)];
            //     tempArr[3] = colorArr[Number(res.data.q27)];
            //     tempArr[4] = colorArr[Number(res.data.q29)];
            //     setBarColorArr(tempArr);                
            //     setData(datas);

            // }else{
            //     alerts("아직 설문조사를 하지 않았습니다"); 
            //     props.navigation.replace("Main");
            // }


        });    
    },[]);
    const stylesBar = StyleSheet.create({
        bar1:{height:55,alignItems:"center",width:300,backgroundColor: barColorArr[0],zIndex:10},
        bar2:{height:40,alignItems:"center",width:300,backgroundColor: barColorArr[1],zIndex:10},
        bar3:{height:25,alignItems:"center",width:300,backgroundColor: barColorArr[2],zIndex:10},
        bar4:{height:25,alignItems:"center",width:300,backgroundColor: barColorArr[3],zIndex:10},
        bar5:{height:50,alignItems:"center",width:300,backgroundColor: barColorArr[4],zIndex:10},
    });    
    return(
        <View style={styles.container}>
        {ch_com != "N" && 
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.welcomeContainer}>
                <Image source={img} style={styles.myImg} />
                <View style={stylesBar.bar1}></View>
                <View style={stylesBar.bar2}></View>
                <View style={stylesBar.bar3}></View>
                <View style={stylesBar.bar4}></View>
                <View style={stylesBar.bar5}></View>
            </View>
            
            <Text style={styles.subject_text}>내 또래와 평균 통증 비교</Text>
            {/* <Text style={styles.subject_side}>숫자가 클 수록 심함</Text> */}
            <View style={styles.infoBox}> 
               <IntBar title={"머리"} val={data.q21}/>
               <IntBar title={"가슴"} val={data.q23}/>
               <IntBar title={"골반"} val={data.q25}/>
               <IntBar title={"허리"} val={data.q27}/>
               <IntBar title={"배"} val={data.q29}/>
            </View>
        </ScrollView>
        }
        </View>
    );
}
let mapStateToProps = (state) =>{
    return {
        mem_userid: state.auth_con.mem_userid,
        mem_id: state.auth_con.mem_id
    };
}  
StateBody = connect(mapStateToProps)(StateBody);
let lineHeight = 30;
if (Platform.OS === 'ios'){
    lineHeight = 40;
}
const styles = StyleSheet.create({
    infoBox:{
        alignItems:"center",
    },
    subject_text:{
        marginTop:20,
        color:"#000",
        fontSize:16,
        letterSpacing:-1,
        textAlign:"center",
        marginBottom:0,
    },
    subject_side:{
        color:"#fb9a93",
        fontSize:14,
        letterSpacing:-1,
        textAlign:"center",
        marginBottom:5,
    },
    content_text:{
        color:"#000",
        fontSize:14,
        letterSpacing:-1,
        textAlign:"left",
        width:260,
        margin:20,
        marginTop:17,
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
        width:280,height: 40, borderColor: '#ddd', borderWidth: 1 ,marginBottom:15,
    },
    nextEvent:{
        width:280,height: 50,backgroundColor:"#f59a27",marginBottom:20,
    },
    buttons:{
        textAlign:"center",marginBottom:10,padding:10,color:"#FFF",fontSize:15,lineHeight:lineHeight,
    },

    nextEvent2:{
        width:280,height: 50,backgroundColor:"#fff",marginBottom:20,borderWidth:1,borderColor:"#f59a27"
    },
    buttons2:{
        textAlign:"center",marginBottom:10,padding:10,color:"#FFF",fontSize:15,lineHeight:lineHeight,color:"#f59a27"
    },
    welcomeContainer: {
        height:260,
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 10,
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
    myImg:{
        position:"absolute",
        zIndex:99,       
        width:300,
        height:250,
    }

});
