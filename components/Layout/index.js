import React, { Fragment } from 'react'
import Link from 'next/link'
import { AiOutlineHome, AiOutlineShoppingCart } from 'react-icons/ai'
import { useCart } from '../../contexts/CartContext'
import CartHover from '../CartHover'
import { FaGithub } from 'react-icons/fa'

const Layout = ({ children }) => {
  const cart = useCart()

  return (
    <Fragment>
      <nav className='bg-gray-800'>
        <div className='max-w-7xl mx-auto px-2 py-3 sm:px-6 lg:px-8 flex justify-between'>
          <Link href='/'>
            <a className='text-white flex'>
              <AiOutlineHome className='text-2xl my-auto' /> Início
            </a>
          </Link>

          <Link href='/cart'>
            <div className='group'>
              <a className='relative cursor-pointer z-20'>
                <span className='text-white flex'>
                  <AiOutlineShoppingCart className='text-2xl my-auto' />
                  Carrinho
                  {cart.itemsCount() > 0 && (
                    <span className='bg-green-600 absolute transform -translate-x-1/2 translate-y-4 rounded-full w-6 h-6 pt-0.5 text-center  text-sm text-white'>
                      {cart.itemsCount()}
                    </span>
                  )}
                </span>
              </a>
              {/* Apenas uma div de contexto para facilitar a descida do mouse para o elemento CartHover */}
              <div className='absolute w-72 h-36 transform -translate-y-12 -translate-x-2/4  z-10 hidden md:group-hover:block'></div>
              <CartHover className='md:group-hover:block' />
            </div>
          </Link>
        </div>
      </nav>
      {children}
      <footer className='text-gray-600 body-font'>
        <div className='bg-gray-100'>
          <div className='container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row'>
            <p className='text-gray-500 text-sm text-center sm:text-left'>
              © 2021 Desafio Loja de Games —
              <a
                href='https://github.com/carlosdaniel0'
                rel='noopener noreferrer'
                className='text-gray-600 ml-1 hover:underline'
                target='_blank'
              >
                <FaGithub className='inline-block' /> carlosdaniel0
              </a>
            </p>
          </div>
        </div>
      </footer>
    </Fragment>
  )
}

export default Layout
