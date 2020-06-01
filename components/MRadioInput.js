
import * as React from 'react';
import { Image, Platform, StyleSheet, Text,Picker, TouchableOpacity,View} from 'react-native';
import {url,alerts} from '../common.js';
import { Ionicons } from '@expo/vector-icons';
function MRadioInput(props){
    const [styleBnt ,setStyleBnt] = React.useState(styles.bntCom);
    const [styleText ,setStyleText] = React.useState(styles.textCom);
    
    const onPressF = ()=>{
        //props.obj.append(props.name,val);
       
        let ckArr = props.uesData.obj[props.name];
        const idx = ckArr.indexOf(props.val);
        if(idx == -1){
            ckArr.push(props.val);
            props.uesData.append(props.name,ckArr);
            setStyleBnt(styles.bntComCk);
            setStyleText(styles.textComCk);
        }else{
            ckArr.splice(idx, 1);
            props.uesData.append(props.name,ckArr);
            setStyleBnt(styles.bntCom);
            setStyleText(styles.textCom);
        }
      
        //console.log(idx);
        //setStyleVal(key);
    }
    React.useEffect(()=>{
        let ckArr = props.uesData.obj[props.name];
        if(Array.isArray(ckArr)){
            const idx = ckArr.indexOf(props.val);
            if(idx == -1){
                setStyleBnt(styles.bntCom);
                setStyleText(styles.textCom);
            }else{
                setStyleBnt(styles.bntComCk);
                setStyleText(styles.textComCk);
            }
        }
    },[]);
    return( 
        <View style={styles.iconBox}>
            {props.val != undefined&&
            <TouchableOpacity onPress={()=>onPressF()} style={styleBnt}>
                <Text style={styleText}>{props.val}</Text>
            </TouchableOpacity>
            }
        </View>
    );
}

export default MRadioInput;
const styles = StyleSheet.create({
    iconBox:{
        width:"auto",
        backgroundColor:"#fff",
        flexDirection: 'row',
        marginBottom:0,
        marginTop:8,
    },
    bntCom:{
        width:"auto",
        
        borderColor: '#ee7165',
        borderStyle: 'solid',
        borderWidth: 1,
        alignItems:"center",
        justifyContent:"center",
        marginRight:8,
        borderRadius:5,
    },
    bntComCk:{
        width:"auto",
        borderColor: '#ee7165',
        backgroundColor:"#ee7165",
        borderStyle: 'solid',
        borderWidth: 1,
        alignItems:"center",
        justifyContent:"center",
        marginRight:8,
        borderRadius:5,
    },
    textCom:{
        textAlign:"center",
        color:"#ee7165",
        fontSize:14,
        padding:10,
    },
    textComCk:{
        textAlign:"center",
        color:"#fff",
        fontSize:14,
        padding:10,
    },
});
// 최근생리일
// 평균생리기간
// 직종
// 