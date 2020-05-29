import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image,Alert, Platform, StyleSheet, Text, TouchableOpacity,ImageBackground,View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect,useDispatch, useSelector } from 'react-redux';
import { NowDate,GetNowDate,GetDays,url,NowYear } from '../common.js';

import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

import Axios from "axios";
import { Ionicons } from '@expo/vector-icons';
export default function Main(props){
  const [today,setToday ] = React.useState(GetNowDate());
  const [days,setDays ] = React.useState(GetDays());
  const [ckNav,setCkNav ] = React.useState("Start");
  const [ckNavText,setCkNavText ] = React.useState("설문 참여하기");
  const [dday ,setdday] = React.useState("-DAY");
  const [msg ,setMsg] = React.useState("");
  if(!props.mem_id || !props.mem_userid){
    props.navigation.replace("Login");
  }

  

  React.useEffect(()=>{
    const urls = url+"check/cal_data/"+props.mem_userid;
    Axios.get(urls).then(res=>{

        if(res.data.ch_com == "Y"){
          if(res.data.dday == "+0"){
            setdday("-DAY");
            setMsg("생리 예정일 입니다");
          }else{
            setdday(" "+res.data.dday);
            setMsg(res.data.msg);
          }

          setCkNav("CheckTap");
          setCkNavText("증상 체크하기");
        }else{
          setMsg("설문조사를 해주세요");
        }
    });
  },[props.side]);
  const startSang = () => {
    Alert.alert("생리를 시작하셨습니까?", "달력에 표시되는 생리일자가 적용됩니다.", [
      {
        text: "아니요",
        onPress: () => null,
        style: "cancel"
      },
      { text: "네", onPress: () => startSangAxois() }
    ]);
    return true;
  };  
  const startSangAxois = ()=>{
    const urls = url+"check/update_q3/"+props.mem_userid;
    const form = new FormData();
    if(ckNavText == "설문 참여하기"){
      alert("설문참여 후 사용해 주세요");
    }else{
      form.append("q3",NowDate());
      Axios.post(urls,form).then(res=>{
        setdday(" "+res.data.dday);
        setMsg(res.data.msg);
      });
      alert("성공적으로 적용되었습니다.");
    }
    
    
  }

  return(
    <View style={styles.container}>
      <ImageBackground source={require('../assets/images/main_back.jpg')} style={styles.image}>
        <View style={styles.head_box}>
          <TouchableOpacity onPress={()=>props.navigation.openDrawer()}>
            <Ionicons style={styles.icons} name="md-menu" color={"#fff"}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconsBox} onPress={()=>props.navigation.navigate("Push")}>
            <Image
              source={require('../assets/images/push.png')} 
              style={styles.pushImage} 
            />
          </TouchableOpacity>
        </View>
        <View style={styles.margin_box}/>
        <View style={styles.title_box}>
          <View style={styles.title_box_postion}>
            <Text style={styles.title_text}>{today} {days}</Text>
            <View style={styles.main_box}>  
              <Text style={styles.main_text}>생리 D{dday}</Text>
              <Text style={styles.main_sub_text}>{msg}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.iconContain}>
        <View style={styles.bnt_box}>
          <View style={{flexDirection:'row'}} >
            <Image source={require('../assets/images/medi_on.png')} style={styles.welcomeImage} />
            <TouchableOpacity style={styles.buttons_box} onPress={()=>startSang()}>
              <Text style={styles.buttons}>생리시작</Text>
            </TouchableOpacity>
          </View>  
        </View>
        <View style={styles.iconBox}>
          <TouchableOpacity onPress={()=>props.navigation.navigate(ckNav)} style={styles.ckBnt} >
            <Image source={require('../assets/images/my_check.png')} style={styles.ckImage} />
            <Text>{ckNavText}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>props.navigation.navigate("StateBody")} style={styles.ckBnt2}>
            <Image source={require('../assets/images/my_check2.png')} style={styles.ckImage2} />
            <Text>내 상태보기</Text>
          </TouchableOpacity>
        </View>  
      </View>
      <View style={styles.bottomContain}>
         <View style={styles.bottomBox}>
          <TouchableOpacity style={styles.boBnt} onPress={()=>props.navigation.navigate("CalenderScreen")}>
            <Image source={require('../assets/images/cal_on.png')} style={styles.boImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.boBnt2} onPress={()=>props.navigation.navigate("Ckeck4",{idx:4})}>
            <Image source={require('../assets/images/comu_off.png')} style={styles.boImage2} />
          </TouchableOpacity>
        </View>  

      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  head_box:{
    padding:7,
    paddingLeft:15,
    width:"100%",
    height:50,
    position:"absolute",
    top:0,
    left:0,
  },
  bnt_box:{
    width:300,
    position:"absolute",
    
    zIndex:999,
  },
  iconsBox:{
    right:0,
    position:"absolute",
    top:5,
    zIndex:999,
    width:50,
    height:50,
  },
  icons:{
    fontSize:37,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',  
  },
  main_text:{
    color:"#f59a27",
    fontSize:32,
    fontWeight:"700",
    letterSpacing:-2,
    marginTop:85,
  },
  main_sub_text:{
    color:"#f59a27",
    fontSize:16,
    letterSpacing:-1,
  },
  title_text:{
    marginRight:5,
    color:"#fff",
    fontSize:16,
    textAlign:"center",
    marginBottom:10,
  },
  margin_box:{
    flex:2,
  },
  title_box:{
    flex:10,
    justifyContent:"center",
    alignItems:"center",
    marginBottom:5,
    zIndex:999
  },
  title_box_postion:{
    width:"100%",
    height:"90%",
    position:"absolute",
    alignItems:"center",
    bottom:-70,
    zIndex:999,
    position:"relative",
  },
  main_box:{
    alignItems:"center",
    borderRadius:30,
    width:300,
    height:"100%",
    backgroundColor: '#fff',
    borderColor: '#f59a27',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  image: {
    flex: 6,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems:"center",
    zIndex:999,
    position:"relative",
  },
  iconContain:{
    position:"relative",
    zIndex:999,
    flex:3,
    alignItems:"center",
  },
  iconBox:{
    position:"absolute",
    bottom:5,
    width:"100%",
    height:"50%",
    flexDirection: 'row',
    
  },
  bottomBox:{
    marginTop:10,
    width:270,
    height:100,
    flexDirection: 'row',
  },
  bottomContain:{
    alignItems:"center",
    backgroundColor: '#eee',
    flex:1,
  },
  welcomeImage: {
    width: 44,
    height: 44,
    marginRight:"4%",
    marginLeft:"5%",
    marginTop:3,
  },
  pushImage:{
    width: 30,
    height: 30,
    position:"absolute",
    right:10,
    top:10,
    zIndex:99,
  },
  ckImage:{
    width: 25,
    height: 30,
    marginBottom:3
  },
  ckImage2:{
    width: 24,
    height: 33,
    marginBottom:3
  },
  boImage:{
    width: 30,
    height: 48,
  },
  boImage2:{
    width: 45,
    height: 48,
  },
  ckBnt:{
    alignItems:"center",
    marginTop:20,
    marginLeft:"10%",
    width:"40%"
  },
  ckBnt2:{
    alignItems:"center",
    marginTop:20,
   
    width:"40%"
  },
  boBnt:{
    alignItems:"center",
    marginLeft:40,
    marginRight:120,
  },
  boBnt2:{
    alignItems:"center",
  },
  buttons_box:{
    justifyContent:'center',width:"55%",backgroundColor:"#ee7165",borderRadius:100,zIndex:999,position:"relative",
  },
  buttons:{
    textAlign:"center",fontSize:16,color:"#FFF",padding:12,textAlignVertical: 'center'
  },

});

let mapStateToProps = (state) =>{
  return {
      mem_userid: state.auth_con.mem_userid,
      mem_id: state.auth_con.mem_id,
      side: state.auth_con.side,
  };
}

Main = connect(mapStateToProps)(Main);
