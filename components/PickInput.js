import * as React from 'react';
import { Image, Platform, StyleSheet,Modal, Text,Picker, TouchableOpacity,View,TextInput} from 'react-native';
function PickInput(props){
    
    const [act ,setAct] = React.useState(props.act);
    const [iosAct ,setIosAct] = React.useState(props.act);
    const [iosText ,setIosText] = React.useState(props.act);
    const [ckt ,setCkt] = React.useState(false);
    const [styleName ,setStyleName] = React.useState(styles.picKBox);
    const [text ,setText] = React.useState();
    const [modalVisible, setModalVisible] = React.useState(false);
    const onValueChange = (e)=>{
        if(e == "기타(기입)"){
            setCkt(true);
        }else{
            setCkt(false);
        }
        if(e != undefined){
            setStyleName(styles.picKBoxCk);
        }else{
            setStyleName(styles.picKBox);
        }
        setAct(e);
        props.obj.append(props.name,e);
    }

    const onTextChangeE = (t) =>{
        props.obj.append(props.name,"기타(기입)"+t);
        setText(t);
    }
    const nextEvent = (e) =>{
        if(e == undefined || e == "선택해 주세요"){
            alert("항목을 선택해주세요");
        }else{
            onValueChange(e);
            if(props.labels == undefined){
                setIosText(e);    
            }else{
                setIosText(e+props.labels);
            }
            setModalVisible(false);
        }
    }
    const [items , setItem] = React.useState(<Picker.Item label="선택해 주세요" value={undefined} />);
    React.useEffect(()=>{
        let pickList = props.mArr.map((val,key) =>{
            let labels = "";
            if(props.labels != undefined){
                labels = props.labels
            }   
            return(
                <Picker.Item label={val+labels} value={val} key={key} />
            )
        });
        if(iosText == undefined){
            setIosText("선택해 주세요")
        }else{
            if(props.labels == undefined){
                setIosText(iosText);    
            }else{
                setIosText(iosText+props.labels);
            }
        }
        setItem(pickList);
        setAct(Number(props.act));
        
    },[]);
    let mainStyles = props.style;
    if(props.style == undefined){mainStyles = styles.container;}
        
    return(
        <View style={mainStyles}>
            {props.title != "" &&
            <Text style={styles.subject_text}>
                {props.title+"  "}
                {styleName == styles.picKBoxCk && 
                    <Image source={require('../assets/images/check_on.png')} style={styles.ckImage}/>
                }
            </Text>
            }
            {Platform.OS == 'android' && 
                <View style={styleName}>
                    <Picker
                        style={styles.pickss}
                        selectedValue={act}
                        onValueChange={(e,i)=>onValueChange(e,i)}>
                        <Picker.Item label="선택해 주세요" value={undefined} />
                        {items}
                    </Picker>
                </View>
                
            }
            {Platform.OS == 'ios' && 
                <TouchableOpacity style={styleName} onPress={()=>setModalVisible(true)}>
                    <Text style={styles.iosText}>{iosText}</Text>    
                </TouchableOpacity>
            }
            <Modal animationType="slide" transparent={false} visible={modalVisible} style={styles.modalIos}>
                <Picker
                    style={styles.pickssIos}
                    selectedValue={iosAct}
                    onValueChange={(e)=>setIosAct(e)}>
                    <Picker.Item label="선택해 주세요" value={undefined} />
                    {items}
                </Picker>
                <TouchableOpacity style={styles.nextEvent} onPress={()=>nextEvent(iosAct)}>
                    <Text style={styles.buttons}>선택완료</Text>
                </TouchableOpacity>   
            </Modal>
            {ckt == true&&
                <TextInput style={styles.textBox} value={text} onChangeText={onTextChangeE}/> 
            }     
        </View>
    );
}

export default PickInput;
const styles = StyleSheet.create({
    iosText:{
        lineHeight:65,
        fontSize:17,
        marginLeft:20,
    },
    subject_text:{
        color:"#000",
        fontSize:16,
        letterSpacing:-1,
        textAlign:"left",
        width:"85%",
    },
    pickss:{
        width:"100%",
        marginLeft:10,
        height:55,
    },

    pickssIos:{
        flex:1,
        marginTop:200,
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
    },
    container: {
        width:"100%",
        backgroundColor: '#fff',
        marginBottom:10,
        alignItems:"center",
    },
    modalIos:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
    },
    nextEvent:{
        width:"100%",height: 60,backgroundColor:"#f59a27"
    },
    buttons:{
       textAlign:"center",color:"#FFF",fontSize:24,marginTop:17,
    },
});