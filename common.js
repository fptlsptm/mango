import { ceil } from "react-native-reanimated";
import {Alert} from 'react-native';
import * as React from 'react';

export function alerts(msg){
    Alert.alert("생망고",msg); 
}

export const useObj = (o) =>{
    const [obj, setObj] = React.useState(o);
    const append = (key,val) =>{
        obj[key] = val;
        setObj(obj);
    }
    const getData = (ql) =>{
        const form = new FormData();
        let count = 1;
        let ckArr = [];
        let i = 0;
        Object.keys(obj).map(function (key){
            if(obj[key] == "" || obj[key] == undefined){
                ckArr[i++] = count;
            }
            count++;
            form.append("ck_"+String(key),obj[key]);
        });
        if(ckArr.length != 0 || ql+1 != count){
            if(ckArr[0] == undefined){
                ckArr[0] = 1;    
            }
            return ckArr;    
        }else{
            return form;
        }
        
    }

    const noGet = () =>{
        
        const form = new FormData();
        let count = 1;
        let ckArr = [];
        let i = 0;
        Object.keys(obj).map(function (key){
            if(obj[key] == "" || obj[key] == undefined){
                ckArr[i++] = count;
            }
            count++;

            if(Array.isArray(obj[key])){
                let rsVal = obj[key].join(",");
                form.append("ck_"+String(key),rsVal);
            }else{
                form.append("ck_"+String(key),obj[key]);
            }

            
        });
    
       return form;    
        
    }

    return{obj:obj,append:append,getData:getData,noGet:noGet} 
}


export const url = "https://softer023.cafe24.com/app/";

export function NowDate(){
    let today = new Date();   
    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1;  // 월
    let date = today.getDate();  // 날짜
    let day = today.getDay();  // 요일
    let rs = year + '-'+pad(month,2)+'-'+pad(date,2);
    return rs;    
}

export function lastMonth(){
    var settingDate1 = new Date();
    settingDate1.setMonth(settingDate1.getMonth()-1);
    let year1 = settingDate1.getFullYear(); // 년도
    let month1 = settingDate1.getMonth() ;  // 월
    const rs1 = year1+"@"+month1;


    var settingDate2 = new Date();
    settingDate2.setMonth(settingDate2.getMonth()-1);
    let year2 = settingDate2.getFullYear(); // 년도
    let month2 = settingDate2.getMonth() + 1;  // 월
    const rs2 = year2+"@"+month2;

    let today = new Date();   
    let year3 = today.getFullYear(); // 년도
    let month3 = today.getMonth() + 1;  // 월

    const rs3 = year3+"@"+month3;


    return [rs1,rs2,rs3];

}

console.log(lastMonth());


export function NowYear(){
    let today = new Date();   
    let year = today.getFullYear(); //년도
    return year;    
}

export function NowMonth(){
    let today = new Date();   
    let month = today.getMonth() + 1;  // 월
    return month;    
}

export function GetNowDate(){
    let arrs = ["일요일","월요일","화요일","수요일","목요일","금요일","토요일"];
    let today = new Date();   
    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1;  // 월
    let date = today.getDate();  // 날짜
    let day = today.getDay();  // 요일
    let rs = year + '년'+month+'월'+date+"일";
    return rs;    
}

export function GetDays(){
    let arrs = ["일요일","월요일","화요일","수요일","목요일","금요일","토요일"];
    let today = new Date();   
    let day = today.getDay();  // 요일
    return arrs[day];    
}

export function GetMonthIngo(y,m){
    //let arrs = ["일요일","월요일","화요일","수요일","목요일","금요일","토요일"];
    let nMonth = new Date(y,m-1,1);
    let lastDate = new Date(y,m,0);
    let day = nMonth.getDay();  // 요일
    let lastd = lastDate.getDate();  // 요일

    return [day,lastd]; 
}

export function Getdates(info){
    let rsArr = new Array();
    let d = 0;
   
    let allDay = info[0] + info[1];
    let countDay = Math.ceil(allDay/7);

    for(let i = 0; i < countDay; i++){
        let tempArr = new Array();
        for (let j = 0; j < 7; j++){
            if(i == 0 && j < info[0]){ 
                tempArr[j] = 0;
            }else if(d == info[1]){
                tempArr[j] = 0;
            }else{
                d++;
                tempArr[j] = d;
            }
        }
        rsArr[i] = tempArr;
    }
    return rsArr; 
}

export function pad(n, width) {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}
export function toArr(stm,lam){
    const arr = new Array();
    let i = 0;
    for (let index = stm; index < lam+1; index++) {
        arr[i] = index;
        i++;
    }
    return arr;
}
// 복수

