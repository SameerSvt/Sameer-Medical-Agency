import styles from "./ChangePassword.module.css"
import ReactDOM from 'react-dom'
import axios from 'axios'
import { useState } from "react"
import { IoMdEyeOff, IoMdEye } from "react-icons/io";

export default function ChangePassword({ isVisible, onClose }) {
    const [showOldPassword, setShowOldPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    
    const [payload, setPayload] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    })

    function handleOnChange(e) {
        const { name, value } = e.target
        setPayload((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    async function handleSavePassword() {
        try {
            const response = await axios.put("/api/v1/users/change-password", payload)
            if(response) {
                alert(response.data?.data?.message || "Password Changed")
            }
            onClose()
            setPayload({oldPassword: "", newPassword: "", confirmPassword: ""})
        } catch (error) {
            alert(error.response?.data?.message || "Unable to change password")
        } 
    }


    if (!isVisible) return null

    const changePasswordLayout = (
        <div id="changePasswordPanel" className={styles.changePasswordPanel}>
            <div className={styles.panelLayout}>
                <h1>CHANGE PASSWORD</h1>

                <div className={styles.fields}>
                    <div>
                        <span>Old Password</span> <br />
                        <div className={styles.field}>
                            <input type={showOldPassword ? "text" : "password"} name="oldPassword" value={payload.oldPassword} onChange={handleOnChange}></input>
                            {!showOldPassword ? <IoMdEye className={styles.icon} size="20px" onClick={() => setShowOldPassword((prev) => !prev)}/> : <IoMdEyeOff className={styles.icon} size="20px" onClick={() => setShowOldPassword((prev) => !prev)}/>}
                        </div>
                    </div>

                    <div>
                        <span>New Password</span> <br />
                        <div className={styles.field}>
                            <input type={showNewPassword ? "text" : "password"} name="newPassword" value={payload.newPassword} onChange={handleOnChange}></input>
                            {!showNewPassword ? <IoMdEye className={styles.icon} size="20px" onClick={() => setShowNewPassword((prev) => !prev)}/> : <IoMdEyeOff className={styles.icon} size="20px" onClick={() => setShowNewPassword((prev) => !prev)}/>}
                        </div>
                    </div>

                    <div>
                        <span>Confirm New Password</span> <br />
                        <div className={styles.field}>
                            <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={payload.confirmPassword} onChange={handleOnChange}></input>
                            {!showConfirmPassword ? <IoMdEye className={styles.icon} size="20px" onClick={() => setShowConfirmPassword((prev) => !prev)}/> : <IoMdEyeOff className={styles.icon} size="20px" onClick={() => setShowConfirmPassword((prev) => !prev)}/>}
                        </div>
                    </div>


                    <div className={styles.buttons}>
                        <button className={styles.cancelButton} onClick={onClose}>Cancel</button>
                        <button className={styles.saveButton} onClick={handleSavePassword}>Save Password</button>
                    </div>

                </div>
            </div>
        </div>
    )

    return ReactDOM.createPortal(changePasswordLayout, document.body)
}

