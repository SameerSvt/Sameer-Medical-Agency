import React, { useState } from "react";
import axios from "axios";

export default function AddProductForm() {
    // 1. Unified state for all schema properties
    const [productData, setProductData] = useState({
        name: "",
        saltComposition: "",
        category: "",
        mrp: "",
        retailPrice: "",
        wholesalePrice: "",
        discountPercentage: 0,
        stock: 0,
    });

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    // Enums fetched straight from your Mongoose schema
    const categories = [
        "Generic Drugs", "Surgical Equipment", "Oncology Drugs", 
        "Cardiac Care", "Emergency Meds", "Personal Care", 
        "Pediatric Care", "Diabetes Care", "Diagnostic Tools", 
        "Life Saving Medicines", "Antibiotics"
    ];

    // 2. Handle simple text and number field mutations
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // 3. Handle file parsing and generating a local preview string URL
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file)); // Temporary local URL for preview
        }
    };

    // 4. Wrap everything into a multipart/form-data package on submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: "", text: "" });

        // Basic validation checking
        if (!imageFile) {
            setMessage({ type: "error", text: "Please select a product image." });
            setLoading(false);
            return;
        }

        try {
            const formData = new FormData();
            
            // Append all textual and structural schema values
            formData.append("name", productData.name.trim());
            formData.append("saltComposition", productData.saltComposition.trim());
            formData.append("category", productData.category);
            formData.append("mrp", productData.mrp);
            formData.append("retailPrice", productData.retailPrice);
            formData.append("wholesalePrice", productData.wholesalePrice);
            formData.append("discountPercentage", productData.discountPercentage);
            formData.append("stock", productData.stock);
            
            // Critical matching file-pointer payload entry
            formData.append("image", imageFile);

            const response = await axios.post(
                "http://localhost:8000/api/v1/products/list-product",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true // Transmits storage authorization cookies
                }
            );

            setMessage({ type: "success", text: "Product uploaded successfully to inventory!" });
            
            // Reset form fields upon successful execution
            setProductData({
                name: "",
                saltComposition: "",
                category: "",
                mrp: "",
                retailPrice: "",
                wholesalePrice: "",
                discountPercentage: 0,
                stock: 0,
            });
            setImageFile(null);
            setImagePreview(null);

        } catch (error) {
            const errorMsg = error.response?.data?.message || "An unexpected error occurred.";
            setMessage({ type: "error", text: errorMsg });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Add New Medical Product</h2>
            
            {message.text && (
                <div style={{ ...styles.alert, backgroundColor: message.type === "success" ? "#d4edda" : "#f8d7da", color: message.type === "success" ? "#155724" : "#721c24" }}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} style={styles.form}>
                
                {/* Product Name */}
                <div style={styles.formGroup}>
                    <label style={styles.label}>Product Name *</label>
                    <input type="text" name="name" value={productData.name} onChange={handleInputChange} required style={styles.input} placeholder="e.g., Paracetamol 650mg" />
                </div>

                {/* Salt Composition */}
                <div style={styles.formGroup}>
                    <label style={styles.label}>Salt Composition *</label>
                    <input type="text" name="saltComposition" value={productData.saltComposition} onChange={handleInputChange} required style={styles.input} placeholder="e.g., Acetaminophen" />
                </div>

                {/* Category Dropdown Selection */}
                <div style={styles.formGroup}>
                    <label style={styles.label}>Category *</label>
                    <select name="category" value={productData.category} onChange={handleInputChange} required style={styles.input}>
                        <option value="">-- Select Category --</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                {/* Pricing Fields Grid (MRP, Retail, Wholesale) */}
                <div style={styles.row}>
                    <div style={styles.col}>
                        <label style={styles.label}>MRP *</label>
                        <input type="number" name="mrp" min="0" step="0.01" value={productData.mrp} onChange={handleInputChange} required style={styles.input} />
                    </div>
                    <div style={styles.col}>
                        <label style={styles.label}>Retail Price *</label>
                        <input type="number" name="retailPrice" min="0" step="0.01" value={productData.retailPrice} onChange={handleInputChange} required style={styles.input} />
                    </div>
                    <div style={styles.col}>
                        <label style={styles.label}>Wholesale Price *</label>
                        <input type="number" name="wholesalePrice" min="0" step="0.01" value={productData.wholesalePrice} onChange={handleInputChange} required style={styles.input} />
                    </div>
                </div>

                {/* Discount and Initial Stock Levels */}
                <div style={styles.row}>
                    <div style={styles.col}>
                        <label style={styles.label}>Discount Percentage (%)</label>
                        <input type="number" name="discountPercentage" min="0" max="100" value={productData.discountPercentage} onChange={handleInputChange} required style={styles.input} />
                    </div>
                    <div style={styles.col}>
                        <label style={styles.label}>Initial Available Stock *</label>
                        <input type="number" name="stock" min="0" value={productData.stock} onChange={handleInputChange} required style={styles.input} />
                    </div>
                </div>

                {/* Product Image Selection & Live Preview Box */}
                <div style={styles.formGroup}>
                    <label style={styles.label}>Product Image *</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} style={styles.fileInput} />
                    
                    {imagePreview && (
                        <div style={styles.previewContainer}>
                            <p style={styles.previewText}>Image Preview:</p>
                            <img src={imagePreview} alt="Selected Product Preview" style={styles.imagePreviewPic} />
                        </div>
                    )}
                </div>

                {/* Action Submission Control Button */}
                <button type="submit" disabled={loading} style={{ ...styles.submitBtn, backgroundColor: loading ? "#a0aec0" : "#3182ce" }}>
                    {loading ? "Uploading Product Entry..." : "List Product on Database"}
                </button>

            </form>
        </div>
    );
};

// 5. Basic inline clean styling guidelines object for modern layout structure
const styles = {
    container: { maxWidth: "650px", margin: "30px auto", padding: "20px", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", backgroundColor: "#ffffff", fontFamily: "Arial, sans-serif" },
    heading: { textAlign: "center", color: "#2d3748", marginBottom: "20px" },
    form: { display: "flex", flexDirection: "column", gap: "15px" },
    formGroup: { display: "flex", flexDirection: "column", gap: "5px" },
    row: { display: "flex", gap: "15px" },
    col: { flex: 1, display: "flex", flexDirection: "column", gap: "5px" },
    label: { fontSize: "14px", fontWeight: "bold", color: "#4a5568" },
    input: { padding: "10px", fontSize: "15px", borderRadius: "4px", border: "1px solid #cbd5e0", outline: "none" },
    fileInput: { padding: "5px 0" },
    previewContainer: { marginTop: "10px", textAlign: "center" },
    previewText: { fontSize: "13px", color: "#718096", margin: "5px 0" },
    imagePreviewPic: { maxWidth: "150px", maxHeight: "150px", borderRadius: "6px", objectFit: "cover", border: "1px dashed #cbd5e0" },
    submitBtn: { padding: "12px", color: "#ffffff", fontSize: "16px", fontWeight: "bold", border: "none", borderRadius: "4px", cursor: "pointer", transition: "background-color 0.2s" },
    alert: { padding: "12px", borderRadius: "4px", fontSize: "14px", textAlign: "center", fontWeight: "500" }
};







































// import styles from './AboutUs.module.css'
// import { useState } from 'react'

// export default function AboutUs() {

//   return (
//     <div>
//       <div>
//         <img src="myAssets/AboutUs.png" className={styles.profileImg}></img>
//       </div>

//       <div className={styles.working}>Coming Soon</div>
//     </div>
//   )
// }
