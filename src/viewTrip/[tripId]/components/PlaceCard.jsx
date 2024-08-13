import { GetPlaceDeatils, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const PlaceCard = ({ place }) => {


    const [photoUrl, setPhotoUrl] = useState();
    
    useEffect(() => {
        place && GetPlacePhoto();
    }, [place])

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: place.placeName
        }
        const result = await GetPlaceDeatils(data).then(resp => {
            console.log(resp.data.places[0].photos[5].name);

            const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name)
            setPhotoUrl(PhotoUrl);
        });
    }

    return (
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + place.placeName} target='_blank'>
            <div className=' border p-3 rounded-xl mt-3 lg:flex gap-5 hover:scale-105 transition-all ease-linear duration-200 cursor-pointer'>
                <img src={photoUrl?photoUrl:'/placeholder.jpg'} alt="" className=' h-[150px] w-[150px] rounded-xl sm:w-full' />
                <div>
                    <h2 className=' font-semibold text-lg'>
                        {place.placeName}
                    </h2>
                    <p>
                        {place.placeDetails}
                    </p>
                    <h2 className=' text-orange-500  font-light'>
                        Ticket Fee- {place.ticketPricing}
                    </h2>
                    <h2 className=' font-semibold '>
                        Time to spend- {place.timeTravel} ⌛
                    </h2>
                </div>
            </div>
        </Link>
    )
}

export default PlaceCard