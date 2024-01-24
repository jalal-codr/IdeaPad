import { useState,useEffect } from 'react';
import { auth, provider } from '../../FirebaseConfig';
import { signInWithPopup,signInWithEmailAndPassword } from 'firebase/auth';


function Signin() {
  const [email,setEmail] = useState<string>('');
  const [pswd,setPswd] = useState<string>('');
  const [error, setError] = useState<String>('');

    const signupClick = async()=>{
        window.location.href='/signup';
    }

    const googleSignin = async (e:any) => {
      e.preventDefault();
      try {
          await signInWithPopup(auth, provider);
          window.location.href = '/';
      } catch (err:any) {
        setError(err.message);
      }
  };

  const emailAndPassword = async(e:any)=>{
    e.preventDefault();
    try{
    await signInWithEmailAndPassword(auth,email,pswd)
    window.location.href = '/';

    }
    catch(err:any){
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        setError('Incorrect email or password');
        console.log('invalid email')
      } else {
        // For other errors, use the default error message
        setError(err.message);
        console.log('other reasons')
      }
    }

  }
  useEffect(()=>{
    if(error!==""){
      alert(error)
    }
    return;
  },[error])

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <div className="signup_div">
                    <button  onClick={signupClick} className="btn">Signup</button>
                </div>
            <form  onSubmit={emailAndPassword} className="card-body">
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input  onChange={(e)=>setEmail(e.target.value)}  type="email" placeholder="email" className="input input-bordered" required />
                </div>
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input onChange={(e)=>setPswd(e.target.value)} type="password" placeholder="password" className="input input-bordered" required />
                <label className="label">
                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
                </div>
                <div className="form-control mt-6">
                <button  className="btn btn-primary">Login</button>
                </div>
            </form>
            <div className="google_signin">
            <button onClick={ googleSignin} className="btn btn-wide">Sigin with google</button>
            </div>
            </div>
        </div>
        </div>
    </>
  )
}

export default Signin
