import * as React from 'react';

import { Image,ScrollView,Text, StyleSheet,View} from 'react-native';

import { GetMonthIngo,Getdates,pad } from '../common.js';
import { color } from 'react-native-reanimated';
import CalenderView from './Calender';
function InputCal(props){
    const [act ,setAct] = React.useState(props.act);
    const changeAct=(act)=>{
        props.obj.append(props.name,act);
        setAct(act);
    }
    const rowList = props.mArr.map((val) =>{
        let arr = val.split("@");
  
        return(
            <CalenderView year={arr[0]} month={arr[1]} setAct={changeAct} act={act}/>
        )
    });
    return (
        <View style={styles.scontainer}>
            <View style={styles.subject_box}>
            <Text style={styles.subject_text}>{props.title}</Text>
            </View>
           {rowList}
        </View>
    );
}
export default InputCal;
const styles = StyleSheet.create({
    scontainer: {
        flex:1
    },
    subject_text:{
        color:"#000",
        fontSize:16,
        letterSpacing:-1,
        textAlign:"left",
        width:"85%",
    },
    subject_box:{
        flex:1,
        borderBottomColor:"#f22613",
        borderBottomWidth:1,
        paddingBottom:10,
    }
}); 
// 최근생리일
// 평균생리기간
// 직종
// 



