import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'

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

  const date = new Date()

  function padTo2Digits(num: number) {
    return num.toString().padStart(2, '0')
  }

  function formatDate(date: Date) {
    return (
      [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
      ].join('-') +
      ' ' +
      [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        padTo2Digits(date.getSeconds()),
      ].join(':')
    )
  }

  return (
    <>
      <div
        className='p-3 text-white rounded pb-5'
        style={{ backgroundColor: '#262626' }}>
        <h5 className='mb-3'>Rincian Pesanan</h5>
        <ul className='list-group mb-2'>
          <li className='list-group-item bg-transparent text-white p-0'>
            Alamat Pengiriman
          </li>
          <li className='list-group-item bg-transparent text-white-50 p-0'>
            Nugraha Akbar Nurhakim
          </li>
          <li className='list-group-item bg-transparent text-white-50 p-0'>
            (+61) 87855431437
          </li>
          <li className='list-group-item bg-transparent text-white-50 p-0'>
            Jalan Keputih Tegal Timur No. 2A, Keputih, Sukolilo,
            Surabaya, Jawa Timur, 60111
          </li>
        </ul>

        <ul className='list-group mb-2'>
          {dataPesanan.map((data) => {
            return (
              <li className='list-group-item' key={data._id}>
                <div className='row'>
                  <div className='col-3'>
                    <img
                      src={data.gambar}
                      alt='cpu'
                      width='77px'
                      height='77px'
                    />
                  </div>
                  <div className='col-9'>
                    <p
                      className='fw-bold'
                      style={{ fontSize: '14px' }}>
                      {data.nama}
                    </p>
                    <p style={{ fontSize: '12px' }}>
                      Jumlah:{' '}
                      <span className='fw-bold'>
                        {data.jumlah} buah
                      </span>
                    </p>
                    <p
                      className='float-end text-primary fw-bold'
                      style={{ fontSize: '12px' }}>
                      Total: {data.harga}
                    </p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>

        <ul className='list-group'>
          <li className='list-group-item d-flex justify-content-between align-items-start bg-transparent text-white-50 p-0 border-0'>
            <p>Subtotal Produk</p>
            <p>Rp 3.400.000</p>
          </li>
          <li className='list-group-item d-flex justify-content-between align-items-start bg-transparent text-white-50 p-0 border-0'>
            <p>Subtotal Pengiriman</p>
            <p>
              {statusPesanan[0].id === value
                ? 'Menunggu persetujuan'
                : 'Rp 20.000'}
            </p>
          </li>
          <li className='list-group-item d-flex justify-content-between align-items-start bg-transparent text-white-50 p-0 border-0'>
            <p>Tipe</p>
            <p>Pemesanan</p>
          </li>
          <li className='list-group-item d-flex justify-content-between align-items-start bg-transparent text-white p-0 border-0'>
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
            <button className='btn btn-outline-light mb-2 float-end rounded-pill'>
              Batalkan Pesanan
            </button>
            <Link to='/chat'>
              <button className='btn btn-primary col-12 rounded-pill'>
                Diskusi Pengiriman
              </button>
            </Link>
          </>
        ) : statusPesanan[1].id === value ||
          statusPesanan[2].id === value ||
          statusPesanan[3].id === value ||
          statusPesanan[4].id === value ? (
          <>
            <ul className='list-group'>
              {statusPesanan[2].id === value ||
              statusPesanan[3].id === value ||
              statusPesanan[4].id === value ? (
                ''
              ) : (
                <li className='list-group-item d-flex justify-content-between align-items-start bg-transparent text-danger p-0 border-0'>
                  <p>Tenggat Pembayaran</p>
                  <p>{formatDate(date)}</p>
                </li>
              )}
              <li className='list-group-item d-flex justify-content-between align-items-start bg-transparent text-white-50 p-0 border-0'>
                <p>Waktu Pemesanan</p>
                <p>{formatDate(date)}</p>
              </li>
              {statusPesanan[3].id === value ||
              statusPesanan[4].id === value ? (
                <li className='list-group-item d-flex justify-content-between align-items-start bg-transparent text-white-50 p-0 border-0'>
                  <p>Waktu Pengiriman</p>
                  <p>{formatDate(date)}</p>
                </li>
              ) : (
                ''
              )}
              {statusPesanan[4].id === value && (
                <li className='list-group-item d-flex justify-content-between align-items-start bg-transparent text-white-50 p-0 border-0'>
                  <p>Waktu Sampai</p>
                  <p>{formatDate(date)}</p>
                </li>
              )}
            </ul>
            {statusPesanan[4].id === value ? (
              <>
                <p>Ulasan</p>
                <div className='border text-center'>
                  <Rating onClick={handleRating} />
                </div>
                <textarea
                  placeholder='Tulis ulasanmu disini'
                  className='form-control bg-transparent rounded-0 text-white'
                  id='exampleFormControlTextarea1'
                  rows={5}></textarea>
              </>
            ) : (
              <>
                <button className='btn btn-outline-light mb-2 float-start rounded-pill'>
                  Diskusi Pesanan
                </button>
                <button className='btn btn-outline-light mb-2 float-end rounded-pill'>
                  Batalkan Pesanan
                </button>
              </>
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
                <button className='btn btn-primary col-12 rounded-pill'>
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
