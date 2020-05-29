import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { TextInput,Button,Alert,AsyncStorage,Linking,BackHandler} from 'react-native';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, Modal,View,Switch } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {url,useObj,qOrder,toArr} from '../common.js';
import PickInput from '../components/PickInput';
import {update_side} from "../actions";
import Axios from "axios";
import { connect,useDispatch, useSelector } from 'react-redux';

export default function SideBar(props){
    const [load, setLoad] = React.useState(false); 
    const [mem,setMem] =  React.useState({}); 
    const [ch,setCh] =  React.useState({});
    const [name,setName] =  React.useState("q5");
    const uesData = useObj({});
    const [modalVisible, setModalVisible] = React.useState(false);
    const [date,setDate] =  React.useState(1);
    const [mArr,setMArr] =  React.useState(toArr(1,40));
    const dispatch = useDispatch();
    const [q18,setQ18] =  React.useState(<Text style={styles.iconLabel}>없음</Text>);
    const [q19,setQ19] =  React.useState(<Text style={styles.iconLabel}>없음</Text>);

    const useSwitch = (name)=>{
        const [val,setVal] =  React.useState(false);
        const onValueChange = () =>{
            const form = new FormData();
            setVal(!val);
            if(val){
                form.append(name,0);
            }else{
                form.append(name,1);
            }
            const urls = url+"app_member/member_update_one/"+props.mem_userid;
            console.log(urls);
            Axios.post(urls,form);
        }
        const trackColor = { true: "#f59a27", false: "#ddd" };
        return{value:val,onValueChange:onValueChange,trackColor:trackColor,thumbColor:"#fff",setVal:setVal}
    }
    const mem_push1 = useSwitch("mem_push1");
    const mem_push2 = useSwitch("mem_push2");
    const toggleSwitch = () => setIsEnabled(previousState => !previousState)
    const loadDada = ()=>{
        if(props.mem_userid != "" && props.mem_userid != undefined){
            const urls = url+"app_member/mem_info/"+props.mem_userid;
            Axios.get(urls).then(res=>{
                if(res.data.resultItem.result == "Y"){
                    setMem(res.data.item.mem_info);
                    setCh(res.data.item.ch_info);
                    uesData.append("q5",res.data.item.ch_info.q5);
                    uesData.append("q4",res.data.item.ch_info.q4);
                    //q19경구
                    //q18 진통제
                    if(res.data.item.ch_info.q18 != null){
                        const q = res.data.item.ch_info.q18;
                        var arr = q.split(",");
                        const lists = arr.map((val,key) =>{
                            return(
                                <Text style={styles.iconLabel} key={key}>
                                    {val}
                                </Text>
                            );
                        });
                        setQ18(lists);
                    }
                    if(res.data.item.ch_info.q19 != null){

                        const q = res.data.item.ch_info.q19;
                        var arr = q.split(",");
                        const lists = arr.map((val,key) =>{
                            return(
                                <Text style={styles.iconLabel} key={key}>
                                    {val}
                                </Text>
                            );
                        });
                        setQ19(lists);
                    }
                    mem_push1.setVal(res.data.item.mem_info.mem_push1);
                    mem_push2.setVal(res.data.item.mem_info.mem_push2);
                }
            });
        }
    }
    
    React.useEffect(()=>{
        loadDada();
    },[props.mem_userid,props.side]);

    const ckEvent = async () =>{
        const urls = url+"check/update_check/"+props.mem_userid;
        const form = uesData.getData(2);
        await Axios.post(urls,form).then(res=>{
            console.log(res.data);
        });
        await dispatch(update_side());

        setLoad(!load);
        setModalVisible(false);
    }
    const viewModal= (name,date,t1,t2) =>{
        setMArr(toArr(t1,t2));
        console.log(date);
        setModalVisible(true);
        setDate(date);
        setName(name);
    }
    return(
        <View style={styles.containers}>
            {props.mem_userid != "" && props.mem_userid != undefined &&
            <View>
                <View style={styles.colorBar} >
                    <Text style={styles.title} >마이페이지</Text>
                    <TouchableOpacity style={styles.cencel_box} onPress={()=>props.navigation.closeDrawer()}>
                        <Image 
                            source={require('../assets/images/select_x.png')} 
                            style={styles.cencel} 
                        />
                    </TouchableOpacity>
                </View>
                
                <TouchableOpacity style={styles.bText_box} onPress={()=> alert("준비중입니다")}>
                    <Text style={styles.mText}>내포인트 {mem.mem_point}P</Text>
                    <TouchableOpacity style={styles.iconEvent} onPress={()=> alert("준비중입니다")}>
                        <Text style={styles.buttons}>사용</Text>
                    </TouchableOpacity>    
                </TouchableOpacity>
                <View style={styles.sText_box} >
                    <Text style={styles.tText}>생리주기 설정</Text>
                </View>
                <TouchableOpacity style={styles.sText_box}>
                    <Text style={styles.mText}>생리 주기 변경</Text>
                    <TouchableOpacity style={styles.iconEvent} onPress={()=> viewModal("q5",ch.q5,20,40)}>
                        <Text style={styles.buttons}>{ch.q5}일</Text>
                    </TouchableOpacity>   
                </TouchableOpacity>
                <TouchableOpacity style={styles.bText_box} >
                    <Text style={styles.mText}>평균 기간 변경</Text>
                    <TouchableOpacity style={styles.iconEvent} onPress={()=> viewModal("q4",ch.q4,4,7)}>
                        <Text style={styles.buttons}>{ch.q4}일</Text>
                    </TouchableOpacity>   
                </TouchableOpacity>
                <TouchableOpacity style={styles.bText_box}>
                    <Text style={styles.tText}>푸시메세지 설정</Text>
                </TouchableOpacity>
                <View style={styles.sText_box}>
                    <Text style={styles.mText}>생리알림</Text>
                    <Switch
                        {...mem_push1}
                        style={styles.sswitch}
                        
                    />
                </View>
                <View style={styles.bText_box}>
                    <Text style={styles.mText}>약 알림</Text>
                    <Switch
                        {...mem_push2}
                        style={styles.sswitch}
                    />
                </View>
                <TouchableOpacity style={styles.sText_box}>
                    <Text style={styles.tText}>복용하는 피임약</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.lText_box}>
                    <Text style={styles.mText}>진통제</Text>
                    <View style={styles.blockBox} >
                        {q18}
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.lText_box}>
                    <Text style={styles.mText}>경구피임약</Text>
                    <View style={styles.blockBox}>
                    {q19}
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sText_box} onPress={()=>props.navigation.navigate("Logout")}>
                    <Text style={styles.mText}>로그아웃</Text>
                </TouchableOpacity>
            </View>  
            }
            {props.mem_userid == "" || props.mem_userid == undefined &&
                <Text>로그인을 해주세요</Text>
            }
            <Modal animationType="slide" transparent={false} visible={modalVisible}>
                <View style={styles.modalIos}>
                    <PickInput
                        style={styles.pickInput}
                        act = {date} 
                        mArr={mArr}
                        obj={uesData} 
                        title={"날짜를 선택해주세요"}
                        name={name}
                        labels={"일"}
                    />
                    <TouchableOpacity style={styles.clickEvent} onPress={ckEvent}>
                        <Text style={styles.clickbuttons}>확인</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}
