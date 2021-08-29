import { createContext, useContext, useEffect, useState } from 'react'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({})
  useEffect(() => {
    const cartLocal = window.localStorage.getItem('cart')
    if (cartLocal) setCart(JSON.parse(cartLocal))
  }, [])

  /**
   * Adicionar um novo item ao carrinho verificando se o mesmo já exite
   * para incrementar na quantidade
   * @param {Product} product
   */
  function addToCart(product) {
    setCart(old => {
      let quantity = 0
      if (old[product.id]) {
        quantity = old[product.id].quantity
      }

      const newCart = {
        ...old,
        [product.id]: {
          quantity: quantity + 1,
          product
        }
      }

      window.localStorage.setItem('cart', JSON.stringify(newCart))
      return newCart
    })
  }

  /**
   * Remover item do carrinho
   * @param {int} productId
   */
  function removeFromCart(productId) {
    setCart(old => {
      const newCart = {}
      Object.keys(old).forEach(id => {
        if (id != productId) newCart[id] = old[id]
      })

      window.localStorage.setItem('cart', JSON.stringify(newCart))
      return newCart
    })
  }

  /**
   * Alterar a quantidade individual de qualquer item através do ID
   * @param {int} productId
   * @param {int} newQuantity
   */
  function changeQuantity(productId, newQuantity) {
    setCart(old => {
      const newCart = {}
      Object.keys(old).forEach(id => {
        const newProduct = { ...old[id] }
        if (id == productId) {
          newProduct.quantity = newQuantity
        }
        newCart[id] = newProduct
      })
      window.localStorage.setItem('cart', JSON.stringify(newCart))
      return newCart
    })
  }

  /**
   * Soma a quantidade de produtos que estão no carrinho
   * @returns {int} Quantidade de Produtos
   */
  function itemsCount() {
    return Object.keys(cart).reduce((prev, curr) => {
      return prev + cart[curr].quantity
    }, 0)
  }

  function totalPrice() {
    return Object.keys(cart).reduce((prev, curr) => {
      console.log(cart[curr].product.price, cart[curr].quantity)
      return prev + cart[curr].quantity * cart[curr].product.price
    }, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        changeQuantity,
        itemsCount,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const cart = useContext(CartContext)
  return cart
}
