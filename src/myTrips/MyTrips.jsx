import React, { useEffect } from 'react'
import { useNavigation } from 'react-router-dom';

const MyTrips = () => {

    useEffect(()=>{
        GetUserTrip();
    },[])

    const GetUserTrip=()=>{
        const user=localStorage.getItem('user');
        const navigation=useNavigation();
        if(!user){
            navigation('/');
        }
    }

  return (
    <div>
        
    </div>
  )
}

export default MyTrips
