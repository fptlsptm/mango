import React, {Component,useEffect,useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ImageBackground ,
  Picker
} from 'react-native';
import Footer from './Footer';
import { BottomNavigation,HelperText,TextInput, } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ActionCreator from './actions';
import {connect} from 'react-redux';
import Axios from 'axios';
import { useForm } from 'react-hook-form';
import PhotoUpload from 'react-native-photo-upload';

function Talk_Write(props){
  const state = [];
  const { register, setValue, handleSubmit } = useForm();
  const [mb_id, setMb_id] = useState(props.mb_id);
  const [write_talk, setWrite_talk] = useState(<></>);
  const [wr_img1 , setWr_img1] = useState({});
  const [wr_img2 , setWr_img2] = useState({});
  const [wr_img3 , setWr_img3] = useState({});
  const [wr_img4 , setWr_img4] = useState({});
  const [wr_img5 , setWr_img5] = useState({});
  const [wr_img6 , setWr_img6] = useState({});
  const [wr_img7 , setWr_img7] = useState({});
  const [wr_img8 , setWr_img8] = useState({});
  const [wr_img9 , setWr_img9] = useState({});
  const [wr_img10 , setWr_img10] = useState({});
  const [wr_1, setWr_1] = useState("");
  const [it_id, setIt_id] = useState(props.navigation.state.params.it_id);
  const name_arr = ["mb_id","it_maker","wr_subject","wr_content","wr_img","wr_1"];

  if(props.mb_id == null){Alert.alert("로그인을 해주세요");props.navigation.navigate('LoginScreen');}

  useEffect(() => {
    const form = new FormData();
    const url = "http://dmonster1198.cafe24.com/json/proc_json.php";
    form.append("method","proc_document_write");
    form.append("it_id", it_id);
    form.append("mb_id",props.mb_id);
    console.log(it_id);
    for (var i in name_arr){
      register({name:name_arr[i]});
      setValue(name_arr[i],"");
    }
    console.log(register.name['']);
  },[]);

  const onSubmit = data =>{
    const form = new FormData(form);
    const url = "http://dmonster1198.cafe24.com/json/proc_json.php";
    console.log('ㅎㅇㅎ'+it_id);
    form.append("method","proc_document_write");
    form.append("mb_id",props.mb_id);
    form.append("it_id",it_id);
    form.append("wr_subject",data.wr_subject);
    form.append("wr_img1",wr_img1);
    form.append("wr_img2",wr_img2);
    form.append("wr_img3",wr_img3);
    form.append("wr_img4",wr_img4);
    form.append("wr_img5",wr_img5);
    form.append("wr_img6",wr_img6);
    form.append("wr_img7",wr_img7);
    form.append("wr_img8",wr_img8);
    form.append("wr_img9",wr_img9);
    form.append("wr_img10",wr_img10);
    console.log(data);
    Axios.post(url, form).then(res =>{
      console.log(res.data);
      if(res.data.resultItem.result == 1){
        Alert.alert("등록되었습니다.");
        props.navigation.navigate('DetailScreen');
      }else {
        Alert.alert("등록 실패");
        //props.navigation.navigate('Que');
      }
    });
  }
  const [valArr, setValArr] = useState([]);
  const checkItemEvent = (ck,val,name) =>{
    if(ck){
      valArr.push(val);
    }else {
      let index = valArr.indexOf(val);
      valArr.splice(index, 1);
    }
    console.log(valArr);
    setValue(name,valArr);
  }

  const onInputSelect = (p) =>{
    const file = {
      uri: p,
      type: 'image/jpeg', // or photo.type
      name: 'testPhotoName.jpg'
    }
    console.log(file);
    setWr_img1(file);
  }
  const onInputSelect2 = (p) =>{
    const file = {
      uri: p,
      type: 'image/jpeg', // or photo.type
      name: 'testPhotoName.jpg'
    }
    setWr_img2(file);
  }
  const onInputSelect3 = (p) =>{
    const file = {
      uri: p,
      type: 'image/jpeg', // or photo.type
      name: 'testPhotoName.jpg'
    }
    setWr_img3(file);
  }
  const onInputSelect4 = (p) =>{
    const file = {
      uri: p,
      type: 'image/jpeg', // or photo.type
      name: 'testPhotoName.jpg'
    }
    setWr_img4(file);
  }
  const onInputSelect5 = (p) =>{
    const file = {
      uri: p,
      type: 'image/jpeg', // or photo.type
      name: 'testPhotoName.jpg'
    }
    setWr_img5(file);
  }
  const onInputSelect6 = (p) =>{
    const file = {
      uri: p,
      type: 'image/jpeg', // or photo.type
      name: 'testPhotoName.jpg'
    }
    setWr_img6(file);
  }
  const onInputSelect7 = (p) =>{
    const file = {
      uri: p,
      type: 'image/jpeg', // or photo.type
      name: 'testPhotoName.jpg'
    }
    setWr_img7(file);
  }
  const onInputSelect8 = (p) =>{
    const file = {
      uri: p,
      type: 'image/jpeg', // or photo.type
      name: 'testPhotoName.jpg'
    }
    setWr_img8(file);
  }
  const onInputSelect9 = (p) =>{
    const file = {
      uri: p,
      type: 'image/jpeg', // or photo.type
      name: 'testPhotoName.jpg'
    }
    setWr_img9(file);
  }
  const onInputSelect10 = (p) =>{
    const file = {
      uri: p,
      type: 'image/jpeg', // or photo.type
      name: 'testPhotoName.jpg'
    }
    setWr_img10(file);
  }

  return(
    <View style={{backgroundColor:'white',flex:1}}>
      <ScrollView>
        <View style={{flex:1, flexDirection:'row', justifyContent: 'space-between',paddingVertical:5,borderBottomWidth:1,borderBottomColor:'lightgray'}}>
          <TouchableOpacity style={{width:'20%'}}>
            <Text style={{marginLeft:10,marginTop:8}} onPress={() => {props.navigation.goBack()}}><MaterialIcons name="arrow-back" color="black" size={25} /></Text>
          </TouchableOpacity>
          <View style={{alignItems:'center'}}>
            <Text style={{textAlign:'center', fontWeight:'bold',paddingVertical:10}}>[서류전송하기]</Text>
          </View>
          <View style={{width:'20%'}}></View>
        </View>

        <View style={{flex:1,flexDirection:'row', justifyContent:'space-around',marginTop:20,marginLeft:20,marginRight:20}}>
          <Text style={{marginTop:15,marginRight:20}}>제목</Text>
          <TextInput
            style={[styles.textInput]}
            onChangeText={(e) => setValue('wr_subject',e)}
            placeholder={props.name}
            autoCorrect={false}
          />
        </View>

        <View style={{alignItems:'center',marginTop:50,flex:1}}>
          <Text style={{marginBottom:10,paddingVertical:5,paddingHorizontal:10,borderWidth:1,borderColor:'steelblue',borderRadius:5}}>서류사진첨부 ▼</Text>
          <Text style={{marginBottom:10,fontSize:13}}>* 10장까지 첨부가능합니다.</Text>
          <View style={{flex:1,flexDirection:'row',justifyContent:'space-around',marginLeft:20,marginRight:20}}>
            <PhotoUpload onResponse={(e)=>onInputSelect(e.uri)}>
              <Image style={{width:130,height:100,resizeMode:'contain'}}
               source={require('./img/img.png')}/>
            </PhotoUpload>
            <PhotoUpload onResponse={(e)=>onInputSelect2(e.uri)}>
              <Image style={{width:130,height:100,resizeMode:'contain'}}
               source={require('./img/img.png')}/>
            </PhotoUpload>
          </View>
          <View style={{flex:1,flexDirection:'row',justifyContent:'space-around',marginLeft:20,marginRight:20}}>
            <PhotoUpload onResponse={(e)=>onInputSelect3(e.uri)}>
              <Image style={{width:130,height:100,resizeMode:'contain'}}
               source={require('./img/img.png')}/>
            </PhotoUpload>
            <PhotoUpload onResponse={(e)=>onInputSelect4(e.uri)}>
              <Image style={{width:130,height:100,resizeMode:'contain'}}
               source={require('./img/img.png')}/>
            </PhotoUpload>
          </View>
          <View style={{flex:1,flexDirection:'row',justifyContent:'space-around',marginLeft:20,marginRight:20}}>
            <PhotoUpload onResponse={(e)=>onInputSelect5(e.uri)}>
              <Image style={{width:130,height:100,resizeMode:'contain'}}
               source={require('./img/img.png')}/>
            </PhotoUpload>
            <PhotoUpload onResponse={(e)=>onInputSelect6(e.uri)}>
              <Image style={{width:130,height:100,resizeMode:'contain'}}
               source={require('./img/img.png')}/>
            </PhotoUpload>
          </View>
          <View style={{flex:1,flexDirection:'row',justifyContent:'space-around',marginLeft:20,marginRight:20}}>
            <PhotoUpload onResponse={(e)=>onInputSelect7(e.uri)}>
              <Image style={{width:130,height:100,resizeMode:'contain'}}
               source={require('./img/img.png')}/>
            </PhotoUpload>
            <PhotoUpload onResponse={(e)=>onInputSelect8(e.uri)}>
              <Image style={{width:130,height:100,resizeMode:'contain'}}
               source={require('./img/img.png')}/>
            </PhotoUpload>
          </View>
          <View style={{flex:1,flexDirection:'row',justifyContent:'space-around',marginLeft:20,marginRight:20}}>
            <PhotoUpload onResponse={(e)=>onInputSelect9(e.uri)}>
              <Image style={{width:130,height:100,resizeMode:'contain'}}
               source={require('./img/img.png')}/>
            </PhotoUpload>
            <PhotoUpload onResponse={(e)=>onInputSelect10(e.uri)}>
              <Image style={{width:130,height:100,resizeMode:'contain'}}
               source={require('./img/img.png')}/>
            </PhotoUpload>
          </View>
        </View>

        <View style={{alignItems:'center',marginTop:30}}>
          <TouchableOpacity onPress={handleSubmit(onSubmit)}>
            <Text style={styles.Mainmenu}>전송하기</Text>
          </TouchableOpacity>
        </View>

        <View style={{marginBottom:80}}>
        </View>
      </ScrollView>
      <View style={styles.bottomView}>
        <Footer navigation={props.navigation}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  write:{
    alignItems:'center',
    justifyContent:'center',
    width: 60,
    height: 60,
  },
  img:{
    alignItems:'center',
    justifyContent:'center',
    width: 35,
    height: 35,
  },
  image:{
    overflow: 'hidden',
    borderRadius:20,
    borderColor:'gray',
    borderWidth:1,
    height:70,
    width:70,
    marginTop:20,
    marginBottom:15,
    alignItems:'center'
  },
  Text:{
    textAlign:'center',
    marginTop:10,
    marginBottom:10,
    paddingVertical:5,
    paddingHorizontal:5,
    fontSize:12,
    color:'gray',
  },
  Mainmenu:{
    width:250,
    height:40,
    borderWidth: 1.5,
    borderColor: 'steelblue',
    backgroundColor: 'white',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 10,
    alignItems: 'center',
    paddingVertical:9,
    borderRadius:20,
  },
  textInput:{
    width:300,
    borderBottomColor: 'steelblue',
    borderBottomWidth : 1,
    paddingVertical:5,
    paddingHorizontal:15,
    backgroundColor:'white',
    height:30,
    fontSize: 13,
    marginTop: 8,
  }
});

function mapStateToProps(state) {
    return {
        mb_id: state.login.mb_id,
        first: state.calculator.sumInfo.first,
        second: state.calculator.sumInfo.second
    };
}

function mapDispatchToProps(dispatch) {
    return {
        set_mb_id:(mb_id) => {
            dispatch(ActionCreator.updateLogin(mb_id));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Talk_Write);