import styles from './Profile.module.css'
import ProfileSection from './ProfileSection'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { MdVerified } from "react-icons/md";
import RetailerVerificationPanel from './retailerVerification/RetailerVerificationPanel.jsx'


export default function Profile() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [isRetailerVerificationOpen, setIsRetailerVerificationOpen] = useState(false)

  const dataSet = [
    { url: 'Address', name: 'ADDRESS BOOK', desc: "Kanpur UP, India", btn: 'Edit Address' },
    { url: 'My_Orders', name: 'MY ORDERS', desc: 'Recent Orders', btn: 'Orders History' },
    { url: 'Help', name: 'NEED HELP', desc: "Support & FAQs", btn: 'Contact Support' },
    { url: 'Logout', name: 'LOGOUT', desc: ".......", btn: 'Logout' }
  ]

  function OpenRetailerVerificationPanel() {
    setIsRetailerVerificationOpen(true)
    setTimeout(() => {
      const panel = document.getElementById("retailer-panel-wrapper")
      if (panel) {
        panel.classList.add("isVisible")
      }
    }, 10)
  }

  function CloseRetailerVerificationPanel() {
    const panel = document.getElementById("retailer-panel-wrapper")
    if (panel) {
      panel.classList.remove("isVisible")
    }
    setTimeout(() => {
      setIsRetailerVerificationOpen(false)
    }, 400)
  }

  return (
    <>
      <div className={styles.profile}>
        <h1>Hello ! {user?.fullName || "Guest"}</h1>
        <div className={styles.profileContainer}>

          <div className={styles.leftSection}>

            <div className={styles.editProfile}>
              <img className={styles.setting} src="/profile/Edit_Profile.png"></img>
              <div className={styles.editBox}>
                <h1>PROFILE</h1>

                <div className={styles.userInfo}>
                  <div >
                    Name: <br />
                    <span>{user?.fullName}</span>
                  </div>
                  <div >
                    Phone: <br />
                    <span>{user?.phone}</span>
                  </div>
                  <div >
                    Email Id: <br />
                    <span>{user?.email}</span>
                  </div>
                </div>

                <img src="/profile/Avatar.png"></img>
                <h3 onClick={() => navigate("/edit-profile")}>Edit Profile</h3>
              </div>
            </div>

            {/* <div className={styles.becomeRetailer}>
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

                <h3 onClick={OpenRetailerVerificationPanel}>Apply Now</h3>
              </div>
          </div> */}

            <div className={styles.editProfile}>
              <img className={styles.verifiedRetailer} src="/profile/verifiedRetailer.png"></img>
              <div className={styles.verified}>
                <h1>RETAILER</h1>

                <div className={styles.priceControl}>
                  <h4>Show Product Price As:</h4>
                  <div className={styles.togglePrice}>

                    <div className={styles.leftLabel}>
                      <img src="profile/regularTag.png"></img>
                      <div>
                        <h1>Regular</h1>
                        <h2>(RETAIL)</h2>
                      </div>
                    </div>

                    <div>
                      <input type="checkbox" id="switchCheckbox" className={styles.switchCheckbox}></input>
                      <label htmlFor="switchCheckbox" className={styles.switchSlider}>
                        <span className={styles.switchKnob} />
                      </label>
                    </div>

                    <div className={styles.leftLabel}>
                      <div>
                        <h1>B2B Mode</h1>
                        <h2>(WHOLESALE)</h2>
                      </div>
                      <img src="profile/retailerTag.png"></img>
                    </div>

                  </div>

                </div>

                <div className={styles.retailerInfo}>
                  <h5>Business Details:</h5>
                  <hr></hr>
                  <h6> <span>Firm: </span>Sameer MedAgency Pvt Ltd </h6>
                  <h6> <span>DL No: </span>DL/KAN/12345/2026</h6>
                  <h6> <span>GSTIN: </span>09ABCDE1234F1Z5</h6>
                </div>

                <h3 onClick={OpenRetailerVerificationPanel}>Update Info.</h3>

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

      <RetailerVerificationPanel isVisible={true} onClose={CloseRetailerVerificationPanel} />

    </>
  )
}































