import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from './../components/Navbar';
import Footer from './../components/Footer';
export default function Login () {
  const [credentials, setcredentials] = useState({
    email: '',
    password: ''
  })
  let navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch('https://medi-kart.vercel.app/api/loginUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password: credentials.password,
        email: credentials.email
      })
    })

    const json = await response.json()
    if (!json.success) {
      alert('Enter Valid Credentials')
    }
    if (json.success) {
      localStorage.setItem('userEmail', credentials.email)
      localStorage.setItem('authToken', json.authToken)
      // console.log(localStorage.getItem('authToken'))
      navigate('/')
    }
  }
  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  return (
    <div>
      <Navbar/>
      <div className='container border border-primary rounded mt-5 p-3'>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='exampleInputEmail1' className='form-label'>
              Email address
            </label>
            <input
              type='email'
              className='form-control'
              name='email'
              value={credentials.email}
              onChange={onChange}
              id='exampleInputEmail1'
              aria-describedby='emailHelp'
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='exampleInputPassword1' className='form-label'>
              Password
            </label>
            <input
              type='password'
              className='form-control'
              name='password'
              value={credentials.password}
              onChange={onChange}
              id='exampleInputPassword1'
            />
          </div>
          <button type='submit' className='m-3 btn btn-primary'>
            LogIn
          </button>
          <Link to='/createuser' className='m-3 btn btn-secondary'>
            I&apos;m a new user
          </Link>
        </form>
      </div>
      <div style={{ height: '250px' }}></div>
      <Footer/>
    </div>
  )
}
