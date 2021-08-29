import React, { Fragment } from 'react'
import { useCart } from '../contexts/CartContext'
import { MdClose } from 'react-icons/md'
import { mimifyString } from '../util/convert'
import Link from 'next/link'
import { RiGameFill } from 'react-icons/ri'
import { IoLogoGameControllerA } from 'react-icons/io'
import Header from '../components/Header'

const Cart = () => {
  const cart = useCart()

  function generateOptions() {
    let options = []
    for (let i = 1; i <= 100; i++) {
      options.push(
        <option value={i} key={i}>
          {i}
        </option>
      )
    }
    return options
  }

  const remove = id => () => {
    cart.removeFromCart(id)
  }

  const changeQuantity = id => event => {
    cart.changeQuantity(id, Number(event.target.value))
  }

  function calcShipping() {
    let shippingValue
    if (cart.totalPrice() > 250) {
      shippingValue = 0
    } else {
      shippingValue = cart.itemsCount() * 10
    }
    return shippingValue
  }

  return (
    <Fragment>
      <Header>Carrinho</Header>
      <h1 className='leading-1 text-4xl my-12 ml-4 font-medium'>Carrinho</h1>
      <hr />
      <div className='grid grid-cols-1 md:grid-cols-3 m-4'>
        <div className='md:col-span-2 space-y-3'>
          {cart.cart && Object.keys(cart.cart).length == 0 && (
            <Fragment>
              <div className='border-indigo-500 border-l-4 p-3 bg-gray-50 mr-2 flex justify-between'>
                <div className=''>
                  <p className='font-bold'>Sem produtos no carrinho</p>
                  <p className='font-medium'>Adicione para vê-los aqui</p>
                </div>
                <span className='text-4xl text-gray-800 flex'>
                  <RiGameFill />
                  <IoLogoGameControllerA />
                </span>
              </div>
              Deseja{' '}
              <Link href='/'>
                <a className='cursor-pointer text-gray-800 hover:text-indigo-500'>
                  voltar às compras?
                </a>
              </Link>
            </Fragment>
          )}
          {cart.cart &&
            Object.keys(cart.cart).length > 0 &&
            Object.keys(cart.cart).map(key => {
              const { product, quantity } = cart.cart[key]
              return (
                <Fragment key={key}>
                  <div className='flex my-4 space-x-4 justify-between px-8 py-2 flex-wrap'>
                    <div className='flex'>
                      <img src={`/assets/${product.image}`} />
                      <div>
                        <Link
                          href={`/games/${mimifyString(product.name)}/${
                            product.id
                          }`}
                        >
                          <p className='text-xl font-thin cursor-pointer'>
                            {product.name}
                          </p>
                        </Link>
                        <p className='text-base'>
                          R$ {product.price.toFixed(2).replace('.', ',')}
                        </p>
                      </div>
                    </div>
                    <div className='mt-4'>
                      <select
                        className='border border-gray-400 rounded-md px-3 py-2'
                        onChange={changeQuantity(product.id)}
                        value={quantity}
                      >
                        {generateOptions()}
                      </select>
                    </div>
                    <div className='mt-4'>
                      <button onClick={remove(product.id)}>
                        <MdClose className='text-gray-600 text-xl hover:cursor-pointer' />
                      </button>
                    </div>
                  </div>
                  <hr />
                </Fragment>
              )
            })}
        </div>
        <div className='grid grid-cols-1'>
          <div className='md:col-span-1 grid grid-cols-1 h-72 rounded-lg bg-gray-50 p-8'>
            <h2 className='font-base text-xl'>Resumo de Compras</h2>
            <div className='flex justify-between my-4'>
              <span className='text-sm text-gray-600'>Subtotal:</span>
              <span className='text-sm font-thin'>
                R$ {cart.totalPrice().toFixed(2).replace('.', ',')}
              </span>
            </div>
            <hr />
            <div className='flex justify-between my-4'>
              <span className='text-sm text-gray-600'>Frete:</span>
              <span className='text-sm font-thin'>
                {calcShipping() == 0.0 ? (
                  <span className='text-green-500'>Frete Grátis</span>
                ) : (
                  'R$ ' + calcShipping().toFixed(2).replace('.', ',')
                )}
              </span>
            </div>
            <hr />
            {/* <div className='flex justify-between my-4'>
              <span className='text-sm text-gray-600'>Subtotal:</span>
              <span className='text-sm font-thin'>R$ 99,00</span>
            </div>
            <hr /> */}
            <div className='flex justify-between font-thin my-4'>
              <span>Subtotal:</span>
              <span>
                R${' '}
                {(cart.totalPrice() + calcShipping())
                  .toFixed(2)
                  .replace('.', ',')}
              </span>
            </div>

            <button className='rounded-md text-white bg-indigo-500 px-4 py-2 text-xl font-thin'>
              Finalizar
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Cart
