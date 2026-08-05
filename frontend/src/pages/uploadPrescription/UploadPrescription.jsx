import styles from './UploadPrescription.module.css'
import { FaCloudUploadAlt } from "react-icons/fa";
import { useState } from 'react';

export default function uploadPrescription() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewURL, setPreviewURL] = useState(null)

  function UploadFile() {
    if(selectedFile) {
      alert("✅ Prescription uploaded successfully! Our expert team will review it and update your order status shortly.")
    }
  }

  function handleOnUploadChange(e) {
    const file = e.target.files[0]

    if(file) {
      setSelectedFile(file)

      if(file.type.startsWith("image/")) {
        const tempURL = URL.createObjectURL(file)
        setPreviewURL(tempURL)
      } else {
        setPreviewURL(null)
      }
    }
    console.log(file)
  }

  return (
    <div className={styles.uploadPrescription}>
      <h1>UPLOAD YOUR PRESCRIPTION</h1>
      <div className={styles.container}>
        <div className={`${styles.gridBox} ${styles.upload}`}>
          <label htmlFor="selectFile" className={styles.uploadImage}>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              id="selectFile"
              style={{ display: 'none' }}
              onChange={handleOnUploadChange}
            />
            <FaCloudUploadAlt className={styles.uploadIcon} />
            <div>
              <img src={previewURL ? previewURL : "/uploadPrescriptionProcess/UploadPrescription.png"}></img>
            </div>
            <div>
              {
                !selectedFile ? 
                <p>Drag & Drop your Prescription here, or Browse <br />
                Max 5MB (JPG, PNG, PDF)</p> :
                <p>{selectedFile.name}</p>
              }
            </div>
            <button className={styles.uploadButton} onClick={UploadFile}>UPLOAD FILE</button>
          </label>
        </div>

        <div className={`${styles.gridBox} ${styles.guidelines}`}>
          <h2>PRESCRIPTION GUIDELINES</h2>
          <ul>
            <li>✏️ <strong>1.</strong> Ensure clear, readable handwriting.</li>
            <li>👤 <strong>2.</strong> Patient name and date must be visible.</li>
            <li>💊 <strong>3.</strong> List all medicines and dosages.</li>
            <li>✍🏻 <strong>4.</strong> Doctor's stamp and signature required.</li>
          </ul>
        </div>

        <div className={`${styles.gridBox} ${styles.process}`}>
          <h2>HOW WE PROCESS YOUR PRESCRIPTION</h2>
          <div className={styles.processContainer}>
            <div className={styles.processBox}>
              <div><img src="uploadPrescriptionProcess/process1.png"></img></div>
              <h3><strong>1.</strong> Experts Review Prescription</h3>
              <p>Our team verifies and extracts medicine details.</p>
            </div>
            <div className={styles.processBox}>
              <div><img src="uploadPrescriptionProcess/process2.png"></img></div>
              <h3><strong>2.</strong> Call Verified Expert</h3>
              <p>A professional will contact you to discuss your medicines and confirm availability.</p>
            </div>
            <div className={styles.processBox}>
              <div><img src="uploadPrescriptionProcess/process3.png"></img></div>
              <h3><strong>3.</strong> Added to Cart</h3>
              <p>The verified expert adds the necessary medicines to your cart.</p>
            </div>
            <div className={styles.processBox}>
              <div><img src="uploadPrescriptionProcess/process4.png"></img></div>
              <h3><strong>4.</strong> Secure Payment & Order</h3>
              <p>Place your order after secure payment via QR or other methods.</p>
            </div>
          </div>
          <div className={styles.callButton}>
            <a href="tel:9580149394"> CALL VERIFIED EXPERT 📞 9580149394</a>
            <p>You must upload your prescription before calling the expert.</p>
          </div>
        </div>
      </div>
    </div>

  )
}

























// import React, { useState } from 'react';
// import styles from './UploadPrescription.module.css';

