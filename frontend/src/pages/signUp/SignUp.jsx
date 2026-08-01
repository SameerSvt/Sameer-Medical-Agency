import styles from './SignUp.module.css'
import { HiOutlineMail } from "react-icons/hi";
import { FaPhone, FaKey } from "react-icons/fa6";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { useState } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';


export default function SignUp() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState(
    {
      fullName: '',
      email: '',
      phone: '',
      password: ''
    }
  )

  const [showPassword, setShowPassword] = useState(false)

  function handleEyeIconClick () {
    setShowPassword(!showPassword)
  }

  function handleOnChange(e) {
    setFormData({...formData,
      [e.target.name]: e.target.value
    })
  }

  async function handleOnSubmit(e) {
    e.preventDefault()
    try {
      const response = await axios.post("/api/v1/users/signup", formData)
      alert(response.data?.message || "User created successfully")
      navigate('/login')
    } catch (error) {
      console.error(error)
      alert(error.response.data?.message || "Something went wrong. Please try again.")
    }
  }

  
  return (

    <div className={styles.loginPage}>

      <div className={styles.leftSection}>
        <img className={styles.leftImage} src="myAssets/Login1.png"></img>

      </div>

      <div className={styles.rightSection}>
        <form className={styles.loginContainer} onSubmit={handleOnSubmit}>

          <h3>CREATE YOUR ACCOUNT</h3>

          <div className={styles.emailPhone}>
            <FaRegUser className={styles.iconPhone} />
            <input type="text" placeholder="NAME" name="fullName" value={formData.fullName} onChange={handleOnChange}></input>
          </div>

          <div className={styles.emailPhone}>
            <HiOutlineMail className={styles.iconMail} />
            <input type="email" placeholder="EMAIL" name="email" value={formData.email} onChange={handleOnChange}></input>
          </div>

          <div className={styles.emailPhone}>
            <FaPhone className={styles.iconPhone} />
            <input type="text" placeholder="PHONE" name="phone" value={formData.phone} onChange={handleOnChange}></input>
          </div>

          <div className={styles.emailPhone}>
                      <FaKey className={styles.iconKey} />
                      <input type={showPassword ? "text" : "password"} className={styles.password} placeholder="PASSWORD" name="password" value={formData.password} onChange={handleOnChange}></input>
                      {!showPassword ? <IoMdEye className={styles.iconEyeOff} onClick={handleEyeIconClick}/> : <IoMdEyeOff className={styles.iconEyeOff} onClick={handleEyeIconClick}/>}
                    </div>


          <button className={styles.loginButton}>SIGN UP</button>

        </form>
      </div>

    </div>

  )
}

