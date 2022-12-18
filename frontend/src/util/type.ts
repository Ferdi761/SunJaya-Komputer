type Barang = {
  stok: number
  id: number
  nama: string
  harga: number
  deskripsi: string
  merek: string
  berat: number
  jenisId: number
  BarangYangDipesan: {
    jumlah: number
    totalHarga: number
    garansiExpired: boolean
    BarangId: number
    pemesananId: number
  }
  FotoBarang: {
    id: number
    foto: string
    BarangId: number
  }
}

export type Pesanan = {
  id: number
  alamatTujuan: string
  jasaPengiriman: string | null
  totalHargaBarang: number
  biayaPengiriman: number | null
  totalBiayaYangHarusDibayar: number | null
  tanggalMulaiMenungguPembayaran: string | null
  pembayaranLunas: boolean
  tanggalKirim: string | null
  tanggalSampai: string | null
  rating: number | null
  testimoni: string | null
  status: number
  akunId: number
  Barangs: Barang[]
}
