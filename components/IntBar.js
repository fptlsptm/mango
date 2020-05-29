import { Image, Platform, StyleSheet, Text, TouchableOpacity, View ,ProgressBarAndroid} from 'react-native';
import * as React from 'react';
import {url,toArr} from '../common.js';
function IntBar(props){
    
    const val =  Number(props.val);
    
    const aarr = toArr(1,val);
    const barr = toArr(1,(10-val));
    const [widths,setWidths] = React.useState(0);
    React.useEffect(() => {
        setWidths(val*23+23);
    },[props.val]);
    const styles = StyleSheet.create({
        abox:{
            backgroundColor:"#f73b2d",
            width:"10%",
            height:5,
        },
        bbox:{
            backgroundColor:"#eee",
            width:"10%",
            height:5,
        },
        title:{
            color:"#000",
            fontSize:13,
            letterSpacing:-1,
            textAlign:"center",
            width:30,
            lineHeight:13,
        },
        label:{
            color:"#ee7165",
            fontSize:12,
            letterSpacing:-1,
            textAlign:"center",
            width:21,
            lineHeight:12,
        },
        bar_box:{
            width:"80%",
            backgroundColor:"#fff",
            flexDirection: 'row',
        },
        boxs:{
            marginTop:30,
            width:"85%",

            backgroundColor:"#fff",
            height:30,
        },
        val:{
            marginLeft:30,
            width:widths,
            color:"#ee7165",
            fontSize:12,
            textAlign:"right"
        }
    });
    const abar = aarr.map(
        (val,key) => (<View key={key} style={styles.abox}/>)
    );
    const bbar = barr.map(
        (val,key) => (<View key={key} style={styles.bbox}/>)
    );
        
        
    return(
        <View style={styles.boxs}>
            <View style={styles.bar_box}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.label}>0</Text>
                {props.val != undefined && abar  }
                {props.val != undefined && bbar  }

                <Text style={styles.label}>10</Text>     
            </View>
            <Text style={styles.val}>{val}</Text>
        </View>
    );
}
// IntBar.propTypes = {
//     val:PropTypes.number,
// };

IntBar.defaultProps = {
    val:1,
};
export default IntBar;
