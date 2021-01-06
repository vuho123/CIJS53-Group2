import "./router.js";
import FriendContainer from "./component/FriendContainer.js";


import FriendList from "./component/FriendList.js"
import InputWrapper from "./component/InputWrapper.js";
import RegistrationForm from "./component/RegisterForm.js";
import LoginForm from "./component/LoginForm.js";
import ChatScreen from "./screens/ChatScreen.js";
import ChatContainer from "./component/ChatContainer.js";
import MessageContainer from './component/MessageContainer.js';
import MessageList from "./component/MessageList.js"
import { getCurrentUser, getDataFromDocs } from "./utils.js";


// function realtimeUpdate(){
//     let currentUser = getCurrentUser()
//     firebase.firestore().collection('messages').where('owner', '==', currentUser.id).onSnapshot((result) => {
//         console.log(getDataFromDocs(result.docs));
//     })
// }
// realtimeUpdate();
