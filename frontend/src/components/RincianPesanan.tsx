import moment from 'moment'
import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'

import StarRating from './StarRating'
import type { Pesanan } from '../util/type'
import { userStorage } from '../util/userStorage'
import { formatCurrency } from '../util/formatCurrency'
import { cartStorage } from '../util/cartStorage'

type RincianPesananProps = {
  dataPesanan: Pesanan
}

const RincianPesanan = ({ dataPesanan }: RincianPesananProps) => {
  const [rating, setRating] = useState(0)

  const [, updateState] = useState<any>()
  const forceUpdate = useCallback(() => updateState({}), [])

  const { user } = userStorage()

  const handleRating = (rate: number) => {
    setRating(rate)
    console.log(rating)
  }

  const handleConfirm = () => {
    fetch(
      `http://localhost:8000/api/pemesanan/sampai/${dataPesanan.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`,
        },
      }
    )
      .then(async (res) => {
        const data = await res.json()
        if (data.success) {
          alert(data.message)
          forceUpdate()
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <div className='px-10 py-5 text-white rounded-xl pb-5 bg-dark'>
        <h5 className='mb-4 text-xl'>Rincian Pesanan</h5>
        <ul className='mb-3'>
          <li className='mb-3'>Alamat Pengiriman</li>
          <li className='text-gray-400'>{user?.nama}</li>
          <li className='text-gray-400'>{user?.noTelp}</li>
          <li className='text-gray-400'>
            {dataPesanan.alamatTujuan}
          </li>
        </ul>

        <ul className='mb-3 bg-white text-black'>
          {dataPesanan.Barangs.map((data) => {
            return (
              <li className='py-3 px-8' key={data.id}>
                <div className='flex flex-row gap-3 border-t py-3'>
                  <div className='w-3/12'>
                    <img
                      src={`http://localhost:8000/produk/${
                        data.FotoBarang.foto.split('\\')[2]
                      }`}
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
                        {data.BarangYangDipesan.jumlah} buah
                      </span>
                    </p>
                    <p
                      className='text-right text-blue-600 font-bold'
                      style={{ fontSize: '12px' }}
                    >
                      Total: {formatCurrency(data.harga)}
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
            <p>
              {formatCurrency(
                dataPesanan.Barangs.reduce(
                  (acc, cur) =>
                    acc + cur.harga * cur.BarangYangDipesan.jumlah,
                  0
                )
              )}
            </p>
          </li>
          <li className='flex justify-between items-start border-0'>
            <p>Subtotal Pengiriman</p>
            <p>
              {dataPesanan.status < 3 ||
              dataPesanan.biayaPengiriman == null
                ? 'Menunggu Persetujuan'
                : formatCurrency(dataPesanan.biayaPengiriman)}
            </p>
          </li>
          <li className='flex justify-between items-start border-0'>
            <p>Tipe</p>
            <p>Pemesanan</p>
          </li>
          <li className='flex justify-between items-start border-0'>
            <p>Total Pesanan</p>
            <p>
              {dataPesanan.status == 1 ||
              dataPesanan.biayaPengiriman == null
                ? `${formatCurrency(dataPesanan.totalHargaBarang)}`
                : `${formatCurrency(
                    dataPesanan.totalBiayaYangHarusDibayar == null
                      ? 0
                      : dataPesanan.totalBiayaYangHarusDibayar
                  )}`}
            </p>
          </li>
        </ul>

        {dataPesanan.status == 1 ? (
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
        ) : (
          <>
            <ul className=''>
              {dataPesanan.status > 2 ? (
                ''
              ) : (
                <li className='flex justify-between text-red-500'>
                  <p>Tenggat Pembayaran</p>
                  <p>
                    {moment(
                      dataPesanan.tanggalMulaiMenungguPembayaran
                    ).format('LLL')}
                  </p>
                </li>
              )}
              <li className='flex justify-between border-0'>
                <p>Waktu Pemesanan</p>
                <p>{moment().format('LLL')}</p>
              </li>
              {dataPesanan.status == 3 || dataPesanan.status == 4 ? (
                <li className='flex justify-between'>
                  <p>Waktu Pengiriman</p>
                  <p>
                    {moment(dataPesanan.tanggalKirim).format('LLL')}
                  </p>
                </li>
              ) : (
                ''
              )}
              {dataPesanan.status == 5 && (
                <li className='flex justify-between'>
                  <p>Waktu Sampai</p>
                  <p>
                    {moment(dataPesanan.tanggalSampai).format('LLL')}
                  </p>
                </li>
              )}
            </ul>
            {dataPesanan.status == 5 ? (
              <>
                <p>Ulasan</p>
                <div className='border text-center'>
                  <StarRating />
                </div>
                <textarea
                  placeholder='Tulis ulasanmu disini'
                  className='bg-transparent border w-full p-2 rounded-0 h-36'
                ></textarea>
              </>
            ) : (
              <div className='flex flex-row justify-between my-3'>
                <button className='bg-black text-white border px-3 mb-2 float-start rounded-full'>
                  Diskusi Pesanan
                </button>
                {dataPesanan.status < 3 ? (
                  <button className='bg-black text-white border px-3 mb-2 float-start rounded-full'>
                    Batalkan Pesanan
                  </button>
                ) : null}
              </div>
            )}
            {dataPesanan.status == 2 ? (
              <Link to={`/bayar/${dataPesanan.id}`}>
                <button className='bg-blue-700 hover:bg-blue-900 py-2 w-full rounded-full'>
                  Bayar
                </button>
              </Link>
            ) : dataPesanan.status == 4 ? (
              <button
                className='bg-blue-700 hover:bg-blue-900 py-2 w-full rounded-full'
                onClick={() => handleConfirm()}
              >
                Konfirmasi Barang Sampai
              </button>
            ) : null}
          </>
        )}
        {/* {dataPesanan.status == 1 ? (
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
        ) : dataPesanan.status == 2 ? (
            
        )} */}
      </div>
    </>
  )
}

export default RincianPesanan
