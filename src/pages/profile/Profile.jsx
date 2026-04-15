import styles from './Profile.module.css'
import ProfileSection from './ProfileSection'

export default function Profile() {
  const dataSet = [
    { url: 'Address', name: 'ADDRESS BOOK', desc: "Kanpur UP, India", btn: 'Edit Address' },
    { url: 'My_Orders', name: 'MY ORDERS', desc: 'Recent Orders (3)', btn: 'View Orders History' },
    { url: 'Help', name: 'NEED HELP', desc: "Support & FAQs", btn: 'Contact Support' },
    { url: 'Logout', name: 'LOGOUT', desc: ".......", btn: 'Logout' }
  ]

  return (
    <>
      <div className={styles.profile}>
        <h1>Welcome, User</h1>
        <div className={styles.profileContainer}>

          <div className={styles.leftSection}>
            <div className={styles.editProfile}>
              <img className={styles.setting} src="/profile/Edit_Profile.png"></img>
              <div className={styles.editBox}>
                <h1>Edit Profile</h1>
                <div className={styles.edit}>
                  Name: <input type="text" placeholder='Name'></input>
                </div>
                <div className={styles.edit}>
                  Age: <input type="number" placeholder='24'></input>
                </div>
                <img src="/profile/Avatar.png"></img>
                <p>John Doe</p>
                <h3>Edit Avatar</h3>
              </div>
            </div>

            <div className={styles.becomeRetailer}>
              <img className={styles.retailer} src="/profile/Become_Retailer.png"></img>
              <div className={styles.editBox}>
                <pre>Become a</pre>
                <h1>RETAILER</h1>
                <h2>Want Wholesale Rates ?</h2>

                <div className={styles.listReq}>
                  <div className={styles.requirements}>Requirements:</div>
                  <hr></hr>
                  <div className={styles.lists}>
                    <li>Valid Firm Name</li>
                    <li>Drug License Number</li>
                    <li>GST Number</li>
                  </div>
                </div>

                <h3>Apply Now</h3>
              </div>
            </div>
          </div>

          <div className={styles.rightSection}>
            {dataSet.map((data, idx) => (
              <ProfileSection key={idx} data={data} />
            ))}
          </div>

        </div>
      </div>
    </>
  )
}









