const $template = document.createElement("template");
$template.innerHTML = /*html*/
`
    <style>
        #message-content{
            margin-bottom: 6px;
        }

        
        #message-content{
            font-family: Arial;
            font-size:15px;
            padding:10px;
            border-radius: 20px;
            display: inline-block;
            background-color: blueviolet;
            color:white;
            max-width: 50%;
            word-break: break-word;            
            


        }
        .owned{
            text-align:right;
        }

    </style>
    <div id="message-container" >
        <span id="message-content"> Hello </span>
    </div>

`; 

export default class  MessageContainer extends HTMLElement {
    constructor(content,owned,dateModified){
        super();
        this.attachShadow({mode:"open"});
        this.shadowRoot.appendChild($template.content.cloneNode(true));
        
        this.$messageContainer = this.shadowRoot.getElementById('message-container')
        this.$messageContent = this.shadowRoot.getElementById('message-content')
        this.setAttribute('content',content);
        this.setAttribute('owned',owned);
        this.setAttribute('date-modified',dateModified)

    }
    static get observedAttributes(){
        return ['content', 'owned', 'date-modified'];
    }

    attributeChangedCallback(attrName, oldValue, newValue){
        if(attrName == 'content'){
            this.$messageContent.innerHTML = newValue
        }
        else if(attrName == "owned"){
            if(newValue == 'true'){
                this.$messageContainer.className = "owned";
            }
        }
    }
}
window.customElements.define('message-container' , MessageContainer)
