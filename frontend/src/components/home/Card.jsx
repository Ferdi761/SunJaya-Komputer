import React from 'react';
import people from '../../img/people.png';
import outside from '../../img/outside.png';

const Card = () => {
  return (
    <div className='container'>
      <div
        className='card mb-5 bg-dark p-3'
        style={{ marginTop: '-12rem' }}
      >
        <div className='row g-0'>
          <div className='col-7'>
            <div className='card-body text-white'>
              <h4
                className='card-title'
                style={{ fontSize: '36px', marginBottom: '1.5rem' }}
              >
                Melayani Sejak 1999
              </h4>
              <p
                className='card-text text-secondary'
                style={{ marginBottom: '3rem' }}
              >
                Sun Jaya Komputer telah melayani jutaan pelanggan
                sejak pertama kali didirikan, baik itu secara luring,
                maupun daring, dan mendapatkan feedback positif
                positif dari seluruh pelanggan
              </p>
              <h5 style={{ fontSize: '28px' }}>
                Apa yang kami punya?
              </h5>
              <div className='row'>
                <div
                  className='col-2'
                  style={{ textAlign: 'center' }}
                >
                  <p style={{ fontSize: '36px' }}>100</p>
                  <p style={{ marginTop: '-1rem' }}>Monitor</p>
                </div>
                <div
                  className='col-2'
                  style={{ textAlign: 'center' }}
                >
                  <p style={{ fontSize: '36px' }}>100</p>
                  <p style={{ marginTop: '-1rem' }}>Monitor</p>
                </div>
                <div
                  className='col-2'
                  style={{ textAlign: 'center' }}
                >
                  <p style={{ fontSize: '36px' }}>100</p>
                  <p style={{ marginTop: '-1rem' }}>Monitor</p>
                </div>
                <div
                  className='col-2'
                  style={{ textAlign: 'center' }}
                >
                  <p style={{ fontSize: '36px' }}>100</p>
                  <p style={{ marginTop: '-1rem' }}>Monitor</p>
                </div>
                <div
                  className='col-2'
                  style={{ textAlign: 'center' }}
                >
                  <p style={{ fontSize: '36px' }}>100</p>
                  <p style={{ marginTop: '-1rem' }}>Monitor</p>
                </div>
                <div
                  className='col-2'
                  style={{ textAlign: 'center' }}
                >
                  <p style={{ fontSize: '36px' }}>100</p>
                  <p style={{ marginTop: '-1rem' }}>Monitor</p>
                </div>
              </div>
            </div>
          </div>
          <div
            className='col-4'
            style={{ marginTop: '2rem', backgroundColor: '#302E2F' }}
          >
            <img
              src={people}
              className='img'
              alt='...'
              style={{ float: 'right' }}
            />
            <img
              src={outside}
              className='img'
              alt='...'
              style={{
                float: 'right',
                marginTop: '-3rem',
                marginRight: '2rem',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
