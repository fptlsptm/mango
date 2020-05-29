import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { TextInput,Button,Alert,AsyncStorage,Slider} from 'react-native';
import { Image, Platform, StyleSheet, Text,Picker, TouchableOpacity,View,Linking} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect,useDispatch, useSelector } from 'react-redux';
import Axios from "axios";
import {url,useObj,NowYear,NowMonth,GetMonthIngo,Getdates,pad} from '../common.js';
import { BottomTabBar } from '@react-navigation/bottom-tabs';
function CalenderScreen(props){
    const [year,setYear] = React.useState(NowYear());
    const [month,setMonth] = React.useState(NowMonth());
    const [cal, setCal] = React.useState(<View/>);
    React.useEffect(() => {
        const urls = url+"check/cal_data/"+props.mem_userid;
        Axios.get(urls).then(res=>{
            if(res.data.ch_com == "Y"){
                const sangArr = res.data.sangArr;
                const gaArr = res.data.gaArr;
                const q3arr = res.data.q3arr;
                const ba = res.data.ba;
                const list = q3arr.map((val,key) =>{
                    return(
                        <CalenderView 
                            key={key} 
                            year={val[0]} 
                            month={val[1]} 
                            sangArr={sangArr}
                            gaArr={gaArr}
                            ba={ba}
                        />
                    )
                });
                setCal(list);
            }else{
                alert("아직 설문조사를 하지 않았습니다"); 
                props.navigation.replace("Main");
            }
        });
    },[]);
    return(
        <View style={styles.container}>
             <ScrollView style={styles.scrolls}>
                {cal}
             </ScrollView>
             <View style={styles.info_box}>
                <View style={styles.IcoxBox}>
                    <Image source={require('../assets/images/sang.png')} style={styles.iconImage}/>
                    <Text style={styles.iconText}>생리주기</Text>
                    <Image source={require('../assets/images/ba.png')} style={styles.iconImage}/>
                    <Text style={styles.iconText}>배란일</Text>
                    <Image source={require('../assets/images/ga.png')} style={styles.iconImage}/>
                    <Text style={styles.iconText}>가임기</Text>
                </View>
             </View>
        </View>
    );
}
export function CalenderView(props){
    let info = GetMonthIngo(props.year,props.month);
    let dArr = Getdates(info);
    const list = ['일','월','화','수','목','금','토'];
    const dayList = list.map((val) =>{
        return(
            <Text style={styles.calText_day}>
                {val}
            </Text>
        )
    });
    const rowList = dArr.map((val,key) =>{
        return(
            <CalenderRow 
                setAct={props.setAct} 
                act={props.act} 
                month={props.month}
                year={props.year}
                list={dArr[key]}
                sangArr={props.sangArr}
                gaArr={props.gaArr}
                ba={props.ba}
            />
        )
    });
    return (
        <View style={styles.containerCal}>
            <View style={styles.calIcon}>
                <Text style={styles.title}>
                    {props.year}년 {props.month}월 
                </Text>
            </View>
            <View style={styles.calenderRow_day}>{dayList}</View>
            {rowList}
        </View>
    );
}
export function CalenderRow(props){
    if(Array.isArray(props.list)){
        const nameList = props.list.map((val,key) =>{
            let date  = props.year+"-"+pad(props.month,2)+"-"+pad(val,2);
            //console.log(date);
            let style = styles.calText;
            let line = <View/>;
     
            if(props.sangArr.indexOf(date) != "-1"){
                line = <View style={styles.sangck}/>;
            }
            if(props.gaArr.indexOf(date) != "-1"){
                line = <View style={styles.gack}/>;
            }
            if(date == props.ba){
                line = <View style={styles.backs}/>;
            }
            if(key == 0){style = styles.calText_0;}
            if(key == 6){style = styles.calText_6;}
            if(val == 0){style = styles.calText0;}
            return(
                <View style={styles.cal_contain}>
                    <Text style={style}>{val}</Text>
                    {line}
                </View>
            );
        });
        return (
            <View style={styles.calenderRow}>
                {nameList}
            </View>
        );
    }else{
        return (
            <View style={styles.calenderRow}></View>
        );
    }
}

