import { getCurrentUser, getDataFromDoc, getDataFromDocs } from "../utils.js";

const $template = document.createElement("template")
$template.innerHTML = /*html*/
`

<style>
    *{
        font-family:Arial;
    }
    #chat-info{
        font-size:20px;
        padding: 15px ;
        border-bottom: 1px solid #cccccc;
        color:white;

        
    }
    #chat-container{
        background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
    height:100vh;
        display:flex;
        flex-direction: column;
        justify-content:space-between;
        background-color:black;
}

@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }        

        

    }
    #send-message-form{
        padding: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height:10px;
        background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
}

@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }


        



    }
    #message-content{
        width: calc(100% - 100px - 20px);
    }
    #send-message-btn{
        height:40px;
        width:100px;
        border: 1px solid #A1ABF3;
        background-color: blueviolet;
        color:white;
        border-radius:5px;
        cursor: pointer;




    }
    message-list{
        height: calc(100% - 55px - 75px);
    }
</style>
<div id="chat-container">
    <div id= "chat-info">  </div>
    <message-list> </message-list>
    <form id="send-message-form"> 
        <input-wrapper id="message-content" type="text" label="" error =""> </input-wrapper>
        <button id="send-message-btn"> Send</button>
    </form>
</div>

`;

export default class ChatContainer extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild($template.content.cloneNode(true));

        this.$chatInfo = this.shadowRoot.getElementById('chat-info');
        this.$messageList = this.shadowRoot.querySelector('message-list');
        this.$sendMessageForm = this.shadowRoot.getElementById('send-message-form');
        this.$messageContent = this.shadowRoot.getElementById('message-content');
        this.$sendMessageBtn = this.shadowRoot.getElementById('send-message-btn');

    }

    static get observedAttributes(){
        return ['current-chat'];
    }

    connectedCallback(){
        this.$messageContent.onkeyup = (e) => {
            // e.preventDefault();
            if(e.code === 'Enter'){
                this.$sendMessageBtn.click();
            }
        }
        this.$sendMessageBtn.onclick = (event) => {
            event.preventDefault();
            
            let content = this.$messageContent.value();
            if(content != ''){
                this.sendMessages(content);
                this.$messageContent.value('')   
                // this.$messageContent.scrollTop = this.$messageContent.scrollHeight;                 


                
            }else {
                return;
            }
        }
    
    }

   async attributeChangedCallback(attrName, oldValue, newValue){
        if(attrName == 'current-chat'){
            // console.log("BAN DANG CHAT VOI " + newValue);
           let friendInfo= await this.loadFriendInfo();
           this.$chatInfo.innerHTML = friendInfo.name; 

           this.loadMessages();
           

        }
    }

  async loadFriendInfo(){
        let friendId = this.getAttribute('current-chat'); //Lấy ID của bạn
        let result = await firebase.firestore().collection('users').doc(friendId).get()
        return getDataFromDoc(result);

    }

    loadMessages(){
        // let shouldScroll = this.$messageContent.scrollTop + this.$messageContent.clientHeight === this.$messageContent.scrollHeight;

        let currentUser = getCurrentUser()
        let friendId = this.getAttribute('current-chat'); //Lấy id của bạn
        firebase.firestore().collection('messages').where('owner' , 'in', [currentUser.id, friendId ]).onSnapshot((result) => {
            let rawData = getDataFromDocs(result.docs);
           let messagesData= rawData.filter((messageData)=>{
                return messageData.receiver == currentUser.id || messageData.receiver == friendId;
            })
            // console.log(messagesData);

            this.$messageList.setAttribute('data', JSON.stringify(messagesData))

// this.$messageList.scrollTop;
            
        });
        
    }
 async sendMessages(content){
        
        let currentUser = getCurrentUser();
        await firebase.firestore().collection('messages').add({content:content,dateModified: new Date().toISOString(), owner: currentUser.id, receiver: this.getAttribute('current-chat') })
        // this.$messageContent.scrollTop = this.$messageContent.scrollHeight;                 

    }
}
window.customElements.define('chat-container', ChatContainer)

