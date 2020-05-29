import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { TextInput,Button,Alert,AsyncStorage,Slider} from 'react-native';
import { Image, Platform, Dimensions,StyleSheet, Text,Picker, TouchableOpacity,View,Linking} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect,useDispatch, useSelector } from 'react-redux';
import Axios from "axios";
import {url,useObj,sOrder,qList,sOrder_name,q36arr,q22arr,q18arr} from '../common.js';
import SliderInput from '../components/SliderInput';
import MRadioInput from '../components/MRadioInput';
import { TabView, SceneMap,TabBar } from 'react-native-tab-view';
const initialLayout = { width: Dimensions.get('window').width };

const Tab1 = (props) => {

    const tArr = q22arr.map((val,key) =>{
        return(
            <MRadioInput name="q22" key={key} val={val} uesData={props.uesData}/>
        )   
    });
    return(
        <View style={styles.scenes}>
            <View style={styles.blockBox} >
                {tArr}
            </View>
        </View>
    ) 
    
};

const Tab2 = (props) => {
    const tArr = q18arr.map((val,key) =>{
        return(
            <MRadioInput name="q18" key={key} val={val} uesData={props.uesData}/>
        )   
    });
    return(
        <View style={styles.scenes}>
            <View style={styles.blockBox} >
                {tArr}
            </View>
        </View>
    ) 
    
    
};

const Tab3 = (props) => {
    const sliderInputArr = sOrder.map((val,key) =>{
        const name = val;
        const datas = qList[val];
        return(
            <SliderInput
                act={props.uesData.obj[val]}
                key={key}
                mArr={datas.option} 
                year={2020} 
                obj={props.uesData} 
                name={name}
                title={sOrder_name[key]}
            />
        )    
    });
    return(
        <View style={styles.scene}>
            <ScrollView style={styles.scrolls}>
                {sliderInputArr}
            </ScrollView> 
        </View>
    ) 
};

const Tab4 = (props) => {
    const tArr = q36arr.map((val,key) =>{
        return(
            <MRadioInput name="q36" key={key} val={val} uesData={props.uesData}/>
        )   
    });
    return(
        <View style={styles.scenes}>
            <View style={styles.blockBox} >
                {tArr}
            </View>
        </View>
    ) 
};

function CheckTap(props){
    const uesData = useObj({});
    const [index, setIndex] = React.useState(0);
    const nextEvent=()=>{
        const urls = url+"mem_check/add/"+props.mem_userid;
        const form = uesData.noGet();
        Axios.post(urls,form).then(res=>{
            alert("증상체크가 완료되었습니다");
            props.navigation.replace("Main");
        });
    }
    React.useEffect(()=>{
        uesData.append("q22",[]);  
        uesData.append("q18",[]);  
        uesData.append("q36",[]);  
    },[]);
    const renderTabBar = props => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: '#f59a27' }}
          style={{ backgroundColor: '#FFF',color:"#000"}}
          renderLabel={({ route}) => (
            <Text style={{ color:"#000",}}>
              {route.title}
            </Text>
          )}
        />
    );
  
    const [routes] = React.useState([
        { key: '1', title: '현재증상' },
        { key: '2', title: '복용진통제' },
        { key: '3', title: '부위별통증' },
        { key: '4', title: '심리적양상' },
    ]);
    const renderScene = SceneMap({
        1: ()=><Tab1 uesData={uesData}/>,
        2: ()=><Tab2 uesData={uesData}/>,
        3: ()=><Tab3 uesData={uesData}/>,
        4: ()=><Tab4 uesData={uesData}/>,
    });
    return(
        <View style={styles.container}>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
                renderTabBar={renderTabBar}
            />
            <View style={styles.containerCk}>
                <TouchableOpacity style={styles.nextEvent} onPress={()=>nextEvent()}>
                    <Text style={styles.buttons}>증상체크완료</Text>
                </TouchableOpacity>
            </View>   
        </View>
    );
}
let mapStateToProps = (state) =>{
    return {
        mem_userid: state.auth_con.mem_userid,
        mem_id: state.auth_con.mem_id
    };
}
  
CheckTap = connect(mapStateToProps)(CheckTap);
export default CheckTap;
let fontSize = 18;
let lineHeight = 40;
if (Platform.OS === 'ios'){
    fontSize = 20;
    lineHeight = 47;
}
const styles = StyleSheet.create({
    scenes: {
        padding:10,
        flex: 1,
        alignItems:"center",
        marginLeft:10,

    },
    scene: {
        paddingTop:10,
        flex: 1,
        alignItems:"center"
    },
    scrolls: {
        paddingTop:25,
        width:"100%",
        height:500,
        backgroundColor: '#fff',
        marginBottom:5,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    containerCk: {
        width:"100%",
        backgroundColor:'#fff',
        height:50,
        alignItems:"center"
    },
 
    nextEvent:{
        width:"100%",backgroundColor:"#f59a27",position:"absolute",bottom:0,
    },
    buttons:{
       textAlign:"center",color:"#FFF",fontSize:fontSize,lineHeight:45,
    },
 
    blockBox:{flexDirection: 'row-reverse',flexWrap:"wrap", justifyContent: 'flex-end'},
    
});
// 최근생리일
// 평균생리기간
// 직종
// 