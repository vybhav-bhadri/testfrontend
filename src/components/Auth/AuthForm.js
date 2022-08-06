import { useState,useRef,useContext } from 'react';
import { useHistory } from 'react-router-dom';
import classes from './AuthForm.module.css';
import AuthContext from '../../strore/auth-context';
const AuthForm = () => {
  const history = useHistory();
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx=useContext(AuthContext)

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading,setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    let enteredName;
    if(!isLogin){
      enteredName = nameInputRef.current.value
    }

    //Add validation
    setIsLoading(true);
    let url;
    if(isLogin){
      url="http://localhost:4000/auth/signin";
      fetch(url,{
        method:'post',
        body:JSON.stringify({
          email:enteredEmail,
          password:enteredPassword
        }),
        headers:{
          'Content-Type':'application/json'
        }
      }).then((res)=>{
        setIsLoading(false);
        if(res.ok){
          return res.json()
        }else{
          return res.json().then((data)=>{
            let errorMessage = "Authentication failed! Try again!"
            if(data && data.error){
              errorMessage = data.message
            }

            // alert(errorMessage)
            throw new Error(errorMessage)
          })
        }
      }).then(data=>{
        authCtx.login(data.token);
        history.replace('/')
      }).catch(err=>{
        alert(err.message)
      })
    }
    else{
      url="http://localhost:4000/auth/signup"
      fetch(url,{
        method:'post',
        body:JSON.stringify({
          name:enteredName,
          email:enteredEmail,
          password:enteredPassword
        }),
        headers:{
          'Content-Type':'application/json'
        }
      }).then((res)=>{
        setIsLoading(false);
        if(res.ok){
          return res.json()
        }else{
          return res.json().then((data)=>{
            let errorMessage = "Authentication failed! Try again!"
            if(data && data.error){
              errorMessage = data.message
            }

            // alert(errorMessage)
            throw new Error(errorMessage)
          })
        }
      }).then(data=>{
        console.log(data);
        history.replace('/')
      }).catch(err=>{
        alert(err.message)
      })
    }

}

  return (
    <>
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        {isLogin ? null : <div className={classes.control}>
          <label htmlFor='name'>Your Name</label>
          <input type='text' id='name' required ref={nameInputRef} />
        </div>}
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef}/>
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p>Loading....</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
    </>
    
    
  );
};

export default AuthForm;
