import React from 'react'
import Stars from '../../../components/Stars'
import { useCart } from '../../../contexts/CartContext'
import { MdLocationOn } from 'react-icons/md'
import Header from '../../../components/Header'

const ViewGame = ({ product }) => {
  const cart = useCart()
  return (
    <section class='text-gray-600 body-font overflow-hidden'>
      <Header>{product.name}</Header>
      <div class='container px-5 py-24 mx-auto'>
        <div class='lg:w-4/5 mx-auto flex flex-wrap'>
          <img
            alt='ecommerce'
            class='lg:w-1/2 w-full lg:h-auto h-64 object-center rounded'
            src={`/assets/${product.image}`}
          />
          <div class='lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0'>
            <h2 class='text-sm title-font text-gray-500 tracking-widest'>
              Games
            </h2>
            <h1 class='text-gray-900 text-3xl title-font font-medium mb-1'>
              {product.name}
            </h1>
            <div class='flex mb-4'>
              <span class='flex space-between'>
                <Stars>{product.score}</Stars>
                <span class='text-gray-600 ml-4 transform -translate-y-0.5 '>
                  {product.score}
                </span>
              </span>
            </div>

            <div class='flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5'></div>
            <div class=''>
              <p class='title-font font-medium text-3xl text-gray-900'>
                R$ {product.price.toFixed(2).replace('.', ',')}
              </p>
              <hr className='my-4' />
              <div className='p-3'>
                <p>
                  {' '}
                  <MdLocationOn className='inline-block' />
                  Brasil Inteiro
                </p>
                <div className='flex justify-between'>
                  <span>
                    Receba em até <b className='font-bold'>15 dias</b>
                  </span>
                  {cart.totalPrice() > 250 ? (
                    <span className='text-green-500'>Frete Grátis</span>
                  ) : (
                    <span>R$ 10,00</span>
                  )}
                </div>
              </div>
              <hr className='my-4' />
              <button
                onClick={() => cart.addToCart(product)}
                class='flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded'
              >
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export async function getServerSideProps(context) {
  function getProduct(id, data) {
    const res = data.filter(item => {
      return item.id == id
    })
    return res[0]
  }
  let product = []

  const dev = process.env.NODE_ENV !== 'production'
  const url = dev
    ? 'http://localhost:3000'
    : 'https://desafio-e-commerce.vercel.app'
  try {
    const data = await fetch(`${url}/data/products.json`).then(res =>
      res.json()
    )
    product = getProduct(context.params.id, data)
  } catch (err) {
    console.log(err)
  }
  return {
    props: {
      product
    }
  }
}

export default ViewGame
