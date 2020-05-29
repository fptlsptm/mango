import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { TextInput,Button,Alert,AsyncStorage,Slider} from 'react-native';
import { Image, Platform, StyleSheet, Text,Picker, TouchableOpacity,View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect,useDispatch, useSelector } from 'react-redux';
import Axios from "axios";
import {qOrder,qList} from '../common.js';
import { HeaderTitle } from '@react-navigation/stack';
import InputCal from '../components/InputCal';
import PickInput from '../components/PickInput';
import RadioInput from '../components/RadioInput';
import MPickInput from '../components/MPickInput';

import SliderInput from '../components/SliderInput';


function CheckInfo(props){
    const qArr = new Array();
    const [forms,setForms] = React.useState(<View></View>);
    React.useEffect(()=>{
        for (let i = 0; i < qOrder[props.idx].length; i++) {
            qArr[i] = qList[qOrder[props.idx][i]];   
        }
        if(qArr.length > 0){
            const rComponent = qArr.map((val,key) =>{
                const name = qOrder[props.idx][key];
                props.uesData.append(name,'');
                switch (val.type) {
                    case "cal":
                        return(
                            <InputCal
                                act = {undefined}
                                mArr={val.option} 
                                year={2020} 
                                obj={props.uesData} 
                                name={name}
                                title={val.title}
                            />
                        )    
                    break;
                    case "selectbox":
                        return(
                            <PickInput 
                                act = {undefined}
                                mArr={val.option}
                                obj={props.uesData} 
                                title={val.title}
                                name={name}
                                labels={val.label}
                            />
                        )    
                    break;
                    case "mselectbox":
                        return(
                            <MPickInput 
                                act = {undefined}
                                mArr={val.option}
                                obj={props.uesData} 
                                title={val.title}
                                name={name}
                                labels={val.label}
                            />
                        )    
                    break;
                    case "radio":
                        return(
                            <RadioInput 
                                act = {undefined}
                                mArr={val.option}
                                obj={props.uesData} 
                                title={val.title}
                                name={name}
                                labels={val.label}
                            />
                        )    
                    break;
                    case "slider":
                        return(
                            <SliderInput 
                                act = {undefined}
                                mArr={val.option}
                                obj={props.uesData} 
                                title={val.title}
                                name={name}
                                labels={val.label}
                            />
                        )    
                    break;
                }
            });
            setForms(rComponent);
        }
    },[]);
    return(
        <View style={styles.container}>
            {forms}
        </View>
    );
}

export default CheckInfo;
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#fff',
        alignItems:"center",
        marginBottom:15,
    },
 
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