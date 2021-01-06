import {getCurrentUser} from "../utils.js"
import ChatScreen from "../screens/ChatScreen.js"
const $template = document.createElement("template");


$template.innerHTML = /*html*/`
    <style>
        *{
            font-family: Arial;
        }
        #friend-container{
            padding: 15px;
            border: 1px solid white;
            display:flex;
            justify-content: space-between;
            align-items: center;
            cursor:pointer;



        }
        #friend-email{
            font-size: 13px;

        }
        #make-friend-btn {

        }
    </style>

    <div id="friend-container">
        <div id="friend-info">
            <div id="friend-name"> Vu </div>
            <div id="friend-email">someone@gmail.com</div>
        </div>
        <button id="make-friend-btn">+</button> 
    </div>

`;

export default class FriendContainer extends HTMLElement {
    constructor(id,name,email, isFriend){
        super();
        this.attachShadow({mode:'open'});

        this.shadowRoot.appendChild($template.content.cloneNode(true));
        this.$friendName = this.shadowRoot.getElementById('friend-name');
        this.$friendEmail = this.shadowRoot.getElementById("friend-email");
        this.$makeFriend = this.shadowRoot.getElementById("make-friend-btn");
        this.id= id;

        this.setAttribute('name',name);
        this.setAttribute('email', email);
        this.setAttribute('is-friend', isFriend)
    
    }
    static get observedAttributes(){
        return ['name', 'email', 'is-friend'];
    }

    connectedCallback(){
        
        this.onclick = () => {
            console.log("Chuyen Sang Chat Voi " + this.getAttribute('name'));
            router.navigate('/chat/' + this.id)
        }
        this.$makeFriend.onclick = async () => {
            this.$makeFriend.disabled = true;
            await this.makeFriends(this.id);
            this.$makeFriend.style.display = "none";
            
        }
    }

    attributeChangedCallback(attrName, oldValue, newValue){
        if(attrName == 'name') {
            this.$friendName.innerHTML = newValue;
            
        }   
        else if( attrName == 'email'){
            this.$friendEmail.innerHTML= newValue
        } 
        else if(attrName=="is-friend"){
            if(newValue == "true"){
                this.$makeFriend.style.display = "none"
            }
            else if(newValue == "false"){
                this.$makeFriend.style.display = "block"
            }
        };
    
    }
    // async loadUsers(){
    //     let currentUser = getCurrentUser();
    //     let users = await firebase.firestore().collection('users').get();
    //     let existUsers = getDataFromDocs(users.docs);
        
    //     console.log(existUsers);
    
    // }

    async makeFriends(userId){
        let currentUser = getCurrentUser()
        await firebase.firestore().collection("collection friend").add({relation: [currentUser.id,userId]});
    }
}

window.customElements.define('friend-container', FriendContainer)