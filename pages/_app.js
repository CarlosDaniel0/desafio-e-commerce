import React from 'react'
import 'tailwindcss/tailwind.css'
import { CartProvider } from '../contexts/CartContext'
import Layout from '../components/Layout'

const App = ({ Component, pageProps }) => {
  return (
    <CartProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  )
}

export default App
