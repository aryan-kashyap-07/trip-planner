import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import { doc,getDoc } from 'firebase/firestore';
import { db } from '@/service/FirebaseConfig';
import { toast } from 'sonner';
import InfoSection from './components/InfoSection';
import HotelList from './components/HotelList';
import Itinerary from './components/Itinerary';


const ViewTrip = () => {

    const [trip,setTrip]=useState([]);

    const {tripId}=useParams();

    const getTripData=async()=>{
        const docRef=doc(db,'AItrips',tripId);
        const docSnap= await getDoc(docRef);

        if(docSnap.exists()){
          console.log("Document:",docSnap.data());
          setTrip(docSnap.data());
        }
        else{
          console.log("no such data");
          toast('No trip found');
        }
    }
    useEffect(()=>{
      tripId&&getTripData();
    },[tripId]);


  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
       <InfoSection trip={trip}/>
       <HotelList trip={trip}/>
       <Itinerary trip={trip}/>
    </div>
  )
}

export default ViewTrip