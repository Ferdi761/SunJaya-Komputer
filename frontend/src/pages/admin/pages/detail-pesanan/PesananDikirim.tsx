import React from 'react'

const PesananDikirim = () => {
  return (
    <div className='flex flex-row gap-10'>
      <div className='flex font-sans p-3 w-1/2 bg-light drop-shadow-xl h-fit'>
        <div className='flex-none w-24 h-24 relative mr-5'>
          <img
            src='img/produk/cpu-corei3.png'
            alt=''
            className='absolute inset-0 w-full h-full object-cover'
            loading='lazy'
          />
        </div>
        <div className='flex flex-col w-full'>
          <h3 className='text-lg font-semibold text-slate-900'>
            Core I5-7400 3,0 Ghz Gen7 Kabylake - Socket 1151
          </h3>
          <p>Rp 950.000/barang</p>
          <div className='flex flex-row gap-20'>
            <p>
              Jumlah: <span className='font-bold'>1 buah</span>
            </p>
            <p>
              Stok sisa: <span className='font-bold'>4 buah</span>
            </p>
          </div>
          <p>ID Barang : #21</p>
        </div>
      </div>

      <div className='flex flex-col w-1/2 bg-dark text-white p-8 rounded-xl'>
        <div className='flex flex-row justify-between'>
          <p className='mb-5'>ID Pesanan : #17</p>
          <div className='flex flex-col gap-3'>
            <p>
              Tipe :{' '}
              <span className='font-bold uppercase text-lg'>
                garansi
              </span>
            </p>
            <p>
              Status :{' '}
              <span className='font-bold text-lg'>Pembayaran</span>
            </p>
          </div>
        </div>
        <ul className='flex flex-col gap-3'>
          <li>Pemesan : Jabalnur #213</li>
          <li>Total Belanja : Rp 3.000.000</li>
          <li>
            Alamat Tujuan :{' '}
            <span className='font-bold'>
              Jl. Pegangsaan Timur No. 56, Jakarta Pusat, DKI Jakarta
            </span>
          </li>
          <li>Biaya Pengiriman : Rp 60.000</li>
          <li>Jasa Pengiriman : JNE Paket Kilat</li>
          <li>Total Berat : 500 gram</li>
          <li>Total Biaya : Rp 3.060.000</li>
          <li>Tanggal Pengiriman : 13 September 2022</li>
          <li>Tanggal Diterima : -</li>
          <li>Penilaian : -</li>
          <li>Testimoni</li>
        </ul>
        <textarea className='h-32 rounded-xl my-10'></textarea>
        <div className='flex justify-center'>
          <button className='font-bold uppercase bg-blue-700 w-1/2 rounded-full text-2xl py-2'>
            telah sampai
          </button>
        </div>
      </div>
    </div>
  )
}

export default PesananDikirim
