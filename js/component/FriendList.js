import FriendContainer from "./FriendContainer.js";
import InputWrapper from "./InputWrapper.js";
import  {  getDataFromDocs, getDataFromDoc } from "../utils.js";
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



}
#search-friend-form {
    padding: 15px;
    display:flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #cccccc;


}

#search-friend-btn {
    border: 1px solid #A1ABF3 ;
    background-color: #A1ABF3;
    padding: 5px 15px;
    color: #fff;
    border-radius: 5px; 
    height: 40px;
    width:100px;
    cursor:pointer;
    

}
#search-friend-keyword{
    width: calc(100% - 100px - 20px);
}

</style>

    <div id="title">
        FRIEND LIST

    </div>
    <form id="search-friend-form">
        <input-wrapper id="search-friend-keyword" label ="" type="text" error = ""> </input-wrapper>
        <button id="search-friend-btn"> Search </button>
    </form>


    <div id="friend-list">
      
    </div>
`;

export default class FriendList extends HTMLElement {
    constructor(data){
        super();

        this.attachShadow({mode:'open'});

        this.shadowRoot.appendChild($template.content.cloneNode(true));

        this.$friendList =this.shadowRoot.getElementById('friend-list');
        this.$searchFriendForm = this.shadowRoot.getElementById('search-friend-form')
        this.setAttribute('data',JSON.stringify(data));
        this.$searchFriendKeyword = this.shadowRoot.getElementById("search-friend-keyword")
    }

    connectedCallback(){
        this.$searchFriendForm.onsubmit = async (event) => {
            event.preventDefault();

            let keyword = this.$searchFriendKeyword.value();

            let isPassed = InputWrapper.validate(this.$searchFriendKeyword,    (value) => value != '' , "Type Friend Name")

            if(isPassed) {
                let result = await firebase.firestore().collection('users').where('name', '==', keyword).get();
                let data = getDataFromDocs(result.docs);
                this.setAttribute('data', JSON.stringify(data))

                // console.log(getDataFromDoc(result.docs[0]));
                // // console.log();
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
                let $friendContainer = new FriendContainer(friendData.name, friendData.email, friendData.isFriend);
                this.$friendList.appendChild($friendContainer);

            }
        }
    }
}

window.customElements.define('friend-list', FriendList);
