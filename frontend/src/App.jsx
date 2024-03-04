import React, { useState } from 'react';
import { getshortenedURL } from './server.js'
import './App.css';

const App = () => {
  const [input, updateInput] = useState('');

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
          className='form'
        >
          <section className='input-container displayFlex'>
            <div className='input-sub-container'>
              <input
                className='input'
                type='text'
                onChange={(e) => {
                  updateInput(e.target.value);
                }}
                placeholder='Your Link'
                id='url'
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  getshortenedURL(input);
                }}
                type='submit'
                className='button border'
              >
                Shorten URL
              </button>
            </div>
          </section>
        </form>
      </div>
      <div>
        <h1 className='main-heading'>
          Shortened URL
        </h1>
        <pre id='display-short-url'></pre>
      </div>
    </div>
  )
}

export default App;