let mapStateToProps = (state) =>{
    return {
        mem_userid: state.auth_con.mem_userid,
        mem_id: state.auth_con.mem_id
    };
}
CalenderScreen = connect(mapStateToProps)(CalenderScreen);
export default CalenderScreen;
let fontSize = 18;
let lineHeight = 40;


if (Platform.OS === 'ios'){
    fontSize = 20;
    lineHeight = 47;
} 
const styles = StyleSheet.create({
    info_box:{
        width:"100%",
        height:60,
        borderTopColor:"#eee",
        borderTopWidth:1,
        alignItems:"center",
        padding:20,
        
    },
    IcoxBox:{
        width:300,
        height:20,
        borderTopColor:"#eee",
        flexDirection: 'row',
        alignItems:"center",
    },
    sangck:{
        width:"100%",
        height:4,
        backgroundColor: '#f59a27',
        position:"absolute",
        bottom:0,
    },
    gack:{
        width:6,
        height:6,
        backgroundColor: '#ee7165',
        position:"absolute",
        bottom:0,
        borderRadius:3,
        left:"45%",
    },
    backs:{
        width:10,
        height:10,
        backgroundColor: '#f22613',
        position:"absolute",
        bottom:0,
        borderRadius:5,
        left:"40%",
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems:"center"
    },
    line:{
        borderBottomWidth:1,
        borderBottomColor:"#eee",
        width:"100%",
        height:10,
        backgroundColor:"#000",  
    },
    containerCal: {
        paddingTop:20,
        flex: 1,
        backgroundColor: '#fff',
        alignItems:"center",
    },
    sconntainer: {
        width:"100%"
    },
    iconImage:{
        width:20,height:20,marginRight:5,
    },
    iconText:{
        lineHeight:20,marginRight:10,
    },
    nextEvent:{
        borderRadius:20,width:280,height: 40,backgroundColor:"#f59a27",marginBottom:20
    },
    buttons:{
       textAlign:"center",color:"#FFF",fontSize:fontSize,lineHeight:lineHeight,
    },
    slider:{width:280},
    subject_text:{
        color:"#000",
        fontSize:16,
        letterSpacing:-1,
    },
    title:{
        fontSize:15,
        padding:3,
        textAlign:"center",
        color:"#fff",
    },
    calIcon:{
        
        backgroundColor:"#f59a27",
        marginBottom:10,
        borderRadius:15,
        paddingRight:10,
        paddingLeft:10,
    },
    calenderRow:{
        flexDirection: 'row',
        width:"85%",
        height:40,
        marginTop:5,
    },
    calenderRow_day:{
        flexDirection: 'row',
        width:"85%",
        borderBottomColor:"#f22613",
        borderBottomWidth:1,
        marginBottom:5,
    },
    calText_day:{
        flex:1,
        fontSize:16,
        padding:5,
        textAlign:"center",
        color:"#f22613",
        lineHeight:25,
        
    },
    cal_contain:{
        flex:1,
    },
    calText:{
        flex:1,
        fontSize:16,
        padding:5,
        textAlign:"center"
    },
    calText0:{
        flex:1,
        fontSize:16,
        padding:5,
        textAlign:"center",
        color:"#fff"
    },
    calText_0:{
        flex:1,
        fontSize:16,
        padding:5,
        textAlign:"center",
        color:"#f22613"
    },
    calText_6:{
        flex:1,
        fontSize:16,
        padding:5,
        textAlign:"center",
        color:"#668eeb"
    },
    scrolls: {
        width:"100%",
        height:300,
        backgroundColor: '#fff',
        marginBottom:5,
    },
 
});
// 최근생리일
// 평균생리기간
// 직종
// 