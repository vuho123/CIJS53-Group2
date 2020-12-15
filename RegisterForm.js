
const $template = document.createElement('template')
$template.innerHTML = /*html*/
`

   
<link rel="stylesheet" href="./css/register-form.css">


    <form id="register-form" action ="https://www.google.com/">
    <h2>Create Account</h2>
    <input-wrapper id="email" Label = "Email" type="email" error="" value="" required></input-wrapper>
    
    <input-wrapper id="name" Label = "Name" type="text" error="" value="" required></input-wrapper>
    <input-wrapper id="password" Label = "Password" type="password" error="" value="" required></input-wrapper>
    <input-wrapper id="password-confirmation" Label = "Password Confirmation" type="password" error="" value="" required></input-wrapper>
    <div id='message'></div>
    <input type="submit" value="Sign Up" id="register-btn">
    <div id="to-login">
        Have you already had an account? <b> <a href = "">Login </a> </b>
     
     </div>


    </form>






`;

    
    
    
    
    


export default class RegistrationForm extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild($template.content.cloneNode(true))
        this.$form = this.shadowRoot.getElementById('register-form')
        this.$email = this.shadowRoot.getElementById('email')
        this.$name = this.shadowRoot.getElementById('name')
        this.$password = this.shadowRoot.getElementById('password')
        this.$passwordConfirmation = this.shadowRoot.getElementById('password-confirmation')
        this.$message = this.shadowRoot.getElementById("message")


    }

    connectedCallback(){
        this.$form.onsubmit = (event) => {
            event.preventDefault();
            console.log(this.$email.value());
            window.localStorage.setItem("email",this.$email.value())
            window.localStorage.setItem("name",this.$name.value())

            if(this.$password.value() == this.$passwordConfirmation.value()){
                
                 window.localStorage.setItem("password",this.$password.value())
                      this.$message.innerHTML = '';
                      }
                     else {
                        this.$message.style.color = 'red';
                        this.$message.innerHTML = 'Did Not Match. Please Try Again!';
                    }
                    console.log(window.localStorage.getItem("password"));

                  }
            
            }
            

        }

    

    


window.customElements.define('register-form' , RegistrationForm)
// console.log(localStorage.getItem("name"));






