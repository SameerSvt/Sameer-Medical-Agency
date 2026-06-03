import React from "react";
import styles from './ProfileSection.module.css'

export default function ProfileSection({data}) {
    return (
        <div className={styles.addressImage}>
            <img src={`/profile/${data.url}.png`}></img>
            <div className={styles.address}>
                <h1>{data.name}</h1>
                <h2>{data.desc}</h2>
                <h3>{data.btn}</h3>
            </div>
        </div>
    );
}
