import React from "react";
import styles from './ProfileSection.module.css'
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";


export default function ProfileSection({ data }) {
    const { logout } = useAuth()
    const navigate = useNavigate()

    const handleComponentLogout = async () => {
        if (data.btn === "Logout") {
            const chk = await logout()
            if (chk) {
                navigate('/')
            }
        }
        if(data.btn === "Edit Address") {
            navigate("/address")
        }
        if(data.btn === "Orders History") {
            navigate("/ordersHistory")
        }
    };

    return (
        <div className={styles.addressImage}>
            <img src={`/profile/${data.url}.png`}></img>
            <div className={styles.address}>
                <h1>{data.name}</h1>
                <h2>{data.desc}</h2>
                <h3 onClick={handleComponentLogout}>{data.btn}</h3>
            </div>
        </div>
    );
}
