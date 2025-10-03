import React, { useState } from 'react'
import { assets, cities } from '../assets/assets'
import { useAppContext } from '../Context/AppContext'
import toast from 'react-hot-toast'

const HotelReg = () => {

  const {setshowhotelreg, axios, getToken, setisOwner} = useAppContext()

  const [name,setname] = useState("")
  const [address,setaddress] = useState("")
  const [contact,setcontact] = useState("")
  const [city,setcity] = useState("")


  const Submithandler = async (e)=>{
    try {
      e.preventDefault();
      const {data} = await axios.post(`/api/hotels/`, {name, contact, address, city}, {headers:{Authorization: `Bearer ${await getToken()}`}}) 
      if(data.success){
        toast.success(data.message)
        setisOwner(true)
        setshowhotelreg(false)
      } else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <div onClick={()=>setshowhotelreg(false)} className='fixed top-0 bottom-0 left-0 right-0 flex
     z-100 items-center 
    justify-center bg-black/70'>
      <form className='flex bg-white rounded-xl max-w-4xl max-md:mx-2' onSubmit={Submithandler} onClick={(e)=>e.stopPropagation()}>
        <img src={assets.regImage} alt="" className='w-1/2 rounded-xl  hidden md:block' />

        <div className='relative flex flex-col items-center md:w-1/2 p-8 md:p-18'>
            <img src={assets.closeIcon}
            onClick={()=>setshowhotelreg(false)}
            alt="" className='absolute top-4 right-4 h-4 w-4 cursor-pointer' />
            <p>Register Your Hotel</p>
       {/* HOTEL NAME */}
            <div className='w-full mt-4'>
                <label htmlFor="name" className='font-medium text-gray-500'>Hotel Name</label>
                <input type="text" onChange={(e)=>setname(e.target.value)} value={name} id="name" placeholder='Type here...' className='border 
                border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light' required/>
            </div>
              {/* Phone */}
            <div className='w-full mt-4'>
                <label htmlFor="contact" className='font-medium text-gray-500'>Phone</label>
                <input type="text" onChange={(e)=>setcontact(e.target.value)} value={contact}  id="contact" placeholder='Type here...' className='border 
                border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light' required/>
            </div>
              {/* Address */}
            <div className='w-full mt-4'>
                <label htmlFor="address" className='font-medium text-gray-500'>Address</label>
                <input type="text" onChange={(e)=>setaddress(e.target.value)} value={address}  id="address" placeholder='Type here...' className='border 
                border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light' required/>
            </div>
              {/* Drop Down */}
              <div className='w-full mt-4 max-w-60 mr-auto'>
                <label htmlFor="city" className='font-medium text-gray-500'>City</label>
                <select id="city" onChange={(e)=>setcity(e.target.value)} value={city} className='border border-gray-200 ounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light ' required>
                    <option value="">Select City</option>
                    {cities.map((city)=>(
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
              </div>
              <button className='bg-indigo-500 hover:bg-indigo-600 transition-all text-white mr-auto
              px-6 py-2 rounded cursor-pointer mt-6'>Register</button>
        </div>
      </form>
    </div>
  )
}

export default HotelReg
