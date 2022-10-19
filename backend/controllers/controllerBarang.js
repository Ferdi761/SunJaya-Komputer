const tambahBarang = (req, res) => {
    const {
        namaBarang,
        jenisBarang,
        jumlahBarang
    } = req.body;

    const data = {
        namaBarang,
        jenisBarang,
        jumlahBarang
    };
};

const detailBarang = (req, res) => {};

const ubahDataBarang = (req, res) => {

};

const hapusBarang = (req, res) => {

};

const cariBarang = (req, res) => {};

module.exports = {
    tambahBarang,
    detailBarang,
    ubahDataBarang,
    hapusBarang,
    cariBarang
};