const q10arr = ["자궁경부의 염증성질환(N72)","자궁내막증(N80)","무월경, 소량, 희발월경(N91)","과다, 빈발 및 불규칙 월경(N92)","기타 이상 자궁 및 질 출혈(N93)",
                "여성 생식기관 및 월경주기와 관련된 통증 및 기타 병태(N94)","자궁의 평활근종(D25)","난소의 기능이상(E28)","기타 및 상세불명의 난소낭(N38.2)",
                "자궁경부의 악성 신생물(C53)","자궁체부의 악성 신생물(C54)","기타 여성 골반염증질환(N73)","부위가 명시되지 않은 요로감염(N39.0)",
                "상세불명의 요실금(R32)","없음","기타(기입)"];

const q14arr = ["감정기복","피로감","불안감","복통","슬픔","수면 패턴의 변화",
                "식욕 약화","식욕 강화","집중력 저하","지속적인 짜증","설사","구토","유방통",
                "수족냉증","가슴 두근거림","오한","변비","숨 가쁨","소화장애","기절","건망증","불면증","없음","기타(기입)"];

const q17arr = ["따뜻한 음료 마시기","휴식","온찜질","마사지","운동","약 복용","병원진료","안한다","기타(기입)"];

export const q18arr = ["이지엔6 이브","이지엔6 애니","이지엔6 프로","이지엔6 스트롱","그날엔Q 삼중정","그날엔 정","펜잘","펜잘레이디","멘자펜","게보린",
                        "캐롤에프","애드빌 리퀴겔","탁센","탁센이브","타이레놀정","우먼스 타이레놀 ","타이레놀ER 서방정","트리스펜","덱쎈","덱시부펜",
                        "낙센","없음"];

const q19arr = ["야스민","야즈","클래라","에이리스","라니아","애니브","미니보라","센스리베","센스데이","머시론",
                "디어미","멜리안","마이보라","보니타","엘라원","포스티노","레보니아 원 정","없음"];
                  
export const q22arr = ["지끈지끈하다","깨질 것같다","욱신거리다","어지럽다","없음"];
                
const q24arr = ["거북하다","답답하다","땡기다","묵직하다","바늘로 쑤시듯하다","살살 아프다","쥐어짜는 듯하다","찌릿찌릿하다","저리다","화끈하다",
                "둔하다","터질 듯이 아프다","없음"];
                
const q26arr = ["사르르하다","싸하다","얼얼하다","거북하다","더부룩하다","답답하다","뒤틀리다","떙기다","묵직하다","바늘로 쑤시듯하다",
                "보글보글 끓는다","살살 아프다","쓰리다","잡아당기다","조이는 듯하다","쥐어짜는 듯하다","가스가 차서 팽창하는 듯하다","칼로 도려내는 듯하다","욱신거리다",
                "경련하는 듯하다","메스껍다","없음"];
                
const q28arr = ["뜨끔뜨끔하다","부서지는 듯하다","뻐근하다","쑤시다","시리다","아리다","짓누르다","찌릿찌릿하다","화끈하다","저리다",
                "욱신거리다","둔하다","없음"];  
        
const q30arr = ["땡기다","묵지근하다","시리다","쑤시다","아리다","얼얼하다","저리다","조이는 듯하다","뻐근하다","욱신거리다",
                "둔하다","없음"];  

const q32arr = ["따끔거리다","땡기다","묵지근하다","시리다","쑤시다","아리다","얼얼하다","저리다","조이는 듯하다","욱신거리다",
                "뻐근하다","붓다","둔하다","없음"];  
              
const q34arr = ["가렵다","맵다","따갑다","따끔하다","쓰라리다","아리다","얼얼하다","후비다","불에 타는 듯하다","밑이 빠지는 듯하다",
                "없음"];  
               
export const q36arr = ["우울하다","나를해치고싶다"," 남을해치고싶다","혼자있고싶다","분노조절이안된다","울고싶다","토하고싶다",
                "집중이 안된다","불안하다","짜증난다","무기력하다","예민하다","기분이 좋다","없음"]; 
                
// 단일
const q6arr = ["학생","사무직","생산직"];  
const q15arr = ["신문","SNS","지인","부모님","잡지","방송","인터넷"];
const q16arr = ["병원","한방병원","요양병원","종합병원","의원"];


const q20arr = ["없음","약간좋음","보통","좋음","매우좋음"];
const q12arr = ["없음","약간있음","보통","있음","매우있음"];


