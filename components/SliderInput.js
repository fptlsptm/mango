import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity,View,Slider} from 'react-native';
function SliderInput(props){
    const [act ,setAct] = React.useState(props.act);
    React.useEffect(()=>{
        if(props.act == null || props.act == ""){
            props.obj.append(props.name,4);
            setAct(4);
        }else{
            props.obj.append(props.name,props.act);
            setAct(props.act);
        }
        if(props.act === 0){
            props.obj.append(props.name,0);
            setAct(0);
        }
    },[]);
    const onTextChangeE = (v) =>{
        let val = String(v);
        props.obj.append(props.name,val);
        setAct(val);
    }
    return( 
        <View style={styles.contain}>
      
            <Text style={styles.subject_text}>
                {props.title}
            </Text>
            <View style={styles.boxs}>
                <Text style={styles.label}>
                    없음{"\n"}0
                </Text>
                <Slider
                    minimumTrackTintColor={"#ee7165"}
                    minimumValue={0} 
                    maximumValue={10}
                    thumbTintColor="#ee7165"
                    step={1}
                    debugTouchArea={true}
                    style={{ width:"70%",height:40}}
                    containerStyle={{height:40}}
                    trackStyle=	{ {borderRadius:7,height:3.5}}
                    touchDimensions={{slipDisplacement: 2000000}}
                    value={act}
                    onValueChange={val => onTextChangeE(val)}
                />
                <Text style={styles.label}>
                    매우심함{"\n"}10
                </Text>
            </View>
            <Text style={styles.count}>
                {act}
            </Text>
        </View>
    );
}

export default SliderInput;
const styles = StyleSheet.create({
    subject_text:{
        color:"#000",
        fontSize:16,
        letterSpacing:-1,
        textAlign:"left",
        width:"85%",
    },
    label:{
        color:"#ee7165",
        fontSize:12,
        letterSpacing:-1,
        textAlign:"center",
        width:"15%",
        height:34,
        lineHeight:17,
        marginTop:5,
    },
    count:{
        color:"#ee7165",
        fontSize:12,
        letterSpacing:-1,
        textAlign:"center",
        width:"100%",
    },
    contain:{
        width:"100%",
        marginBottom:30,
        alignItems:"center",
    },
    boxs:{
        alignItems:"center",
        marginTop:5,
        width:"85%",
        backgroundColor:"#fff",
        flexDirection: 'row',
       
    },
   
});