// import styles from './Profile.module.css'
// import ProfileSection from './ProfileSection'
// import { useAuth } from '../../context/AuthContext'
// import { useNavigate } from 'react-router-dom'
// import { useState } from 'react' // 👈 Added useState import
// import RetailerVerificationPanel from '../../components/retailerPanel/RetailerVerificationPanel.jsx' // 👈 Added Panel import

// export default function Profile() {
//   const navigate = useNavigate()
//   const { user } = useAuth()

//   // 👈 State management for the overlay panel display
//   const [isRetailerPanelVisible, setIsRetailerPanelVisible] = useState(false)

//   const dataSet = [
//     { url: 'Address', name: 'ADDRESS BOOK', desc: "Kanpur UP, India", btn: 'Edit Address' },
//     { url: 'My_Orders', name: 'MY ORDERS', desc: 'Recent Orders', btn: 'Orders History' },
//     { url: 'Help', name: 'NEED HELP', desc: "Support & FAQs", btn: 'Contact Support' },
//     { url: 'Logout', name: 'LOGOUT', desc: ".......", btn: 'Logout' }
//   ]

//   // 👈 Dynamic state opening function with a 10ms frame offset window
//   const openRetailerPanel = () => {
//     setIsRetailerPanelVisible(true)
//     setTimeout(() => {
//       const panelWrapper = document.getElementById('side-panel-wrapper')
//       if (panelWrapper) panelWrapper.classList.add('is-visible')
//     }, 10)
//   }

//   // 👈 Closing animation buffer mapping sequence (400ms matching the CSS)
//   const closeRetailerPanel = () => {
//     const panelWrapper = document.getElementById('side-panel-wrapper')
//     if (panelWrapper) panelWrapper.classList.remove('is-visible')
//     setTimeout(() => {
//       setIsRetailerPanelVisible(false)
//     }, 400)
//   }

//   return (
//     <>
//       <div className={styles.profile}>
//         <h1>Hello ! {user?.fullName || "Guest"}</h1>
//         <div className={styles.profileContainer}>

//           <div className={styles.leftSection}>
//             <div className={styles.editProfile}>
//               <img className={styles.setting} src="/profile/Edit_Profile.png"></img>
//               <div className={styles.editBox}>
//                 <h1>PROFILE</h1>

//                 <div className={styles.userInfo}>
//                   <div >
//                     Name: <br/>
//                     <span>{user?.fullName}</span>
//                   </div>
//                   <div >
//                     Phone: <br/>
//                     <span>{user?.phone}</span>
//                   </div>
//                   <div >
//                     Email Id: <br/>
//                     <span>{user?.email}</span>
//                   </div>
//                 </div>

//                 <img src="/profile/Avatar.png"></img>
//                 <h3 onClick={() => navigate("/edit-profile")}>Edit Profile</h3>
//               </div>
//             </div>

//             <div className={styles.becomeRetailer}>
//               <img className={styles.retailer} src="/profile/Become_Retailer.png"></img>
//               <div className={styles.editBox}>
//                 <pre>Become a</pre>
//                 <h1>RETAILER</h1>
//                 <h2>Want Wholesale Rates ?</h2>

//                 <div className={styles.listReq}>
//                   <div className={styles.requirements}>Requirements:</div>
//                   <hr></hr>
//                   <div className={styles.lists}>
//                     <li>Valid Firm Name</li>
//                     <li>Drug License Number</li>
//                     <li>GST Number</li>
//                   </div>
//                 </div>

//                 <h3 onClick={openRetailerPanel} >Apply Now</h3>
//               </div>
//             </div>

//           </div>

//           <div className={styles.rightSection}>
//             {dataSet.map((data, idx) => (
//               <ProfileSection key={idx} data={data} />
//             ))}
//           </div>

//         </div>
//       </div>

//        {/* 👈 Dynamic mounting container injected cleanly beneath structural view bounds */}
//       <RetailerVerificationPanel 
//         isVisible={isRetailerPanelVisible} 
//         onClose={closeRetailerPanel} 
//       />

//     </>
//   )
// }









