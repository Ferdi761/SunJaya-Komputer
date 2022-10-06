import React from 'react';
import aksesoris from '../../img/kategori/aksesoris.png';
import kabel from '../../img/kategori/kabel.png';
import komponenKomputer from '../../img/kategori/komponen-komputer.png';
import komponenLaptop from '../../img/kategori/komponen-laptop.png';
import storage from '../../img/kategori/storage.png';
import memoryCard from '../../img/kategori/memory-card.png';
import monitor from '../../img/kategori/monitor.png';
import network from '../../img/kategori/network.png';
import { Link } from 'react-router-dom';

const Category = () => {
  return (
    <section className='container my-5'>
      <h1 className='mb-3 home-h1'>Kategori</h1>
      <div className='row'>
        <div className='col-8-custom'>
          <Link
            to='/aksesoris'
            className='text-decoration-none text-black'
          >
            <div className='text-center category-card'>
              <img
                src={aksesoris}
                alt='...'
                width='71.55px'
                height='54.99px'
              />
              <p className='card-text' style={{ fontSize: '12px' }}>
                Aksesoris Komputer & Laptop
              </p>
            </div>
          </Link>
        </div>
        <div className='col-8-custom'>
          <div className='text-center category-card'>
            <Link
              to='/aksesoris'
              className='text-decoration-none text-black'
            >
              <img
                src={kabel}
                alt='...'
                width='71.55px'
                height='54.99px'
              />
              <p className='card-text' style={{ fontSize: '12px' }}>
                Kabel & <br /> Adaptor
              </p>
            </Link>
          </div>
        </div>
        <div className='col-8-custom'>
          <div className='text-center category-card'>
            <Link
              to='/aksesoris'
              className='text-decoration-none text-black'
            >
              <img
                src={komponenKomputer}
                alt='...'
                width='71.55px'
                height='54.99px'
              />
              <p className='card-text' style={{ fontSize: '12px' }}>
                Komponen <br /> Komputer
              </p>
            </Link>
          </div>
        </div>
        <div className='col-8-custom'>
          <div className='text-center category-card'>
            <Link
              to='/aksesoris'
              className='text-decoration-none text-black'
            >
              <img
                src={komponenLaptop}
                alt='...'
                width='71.55px'
                height='54.99px'
              />
              <p className='card-text' style={{ fontSize: '12px' }}>
                Komponen <br /> Laptop
              </p>
            </Link>
          </div>
        </div>
        <div className='col-8-custom'>
          <div className='text-center category-card'>
            <Link
              to='/aksesoris'
              className='text-decoration-none text-black'
            >
              <img
                src={storage}
                alt='...'
                width='71.55px'
                height='54.99px'
              />
              <p className='card-text' style={{ fontSize: '12px' }}>
                Media <br /> Penyimpanan Data
              </p>
            </Link>
          </div>
        </div>
        <div className='col-8-custom'>
          <div className='text-center category-card pb-3'>
            <Link
              to='/aksesoris'
              className='text-decoration-none text-black'
            >
              <img
                src={memoryCard}
                alt='...'
                width='71.55px'
                height='54.99px'
              />
              <p className='card-text' style={{ fontSize: '12px' }}>
                Memory Card
              </p>
            </Link>
          </div>
        </div>
        <div className='col-8-custom'>
          <div className='text-center category-card pb-3'>
            <Link
              to='/aksesoris'
              className='text-decoration-none text-black'
            >
              <img
                src={monitor}
                alt='...'
                width='71.55px'
                height='54.99px'
              />
              <p className='card-text' style={{ fontSize: '12px' }}>
                Monitor
              </p>
            </Link>
          </div>
        </div>
        <div className='col-8-custom'>
          <div className='text-center category-card pb-3'>
            <Link
              to='/aksesoris'
              className='text-decoration-none text-black'
            >
              <img
                src={network}
                alt='...'
                width='71.55px'
                height='54.99px'
              />
              <p className='card-text' style={{ fontSize: '12px' }}>
                Networking
              </p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;
