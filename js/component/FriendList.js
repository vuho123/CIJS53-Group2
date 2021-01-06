import FriendContainer from "./FriendContainer.js";
import InputWrapper from "./InputWrapper.js";
import  {  getDataFromDocs, getDataFromDoc, getCurrentUser } from "../utils.js";
const $template = document.createElement("template");

$template.innerHTML = /*html*/ `

    <style>
    *{
        background-color: #f1f1f2;
    }

#title {
    padding: 15px 0px;
    font-family: Arial;
    font-size: 20px;
    font-weight: bold;
    text-align:center;
    border-bottom: 1px solid #cccccc;
    color:white;
    background-color:black;





}
#search-friend-form {
    padding: 15px;
    display:flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #cccccc;
background-color:black;


}

#search-friend-btn {
    border: 1px solid #A1ABF3 ;
    background-color: blueviolet;
    padding: 5px 15px;
    color: #fff;
    border-radius: 10px; 
    height: 40px;
    width:100px;
    cursor:pointer;
    

}
#search-friend-keyword{
    width: calc(100% - 100px - 20px);
    background-color:black;

}
#wrapper {
    background-color:black;
    height: 715px;
    display:block;
    overflow:scroll;



    
}
#friend-list{
    height:max-content;
}

</style>
<div id="wrapper"> 
    <div id="title">
        FRIEND LIST

    </div>
    <form id="search-friend-form">
        <input-wrapper id="search-friend-keyword" label ="" type="text" error = ""> </input-wrapper>
        <button id="search-friend-btn"  > Search </button>
    </form>


    <div id="friend-list">
      
    </div>
    </div>
`

export default class FriendList extends HTMLElement {
    constructor(data){
        super();

        this.attachShadow({mode:'open'});

        this.shadowRoot.appendChild($template.content.cloneNode(true));

        this.$friendList =this.shadowRoot.getElementById('friend-list');
        this.$searchFriendForm = this.shadowRoot.getElementById('search-friend-form')
        this.setAttribute('data',JSON.stringify(data));
        this.$searchFriendKeyword = this.shadowRoot.getElementById("search-friend-keyword")
        this.$searchFriendButton = this.shadowRoot.getElementById("search-friend-btn")
    }

    connectedCallback(){
        this.$searchFriendKeyword.onkeyup = (event) => {
            event.preventDefault();
            if(event.code === 'Enter'){
                this.$searchFriendButton.click()
            }
        }

        
        this.$searchFriendButton.onclick = async (event) => {
            event.preventDefault();
            let keyword = this.$searchFriendKeyword.value();

            let isPassed = InputWrapper.validate(this.$searchFriendKeyword,    (value) => value != '' , "Type Friend Name")

            if(isPassed) {
                let data = await this.searchFriendByName(keyword);
                this.setAttribute('data', JSON.stringify(data));

            }

        }

    }
    
    static get observedAttributes(){
        return ['data'];
    }

    attributeChangedCallback(attrName, oldValue, newValue){
        if(attrName == 'data'){
            this.$friendList.innerHTML = ''
            let friendsData = JSON.parse(newValue);
            for(let friendData of friendsData){
                let $friendContainer = new FriendContainer(friendData.id, friendData.name, friendData.email, friendData.isFriend);
                this.$friendList.appendChild($friendContainer);

            }
        }

        
    }
   async searchFriendByName(name){
        let result = await firebase.firestore().collection('users').where('name', '==', name).get();
                let data = getDataFromDocs(result.docs);
                let currentUser = getCurrentUser()
                console.log(currentUser);
                result = await firebase
                .firestore()
                .collection('collection friend')
                .where('relation', 'array-contains', currentUser.id)
                .get();

                let existFriends = getDataFromDocs(result.docs);


                for(let friendData of data) {
                    let exist = existFriends.find(function(existFriend){
                        let relation = existFriend.relation;
                        console.log(relation);
                        return relation[0] == friendData.id || relation[1] ==friendData.id;
                        
                    });
                    friendData.isFriend = (exist) ? true : false;

                }
                return data;
                // console.log(data);

    }

    
}


window.customElements.define('friend-list', FriendList);