let lineHeight = 50;
let marginLeft = 160;
let marginTop = 15;
let fontSize = 18;
let lineHeights = 40;
let top = 12;

if (Platform.OS === 'ios'){
    lineHeight = 60;
    marginLeft = 175;
    marginTop = 15;
    fontSize = 20;
    lineHeights = 47;
    top=8;
}

let mapStateToProps = (state) =>{
    return {
        mem_userid: state.auth_con.mem_userid,
        side: state.auth_con.side,
        mem_id: state.auth_con.mem_id
    };
}
  
SideBar = connect(mapStateToProps)(SideBar);

const styles = StyleSheet.create({
    blockBox:{flexDirection: 'row-reverse',flexWrap:"wrap", justifyContent: 'flex-end'},
    sswitch:{
        width:50,borderRadius:20,position:"absolute",top:top,right:15,           
    },
    modalIos:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
    },
    clickEvent:{
        borderRadius:20,width:300,backgroundColor:"#f59a27",position:"absolute",bottom:10,
    },
    clickbuttons:{
       textAlign:"center",color:"#FFF",fontSize:fontSize,lineHeight:lineHeights,
    },
    pickInput:{
        marginTop:-100,
        width:"85%",
        alignItems:"center",
    },
    colorBar:{
        width:"100%",
        height:45,
        backgroundColor:"#f59a27",
        marginTop:-5,
        flexDirection:"row"
    },
    subject_text:{
        marginTop:40,
        color:"#000",
        fontSize:18,
        letterSpacing:-1,
        textAlign:"center",
        width:300,
        marginBottom:10
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
    containers: {
        flex: 1,
        backgroundColor: '#fff',
    },
    textInputs:{
        width:280,height: 40, borderColor: '#ddd', borderWidth: 1 ,marginBottom:15,padding:5
    },
    iconEvent:{
        width:50,borderRadius:20,backgroundColor:"#f59a27",position:"absolute",top:15,right:15,
    },
    buttons:{
       textAlign:"center",color:"#FFF",fontSize:13,padding:4,
    },
    title:{
        color:"#FFF",fontSize:16,lineHeight:lineHeight,marginLeft:15,
    },
    mText:{
        color:"#999",fontSize:15,marginBottom:5,
    },
    tText:{
        color:"#000",fontSize:16,
    },
    sText_box:{
        padding:15,borderBottomColor:'#eee',borderBottomWidth:1,flexDirection:"row"
    },
    lText_box:{
        padding:15,borderBottomColor:'#eee',borderBottomWidth:1
    },
    bText_box:{
        padding:15,borderBottomColor:'#eee',borderBottomWidth:5,flexDirection:"row"
    },
    cencel_box:{
        position:"absolute",right:20,top:15,width:15,height:15,
    },
    cencel:{
        width:15,height:15,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 140,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 140,
        height: 55,
        marginBottom: 30,
    },
    iconLabel:{   
        alignSelf: 'flex-start',
        marginTop:7,
        color:"#fff",
        textAlign:"center",
        marginLeft:0,   
        fontSize:14,
        backgroundColor:"#ee7165",
        borderRadius:13,
        padding:7,
        paddingLeft:10,
        paddingRight:10,
        overflow:"hidden",
        marginRight:5,
    },

});
