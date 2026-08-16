import axios from 'axios'
import React, { useContext, useState } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'

const Login = () => {

  const [state, setState] = useState('Admin')

  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const { setDToken } = useContext(DoctorContext)

  const { setAToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
        if (data.success) {
          setAToken(data.token)
          localStorage.setItem('aToken', data.token)
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
        if (data.success) {
          setDToken(data.token)
          localStorage.setItem('dToken', data.token)
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Something went wrong'
      toast.error(message)
    }
  }

  const loginSwitch = state === 'Admin'
    ? <p className='dark:text-slate-400'>Already have an account? <span onClick={() => setState('Doctor')} className='text-primary underline cursor-pointer'>Doctor Login here</span></p>
    : <p className='dark:text-slate-400'>Admin Login? <span onClick={() => setState('Admin')} className='text-primary underline cursor-pointer'>Admin Login here</span></p>

  return (
    <div className='min-h-screen flex flex-col items-center justify-center'>
      <form onSubmit={onSubmitHandler} className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border border-gray-200 dark:border-slate-700 rounded-xl text-[#5E5E5E] dark:text-slate-300 text-sm shadow-lg bg-white dark:bg-slate-900 transition-colors'>
        <p className='text-2xl font-semibold'><span className='text-primary'>{state}</span> Login</p>
        <div className='w-full'>
          <p>Email</p>
          <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-[#DADADA] dark:border-slate-600 rounded w-full p-2 mt-1 bg-white dark:bg-slate-800 dark:text-slate-100' type="email" required />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-[#DADADA] dark:border-slate-600 rounded w-full p-2 mt-1 bg-white dark:bg-slate-800 dark:text-slate-100' type="password" required />
        </div>
        <button className='bg-primary text-white w-full py-2 rounded-md text-base hover:bg-primary/80 transition-all'>Login</button>
        <div className='mt-4'>
          {loginSwitch}
        </div>
      </form>
      <button
        onClick={() => window.location.href = 'http://localhost:5173/'}
        className='mt-6 text-sm text-gray-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary underline cursor-pointer transition-all'
      >
        Back to Website
      </button>
    </div>
  )
}

export default Login
