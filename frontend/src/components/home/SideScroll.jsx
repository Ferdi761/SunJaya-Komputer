import React from 'react';
import Tabs from '@mui/material/Tabs';
import { Link } from 'react-router-dom';
import monitor from '../../img/monitor.png';

const SideScroll = () => {
  return (
    <Tabs
      className='m-3'
      scrollButtons
      allowScrollButtonsMobile
      variant='scrollable'
      aria-label='scrollable auto tabs example'
    >
      <div className='text-center category-card mx-5 p-2'>
        <Link to={`/product/1`}>
          <img src={monitor} alt='monitor' width='100px' />
        </Link>
        <p className='card-text' style={{ fontSize: '12px' }}>
          Rp 100.000
        </p>
      </div>
      <div className='text-center category-card mx-2'>
        <Link to={`/product/1`}>
          <img src={monitor} alt='monitor' width='100px' />
        </Link>
        <p className='card-text' style={{ fontSize: '12px' }}>
          Rp 100.000
        </p>
      </div>
      <div className='text-center category-card mx-2'>
        <Link to={`/product/1`}>
          <img src={monitor} alt='monitor' width='100px' />
        </Link>
        <p className='card-text' style={{ fontSize: '12px' }}>
          Rp 100.000
        </p>
      </div>
      <div className='text-center category-card mx-2'>
        <Link to={`/product/1`}>
          <img src={monitor} alt='monitor' width='100px' />
        </Link>
        <p className='card-text' style={{ fontSize: '12px' }}>
          Rp 100.000
        </p>
      </div>
      <div className='text-center category-card mx-2'>
        <Link to={`/product/1`}>
          <img src={monitor} alt='monitor' width='100px' />
        </Link>
        <p className='card-text' style={{ fontSize: '12px' }}>
          Rp 100.000
        </p>
      </div>
      <div className='text-center category-card mx-2'>
        <Link to={`/product/1`}>
          <img src={monitor} alt='monitor' width='100px' />
        </Link>
        <p className='card-text' style={{ fontSize: '12px' }}>
          Rp 100.000
        </p>
      </div>
      <div className='text-center category-card mx-2'>
        <Link to={`/product/1`}>
          <img src={monitor} alt='monitor' width='100px' />
        </Link>
        <p className='card-text' style={{ fontSize: '12px' }}>
          Rp 100.000
        </p>
      </div>
      <div className='text-center category-card mx-2'>
        <Link to={`/product/1`}>
          <img src={monitor} alt='monitor' width='100px' />
        </Link>
        <p className='card-text' style={{ fontSize: '12px' }}>
          Rp 100.000
        </p>
      </div>
      <div className='text-center category-card mx-2'>
        <Link to={`/product/1`}>
          <img src={monitor} alt='monitor' width='100px' />
        </Link>
        <p className='card-text' style={{ fontSize: '12px' }}>
          Rp 100.000
        </p>
      </div>
      <div className='text-center category-card mx-2'>
        <Link to={`/product/1`}>
          <img src={monitor} alt='monitor' width='100px' />
        </Link>
        <p className='card-text' style={{ fontSize: '12px' }}>
          Rp 100.000
        </p>
      </div>
      <div className='text-center category-card mx-2'>
        <Link to={`/product/1`}>
          <img src={monitor} alt='monitor' width='100px' />
        </Link>
        <p className='card-text' style={{ fontSize: '12px' }}>
          Rp 100.000
        </p>
      </div>
      <div className='text-center category-card mx-2'>
        <Link to={`/product/1`}>
          <img src={monitor} alt='monitor' width='100px' />
        </Link>
        <p className='card-text' style={{ fontSize: '12px' }}>
          Rp 100.000
        </p>
      </div>
      <div className='text-center category-card mx-2'>
        <Link to={`/product/1`}>
          <img src={monitor} alt='monitor' width='100px' />
        </Link>
        <p className='card-text' style={{ fontSize: '12px' }}>
          Rp 100.000
        </p>
      </div>
      <div className='text-center category-card mx-2'>
        <Link to={`/product/1`}>
          <img src={monitor} alt='monitor' width='100px' />
        </Link>
        <p className='card-text' style={{ fontSize: '12px' }}>
          Rp 100.000
        </p>
      </div>
    </Tabs>
  );
};

export default SideScroll;