// export default function UploadPrescription() {
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setSelectedFile(e.target.files[0].name);
//     }
//   };

//   return (
//     <div className={styles.wrapper}>
//       <h1 className={styles.mainHeading}>UPLOAD YOUR PRESCRIPTION</h1>

//       <div className={styles.gridContainer}>
//         {/* Top Left: Upload Card */}
//         <div className={`${styles.card} ${styles.uploadCard}`}>
//           <div className={styles.dropzone}>
//             <div className={styles.dropzoneInner}>
//               <div className={styles.rxIconWrapper}>
//                 <svg className={styles.rxIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
//                   <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
//                   <path d="M9 3h6v4H9z" />
//                   <path d="M9 12h6M9 16h4" />
//                 </svg>
//                 <div className={styles.uploadBadge}>↑</div>
//               </div>
//               <p className={styles.dropzoneText}>
//                 {selectedFile ? (
//                   <strong className={styles.selectedFileName}>{selectedFile}</strong>
//                 ) : (
//                   <>Drag & Drop your Prescription here, or <strong>Browse</strong></>
//                 )}
//               </p>
//               <span className={styles.fileHint}>Max 5MB (JPG, PNG, PDF)</span>
//             </div>
//             <input 
//               type="file" 
//               accept=".jpg,.jpeg,.png,.pdf" 
//               onChange={handleFileChange} 
//               className={styles.fileInput} 
//             />
//           </div>
//           <button className={styles.uploadBtn}>UPLOAD FILE</button>
//         </div>

//         {/* Top Right: Guidelines Card */}
//         <div className={`${styles.card} ${styles.guidelinesCard}`}>
//           <h2 className={styles.cardHeading}>PRESCRIPTION GUIDELINES</h2>
//           <ul className={styles.guidelinesList}>
//             <li>
//               <span className={styles.listIcon}>✏️</span>
//               <span><strong>1.</strong> Ensure clear, readable handwriting.</span>
//             </li>
//             <li>
//               <span className={styles.listIcon}>👤</span>
//               <span><strong>2.</strong> Patient name and date must be visible.</span>
//             </li>
//             <li>
//               <span className={styles.listIcon}>💊</span>
//               <span><strong>3.</strong> List all medicines and dosages.</span>
//             </li>
//             <li>
//               <span className={styles.listIcon}>🩺</span>
//               <span><strong>4.</strong> Doctor's stamp and signature required.</span>
//             </li>
//           </ul>
//         </div>

//         {/* Bottom: Process Steps Card */}
//         <div className={`${styles.card} ${styles.processCard}`}>
//           <h2 className={styles.cardHeading}>HOW WE PROCESS YOUR PRESCRIPTION</h2>

//           <div className={styles.stepsContainer}>
//             <div className={styles.stepItem}>
//               <div className={styles.stepIcon}>🔍</div>
//               <h3>1. Experts Review Prescription</h3>
//               <p>Our team verifies and extracts medicine details.</p>
//             </div>

//             <div className={styles.stepItem}>
//               <div className={styles.stepIcon}>🎧</div>
//               <h3>2. Call Verified Expert</h3>
//               <p>A professional will contact you to discuss your medicines and confirm availability.</p>
//             </div>

//             <div className={styles.stepItem}>
//               <div className={styles.stepIcon}>🛒</div>
//               <h3>3. Added to Cart</h3>
//               <p>The verified expert adds the necessary medicines to your cart.</p>
//             </div>

//             <div className={styles.stepItem}>
//               <div className={styles.stepIcon}>💳</div>
//               <h3>4. Secure Payment & Order</h3>
//               <p>Place your order after secure payment via QR or other methods.</p>
//             </div>
//           </div>

//           <div className={styles.ctaWrapper}>
//             <a href="tel:9876543210" className={styles.callBtn}>
//               CALL VERIFIED EXPERT 📞 9876543210
//             </a>
//             <p className={styles.disclaimerText}>
//               You must upload your prescription before calling the expert.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
