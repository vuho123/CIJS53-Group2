import InputWrapper from "./InputWrapper.js";
import {validateEmail} from "../utils.js"

const $template = document.createElement('template')
$template.innerHTML = /*html*/
`

<head><div id="loadOverlay" style="background-color:#333; position:absolute; top:0px; left:0px; width:100%; height:100%; z-index:2000;"></div></head>

<link rel="stylesheet" href="./css/login-form.css">


    <form id="register-form" action ="./menuBar.html" >
    <h2>Login</h2>
    <input-wrapper id="email" Label = "Email" type="email" error="" value="" required></input-wrapper>
    
    <input-wrapper id="password" Label = "Password" type="password" error="" value="" required></input-wrapper>
    <div id='message'></div>
    <input type="submit"  value="Sign in" id="login-btn">
    <div id="to-register">
        You don't have an account? <b> <a href = "#!/sign-up">Register </a> </b>
     
     </div>


    </form>






`;

    
    
    
    
    


export default class LoginForm extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild($template.content.cloneNode(true))
        this.$form = this.shadowRoot.getElementById('register-form')
        this.$email = this.shadowRoot.getElementById('email')
        this.$password = this.shadowRoot.getElementById('password')


    }

    connectedCallback(){
        this.$form.onsubmit = async (event) => {
            event.preventDefault();
            let email = this.$email.value();
            let password = this.$password.value();

            let isPassed =

           ( InputWrapper.validate(this.$email, (value) => value != '' , "Type Your Email"))&
           



           InputWrapper.validate(this.$password, (value) => value != '' , "Type Your Password")  
           
            
            if(isPassed){
                let result = await firebase
                .firestore()
                .collection('users')
                .where('email','==',email)
                .where('password','==', CryptoJS.MD5(password).toString())
                .get()

                if(result.empty){
                    alert("Email or Password incorrect")
                } else {
                    router.navigate('/chat');
                }
            }
            

            



            // if (email == ''){
            //     this.$email.error('Type Your Email')
            // }
            // else {
            //     this.$email.error('')
            // }


            // window.localStorage.setItem("email",this.$email.value())
            // window.localStorage.setItem("name",this.$name.value())

            // if(this.$password.value() == this.$passwordConfirmation.value()){
                
            //      window.localStorage.setItem("password",this.$password.value())
            //           this.$message.innerHTML = '';
            //           }
            //          else {
            //             this.$message.style.color = 'red';
            //             this.$message.innerHTML = 'Did Not Match. Please Try Again!';
            //         }
            //         console.log(window.localStorage.getItem("password"));

            
            
        }
    }
            

        
}
    

    


window.customElements.define('login-form' , LoginForm)
// console.log(localStorage.getItem("name"));






