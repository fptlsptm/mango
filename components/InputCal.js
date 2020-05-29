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
            <Text style={styles.subject_text}>{props.title}</Text>
           {rowList}
        </View>
    );
}
export default InputCal;
const styles = StyleSheet.create({
    scontainer: {
        width:"100%",
    },
    subject_text:{
        color:"#000",
        fontSize:16,
        letterSpacing:-1,
        textAlign:"center",
    },
});
// 최근생리일
// 평균생리기간
// 직종
// 



