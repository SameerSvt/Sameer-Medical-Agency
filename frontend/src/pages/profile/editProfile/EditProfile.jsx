import styles from './EditProfile.module.css'


export default function EditProfile() {
    return (
        <div className={styles.editProfilePage}>
            <div className={styles.container}>
                <h1>EDIT YOUR PROFILE</h1>
                <div className={styles.editWrapper}>
                    <div className={styles.left}>
                        <div className={styles.avatar}>
                            <img src="/profile/Avatar.png"></img>
                            <button> Edit Avatar </button>
                        </div>
                        <div className={styles.navigation}>
                            <button>Edit Address</button>
                            <button>Order History</button>
                            <button>Cart</button>
                            <button>Logout</button>

                        </div>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.editInfo}>
                            <div className={styles.editName}> <span>Name</span> <br />
                                <input type="text"></input>
                            </div>
                            <div className={styles.editEmail}>
                                <div className={styles.email}> <span>Email</span>
                                    <input type="text"></input> <br />
                                </div>
                                <div className={styles.phone}> <span>Phone</span> <br />
                                    <input type="text"></input>
                                </div>
                            </div>
                        </div>

                        <div className={styles.buttons}>
                            <button className={styles.saveButton}>Save Changes</button>
                            <button className={styles.cancelButton}>Cancel</button>

                        </div>

                        <div className={styles.security}>
                            <div className={styles.password}>
                                <h2>Security</h2>
                                <div> <span>Password</span> <br />
                                    <input type="password" placeholder="*************"></input>
                                </div>
                            </div>
                            <div className={styles.changePassword}>
                                <button> Change Password</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}