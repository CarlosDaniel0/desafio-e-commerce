import React, { Fragment, useEffect, useState } from 'react'
import { mimifyString, fromScoreToStars } from '../util/convert'
import Link from 'next/link'
import useSWR from 'swr'
import { useCart } from '../contexts/CartContext'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import Stars from '../components/Stars'
import Header from '../components/Header'

const fetcher = url => fetch(url).then(res => res.json())

const Index = () => {
  const { data, err } = useSWR('/data/products.json', fetcher)
  const cart = useCart()
  const [products, setProducts] = useState({
    sorted: {
      by: 'asc',
      attr: ''
    },
    data: []
  })

  /**
   * Recebe o tipo pelo qual se deseja ordenar os produtos
   * @param {String} attr // Atributo (name, id, score)
   * @param {int} type  // 1 = Ascendente -1: Descendente
   */
  function sortBy(attr) {
    const sorted = products.data.sort((after, before) => {
      if (products.sorted.by == 'asc') {
        if (after[attr] < before[attr]) return 1
        return -1
      }
      if (products.sorted.by == 'desc') {
        if (after[attr] > before[attr]) return 1
        return -1
      }
    })
    setProducts(old => ({
      ...old,
      sorted: {
        by: products.sorted.by == 'asc' ? 'desc' : 'asc',
        attr
      },
      data: [...sorted]
    }))
  }

  useEffect(() => {
    if (data) setProducts(old => ({ ...old, data }))
  }, [data])

  return (
    <section className='text-gray-600 body-font'>
      <Header>Loja de Games</Header>
      <div className='flex bg-gray-700 space-x-4'>
        <h1 className='ml-4 text-white text-lg tracking-widest font-medium'>
          Ordenar por:{' '}
        </h1>
        <button
          onClick={() => sortBy('price')}
          className='text-white hover:underline font-thin'
        >
          Preço{' '}
          {products.sorted.attr == 'price' ? (
            products.sorted.by == 'asc' ? (
              <IoIosArrowUp className='inline-block' />
            ) : (
              <IoIosArrowDown className='inline-block' />
            )
          ) : (
            ''
          )}
        </button>
        <button
          onClick={() => sortBy('name')}
          className='text-white hover:underline font-thin'
        >
          Nome{' '}
          {products.sorted.attr == 'name' ? (
            products.sorted.by == 'asc' ? (
              <IoIosArrowUp className='inline-block' />
            ) : (
              <IoIosArrowDown className='inline-block' />
            )
          ) : (
            ''
          )}
        </button>
        <button
          onClick={() => sortBy('score')}
          className='text-white hover:underline font-thin'
        >
          Pontuação{' '}
          {products.sorted.attr == 'score' ? (
            products.sorted.by == 'asc' ? (
              <IoIosArrowUp className='inline-block' />
            ) : (
              <IoIosArrowDown className='inline-block' />
            )
          ) : (
            ''
          )}
        </button>
      </div>
      <div className='container px-5 py-12 mx-auto'>
        <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4'>
          {!products.data && <h1>Carregando..</h1>}
          {products.data &&
            products.data.map((product, index) => {
              return (
                <div
                  key={index}
                  className='py-8 px-6 relative shadow rounded-md'
                >
                  <div className='absolute top-0 right-4 z-10'>
                    <Stars span>{product.score}</Stars>
                  </div>
                  <a className='block relative h-48 rounded overflow-hidden'>
                    <img
                      alt='ecommerce'
                      className='object-center mx-auto h-full block'
                      src={`/assets/${product.image}`}
                    />
                  </a>
                  <div className='mt-4'>
                    <h3 className='text-gray-500 text-xs tracking-widest title-font mb-1'>
                      Games
                    </h3>
                    <Link
                      href={`/games/${mimifyString(product.name)}/${
                        product.id
                      }`}
                    >
                      <a className='text-gray-900 title-font text-lg font-medium hover:underline'>
                        {product.name}
                      </a>
                    </Link>
                    <p className='mt-1'>
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </p>

                    <button
                      onClick={() => cart.addToCart(product)}
                      className='rounded-md mx-auto bg-indigo-500 p-3 text-white font-bold block text-center'
                    >
                      Adicionar ao Carrinho
                    </button>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </section>
  )
}

export default Index
