const tampilanTambahBarang = (req, res) => {
    res.end("okok");
};

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

const tampilanDetailBarang = async (req, res) => {
};

const tampilanUbahDataBarang = (req, res) => {};

const ubahDataBarang = (req, res) => {

};

const hapusBarang = (req, res) => {

};

const tampilanDataBarang = (req, res) => {};

const cariBarang = (req, res) => {};

module.exports = {
    tampilanTambahBarang,
    tambahBarang,
    tampilanDetailBarang,
    tampilanUbahDataBarang,
    ubahDataBarang,
    hapusBarang,
    tampilanDataBarang,
    cariBarang};