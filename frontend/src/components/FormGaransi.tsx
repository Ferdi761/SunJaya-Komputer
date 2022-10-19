import { useState } from 'react'
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai'
import storeItems from '../data/items.json'
import moment from 'moment'

const FormGaransi = () => {
  const date = new Date()
  const [jumlah, setJumlah] = useState(1)
  const sisa = 4

  return (
    <div className='flex justify-center'>
      <div className='w-11/12 flex flex-row gap-10 my-10'>
        <div className='w-1/2'>
          <div className='flex flex-col gap-3 items-center justify-center p-5 bg-light border border-black rounded-xl shadow-xl'>
            <img
              src={storeItems[0].imgUrl}
              className='h-60 w-60'
              alt={storeItems[0].name}
            />
            <div className='flex flex-col gap-2'>
              <h5 className='text-center font-bold'>
                {storeItems[0].name}
              </h5>
              <p>
                Tanggal Pembelian:{' '}
                <span className='font-bold'>12 Mei 2022</span>
              </p>
              <p>
                Jumlah: <span className='font-bold'>1 buah</span>
              </p>
              <ul className='mb-2'>
                <li>ID Pemesanan: #17</li>
                <li>Waktu Pemesanan: {moment().format('LLL')}</li>
                <li>Waktu Pengiriman: {moment().format('LLL')}</li>
                <li>Waktu Sampai: {moment().format('LLL')}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className='w-1/2'>
          <div className='bg-dark text-white rounded-xl py-10 px-5'>
            <h5 className='text-xl font-bold mb-5'>
              {storeItems[0].name}
            </h5>
            <div className='mb-4'>
              <label className='block text-md mb-2 font-semibold'>
                Keluhan
              </label>
              <textarea
                className='focus:ring-2 focus:ring-black focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-5 ring-1 ring-slate-200 shadow-sm h-36'
                aria-label='Keluhan'
                placeholder='Contoh: Tidak dapat menyala'
                // value={akun.alamat}
                // onChange={(e) =>
                //   setAkun({ ...akun, alamat: e.target.value })
                // }
              />
            </div>
            <div className='my-3 flex flex-row justify-between items-baseline'>
              <p>Upload Bukti Kerusakan (OPTIONAL)</p>
              <div className='flex flex-row gap-3'>
                <button className='bg-white px-2 text-black'>
                  Upload File
                </button>
                <p className='text-gray-500'>-File kosong-</p>
              </div>
            </div>
            <div className='my-4'>
              <label className='block text-md mb-2 font-semibold uppercase'>
                alamat tujuan pengembalian
              </label>
              <input
                className='focus:ring-2 focus:ring-black focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-5 ring-1 ring-slate-200 shadow-sm'
                type='text'
                aria-label='alamat'
                placeholder='isi alamat pengembalian'
                // value={akun.nama}
                // onChange={(e) =>
                //   setAkun({ ...akun, nama: e.target.value })
                // }
              />
            </div>
            <div className='my-3 w-1/4'>
              <p>Jumlah</p>
              <form className='flex flex-row text-black bg-white rounded-xl border border-black'>
                <button
                  type='button'
                  className='p-3 border-r border-black disabled:opacity-50'
                  data-type='minus'
                  disabled={jumlah === 1 && true}
                  data-field='quant[1]'
                  onClick={() => setJumlah((prev) => prev - 1)}>
                  <AiFillMinusCircle />
                </button>
                <input
                  type='text'
                  name='quant[1]'
                  className='px-5 w-full'
                  value={jumlah}
                  readOnly
                  min='1'
                  max='10'
                />
                <button
                  type='button'
                  className='p-3 border-l border-black disabled:opacity-50'
                  data-type='plus'
                  disabled={jumlah >= sisa && true}
                  data-field='quant[1]'
                  onClick={() => setJumlah((prev) => prev + 1)}>
                  <AiFillPlusCircle />
                </button>
              </form>
              <p>Dari: {sisa} buah</p>
            </div>
            <p className='card-text'>
              <span className='text-gray-400'>
                * Silahkan kirim barang kembali untuk kami periksa dan
                perbaiki. Alamat:
              </span>
              <br />
              Jl. Mojo Kidul II No.D2, Mojo, Kec. Gubeng, Kota
              Surabaya, Jawa Timur 60285
            </p>
            <div className='text-center mt-5'>
              <button className='bg-blue-700 hover:bg-blue-900 rounded-full px-10 py-3 font-bold text-lg'>
                AJUKAN
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormGaransi
