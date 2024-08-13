import React from 'react'
import PlaceCard from './PlaceCard'

const Itinerary = ({trip}) => {
  return (
    <div>
        <h2 className='font-bold text-2xl mt-5'>Places to Visit</h2>

        <div>
            {trip?.tripData?.itinerary.map((place,index)=>(
                <div key={index}>
                    <h2 className=' font-medium text-lg'>
                        {place.day}
                    </h2>
                    <div className=' grid grid-cols-2 gap-5'>
                        {place.plan.map((dest,index)=>(
                            <div key={index} className=' my-5'>
                                <h2 className=' font-medium text-sm text-orange-500'>{dest.time}</h2>
                                <PlaceCard place={dest}/>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>

    </div>
  )
}

export default Itinerary