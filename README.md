mango 프로젝트

react-native build tool : expo

[공유] 투비코 결과물 전달

아키텍처

투비코 [생망고] 

- 생리일자를 체크하고 푸시를 받고, 가입시 받는 설문조사를 받고 관리자 페이지에서 통계를 내는 프로그램

망고api 서버

http://mango.2bko.com/app/ 해더 url

aws 구현

host: mango.2bko.com
user: ubuntu

<<------------------------------------------------------------------------------------------------------->>

1.PHP 설정 (버전, 모듈 목록 등) 

기본사양 

PHP7.0, mariadb-10.0.x

php 프레임워크 codeigniter

https://codeigniter.com/

http://www.ciboard.co.kr/

공식 문서 가이드 함수명 참고하시면 됩니다.

sudo apt-get install php libapache2-mod-php php-mcrypt php-mysql php-cli php-common php-mysql
+ 설치 php 모듈 mysqli 

기본적으로 디렉토리안에 index.html 파일과 index.php 파일이 있다면 index.html 파일을 참고하게 됩니다.
다음파일을 편집하면 됩니다.

# sudo nano /etc/apache2/mods-enabled/dir.conf

<IfModule mod_dir.c>

         변경전 :: DirectoryIndex index.html index.cgi index.pl index.php index.xhtml index.htm
         변경후 :: DirectoryIndex index.php index.cgi index.pl index.html index.xhtml index.htm
</IfModule>

# sudo apt-get install mysql-server

패스워드 입력 프롬프트 창이 나오면, 사용할 root 패스워드를 입력합니다.

 
# sudo mysql_secure_installation

root 패스워드를 입력하고 나면 다음과같이 VALIDATE PASSWORD plugin 을 사용하겠냐고 합니다. 


VALIDATE PASSWORD PLUGIN can be used to test passwords


and improve security. It checks the strength of password
and allows the users to set only those passwords which are
secure enough. Would you like to setup VALIDATE PASSWORD plugin? 


강력한 보안을 위한다면 사용하지만 그렇지 않으면 사용하지 않는게 좋겠다. 

그러므로 패스. 

다음은 나머지 과정들에 대한 선택이다.

Remove anonymous users? (Press y|Y for Yes, any other key for No) :No
Disallow root login remotely? (Press y|Y for Yes, any other key for No) : y
Remove test database and access to it? (Press y|Y for Yes, any other key for No) : No
Reload privilege tables now? (Press y|Y for Yes, any other key for No) : y

아파치가 설치된 경로에서


apache.conf

#LoadModule rewrite_module modules/mod_rewrite.so
위와 같이 존재되어 있다면 주석(#)을 제거합니다

AllowOverride All

그리고 현재 프로젝트 설정 폴더(Directory)에 AllowOverride가 All로 설정되어 있는지 확인합니다. (None으로 되어 있다면 All로 변경)

코드이그나이터(CodeIgniter) 폴더를 기준으로 설명하겠습니다.


application/config/config.php

$config['index_page'] = '';

.htaccess

RewriteEngine on
RewriteCond %{REQUEST_URI} !^(/index\.php|/assets/|/robots\.txt|/favicon\.ico)
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.php?$1 [L]

설정후에 아파치 재시작 해주세요

<<------------------------------------------------------------------------------------------------------->>

2 웹 서버 설정 (Apache 또는 Nginx). 특정 설정일 수 있습니다

Apache 셋팅 

1. 제일 먼저 서버 업그레이드부터 시행합니다.

# sudo apt-get update

# sudo apt-get upgrade

 
2. apache2 설치하기

 
# sudo apt-get install apache2

# sudo apt-get upgrade

 
2-1. apache configtest


# sudo apache2ctl configtest

위의 명령어를 입력시 다음과 같은 에러가 나오는데.

AH00558: apache2: Could not reliably determine the server's fully qualified domain name, using ::1. Set the 'ServerName' directive globally to suppress this message

Syntax OK

 
2-2. apache config 변경

# sudo nano /etc/apache2/apache2.conf

설정파일 제일 하단에 다음과같이 자신의 도메인 주소 또는 IP를 입력합니다.

ServerName lbr.kr

그리고 다시 config test를 진행하면 Syntax OK 만 나오게 된다.

변경사항 저장을 위해 아파치를 재시작해주세요.

# sudo systemctl restart apache2


<<------------------------------------------------------------------------------------------------------->>

3 푸시 알림 작동 방식 새 서버에서 푸시 알림을 처음부터 설정하는 방법에 대해 설명합니다.

https://docs.expo.io/guides/push-notifications/

expo 공식문서를 보고 만들었습니다

3 -1 사용자의 엑스포 푸시 토큰 받기

- 토큰을 받고자 하는 파일에 넣어줍니다.

import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

퍼미션과 알림을 로드하고 

// 퍼미션을 체크하는 로직입니다.
const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
let finalStatus = existingStatus;
if (existingStatus !== 'granted'){
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
}
if (finalStatus !== 'granted') {return;}

// getExpoPushTokenAsync 로 받은 토큰을 서버에 저장합니다. 
// 실직적으로 api 에서 받을때 사용하는 로직이 될겁니다.
let {token} = "";
token = await Notifications.getExpoPushTokenAsync();


3 -2  알림을 보내려고 할 때 토큰으로 Expo의 Push API 호출 

푸시 알림은 어딘가에서 가져와야하며 어딘가에 서버가있을 수 있습니다 (원하는 경우 명령 줄 도구를 작성하여 보내거나 앱에서 직접 보내면 모두 동일 함). 
푸시 알림을 보낼 준비가되면 사용자 레코드에서 Expo 푸시 토큰을 가져 와서 평범한 오래된 HTTPS POST 요청을 사용하여 Expo API로 보냅니다


curl -H "Content-Type: application/json" -X POST "https://exp.host/--/api/v2/push/send" -d '{
  "to": "ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]",
  "title":"hello",
  "body": "world"
}'

