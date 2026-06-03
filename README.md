# 💊 Sameer Medical Agency

A hybrid B2B (Wholesale) and B2C (Retail) e-commerce web application engineered for pharmaceutical distribution and retail inventory management. Built using the MERN stack, the platform supports multi-tier pricing, secure prescription handling, and deep chemical compound search.

### 🔗 Live Production Deployment
<p align="left">
  <a href="http://localhost:5173">
    <img src="https://sameer-medical-agency.vercel.app" alt="Live Project" />
  </a>
</p>

---

## 🚀 Key Architectural Features

### 🏢 Hybrid B2B / B2C User Infrastructure
* **Dual-Tier Pricing:** Automatically shifts product listings to wholesale pricing metrics for verified business partners, while maintaining standard MRP/retail rates for B2C individuals.
* **Onboarding Verification:** Integrated portal for retail business registration requiring valid Drug License Numbers, Firm Names, and GST details.

### 🧪 Pharmaceutical Operations & Search
* **Deep Salt Search:** High-performance catalog filtering indexed by chemical compound compositions (e.g., *Paracetamol*) rather than commercial labels alone.
* **Prescription Portal:** Interactive customer upload module handling document verification (PDF, JPG, PNG up to 5MB) paired with medical practitioner registration validation fields.

### 🛡️ Secure Session Management
* **Double-Token Authentication:** Restricts session access using short-lived JWT Access Tokens alongside long-lifespan Refresh Tokens.
* **XSS Mitigation:** Transmits sensitive session payloads via `HttpOnly` and `Secure` cross-origin cookies, stripping raw password credentials from all standard backend server responses.

---

## 📁 Repository Structure

```text
SAMEER MEDICAL AGENCY/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Route handler operations (Auth, Products, Orders)
│   │   ├── db/               # MongoDB connectivity initialization
│   │   ├── middlewares/      # Token authentication & access permission controls
│   │   ├── models/           # Data design blueprints (User, Product, Order, etc.)
│   │   ├── routes/           # Domain-specific endpoint routers
│   │   ├── utils/            # Shared operational tools (ApiError, ApiResponse)
│   │   ├── app.js            # Express application configurations & global middleware
│   │   └── index.js          # Entry execution script (DB connection block & listen)
│   ├── .env                  # Private runtime configuration variables
│   ├── .gitignore            # Version control exclusions
│   └── package.json          # Server dependencies
└── frontend/
    ├── src/                  # Components, Hooks, Views, and Style Sheets
    ├── public/               # Asset management files
    ├── index.html            # Main markup document 
    ├── package.json          # Frontend build dependencies
    └── vite.config.js        # Vite configurations
```

## 🛠️ Tech Stack & Tools

<table>
  <tr>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=react" width="48" height="48" alt="React" />
      <br><b>React.js</b>
    </td>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=vite" width="48" height="48" alt="Vite" />
      <br><b>Vite</b>
    </td>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=nodejs" width="48" height="48" alt="Node.js" />
      <br><b>Node.js</b>
    </td>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=express" width="48" height="48" alt="Express" />
      <br><b>Express.js</b>
    </td>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=mongodb" width="48" height="48" alt="MongoDB" />
      <br><b>MongoDB</b>
    </td>
  </tr>
</table>


## 🛠️ Tech Stack & Tools

* **Frontend Framework:** React.js, Vite, React Router DOM, Tailwind CSS
* **Backend Infrastructure:** Node.js, Express.js
* **Database Management:** MongoDB Atlas, Mongoose ODM
* **Security Layer:** JSON Web Tokens (JWT), Bcrypt.js, Cookie-Parser
