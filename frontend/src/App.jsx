import React from 'react';
import './App.css';

const App = () => {
  return (
    <div className='container displayFlex'>
      <h1 className='main-heading'>
        URL Shortner
      </h1>
      <div className='sub-container displayFlex'>
        <h1 className='heading'>
          Paste Your Link Here
        </h1>
        <form
          action='../backend/main.py'
          className='form'
        >
          <section className='input-container displayFlex'>
            <div className='input-sub-container'>
              <input
                className='input'
                type='text'
                id='fname'
                placeholder='Your Link'
                name='fname'
              />
              <button
                onSubmit={() => {

                }}
                className='button border'
              >
                Shorten URL
              </button>
            </div>
          </section>
        </form>
      </div>
    </div >
  )
}

export default App;