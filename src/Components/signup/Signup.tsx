import { signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, provider } from '../../FirebaseConfig';
import { useEffect, useState } from 'react';


function Signup() {
    const [email,setEmail] = useState<string>('');
    const [pswd,setPswd] = useState<string>('');
    const [error, setError] = useState<String>('');

    const signinClick = async()=>{
        window.location.href='/signin';
    }

    const googleSignup = async()=>{
        try{
            await signInWithPopup(auth,provider)
            window.location.href = '/';
        }
        catch(err:any){
            setError(err.message);
        }

    }
    const emailSignUp = async(e:any)=>{
      e.preventDefault();
        try {
           await createUserWithEmailAndPassword(auth, email, pswd);
            // Redirect to dashboard or home page after successful sign-up
            // Or handle the new user data as needed
            window.location.href = '/';

          } catch (err:any) {
            if (err.code === 'auth/email-already-in-use') {
              setError('This email is already in use.');
            } else if (err.code === 'auth/invalid-email') {
              setError('Invalid email address.');
            } else if (err.code === 'auth/weak-password') {
              setError('Password is too weak.');
            } else {
              // For other errors, use the default error message
              setError(err.message);
            }
          }
    };
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
            <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Signup now!</h1>
            <p className="py-6">Creating an account gives you  the ability to store your notes on the cloud making them accesable on any of your decives with  just a signin away.</p>
            </div>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <div className="signup_div">
                    <button onClick={signinClick} className="btn">Signin</button>
                </div>
            <form  className="card-body">
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="email" className="input input-bordered" required />
                </div>
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input onChange={(e)=>setPswd(e.target.value)} type="password" placeholder="password" className="input input-bordered" required />
                </div>
                <div className="form-control mt-6">
                <button onClick={emailSignUp}  className="btn btn-primary">Signup</button>
                </div>
            </form>
            <div className="google_signin">
            <button onClick={googleSignup} className="btn btn-wide">Sigin with google</button>
            </div>
            </div>
        </div>
        </div>
    </>
  )
}

export default Signup
