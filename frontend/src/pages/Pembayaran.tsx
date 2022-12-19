import { useState, useEffect, FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import Modal from '../components/Modal'
import { formatCurrency } from '../util/formatCurrency'

import type { Pesanan } from '../util/type'
import { userStorage } from '../util/userStorage'

const Pembayaran = () => {
  const [modal, setModal] = useState(false)
  const [pesanan, setPesanan] = useState<Pesanan>()

  const [bukti, setBukti] = useState({
    preview: '',
    data: '',
  })

  const location = useLocation()
  const navigate = useNavigate()
  const { user } = userStorage()
  const id = location.pathname.split('/')[2]

  useEffect(() => {
    fetch(`http://localhost:8000/api/pemesanan/detail/${id}`, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    })
      .then(async (res) => {
        const data = await res.json()
        if (data.data) {
          setPesanan(data.data.pesanan)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleFileChange = (e: any) => {
    const foto = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setBukti(foto)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('buktiPembayaran', bukti.data)

    fetch(
      `http://localhost:8000/api/pemesanan/checkout/upload/${pesanan?.id}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
        body: formData,
      }
    )
      .then(async (res) => {
        const data = await res.json()
        console.log(data)

        if (data.status === 'success') {
          navigate('/pesanan-saya')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <div className='my-10 mx-20'>
        <div className='flex flex-row gap-10'>
          <div className='w-7/12'>
            {pesanan !== undefined ? (
              pesanan.Barangs.map((data) => (
                <div
                  className='flex flex-row gap-5 mb-4 py-5 px-10 items-center rounded bg-light'
                  style={{
                    boxShadow: 'rgba(0, 0, 0, 0.24) 5px 5px 6px',
                  }}
                  key={data.id}
                >
                  <div className='w-3/12'>
                    <img
                      src={`http://localhost:8000/produk/${
                        data.FotoBarang.foto.split('\\')[2]
                      }`}
                      alt='cpu'
                      width='128px'
                      height='128px'
                    />
                  </div>
                  <div className='w-9/12'>
                    <p className='font-bold'>{data.nama}</p>
                    <p>
                      Jumlah:{' '}
                      <span className='font-bold'>
                        {data.BarangYangDipesan.jumlah} buah
                      </span>
                    </p>
                    <div className='font-bold text-end'>
                      <p className='text-blue-500 font-bold'>
                        Total: {formatCurrency(data.harga)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Fetch Gagal</p>
            )}
          </div>
          <div className='w-5/12'>
            <form
              className='p-10 text-white rounded bg-dark'
              onSubmit={handleSubmit}
            >
              <h5 className='mb-5 text-3xl'>Rincian Pesanan</h5>
              <ul className=' mb-2'>
                <li className='text-gray-400'>
                  ID Pesanan: #{pesanan?.id}
                </li>
                <li className='text-gray-400'>Total Berat: 10 Kg</li>
                <li className='text-gray-400'>
                  Alamat Tujuan:{' '}
                  <span className='text-white'>
                    {pesanan?.alamatTujuan}
                  </span>
                </li>
              </ul>
              <div className='h-36 w-full rounded-lg bg-white'>
                {bukti.preview ? (
                  <img
                    src={bukti.preview}
                    alt='bukti'
                    className='w-1/5 h-auto'
                  />
                ) : (
                  <div className='flex justify-center items-center h-3/4'>
                    <p className='text-gray-400'>
                      Upload Bukti Pembayaran
                    </p>
                  </div>
                )}
                <input
                  type='file'
                  name='buktiPembayaran'
                  id='buktiPembayaran'
                  onChange={handleFileChange}
                  className='text-black ml-3'
                />
              </div>
              <ul className='my-3 flex flex-col gap-3'>
                <li className='flex justify-between items-start'>
                  <p>Subtotal Produk</p>
                  <p>
                    {pesanan
                      ? formatCurrency(
                          pesanan.Barangs.reduce((acc, cur) => {
                            return cur.harga
                          }, 0)
                        )
                      : 'null'}
                  </p>
                </li>
                <li className='flex justify-between items-start'>
                  <p>Subtotal Pengiriman</p>
                  <p>
                    {pesanan
                      ? pesanan.biayaPengiriman
                        ? formatCurrency(pesanan.biayaPengiriman)
                        : 'null'
                      : 'null'}
                  </p>
                </li>
                <li className='flex justify-between items-start'>
                  <p>Tipe</p>
                  <p>Pemesanan</p>
                </li>
                <li className='flex justify-between items-start text-xl font-semibold'>
                  <p>Total Pesanan</p>
                  <p>
                    {pesanan
                      ? pesanan.totalBiayaYangHarusDibayar
                        ? formatCurrency(
                            pesanan.totalBiayaYangHarusDibayar
                          )
                        : formatCurrency(pesanan.totalHargaBarang)
                      : 'null'}
                  </p>
                </li>
              </ul>
              <div className='flex flex-col'>
                <button
                  className='border px-5 rounded-full hover:bg-white hover:text-black transition-all ease-in-out duration-300 self-end'
                  onClick={() => setModal(true)}
                >
                  Daftar Rekening
                </button>
                <button
                  className='rounded-full bg-blue-700 py-3 w-full mt-5 hover:bg-blue-900 transition-all ease-in-out duration-300'
                  type='submit'
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Modal modal={modal} setModal={setModal} />
    </>
  )
}

export default Pembayaran
