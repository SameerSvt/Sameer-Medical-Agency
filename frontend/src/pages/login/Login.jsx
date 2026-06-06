import styles from './Login.module.css'
import { HiOutlineMail } from "react-icons/hi";
import { FaPhone, FaKey } from "react-icons/fa6";
import { IoMdEyeOff } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from "axios"


export default function Login() {
   const navigate = useNavigate()

   const [formData, setFormData] = useState(
    {
      credential: '',
      password: ''
    }
  )

  function handleOnChange(e) {
    setFormData({...formData,
      [e.target.name]: e.target.value
    })
  }

  async function handleOnSubmit(e) {
    e.preventDefault()
    try {
      const response = await axios.post("/api/v1/users/login", formData)
      alert(response.data?.message || "Login successfully")
      navigate('/')
    } catch (error) {
      console.error(error)
      alert(error.response?.data?.message ||          // Standard Express structure
      error.response?.data?.error?.message ||    // Common custom middleware nesting
      // error.response?.data ||                    // Fallback to raw string/object
      "Something went wrong. Please try again.")
    }
  }
  
    function handleSignUpClick() {
      navigate("/signup")
    }
  return (

    <div className={styles.loginPage}>

      <div className={styles.leftSection}>
        <img className={styles.leftImage} src="myAssets/Login1.png"></img>

        <div className={styles.newHere}>NEW HERE ?</div>
        <p className={styles.leftDescription}>Sign up to acces your history, manage orders and cart.<br></br>
          It's quick and easy !
        </p>
        <button className={styles.signUpButton} onClick={handleSignUpClick}>SIGN UP</button>

      </div>

      <div className={styles.rightSection}>
        <form className={styles.loginContainer} onSubmit={handleOnSubmit}>

          <h3>WELCOME BACK TO SAMEER MEDICAL AGENCY</h3>

          <div className={styles.emailPhone}>
            <HiOutlineMail className={styles.iconMail} />
            <FaPhone className={styles.iconPhone} />
            <input type="text" placeholder="EMAIL OR PHONE" name="credential" value={formData.credential} onChange={handleOnChange}></input>
          </div>

          <div className={styles.forgotPass}>
            <a href="#">FORGOT PASSWORD ?</a>
          </div>


          <div className={styles.emailPhone}>
            <FaKey className={styles.iconKey} />
            <input type="password" className={styles.password} placeholder="PASSWORD" name="password" value={formData.password} onChange={handleOnChange}></input>
            <IoMdEyeOff className={styles.iconEyeOff} />
          </div>


          <button className={styles.loginButton}>LOGIN</button>


          <div className={styles.rememberMe}>
            <input type="checkbox" />  REMEMBER ME
          </div>

          <div className={styles.easyLogin}>
            <div className={styles.google}>
              <FcGoogle size={22} /> <span>Log in with Google</span>
            </div>
            <div className={styles.google}>
              <FaFacebook size={22} color={"#1877F2"} /> <span>Log in with Facebook</span>
            </div>
          </div>
        </form>
      </div>

    </div>

  )
}

