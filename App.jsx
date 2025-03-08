import React, { Component } from 'react';
import './App.css';
import { BASEURL, callApi, setSession } from './api'; 
class App extends Component {
    constructor(){
        super();
        this.userRegistration=this.userRegistration.bind(this);
        this.forgetPassword=this.forgetPassword.bind(this);
        this.signincookie=this.signincookie.bind(this);
       
    }
    showsignin(){
        let popup=document.getElementById("popup");
        popup.style.display="block";
        let popheader=document.getElementById("popupheader");
        popheader.innerHTML="LOGIN";
        let SIn=document.getElementById("signin");
        let Sup=document.getElementById("signup");
        SIn.style.display="block";
        Sup.style.display="none";
        username.value="";
        password.value="";


    }
    showsignup(){
        let popup=document.getElementById("popup");
        popup.style.display="block";
        let popheader=document.getElementById("popupheader");
        popheader.innerHTML="Create New Account";
        let SIn=document.getElementById("signin");
        let Sup=document.getElementById("signup");
        SIn.style.display="none";
        Sup.style.display="block";
        let fullname=document.getElementById("fullname");
        let email=document.getElementById("email");
        let role=document.getElementById("role");
        let signuppassword=document.getElementById("spassword");
        let confirmpassword=document.getElementById("cpassword");
        fullname.value="";
        email.value="";
        role.value="";
        signuppassword.value="";
        confirmpassword.value="";



    }
    closeSignin(event){
        if(event.target.id==="popup"){
        let popup=document.getElementById("popup");
        popup.style.display="none";
        }  
    }

    userRegistration(){
        let fullname=document.getElementById("fullname");
        let email=document.getElementById("email");
        let role=document.getElementById("role");
        let signuppassword=document.getElementById("spassword");
        let confirmpassword=document.getElementById("cpassword");
        fullname.style.border="";
        email.style.border="";
        role.style.border="";
        signuppassword.style.border="";
        if(fullname.value==""){
            fullname.style.border="1px solid red";
            fullname.focus();
            return;
        }
        if(email.value==""){
            email.style.border="1px solid red";
            email.focus();
            return;
        }
        if(role.value==""){
            role.style.border="1px solid blue";
            role.focus();
            return;
        }
        if(signuppassword.value==""){
            signuppassword.style.border="1px solid red";
            signuppassword.focus();
            return;
        }
        if(signuppassword.value!=confirmpassword.value){
            signuppassword.style.border="1px solid blue";
            signuppassword.focus();
            return;
        }


        var data=JSON.stringify({
            fullname : fullname.value,
            email : email.value,
            role : role.value,
           password : signuppassword.value,

        });
        callApi("POST", "http://localhost:8056/users/signup", data, this.getResponse)
        
        

}
        getResponse(res)
        {
            let resp=res.split('::')
            alert(resp[1]);
            if(resp[0]=='200'){
                let signin=document.getElementById("signin");
                let signup=document.getElementById("signup");
                signin.style.display="block";
                signup.style.display="none";
            }
        }
        forgetPassword(){
            username.style.border="";
            if(username.value===""){
                username.style.border="1px solid red";
                username.focus();
                return;
            }
            let url="http://localhost:8056/users/forgetpassword/"+username.value;
            callApi("GET",url,"",this.forgetpasswordResponse);

        }
        forgetpasswordResponse(res)
        {
            let data=res.split('::');
            if(data[0]==="200")
            {
                responseDiv1.innerHTML=`<br/><br/><label style='color:green'>${data[1]}</label>`;
            }
            else
            {
                responseDiv1.innerHTML=`<br/><br/><label style ='color: red'>${data[1]}</label>`;
            }


        }

        signincookie()
        {
            username.style.border="";
            password.style.border="";
            responseDiv1.innerHTML="";
            if(username.value==""){
                username.style.border="1px solid red";
                username.focus();
                return;
            }
            if(password.value==""){
                password.style.border="1px solid red";
                password.focus();
                return;
            }
            let data=JSON.stringify({
                email:username.value,
                password:password.value

            });
            callApi("POST",BASEURL+"users/signin",data,this.signinResponse);
        }
        signinResponse(res){
            let signresp=res.split('::');
            if(signresp[0]=="200"){
                setSession("crsid",signresp[1],1);
                window.location.replace("/dashboard");
            }else
            {
                responseDiv1.innerHTML=`<br/><br/><label style="color:red">${signresp[1]}</label>`;

            }
        }


    
    render() {
        return (
            <div id="container">
                <div id='popup'onClick={this.closeSignin} >
                    <div id='popupwindow' >
                        <div id='popupheader'><label>LOGIN</label></div>
                        <div id='signin'>
                            <label className='usernamelabel'>Username:</label>
                            <input type='text' id='username' />
                            <label className='passwordlabel'>Password:</label>
                            <input type='password' id='password' />
                            <div className='forgetpassword'>Forget<label onClick={this.forgetPassword}>Password?</label></div>
                            <button className='signinbutton' onClick={this.signincookie}>SIGN IN</button>
                            <div className='div1' id='responseDiv1'></div>
                            <div className='div2'>
                                Don't Have An Account
                                <label onClick={this.showsignup}> SignUp Now</label>
                            </div>
                        </div>

                        <div id='signup'>
                            <label>FullName:</label>
                            <input type='text' id='fullname'/>
                            <label>Email:</label>
                            <input type='text' id='email'/>
                            <label>Select Role:</label>
                            <select id='role'>
                                <option value=''></option>
                                <option value='1'>Admin</option>
                                <option value='2'>Empolyee</option>
                                <option value='3'>Job Seeker</option>
                            </select>
                            <label>Password:</label>
                            <input type='password' id='spassword'/>
                            <label>Confirm Password:</label>
                            <input type='password' id='cpassword'/>
                            <button onClick={this.userRegistration}>Register</button>
                            <div>Already Have an Account? <span onClick={this.showsignin}>SignIn</span></div>

                        </div>
                    </div>
                </div>
                <div id="header">
                    <img className='logo' src='logo.png' alt=' ' />
                    <div className='logotext'><span>Job</span> Portal</div>
                    <img className='signinicon' onClick={this.showsignin} src='user.png'alt=' ' />
                    <label className='signintext' onClick={this.showsignin}>signIn</label>
                </div>

                <div id="content">
                    <div className='text1'>India's #1 Job Platform</div>
                    <div className='text2'>Your job search ends here</div>
                    <div className='text3'>Discover your carrier </div>
                    <div className='searchbar'>
                        <input type='text' className='searchjobtext' placeholder='search job by "skill"' />
                        <input type='text' className='joblocationtext' placeholder='job location'/>
                        <button className='searchjob'>searchjob</button>
                    </div>
                </div>

                <div id="footer">
                    <label className='copyrighttext'>copyright @2025,all rights reserved</label>
                    <img className='facebookimg' src='facebook.png' alt=' '/>
                    <img className='facebookimg' src='linkedin.png' alt=' '/>
                    <img className='facebookimg' src='twitter.png' alt=' '/>
                </div>

            </div>
        );
    }
}

export default App;
