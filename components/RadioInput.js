
import * as React from 'react';
import { Image, Platform, StyleSheet, Text,Picker, TouchableOpacity,View} from 'react-native';
function RadioInput(props){
    const [styleVal ,setStyleVal] = React.useState(props.act);
    const onPressF = (key,val)=>{
        props.obj.append(props.name,val);
        setStyleVal(key);
    }
    let pickList = props.mArr.map((val,key) =>{
        let styleBnt = styles.bntCom;
        let styleText = styles.textCom;
        if(key==styleVal){
            styleBnt = styles.bntComCk;
            styleText = styles.textComCk;  
        }
        return(
            <TouchableOpacity 
                onPress={()=>onPressF(key,val)} 
                style={styleBnt}
                key={key} 
            >
                <Text style={styleText}>{val}</Text>
            </TouchableOpacity>
            
            
        )
    }); 
    return( 
        <View style={styles.iconBox}>
            {pickList}
        </View>
    );
}

export default RadioInput;
const styles = StyleSheet.create({
    iconBox:{
        width:"90%",
        height:50,
        backgroundColor:"#fff",
        flexDirection: 'row',
        marginBottom:8,
        marginTop:8,
        paddingLeft:10,
    },
    bntCom:{
        flex:1,
        height:50,
        borderColor: '#ddd',
        borderStyle: 'solid',
        borderWidth: 1,
        alignItems:"center",
        justifyContent:"center",
        marginRight:10,
        borderRadius:3,
        
    },
    bntComCk:{
        flex:1,
        height:50,
        borderColor: '#ee7165',
        borderStyle: 'solid',
        borderWidth: 1,
        alignItems:"center",
        justifyContent:"center",
        marginRight:10,
        borderRadius:3,
    },
    textCom:{
        color:"#000",
        fontSize:16,
    },
    textComCk:{
        color:"#ee7165",
        fontSize:16,
    },
});
// 최근생리일
// 평균생리기간
// 직종
// 