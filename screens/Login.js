import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { TextInput,Button,Alert,AsyncStorage,Linking,BackHandler} from 'react-native';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {url} from '../common.js';
import {login} from "../actions";
import Axios from "axios";
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { connect,useDispatch, useSelector } from 'react-redux';

export default function Login(props){
    
    const [mem_userid, setmem_userid] = React.useState('');
    const [mem_password, setmem_password] = React.useState('');
    const [or_idx, setOr_idx] = React.useState('');
    const dispatch = useDispatch();
    const form = new FormData();
    
    React.useEffect(()=>{
        const backAction = () => {
          Alert.alert("망고", "앱을종료합니까?", [
            {
              text: "아니요",
              onPress: () => null,
              style: "cancel"
            },
            { text: "종료", onPress: () => BackHandler.exitApp() }
          ]);
          return true;
        };
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
        return () => backHandler.remove();
    },[]);
    React.useEffect(()=>{
      async function loadResourcesAndDataAsync(){
        const mem_id = await AsyncStorage.getItem('mem_id');
        const mem_userid = await AsyncStorage.getItem('mem_userid');
        if(mem_id && mem_userid){
            props.navigation.replace("Main");
            dispatch(login(mem_userid,mem_id));
        }
      }
      loadResourcesAndDataAsync();
    },[]);

    async function getToken(mem_userid) {    
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
    

    const submits = async ()=>{
        form.append("mem_userid",mem_userid);   
        form.append("mem_password",mem_password);  
        const urls = url+"app_member/mem_login";
        Axios.post(urls,form).then(res=>{
            let t = "";
            if(res.data.resultItem.result == "Y"){
                AsyncStorage.setItem('mem_userid', mem_userid);
                AsyncStorage.setItem('mem_id', res.data.item.mem_id);
                dispatch(login(mem_userid,res.data.item.mem_id));
                getToken(mem_userid);
                
            }
            Alert.alert(res.data.resultItem.msg);
        });
    }
    
    return(
        <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.welcomeContainer}>
                <Image source={require('../assets/images/logo.png')} style={styles.welcomeImage} />
                <TextInput style={styles.textInputs} onChangeText={text => setmem_userid(text)} value={mem_userid} placeholder="이메일을 입력하세요"/>
                <TextInput secureTextEntry={true} style={styles.textInputs} onChangeText={text => setmem_password(text)} value={mem_password} placeholder="비밀번호를 입력하세요"/>
                <TouchableOpacity style={styles.buttons} onPress={()=>submits()}>
                  <Text style={styles.login}>로그인</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttons_son} onPress={() =>props.navigation.navigate("Join")}>
                  <Text style={styles.join}>회원가입</Text>
                </TouchableOpacity>
                <View style={{flex: 1, flexDirection: 'row',justifyContent:"flex-end"}}>
                  {/* <TouchableOpacity onPress={() =>props.navigation.navigate("Join")}>
                    <Text>아이디 찾기</Text>
                  </TouchableOpacity>
                  <Text style={styles.textm}>|</Text>
                  <TouchableOpacity onPress={() =>props.navigation.navigate("Join")}>
                    <Text>비밀번호 찾기</Text>
                  </TouchableOpacity>
                  <Text style={styles.textm}>|</Text>
                  <TouchableOpacity onPress={() =>props.navigation.navigate("Join")}>
                    <Text>회원가입</Text>
                  </TouchableOpacity> */}
                </View>
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

Login = connect(mapStateToProps)(Login);
const styles = StyleSheet.create({
  textm:{
    marginLeft:10,
    marginRight:10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textInputs:{
    width:280,height: 40, borderColor: '#ddd', borderWidth: 1 ,marginBottom:15,padding:5
  },
  buttons:{
    width:280,marginBottom:10,backgroundColor:"#f59a27",color:"#FFF",borderRadius:20
  },
  login:{
    color:"#FFF",fontSize:15,textAlign:"center",padding:10,
  },
  buttons_son:{
    width:280,textAlign:"center",marginTop:0,backgroundColor:"#FFF",borderRadius:20,borderColor:"#f59a27",borderWidth:1,
  },
  join:{
    color:"#f59a27",fontSize:15,textAlign:"center",padding:10,
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
  welcomeContainer: {
    alignItems: 'center',
    marginTop: "50%",
    marginBottom: 20,
  },
  welcomeImage: {
    width: 140,
    height: 55,
    marginBottom: 30,
  },

});
