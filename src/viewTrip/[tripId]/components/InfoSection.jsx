import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { CiShare2 } from "react-icons/ci";
import { GetPlaceDeatils } from '@/service/GlobalApi';
import { PHOTO_REF_URL } from '@/service/GlobalApi';



const InfoSection = ({ trip }) => {

    const [photoUrl, setPhotoUrl] = useState();

    useEffect(() => {
        trip && GetPlacePhoto();
    }, [trip])

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: trip?.userSelection?.location?.label
        }
        const result = await GetPlaceDeatils(data).then(resp => {
            console.log(resp.data.places[0].photos[5].name);

            const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name)
            setPhotoUrl(PhotoUrl);
        });
    }
    return (
        <div>
            <img src={photoUrl} alt="" className='h-[340px] w-full rounded-lg object-cover' />

            <div className='flex justify-between items-center'>
                <div className='my-5 flex flex-col gap-2'>
                    <h2 className='font-bold text-2xl'>
                        {trip?.userSelection?.location?.label}
                    </h2>
                    <div className='flex gap-5'>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>📅 {trip?.userSelection?.noOfDays} Days</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>💸 {trip?.userSelection?.budget} Budget</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>No. of Traveler: {trip?.userSelection?.people}</h2>
                    </div>
                </div>
                <Button> Share <CiShare2 /> </Button>
            </div>


        </div>
    )
}

export default InfoSection