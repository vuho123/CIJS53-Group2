import { getCurrentUser } from "../utils.js";
import MessageContainer from "./MessageContainer.js";

const $template = document.createElement('template')
$template.innerHTML = /*html*/
`
<style>
    #message-list {
        padding: 0px 15px;
        height:100%;
        overflow-y: scroll;
        overflow-x: scroll;
        

    }    
   
    
</style>
<div id="message-list"> </div>

`;
export default class MessageList extends HTMLElement {

    constructor(data){
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild($template.content.cloneNode(true));
        
        this.$messageList = this.shadowRoot.getElementById('message-list');
        this.setAttribute('data', JSON.stringify(data) );

    }
    static get observedAttributes(){
        return ['data'];
    }
    attributeChangedCallback(attrName,oldValue,newValue){
        if(attrName =='data'){
            let data = JSON.parse(newValue);


            this.$messageList.innerHTML = " ";
            for(let messageData of data){
                let currentUser = getCurrentUser(); 
                messageData.owned = currentUser.id == messageData.owner

                console.log(data[1].dateModified);
                for(let i = 0 ; i< data.length -1; i++ ){
                    for(let j=0; j< data.length-1-i; j++){
                        if (data[j].dateModified > data[j+1].dateModified){
                            let temp = data[j]
                            data[j] = data[j+1];
                            data[j+1] = temp;
                            
                        }
                    }
                }
                let $message = new MessageContainer(messageData.content, messageData.owned, messageData.dateModified);
                this.$messageList.appendChild($message);

            }
        }
    }
}

window.customElements.define('message-list', MessageList)