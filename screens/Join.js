import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { TextInput,Button,Alert,AsyncStorage } from 'react-native';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Axios from "axios";
import {url} from '../common.js';
import { Notifications } from 'expo';
import {login} from "../actions";
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { connect,useDispatch, useSelector } from 'react-redux';


export function useInput(text){
    const [value, setValue] = React.useState(text);
    const onChangeText = (t) =>{
        setValue(t);
    }
    
    return{value:value,onChangeText:onChangeText}
}
export default function Join(props){
    const mem_userid = useInput("");
    const mem_password = useInput("");
    const mem_password_ck = useInput("");
    const mem_birthday = useInput("");
    const dispatch = useDispatch();
    const form = new FormData();
    const submit = async ()=>{
        form.append("mem_userid",mem_userid.value);   
        form.append("mem_password",mem_password.value);  
        form.append("password",mem_password.value);   
        form.append("password_ck",mem_password_ck.value);   
        form.append("mem_birthday",mem_birthday.value);
        const urls = url+"app_member/member_join";
        Axios.post(urls,form).then(res=>{
            if(res.data.resultItem.result == "Y"){
              dispatch(login(mem_userid.value,res.data.item.mem_id));
              getToken(mem_userid.value,res.data.item.mem_id);
            }
            Alert.alert(res.data.resultItem.msg);
        });
    }
    async function getToken(mem_userid,mem_id) {  
      console.log(mem_userid);
      console.log(mem_id);
      AsyncStorage.setItem('mem_userid',mem_userid);
      AsyncStorage.setItem('mem_id',mem_id+"");
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted'){
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {return;}
      let {token} = "";

      if (Constants.isDevice){
        const tForm = new FormData();
        token = await Notifications.getExpoPushTokenAsync();
        const urls = url+"app_member/token_update/"+mem_userid;
        tForm.append("mem_token",token);  
        tForm.append("mem_platform",Platform.OS);   
        await Axios.post(urls,tForm);
        props.navigation.replace("Main");
      }else{
        alert("디바이스가 아닙니다");
      }
    }
    return (
        <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.welcomeContainer}>
                <TextInput style={styles.textInputs} {...mem_userid} placeholder="이메일주소"/>
                <TextInput secureTextEntry={true} style={styles.textInputs} {...mem_password} placeholder="비밀번호"/>
                <TextInput secureTextEntry={true} style={styles.textInputs} {...mem_password_ck} placeholder="비밀번호확인"/>
                <TextInput  keyboardType="number-pad" style={styles.textInputs} {...mem_birthday} placeholder="생년월일 ex)961216"/>
                <Text style={styles.info}>
                  *생망고에서 제공하는 서비스의 이용약관,{"\n"} 개인정보 처리방침에 동의합니다
                  <Text style={styles.goinfo} onPress={()=>props.navigation.navigate("Terms")}> 약관보기</Text>
                </Text>
              
                <TouchableOpacity style={styles.buttons} onPress={submit}><Text style={styles.join}>동의 및 가입</Text></TouchableOpacity>
                <TouchableOpacity style={styles.buttons1} onPress={()=>props.navigation.replace("Login")}><Text style={styles.join}>뒤로가기</Text></TouchableOpacity>
            </View>
        </ScrollView>
        </View>
    );
}
Join.navigationOptions = {
  header: null,
};
const styles = StyleSheet.create({
  info: {
    marginBottom:15,
    letterSpacing:-1,
    fontSize: 13,
  },
  goinfo:{
    fontWeight:"bold",
    color:"#0366d6"
  },
  container: {
    
    flex: 1,
    backgroundColor: '#fff',
  },
  textInputs:{
    width:"85%",height: 45, borderColor: '#ddd', borderWidth: 1 ,marginBottom:15,padding:7,paddingLeft:10,
  },
  buttons:{
    width:"85%",marginBottom:10,backgroundColor:"#f59a27",color:"#FFF",borderRadius:20
  },
  buttons1:{
    width:"85%",marginBottom:10,backgroundColor:"#ddd",color:"#FFF",borderRadius:20
  },
  join:{
    color:"#FFF",fontSize:15,textAlign:"center",padding:10,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 20,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
