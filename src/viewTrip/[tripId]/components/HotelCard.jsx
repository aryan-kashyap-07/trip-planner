import { GetPlaceDeatils, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const HotelCard = ({hotel} ,index) => {

    
    const [photoUrl, setPhotoUrl] = useState();
    
    useEffect(() => {
        hotel && GetPlacePhoto();
    }, [hotel])

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: hotel.name
        }
        const result = await GetPlaceDeatils(data).then(resp => {
            console.log(resp.data.places[0].photos[5].name);

            const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name)
            setPhotoUrl(PhotoUrl);
        });
    }


  return (
    <div>
        <Link to={'https://www.google.com/maps/search/?api=1&query='+hotel.name+' '+hotel.address} target='_blank'>
                    <div key={index} className=' border rounded-lg hover:scale-105 transition-all ease-linear duration-200 cursor-pointer ' >
                        <div className=' m-3'>
                            <img src={photoUrl?photoUrl:'/placeholder.jpg'} alt="" className='rounded-xl w-full h-[150px]' />
                            <div className='my-2'>
                                <h2 className='font-medium'>
                                    {hotel.name}
                                </h2>
                                <h2 className='text-xs text-gray-500'>
                                    📍 {hotel.address}
                                </h2>
                                <h2 className='text-xs text-black font-bold'>
                                    💰 {hotel.price}
                                </h2>
                                <h2 className='text-xs text-black font-bold'>
                                    ⭐ {hotel.rating}
                                </h2>
                            </div>
                        </div>
                    </div>
                    </Link>
    </div>
  )
}

export default HotelCard