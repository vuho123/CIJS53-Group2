import { getCurrentUser, getDataFromDoc, getDataFromDocs } from "../utils.js";
import FriendContainer from "../component/FriendContainer.js"
const $template = document.createElement("template");

$template.innerHTML = /*html*/ `

    <style>
        *{
            background-color:white;

        }
        #chat-screen{
            display:flex;
            justify-content: space-between;
            height: max-content;
            
            

            
            

        }
        friend-list{
            width:30%;
            height:100vh;
            
        }
        chat-container{
            width:69%;
            height: 100vh;
            overflow-y:scroll;


        }


    </style>

    <div id="chat-screen">
    <friend-list> </friend-list>
    <chat-container></chat-container>
    </div>
`;

export default class ChatScreen extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild($template.content.cloneNode(true));
        this.$friendList = this.shadowRoot.querySelector('friend-list')
        this.$chatContainer = this.shadowRoot.querySelector('chat-container');

    }

 async connectedCallback(){
        let friendsData = await this.loadFriends();
        console.log(friendsData);
        if( friendsData == ''){
            this.loadUsers()
        }
        this.$friendList.setAttribute('data', JSON.stringify(friendsData));

    }
async loadUsers(){
    let currentUser = getCurrentUser();
    let users = await firebase.firestore().collection('users').get();
    let existUsers = getDataFromDocs(users.docs);
     
    console.log(existUsers);


}

    async loadFriends(){
        let currentUser = getCurrentUser();
        //Lấy các relations

        let result = await firebase.firestore().collection('collection friend').where('relation', 'array-contains', currentUser.id).get();
        let existFriends = getDataFromDocs(result.docs);
        let friendsData = [];

        //Lặp qua từng relation
        for(let existFriend of existFriends) {
            let relation = existFriend.relation;
            let friendId = "";
        //Tìm ra đâu là id của friend
            if(relation[0] == currentUser.id) {
                friendId = relation[1];
            }
            else if(relation[1] == currentUser.id){
                friendId = relation[0];
            }
        // Lấy thông tin của người bạn khi biết id
            let result = await firebase.firestore().collection('users').doc(friendId).get();
            
            let friendData = getDataFromDoc(result);
            friendData.isFriend = true;
            friendsData.push(friendData);
        }
        return friendsData;
    }
}

window.customElements.define('chat-screen', ChatScreen)