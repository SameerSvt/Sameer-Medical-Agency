import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './main.css'
import App from './App.jsx'

import ProductFilterProvider from './context/ProductFilterContext.jsx'
import AuthProvider from './context/AuthContext.jsx'
import CartProvider from './context/CartContext.jsx'

axios.defaults.withCredentials = true

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProductFilterProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </ProductFilterProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
