
import * as React from 'react';
import { Image, Platform, StyleSheet, Text,Picker, TouchableOpacity,View,TextInput,Modal,ScrollView} from 'react-native';
import {url,alerts} from '../common.js';
import { AntDesign } from '@expo/vector-icons';
function MPickInput(props){
    const [act ,setAct] = React.useState(props.act);
    const [iosText ,setIosText] = React.useState(props.act);
    const [ckt ,setCkt] = React.useState(false);
    const [styleName ,setStyleName] = React.useState(styles.picKBox);
    const [text ,setText] = React.useState("");
    const [iconArr ,setIconArr] = React.useState([]);
    const [dis,setdix] = React.useState(0);
    const [modalVisible, setModalVisible] = React.useState(false);
    const onValueChange = (e)=>{
        if(!iconArr.includes(e) && e != undefined ){
            let arr = iconArr;
            arr.push(e);
            setIconArr(arr);
        }
        if(e == "기타(기입)"){
            setCkt(true);
        }
        if(e != undefined){
            setStyleName(styles.picKBoxCk);
        }else{
            setStyleName(styles.picKBox);
        }
        setAct(e);
        if(e == "없음"){
            setIconArr(["없음"]);
            setIosText("없음");
            props.obj.append(props.name,"없음");
            setModalVisible(false);
        }
    }   

    const showModal = () =>{

        if(iosText == "없음"){
            setAct(undefined);
            setIconArr([]);
            setIosText("");
            props.obj.append(props.name,"");
        }
        setModalVisible(true);
    }

    const onTextChangeE = (t) =>{
        setText(t);
    }
    const nextEvent = (e) =>{
        if(e == undefined || e == "선택해 주세요"){
            alerts("항목을 선택해주세요");
        }else{
            let idx = iconArr.indexOf("기타(기입)");
            if (idx !== -1) {
                iconArr.push("@"+text);
                setText('');
            }
            let rsText = iconArr.join(',');
            setIosText(rsText);
            props.obj.append(props.name,rsText);
            setModalVisible(false);
        }
    }

    const pickList = props.mArr.map((val,key) =>{
        let labels = "";
        if(props.labels != undefined){
            labels = props.labels
        }else{
            labels = "";
        }   
        
             
        return(
            <TouchableOpacity key={key} style={styles.pickItem}  onPress={()=>onValueChange(val)}>
                <Text style={styles.pickItemText}>{val}</Text>    
            </TouchableOpacity>
        )
        
    });

    const iconBox = iconArr.map((val,key) =>{
        return(
            <Text key={key} style={styles.iconLabel} onPress={()=>removeArr(val)}>
                {val} 
                <Text style={styles.cencels}> x </Text>
            </Text>
        )
    }); 
    const removeArr = (val) =>{
        if(val == "기타(기입)"){
            setCkt(false);
        }
        let arr = iconArr;
        let idx = arr.indexOf(val);
        if (idx !== -1) {
            arr.splice(idx,1);
            setIconArr(arr);
        }
        setdix(dis+val);
        
    }
    React.useEffect(()=>{
        if(iosText == undefined){
            setIosText("선택해 주세요")
        }else{
            if(props.labels == undefined){
                setIosText(iosText);    
            }else{
                setIosText(iosText+props.labels);
            }
        }
    },[]);    
    return(
        <View style={styles.container}>
            {props.title != "" &&
            <Text style={styles.subject_text}>
                {props.title+"  "}
                {styleName == styles.picKBoxCk && 
                    <Image source={require('../assets/images/check_on.png')} style={styles.ckImage}/>
                }
            </Text>
            }
            <TouchableOpacity style={styleName} onPress={()=>showModal()}>
                <Text style={styles.iosText}>{iosText}</Text>    
            </TouchableOpacity>

            <Modal animationType="slide" transparent={false} visible={modalVisible} style={styles.modalIos}>
                <View style={styles.containerModal}>
                    <AntDesign style={styles.arrowup} name = "arrowup"size = {24} color = "black"/>
                    <AntDesign style={styles.arrowdown} name = "arrowdown"size = {24} color = "black"/>
                    <Text style={styles.sub_text}>
                       해당하는 항목을 선택해주세요
                    </Text>
                    <ScrollView style={styles.pickList} contentContainerStyle={styles.contentPickList}>
                        
                        {pickList}
                    </ScrollView>

                    <ScrollView style={styles.iconBox}>
                        {ckt == true &&
                            <TextInput style={styles.textBox} value={text} onChangeText={onTextChangeE}/> 
                        } 
                        <View style={styles.blockBox}>
                            {iconBox}
                        </View> 
                    </ScrollView>  
                    
                    <TouchableOpacity style={styles.nextEvent} onPress={()=>nextEvent(act)}>
                        <Text style={styles.buttons}>선택완료</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}
let margin = 15;
let marginT = 15;
let bText = 20;


if (Platform.OS === 'ios'){
  margin = 40;
  marginT = 18;
  bText = 22;

}
export default MPickInput;
const styles = StyleSheet.create({
    arrowup:{
        position:"absolute",
        right:5,
        top:60,
        fontSize:14,
        color:"#f59a27"
    },
    arrowdown:{
        position:"absolute",
        right:5,
        fontSize:14,
        top:85,
        color:"#f59a27"
    },
    modalIos:{flex:1},
    blockBox:{flexDirection: 'row-reverse',flexWrap:"wrap", justifyContent: 'flex-end',flex:1},
    sub_text:{
        marginTop:15,
        marginBottom:10,
        color:"#000",
        fontSize:20,
        letterSpacing:-1,
        textAlign:"center",
        width:300,
    },
    contentPickList:{
        justifyContent: 'flex-end', flexDirection: 'column',flexGrow:1
    },
    pickList:{
        position:"relative",
        borderTopColor:"#eee",
        borderTopWidth:1,
        borderBottomColor:"#eee",
        borderBottomWidth:1,
        width:"100%",
        height:200,
        paddingLeft:25,
    },  
    pickItem:{
        padding:8,
        paddingLeft:0,
    },
    pickItemText:{
        fontSize:15,
    },
    iosText:{
        margin:15,
        marginTop:marginT,
        fontSize:17,
        color:"#000",
    },
    cencels:{
        marginLeft:40,
    },  
    nextEvent:{
        width:"100%",backgroundColor:"#f59a27"
    },
    buttons:{
       textAlign:"center",color:"#FFF",fontSize:bText,lineHeight:50,
    },
    iconBox:{
        width:"100%",
        marginBottom:10,
        marginTop:10,
        paddingLeft:2,
        flex:1,
        paddingLeft:23,
    },
    
    iconLabel:{
        alignSelf: 'flex-start',   
        borderRadius:13,
        padding:5,
        color:"#fff",
        backgroundColor:"#ee7165",
        marginRight:5,
        marginTop:5,
        fontSize:15,
        overflow:"hidden",
        paddingRight:10,
        paddingLeft:10,
    },
    subject_text:{
        color:"#000",
        fontSize:16,
        letterSpacing:-1,
        textAlign:"left",
        width:"85%",
    },
    pickss:{
        flex:1,
        marginLeft:10,
        height:55,
    },
    ckImage:{
        width: 15,
        height: 12,
        paddingLeft:10,
    },

    textBox:{
        padding:10,
        width:300,
        height:55,
        borderColor:'#ddd',
        borderWidth:1,
        borderRadius:3,
        marginBottom:10,
    },
    picKBox:{
        marginTop:15,
        marginBottom:15,
        width:"85%",
        height:55,
        borderColor:'#ddd',
        borderWidth:1,
        borderRadius:3,
    },
    picKBoxCk:{
        marginTop:15,
        marginBottom:15,
        width:"85%",
        height:55,
        borderColor:'#ee7165',
        borderWidth:1,
        borderRadius:3,
        flexDirection: 'row',

    },
    container: {
        width:"100%",
        backgroundColor: '#fff',
        marginBottom:10,
        alignItems:"center",
        flex:1,
    },
    containerModal: {
        flex:1,
        alignItems:"center",
        justifyContent:"center",
    },

});
// 최근생리일
// 평균생리기간
// 직종
// 