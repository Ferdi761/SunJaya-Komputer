import React from 'react'
import moment from 'moment'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import StarRating from './StarRating'

type RincianPesananProps = {
  dataPesanan: {
    _id: number
    gambar: string
    nama: string
    jumlah: number
    harga: string
  }[]
  statusPesanan: { id: number; status: string }[]
  value: number
}

const RincianPesanan = ({
  dataPesanan,
  statusPesanan,
  value,
}: RincianPesananProps) => {
  const [rating, setRating] = useState(0)

  const handleRating = (rate: number) => {
    setRating(rate)
    console.log(rating)
  }

  return (
    <>
      <div className='px-10 py-5 text-white rounded-xl pb-5 bg-dark'>
        <h5 className='mb-4 text-xl'>Rincian Pesanan</h5>
        <ul className='mb-3'>
          <li className='mb-3'>Alamat Pengiriman</li>
          <li className='text-gray-400'>Nugraha Akbar Nurhakim</li>
          <li className='text-gray-400'>(+61) 87855431437</li>
          <li className='text-gray-400'>
            Jalan Keputih Tegal Timur No. 2A, Keputih, Sukolilo,
            Surabaya, Jawa Timur, 60111
          </li>
        </ul>

        <ul className='mb-3 bg-white text-black'>
          {dataPesanan.map((data) => {
            return (
              <li className='py-3 px-8' key={data._id}>
                <div className='flex flex-row gap-3 border-t py-3'>
                  <div className='w-3/12'>
                    <img
                      src={data.gambar}
                      alt='cpu'
                      width='77px'
                      height='77px'
                    />
                  </div>
                  <div className='w-9/12'>
                    <p className='font-bold text-sm'>{data.nama}</p>
                    <p style={{ fontSize: '12px' }}>
                      Jumlah:{' '}
                      <span className='font-bold'>
                        {data.jumlah} buah
                      </span>
                    </p>
                    <p
                      className='text-right text-blue-600 font-bold'
                      style={{ fontSize: '12px' }}>
                      Total: {data.harga}
                    </p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>

        <ul className='flex flex-col gap-3 mb-3'>
          <li className='flex justify-between items-start border-0'>
            <p>Subtotal Produk</p>
            <p>Rp 3.400.000</p>
          </li>
          <li className='flex justify-between items-start border-0'>
            <p>Subtotal Pengiriman</p>
            <p>
              {statusPesanan[0].id === value
                ? 'Menunggu persetujuan'
                : 'Rp 20.000'}
            </p>
          </li>
          <li className='flex justify-between items-start border-0'>
            <p>Tipe</p>
            <p>Pemesanan</p>
          </li>
          <li className='flex justify-between items-start border-0'>
            <p>Total Pesanan</p>
            <p>
              {statusPesanan[0].id === value
                ? 'Rp 3.400.000'
                : 'Rp 3.420.000'}
            </p>
          </li>
        </ul>

        {statusPesanan[0].id === value ? (
          <>
            <button className='bg-black border border-white mb-2 float-right rounded-xl px-5'>
              Batalkan Pesanan
            </button>
            <Link to='/chat'>
              <button className='bg-blue-600 hover:bg-blue-800 py-2 w-full rounded-full'>
                Diskusi Pengiriman
              </button>
            </Link>
          </>
        ) : statusPesanan[1].id === value ||
          statusPesanan[2].id === value ||
          statusPesanan[3].id === value ||
          statusPesanan[4].id === value ? (
          <>
            <ul className=''>
              {statusPesanan[2].id === value ||
              statusPesanan[3].id === value ||
              statusPesanan[4].id === value ? (
                ''
              ) : (
                <li className='flex justify-between text-red-500'>
                  <p>Tenggat Pembayaran</p>
                  <p>{moment().format('LLL')}</p>
                </li>
              )}
              <li className='flex justify-between border-0'>
                <p>Waktu Pemesanan</p>
                <p>{moment().format('LLL')}</p>
              </li>
              {statusPesanan[3].id === value ||
              statusPesanan[4].id === value ? (
                <li className='flex justify-between'>
                  <p>Waktu Pengiriman</p>
                  <p>{moment().format('LLL')}</p>
                </li>
              ) : (
                ''
              )}
              {statusPesanan[4].id === value && (
                <li className='flex justify-between'>
                  <p>Waktu Sampai</p>
                  <p>{moment().format('LLL')}</p>
                </li>
              )}
            </ul>
            {statusPesanan[4].id === value ? (
              <>
                <p>Ulasan</p>
                <div className='border text-center'>
                  <StarRating />
                </div>
                <textarea
                  placeholder='Tulis ulasanmu disini'
                  className='bg-transparent border w-full p-2 rounded-0 h-36'></textarea>
              </>
            ) : (
              <div className='flex flex-row justify-between my-3'>
                <button className='bg-black text-white border px-3 mb-2 float-start rounded-full'>
                  Diskusi Pesanan
                </button>
                <button className='bg-black text-white border px-3 mb-2 float-start rounded-full'>
                  Batalkan Pesanan
                </button>
              </div>
            )}
            {statusPesanan[2].id === value ||
            statusPesanan[4].id === value ? (
              ''
            ) : (
              <Link
                to={`/${
                  statusPesanan[3].id === value
                    ? 'chat'
                    : 'pembayaran'
                }`}>
                <button className='bg-blue-700 hover:bg-blue-900 py-2 w-full rounded-full'>
                  {statusPesanan[3].id === value
                    ? 'Konfirmasi Barang Sampai'
                    : 'Bayar'}
                </button>
              </Link>
            )}
          </>
        ) : (
          ''
        )}
      </div>
    </>
  )
}

export default RincianPesanan
