
## I am using managed workflow for this project Means not /android or /Ios Folder in it

UI Library Used : https://callstack.github.io/react-native-paper/radio-button.html

Used Expo : 

Change the package version from package.json file
change the version and versionCode from app.json file

https://docs.expo.dev/build/setup/
https://docs.expo.dev/build-reference/apk/
npm install -g eas-cli

eas login
eas whoami
eas build:configure

eas build --platform android

## FOLLOW THE BELOW STEPS TO RUN THE PROJECT FOR DEVELOPMENT MODE USING EAS- 2023
https://www.youtube.com/watch?v=myDDG54OvkE 

# Follow the link to creade development build
  https://docs.expo.dev/develop/development-builds/installation/
  npx expo install expo-dev-client
  go to app.js and import "import 'expo-dev-client';"
  eas login
  eas build --profile development --platform android // it will create the Dev build
# once the build cureated it will be availabe on the expo download it and install it in your device
# then run : 
npx expo start --dev-client

<!-- https://docs.expo.dev/bare/installing-expo-modules/ -->


## For error Unable to resolve "@rneui/base/dist/AirbnbRating/index" from "node_modules\@rneui\themed\dist\AirbnbRating\index.js"
solution:-
yarn add  @rneui/base 
yarn add @rneui/themed