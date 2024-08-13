import React from 'react'

import HotelCard from './HotelCard'


const HotelList = ({ trip }) => {

    return (
        <div>
            <h2 className='font-bold text-2xl mt-5'>Hotel Recomendation</h2>

            <div className='grid grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-5 my-5'>
                {trip?.tripData?.hotels?.map((hotel, index) => (
                    <HotelCard hotel={hotel} index={index}/>
                ))}
            </div>
        </div>
    )
}

export default HotelList