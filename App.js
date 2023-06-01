import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { LogBox } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/home/homeScreen';
import LoadingScreen from './components/loadingScreen';
import NotificationsScreen from './screens/notifications/notificationsScreen';
import StudentProfileScreen from './screens/studentProfile/studentProfileScreen';
import VideoClassScreen from './screens/videoClass/videoClassScreen';
import AttendanceScreen from './screens/attendance/attendanceScreen';
import FeesDueScreen from './screens/feesDue/feesDueScreen';
import SyllabusScreen from './screens/syllabus/syllabusScreen';
import SyllabusDetailScreen from './screens/syllabusDetail/syllabusDetailScreen';
import AssignmentScreen from './screens/assignment/assignmentScreen';
import CalenderScreen from './screens/calender/calenderScreen';
import TimeTableScreen from './screens/timeTable/timeTableScreen';
import TestScreen from './screens/test/testScreen';
import TestStartScreen from './screens/testStart/testStartScreen';
import TestResultScreen from './screens/testResult/testResultScreen';
import LeaderBoardScreen from './screens/leaderBoard/leaderBoardScreen';
import AnswerSheetScreen from './screens/answerSheet/answerSheetScreen';
import ProgressCardScreen from './screens/progressCard/progressCardScreen';
import LeaveApplicationScreen from './screens/leaveApplication/leaveApplicationScreen';
import SchoolGalleryScreen from './screens/schoolGallery/schoolGalleryScreen';
import AskDoubtsScreen from './screens/askDoubts/askDoubtsScreen';
import FacultiesScreen from './screens/faculties/facultiesScreen';
import MessagesScreen from './screens/messages/messagesScreen';
import ChatWithFacultyScreen from './screens/chatWithFaculty/chatWithFacultyScreen';
import SupportScreen from './screens/support/supportScreen';
import ChangePasswordScreen from './screens/changePassword/changePasswordScreen';
import ChangePasswordSuccessScreen from './screens/changePasswordSuccess/changePasswordSuccessScreen';
import SplashScreen from './screens/splashScreen';
import LoginScreen from './screens/auth/loginScreen';
import SignupScreen from './screens/auth/signupScreen';
import VerificationScreen from './screens/auth/verificationScreen';
import ToastMessage from './components/ToastMessage';
LogBox.ignoreAllLogs()

const Stack = createStackNavigator();

function MyApp() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Splash" component={SplashScreen} />
        {/* <Stack.Screen name="Login" component={LoginScreen} options={{ ...TransitionPresets.DefaultTransition }} /> */}
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Verification" component={VerificationScreen} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ ...TransitionPresets.DefaultTransition }} />
        <Stack.Screen name="Notification" component={NotificationsScreen} />
        <Stack.Screen name="StudentProfile" component={StudentProfileScreen} />
        <Stack.Screen name="VideoClass" component={VideoClassScreen} />
        <Stack.Screen name="Attendance" component={AttendanceScreen} />
        <Stack.Screen name="FeesDue" component={FeesDueScreen} />
        <Stack.Screen name="Syllabus" component={SyllabusScreen} />
        <Stack.Screen name="SyllabusDetail" component={SyllabusDetailScreen} />
        <Stack.Screen name="Assignment" component={AssignmentScreen} />
        <Stack.Screen name="Calender" component={CalenderScreen} />
        <Stack.Screen name="TimeTable" component={TimeTableScreen} />
        <Stack.Screen name="Test" component={TestScreen} />
        <Stack.Screen name="TestStart" component={TestStartScreen} />
        <Stack.Screen name="TestResult" component={TestResultScreen} />
        <Stack.Screen name="LeaderBoard" component={LeaderBoardScreen} />
        <Stack.Screen name="AnswerSheet" component={AnswerSheetScreen} />
        <Stack.Screen name="ProgressCard" component={ProgressCardScreen} />
        <Stack.Screen name="LeaveApplication" component={LeaveApplicationScreen} />
        <Stack.Screen name="SchoolGallery" component={SchoolGalleryScreen} />
        <Stack.Screen name="AskDoubts" component={AskDoubtsScreen} />
        <Stack.Screen name="Faculties" component={FacultiesScreen} />
        <Stack.Screen name="Messages" component={MessagesScreen} />
        <Stack.Screen name="ChatWithFaculty" component={ChatWithFacultyScreen} />
        <Stack.Screen name="Support" component={SupportScreen} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        <Stack.Screen name="ChangePasswordSuccess" component={ChangePasswordSuccessScreen} options={{ ...TransitionPresets.ModalSlideFromBottomIOS }} />
        
      </Stack.Navigator>
      <React.Fragment>
        <ToastMessage />
      </React.Fragment>
    </NavigationContainer>
  );
}

export default MyApp;