요청 본문은 JSON이어야합니다. 동일한 프로젝트에 대한 것이면 단일 메시지 객체 (위의 예)이거나 최대 
100 개의 메시지 객체 배열 일 수 있습니다 (아래 참조). Expo 서버에 대한 요청 수를 효율적으로 최소화하기 
위해 여러 메시지를 보내려면 배열을 사용하는 것이 좋습니다. 다음은 네 개의 메시지를 보내는 요청 본문 예입니다.

[
  {
    "to": "ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]",
    "sound": "default",
    "body": "Hello world!"
  },
  {
    "to": "ExponentPushToken[yyyyyyyyyyyyyyyyyyyyyy]",
    "badge": 1,
    "body": "You've got mail"
  },
  {
    "to": [
      "ExponentPushToken[zzzzzzzzzzzzzzzzzzzzzz]",
      "ExponentPushToken[aaaaaaaaaaaaaaaaaaaaaa]"
    ],
    "body": "Breaking news!"
  }
]

테스팅

iOS 및 Android 시뮬레이터는 푸시 알림을 수신 할 수 없으므로 실제 디바이스를 사용하여 테스트해야합니다. 

엑스포 푸시 알림 도구는 또한 개발 과정에서 푸시 알림을 테스트하는 데 유용합니다. CLI를 사용하거나 테스트 서버를 
작성하지 않고도 장치에 테스트 알림을 쉽게 보낼 수 있습니다.

https://expo.io/notifications

3 - 3 독립형 앱 구축

ios는 따로 설정해주지 않아도 설치시 키만 잘 등록해주시면 됩니다.

expo 에서 파이어 베이스를 제공안하는거지 푸시를 제공한하는건 아닙니다.

Apple App Store 및 Google Play Store에 제출할 수있는 iOS 및 Android 용 Expo 앱의 독립 실행 형 바이너리를 작성하는법

iOS 독립형 앱을 빌드하려면 Apple 개발자 계정이 필요하지만 Android 독립형 앱을 빌드하는 데 Google Play 개발자 계정이 필요하지 
않습니다. 두 앱 스토어 중 하나에 제출하려면 해당 스토어의 개발자 계정이 필요합니다.

Firebase Cloud Messaging은 Expo로 만든 모든 독립형 Android 앱에 필요합니다. 

FCM은 현재 Expo iOS 앱에서 사용할 수 없습니다.

1.앱용 Firebase 프로젝트를 아직 생성하지 않았다면 이제 Firebase 콘솔 에서 프로젝트 추가 를 클릭하여 생성 하세요

2.새 프로젝트 콘솔에서 Android 앱에 Firebase 추가를 클릭 하고 설정 단계를 진행하세요.
 
 입력 한 Android 패키지 이름이 android.packageapp.json 의 값과 동일한 지 확인하십시오 .



3.google-services.json파일을 다운로드 하여 Expo 앱의 루트 디렉토리에 저장하십시오.

4.app.json에서 방금 다운로드 android.googleServicesFile한 google-services.json파일 의 상대 경로가 있는 필드를 추가하십시오 . 

루트 디렉토리에 배치하면 다음과 같이 보일 것입니다.


서버 자격 증명 업로드

1.Expo가 자격 증명을 사용하여 서버에서 알림을 보내려면 비밀 서버 키를 업로드해야합니다. 프로젝트의 Firebase 콘솔에서이 키를 찾을 수 있습니다.

2.사이드 바 상단에서 프로젝트 개요 오른쪽에 있는 톱니 바퀴 아이콘 을 클릭 하여 프로젝트 설정으로 이동합니다.

3.설정 창에서 클라우드 메시징 탭을 클릭하십시오 .

4.서버 키 옆에 나열된 토큰을 복사하십시오 .

5.실행 expo push:android:upload --api-key <your-token-here>교체, <your-token-here>방금 복사 한 문자열. 푸시 알림을 보낼 때만 액세스 할 수있는 서버에 토큰을 안전하게 저장합니다. (아주 중요합니다.)




