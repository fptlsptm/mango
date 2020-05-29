import * as React from 'react';
import { View,AsyncStorage,Text} from 'react-native';
import * as ac from "../actions";
import { connect,useDispatch, useSelector } from 'react-redux';
import { StackActions  } from '@react-navigation/native';
export default function Logout(props){
    const dispatch = useDispatch();
    React.useEffect(()=>{
        AsyncStorage.clear();
        dispatch(ac.logout());
        props.navigation.dispatch(StackActions.popToTop());
        props.navigation.replace("Login");
        //props.navigation.replace("Login"); 
    },[]);
    return (
        <View>
           
        </View>
    );
}

