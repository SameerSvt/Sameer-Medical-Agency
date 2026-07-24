import styles from './Profile.module.css'
import ProfileSection from './ProfileSection'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { MdVerified } from "react-icons/md";
import axios from 'axios'
import { useCart } from '../../context/CartContext.jsx'
import RetailerVerificationPanel from './retailerVerification/RetailerVerificationPanel.jsx'



export default function Profile() {
  const navigate = useNavigate()
  const { user, isWholesaleApplied, setIsWholesaleApplied } = useAuth()
  const { fetchCartData } = useCart()
  const [isRetailerVerificationPanelOpen, setIsRetailerVerificationPanelOpen] = useState(false)

  async function handleToggleSwitch(e) {
    const togglePrice = e.target.checked
    try {
      const response = await axios.patch("/api/v1/users/handle-pricing", { togglePrice })
      if (response) {
        setIsWholesaleApplied(response.data?.data?.isWholesaleApplied)
        fetchCartData()
      }
    } catch (error) {
      alert(error.response?.data?.message)
    }
  }

  const dataSet = [
    { url: 'Address', name: 'ADDRESS BOOK', desc: "Kanpur UP, India", btn: 'Edit Address' },
    { url: 'My_Orders', name: 'MY ORDERS', desc: 'Recent Orders', btn: 'Orders History' },
    { url: 'Help', name: 'NEED HELP', desc: "Support & FAQs", btn: 'Contact Support' },
    { url: 'Logout', name: 'LOGOUT', desc: ".......", btn: 'Logout' }
  ]

  function OpenRetailerVerificationPanel() {
    setIsRetailerVerificationPanelOpen(true)
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
      setIsRetailerVerificationPanelOpen(false)
    }, 400)
  }

  async function handleCheckbox() {

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

            {!user?.isVerifiedRetailer ? <div className={styles.becomeRetailer}>
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
            </div> :

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
                      <input type="checkbox" id="switchCheckbox" className={styles.switchCheckbox} checked={isWholesaleApplied} onChange={handleToggleSwitch}></input>
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
                  <h6> <span>Firm: </span>{user?.businessDetails?.firmName}</h6>
                  <h6> <span>DL No: </span>{user?.businessDetails?.drugLicenseNumber}</h6>
                  <h6> <span>GSTIN: </span>{user?.businessDetails?.gstNumber}</h6>
                </div>

                <h3 onClick={OpenRetailerVerificationPanel}>Update Info.</h3>

              </div>
            </div>}

          </div>

          <div className={styles.rightSection}>
            {dataSet.map((data, idx) => (
              <ProfileSection key={idx} data={data} />
            ))}
          </div>

        </div>
      </div>

      <RetailerVerificationPanel isVisible={isRetailerVerificationPanelOpen} onClose={CloseRetailerVerificationPanel} />

    </>
  )
}































