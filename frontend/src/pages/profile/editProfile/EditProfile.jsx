import styles from './EditProfile.module.css'
import axios from 'axios'
import { FcEditImage } from "react-icons/fc";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext';
import ChangePassword from './changePassword/ChangePassword.jsx';


export default function EditProfile() {
    const navigate = useNavigate()
    const [selectedAvatar, setSelectedAvatar] = useState(null)
    const { user, setUser, logout } = useAuth()
    const [previewAvatarURL, setPreviewAvatarURL] = useState(null)
    const [isChangePasswordPanelOpen, setIsChangePasswordPanelOpen] = useState(false)
    const [updateInfo, setUpdateInfo] = useState({
        fullName: user?.fullName || "",
        email: user?.email || ""
    })


    // for changing avatar
    function onChangeOpenFile(e) {
        const file = e.target.files[0]
        if (file) {
            const tempAvatarURL = URL.createObjectURL(file)
            if (tempAvatarURL) {
                setPreviewAvatarURL(tempAvatarURL)
            }
            setSelectedAvatar(file)
        }
    }

    async function handleUpdateAvatar() {
        try {
            if (selectedAvatar) {
                const formData = new FormData()
                formData.append("avatar", selectedAvatar)
                const response = await axios.put("/api/v1/users/edit-avatar", formData)
                if (response) {
                    alert(response.data?.message || "Your profile image updated")
                    setPreviewAvatarURL(null)
                    setUser((prev) => ({
                        ...prev,
                        avatar: response.data?.data?.avatar
                    }))
                }
            } else {
                alert("Upload image first")
            }
        } catch (error) {
            alert(error.response?.data?.message || "Unable to change image")
        }
    }

    // for changing information
    function onChangeInfo(e) {
        const { name, value } = e.target
        setUpdateInfo((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    async function handleEditProfile() {
        try {
            const response = await axios.patch("/api/v1/users/edit-profile", updateInfo)
            const updatedProfile = response?.data?.data
            if (response) {
                setUser((prev) => ({
                    ...prev,
                    fullName: updatedProfile.fullName,
                    email: updatedProfile.email
                }))
                alert(response?.data?.message || "Profile updated")
            }
        } catch (error) {
            alert(error.response.data?.message || "Unable to update profile")
        }
    }

    function handleCancelInfo() {
        setUpdateInfo({
            fullName: user?.fullName,
            email: user?.email
        })
    }

    //Change Password
    function openChangePasswordPanel() {
        setIsChangePasswordPanelOpen(true)
        setTimeout(() => {
            const element = document.getElementById("changePasswordPanel")
            if(element) {
            element.classList.add("isVisible")
        }
        }, 10)
    }

    function closeChangePasswordPanel() {
        const element = document.getElementById("changePasswordPanel")
        if(element) {
            element.classList.remove("isVisible")
        }
        setTimeout(() => {
            setIsChangePasswordPanelOpen(false)
        }, 400)
    }

    return (
        <div className={styles.editProfilePage}>
            <div className={styles.container}>
                <h1>EDIT YOUR PROFILE</h1>
                <div className={styles.editWrapper}>
                    <div className={styles.left}>

                        {/* Update avatar image */}
                        <div className={styles.avatar}>
                            <div className={styles.avatarEditIcon}>
                                <label htmlFor='openFile' >
                                    <FcEditImage className={styles.icon} />
                                    <input type="file" accept=".png,.jpg.,jpeg" id="openFile" style={{ display: "none" }} onChange={onChangeOpenFile} />
                                </label>
                            </div>
                            <img src={!previewAvatarURL ? user?.avatar || "/profile/Avatar.png" : previewAvatarURL }></img>
                            {previewAvatarURL && <button onClick={handleUpdateAvatar}> Edit Avatar </button>}
                        </div>

                        <div className={styles.navigation}>
                            <button onClick={() => navigate("/address")}>Edit Address</button>
                            <button onClick={() => navigate("/ordersHistory")}>Order History</button>
                            <button onClick={() => navigate("/cart")}>Cart</button>
                            <button onClick={ async () => {
                                const check = await logout()
                                navigate('/login')
                            }}>Logout</button>

                        </div>
                    </div>

                    <div className={styles.right}>
                        <div className={styles.editInfo}>
                            <div className={styles.editName}> <span>Name</span> <br />
                                <input type="text" name="fullName" value={updateInfo?.fullName} onChange={onChangeInfo}></input>
                            </div>
                            <div className={styles.editEmail}>
                                <div className={styles.email}> <span>Email</span>
                                    <input type="email" name="email" value={updateInfo?.email} onChange={onChangeInfo}></input> <br />
                                </div>
                                <div className={styles.phone}> <span>Phone</span> <br />
                                    <input type="number" value={user?.phone} disabled></input>
                                </div>
                            </div>
                        </div>

                        <div className={styles.buttons}>
                            <button className={styles.saveButton} onClick={handleEditProfile}>Save Changes</button>
                            <button className={styles.cancelButton} onClick={handleCancelInfo}>Cancel</button>
                        </div>

                        <div className={styles.security}>
                            <div className={styles.password}>
                                <h2>Security</h2>
                                <div> <span>Password</span> <br />
                                    <input type="password" placeholder="*************" disabled></input>
                                </div>
                            </div>
                            <div className={styles.changePassword}>
                                <button onClick={openChangePasswordPanel}> Change Password</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <ChangePassword isVisible={isChangePasswordPanelOpen} onClose={closeChangePasswordPanel}/>
        </div>
    )
}