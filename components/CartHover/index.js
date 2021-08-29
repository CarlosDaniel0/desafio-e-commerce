import React, { Fragment } from 'react'
import Link from 'next/link'
import { useCart } from '../../contexts/CartContext'
import { product } from 'platform'

const CartHover = ({ className }) => {
  const cart = useCart()
  return (
    <div
      className={`shadow absolute z-20 rounded-xl w-56 transform -translate-x-2/4 translate-y-4 p-2 bg-white hidden ${className}`}
    >
      <p className='text-medium uppercase text-gray-600 mb-2'>
        Carrinho de Compras
      </p>
      {Object.keys(cart.cart).length == 0 && (
        <p className='text-gray-600 my-4 border-l-2 border-indigo-500 p-2'>
          Sem itens
        </p>
      )}
      {Object.keys(cart.cart).length > 0 &&
        Object.keys(cart.cart).map((key, index) => {
          if (index < 3) {
            const { product, quantity } = cart.cart[key]
            return (
              <Fragment>
                <div className='grid grid-cols-3'>
                  <img src={`/assets/${product.image}`} />
                  <div className='col-span-2'>
                    <Link href='/cart'>
                      <a className='text-md hover:underline'>{product.name}</a>
                    </Link>
                    <p className='text-sm text-gray-600'>
                      {product.price.toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                </div>
                <hr className='my-2 border border-dashed' />
              </Fragment>
            )
          }
        })}
      <Link href='/cart'>
        <a className='cursor-pointer text-gray-800 hover:text-indigo-500 hover:underline'>
          {cart.itemsCount() > 3
            ? `Ver outros ${cart.itemsCount() - 3} itens`
            : 'Ver carrinho'}
        </a>
      </Link>
    </div>
  )
}

export default CartHover
