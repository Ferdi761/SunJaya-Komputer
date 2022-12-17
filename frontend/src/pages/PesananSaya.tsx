import React, { useEffect } from 'react'
import { useState } from 'react'
import { RiShoppingBagFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'

import RincianPesanan from '../components/RincianPesanan'
import { formatCurrency } from '../util/formatCurrency'

import type { Pesanan } from '../util/type'
import { userStorage } from '../util/userStorage'

const PesananSaya = () => {
  const statusPesanan = [
    {
      id: 1,
      status: 'Menunggu Konfirmasi',
    },
    {
      id: 2,
      status: 'Menunggu Pembayaran',
    },
    {
      id: 3,
      status: 'Diproses',
    },
    {
      id: 4,
      status: 'Dikirim',
    },
    {
      id: 5,
      status: 'Selesai',
    },
  ]

  const [pesanan, setPesanan] = useState<Pesanan[]>([])
  const [value, setValue] = useState(1)

  const { user } = userStorage()

  useEffect(() => {
    fetch('http://localhost:8000/api/pemesanan', {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    })
      .then(async (res) => {
        const data = await res.json()
        setPesanan(data.data.pesanan)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const valueChange = (event: React.MouseEvent) => {
    setValue(parseInt((event.target as HTMLInputElement).value))
  }

  return (
    <>
      <div className='flex justify-center my-10'>
        <div className='w-5/6 flex flex-col gap-3'>
          <div className='flex flex-row gap-3 items-center text-2xl'>
            <RiShoppingBagFill />
            <h1>Pesanan Saya</h1>
          </div>
          <ul className='flex flex-row gap-5'>
            <li
              className={`cursor-pointer ${
                statusPesanan[0].id === value && 'font-bold'
              }`}
              value={1}
              onClick={valueChange}
            >
              Menunggu konfirmasi
            </li>
            <li
              className={`cursor-pointer ${
                statusPesanan[1].id === value && 'font-bold'
              }`}
              value={2}
              onClick={valueChange}
            >
              Bayar
            </li>
            <li
              className={`cursor-pointer ${
                statusPesanan[2].id === value && 'font-bold'
              }`}
              value={3}
              onClick={valueChange}
            >
              Diproses
            </li>
            <li
              className={`cursor-pointer ${
                statusPesanan[3].id === value && 'font-bold'
              }`}
              value={4}
              onClick={valueChange}
            >
              Dikirim
            </li>
            <li
              className={`cursor-pointer ${
                statusPesanan[4].id === value && 'font-bold'
              }`}
              value={5}
              onClick={valueChange}
            >
              Selesai
            </li>
          </ul>
          <div className='flex flex-row gap-10'>
            <div className='flex flex-col gap-5 w-7/12'>
              {pesanan.map((item) => (
                <div
                  key={item.id}
                  className='mb-4 py-5 px-10 flex flex-col rounded-xl bg-light gap-2'
                  style={{
                    boxShadow: 'rgba(0, 0, 0, 0.24) 5px 5px 6px',
                  }}
                >
                  <div className='px-2 m-0 w-11/12'>
                    <p>ID: #{item.id}</p>
                  </div>
                  {item.Barangs.map((data) => (
                    <div
                      className='mx-3 flex flex-row gap-3 border-t justify-center items-center'
                      key={data.id}
                    >
                      <div className='w-3/12 py-2 mb-3'>
                        <img
                          src={`http://localhost:8000/produk/${
                            data.FotoBarang.foto.split('\\')[2]
                          }`}
                          alt='cpu'
                          width='128px'
                          height='128px'
                        />
                      </div>
                      <div className='w-9/12 py-2 mb-3'>
                        <p className='font-bold'>{data.nama}</p>
                        <p>
                          Jumlah:{' '}
                          <span className='font-bold'>
                            {item.Barangs.length} buah
                          </span>
                        </p>
                        <div className='font-bold text-right'>
                          <p className='text-blue-600 font-bold'>
                            Total: {formatCurrency(data.harga)}
                          </p>
                          {statusPesanan[4].id === value && (
                            <Link
                              to='/garansi'
                              className='font-bold text-blue-600 hover:text-blue-800'
                            >
                              Ajukan Garansi
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <ul className='border-t p-2 border-b'>
                    {statusPesanan[4].id === value ? (
                      ''
                    ) : (
                      <li className='flex flex-row justify-between items-start p-0 bg-transparent'>
                        <p>Tipe</p>
                        <p>Pemesanan</p>
                      </li>
                    )}
                    <li className='flex flex-row justify-between items-start p-0 bg-transparent'>
                      <p>Total Pesanan</p>
                      <p>
                        {formatCurrency(
                          item.Barangs.reduce(
                            (acc, cur) => cur.harga,
                            0
                          )
                        )}
                      </p>
                    </li>
                  </ul>
                </div>
              ))}

              {/* {statusPesanan[4].id === value ? (
                ''
              ) : (
                <div
                  className='mb-2 py-3 px-2 flex flex-col items-center rounded-xl'
                  style={{
                    backgroundColor: '#F9F9F9',
                    boxShadow: 'rgba(0, 0, 0, 0.24) 5px 5px 6px',
                  }}
                >
                  <div className='px-2 m-0 w-11/12'>
                    <p>ID: #7</p>
                  </div>
                  <div className='flex flex-row gap-3 w-11/12 p-2 border-t items-center'>
                    <div className='w-3/12 py-2 mb-3'>
                      <img
                        src={dataPesanan[0].gambar}
                        alt='cpu'
                        width='128px'
                        height='128px'
                      />
                    </div>
                    <div className='w-9/12 py-2 mb-3'>
                      <p className='font-bold'>
                        {dataPesanan[0].nama}
                      </p>
                      <p>
                        Jumlah:{' '}
                        <span className='font-bold'>
                          {dataPesanan[0].jumlah} buah
                        </span>
                      </p>
                      <p className='float-end text-blue-600 font-bold text-right'>
                        Rp 0
                      </p>
                    </div>
                  </div>
                  <ul className='border-top p-2 w-11/12 order-bottom border-t'>
                    <li className='flex flex-row justify-between p-0'>
                      <p>Tipe</p>
                      <p>Garansi</p>
                    </li>
                    <li className='flex flex-row gap-10 justify-between p-0'>
                      <p>Total Pesanan</p>
                      <p>Rp 0</p>
                    </li>
                  </ul>
                </div>
              )} */}
            </div>
            <div className='w-5/12'>
              {/* <RincianPesanan
                dataPesanan={pesanan}
                value={value}
                statusPesanan={statusPesanan}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PesananSaya
