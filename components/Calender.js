import * as React from 'react';
import { TextInput,Button,Alert,AsyncStorage,Slider} from 'react-native';
import { Image, Platform, StyleSheet, Text, TouchableOpacity,View} from 'react-native';

import { GetMonthIngo,Getdates,pad } from '../common.js';
import { color } from 'react-native-reanimated';

function CalenderView(props){
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
            />
        )
    });
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {props.year}년 
                {props.month}월
            </Text>
            <View style={styles.calenderRow_day}>{dayList}</View>
            {rowList}
            
        </View>
    );
}
export function CalenderRow(props){
    const onpressText=(y,m,d)=>{
        if(d != 0){
            props.setAct(y+"-"+pad(m,2)+"-"+pad(d,2));
        }
    }
    if(Array.isArray(props.list)){
        const nameList = props.list.map((val,key) =>{
            let style = styles.calText;
            if(key == 0){style = styles.calText_0;}
            if(key == 6){style = styles.calText_6;}
            if(props.year+"-"+pad(props.month,2)+"-"+pad(val,2) == props.act){
                style = styles.calText_act;
            }
            if(val == 0){style = styles.calText0;}
            return(
                <Text 
                    style={style} 
                    onPress={()=>onpressText(props.year,props.month,val)}
                >
                    {val}
                </Text>
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
export default CalenderView;


const styles = StyleSheet.create({
    title:{
        fontSize:16,
        padding:5,
        textAlign:"center",
        color:"#f22613",
        marginBottom:10,
    },
    calenderRow:{
        flexDirection: 'row',
        width:"85%",
    },
    calenderRow_day:{
        flexDirection: 'row',
        width:"85%",
        marginBottom:5,
    },
    calText_day:{
        flex:1,
        fontSize:16,
        padding:5,
        textAlign:"center",
        color:"#f22613",
        borderBottomColor:"#f22613",
        borderBottomWidth:1
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
    calText_act:{
        flex:1,
        fontSize:16,
        padding:5,
        textAlign:"center",
        color:"#fff",
        backgroundColor:"#f22613",
        borderRadius:30,
    },
    container: {
        width:"100%",
        marginTop:15,
        marginBottom:15,
        backgroundColor: '#fff',
        alignItems:"center"
    },
    
});
// 최근생리일
// 평균생리기간
// 직종
// 