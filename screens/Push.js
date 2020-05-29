import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { TextInput,Button,Alert,AsyncStorage,Linking,BackHandler} from 'react-native';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {url} from '../common.js';
import {login,update_side} from "../actions";
import Axios from "axios";
import { connect,useDispatch, useSelector } from 'react-redux';

export default function Push(props){
    const [list ,setList ] = React.useState();
    React.useEffect(() => {
        const urls = url+"app_member/get_push/"+props.mem_userid;
        console.log(urls);
        Axios.get(urls).then(res=>{
            console.log(res.data);
            const temp = res.data.map((val,key) =>{
                return(
                    <View style={styles.card}>
                        <Text key={key} style={styles.title}>
                            {val.pu_title}
                        </Text>
                        <Text style={styles.date}>{val.pu_date}</Text>
                    </View>
                )
            });
            setList(temp);
        });    
    },[]);
    return(
        <View style={styles.container}>
            <ScrollView style={styles.scrolls} contentContainerStyle={styles.contentContainer}>
                
                {list}
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
Push = connect(mapStateToProps)(Push);

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        backgroundColor: '#eee',
    },
    scrolls: {
        width:"100%",
        backgroundColor: '#eee',
        marginBottom:5,
        
    },
    card:{
        borderRadius:10,
        marginTop:15,
        marginLeft:"7.5%",
        width:"85%",
        height:60,
        padding:10,
        backgroundColor:"#fff",
    },
    title:{
        
    },
    date:{
        position:"absolute",
        bottom:7,
        right:7,
        fontSize:11,
        color:"#999",
    }

});