export const qOrder =[
    [],
    ["q3"],
    ["q4","q5","q9"],
    ["q6","q1","q2","q7","q8"],
    ["q17","q18","q19","q20"],
    ["q10"],
    ["q11","q12"],
    ["q13","q14"],
    ["q15","q16"],
    ["q21","q22"],
    ["q23","q24"],
    ["q25","q26"],
    ["q27","q28"],
    ["q29","q30"],
    ["q31","q32"],
    ["q33","q34"],
    ["q35","q36"],
];
const q9arr = ["만 10세 미만","만 11~12세","만 13~14세","만 15~16세","만 17세 이상"];
export const sOrder =["q21","q23","q25","q27","q29"];
export const sOrder_name =["머리통증 정도","가슴통증 정도","배통증 정도","허리통증 정도","골반통증 정도"];
export const qList = {
    q1:{title:"신장을 알려주세요",type:"selectbox",option:toArr(100,200),label:"cm"},
    q2:{title:"체중을 알려주세요",type:"selectbox",option:toArr(30,150),label:"kg"},
    q3:{title:"최근 생리 시작일을 선택하세요",type:"cal",option:lastMonth()},
    q4:{title:"평균 생리 기간을 알려주세요",type:"selectbox",option:toArr(1,10),label:"일"},
    q5:{title:"평균 생리 주기를 알려주세요",type:"selectbox",option:toArr(20,60),label:"일"},
    q6:{title:"어떤 직종에 종사하시나요?",type:"selectbox",option:q6arr },
    q7:{title:"혼인여부",type:"radio",option:["미혼","기혼"]},
    q8:{title:"출산경험",type:"radio",option:["출산경험","출산미경험"]},
    q9:{title:"초경시작나이",type:"selectbox",option:q9arr,label:""},
    q10:{title:"산부인과 진료이력(병명)",type:"mselectbox",option:q10arr},
    q11:{title:"생리통 정도(vas, 1~10)",type:"slider",option:toArr(1,10)},
    q12:{title:"생리통 빈도",type:"selectbox",option:q12arr},
    q13:{title:"한 번의 생리기간 중 불편함을 느끼는 기간은?",type:"selectbox",option:toArr(1,15),label:"번째날"},
    q14:{title:"생리 중 증상을 모두 선택해주세요.",type:"mselectbox",option:q14arr},
    q15:{title:"생리에 관한 정보를 어디서 주로 얻으시나요?",type:"selectbox",option:q15arr},
    q16:{title:"생리통으로 의료기관을 방문하신 적이 있다면, 주로 이용하는 의료기관은 무엇입니까?",type:"selectbox",option:q16arr},
    q17:{title:"생리 중 생리통 완화방법이 있다면 무엇인가요?",type:"selectbox",option:q17arr},
    q18:{title:"복용경험이 있는 진통제약을 기억나는대로 모두 선택해주세요. (다중선택 가능)",type:"mselectbox",option:q18arr},
    q19:{title:"복용경험이 있는 경구피임약을 기억나는대로 모두 선택해주세요. (다중선택 가능)",type:"mselectbox",option:q19arr},
    q20:{title:"약을 복용했을 때 효과의 정도는 어떻습니까?",type:"selectbox",option:q20arr},

    q21:{title:"생리 중 머리 부위 통증의 정도에 대해서 기입해주십시오.",type:"slider",option:toArr(1,10)},
    q22:{title:"머리주변 부위의 통증을 표현하는 언어로 알맞은 것은 무엇입니까?",type:"mselectbox",option:q22arr},

    q23:{title:"생리 중 가슴 부위 통증의 정도에 대해서 기입해주십시오.",type:"slider",option:toArr(1,10)},
    q24:{title:"가슴주변 부위의 통증을 표현하는 언어로 알맞은 것은 무엇입니까?",type:"mselectbox",option:q24arr},

    q25:{title:"생리 중 해당 배 통증의 정도에 대해서 기입해주십시오.",type:"slider",option:toArr(1,10)},
    q26:{title:"배주변 부위의 통증을 표현하는 언어로 알맞은 것은 무엇입니까?",type:"mselectbox",option:q26arr},

    q27:{title:"생리 중 허리 부위 통증의 정도에 대해서 기입해주십시오.",type:"slider",option:toArr(1,10)},
    q28:{title:"허리주변 부위의 통증을 표현하는 언어로 알맞은 것은 무엇입니까?",type:"mselectbox",option:q28arr},

    q29:{title:"생리 중 골반 부위 통증의 정도에 대해서 기입해주십시오.",type:"slider",option:toArr(1,10)},
    q30:{title:"골반주변 부위의 통증을 표현하는 언어로 알맞은 것은 무엇입니까?",type:"mselectbox",option:q30arr},

    q31:{title:"생리 중 관절 부위 통증의 정도에 대해서 기입해주십시오.",type:"slider",option:toArr(1,10)},
    q32:{title:"관절주변 부위의 통증을 표현하는 언어로 알맞은 것은 무엇입니까?",type:"mselectbox",option:q32arr},

    q33:{title:"생리 중 생식기 부위 통증의 정도에 대해서 기입해주십시오.",type:"slider",option:toArr(1,10)},
    q34:{title:"생식기주변 부위의 통증을 표현하는 언어로 알맞은 것은 무엇입니까?",type:"mselectbox",option:q34arr},

    q35:{title:"생리 중 심리적 부위 통증의 정도에 대해서 기입해주십시오.",type:"slider",option:toArr(1,10)},
    q36:{title:"심리적 부위의 통증을 표현하는 언어로 알맞은 것은 무엇입니까?",type:"mselectbox",option:q36arr},
}

export const colorArr = ["#fff","#fff","#f9e1e0","#f5cdcb","#f7afaa","#fb9a93","#f77a71","#f95d52","#f73b2d","#f44336","#c30800"];

