import React, { useEffect } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { SelectBudgetOptions, SelectTravelerList } from '@/constants/constants'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { AI_PROMT } from '@/constants/constants'
import { chatSession } from '@/service/AIModal'
import { FcGoogle } from "react-icons/fc";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { doc, setDoc } from "firebase/firestore";
import { db } from '@/service/FirebaseConfig'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Navigate, useNavigate } from 'react-router-dom'


const CreateTrip = () => {

  const [place, setPlace] = useState();

  const [formData, setFormData] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate=useNavigate();

  const handleInputChange = (name, value) => {


    setFormData({
      ...formData,
      [name]: value
    })
  }

  const login = useGoogleLogin({
    onSuccess: (codeResp) => { console.log(codeResp); GetUserProfile(codeResp) },
    onError: (error) => console.log(error)
  })

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: 'Application/json'
        }
      }
    ).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      onGenerateTrip();
    })
  }

  const onGenerateTrip = async () => {

    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDialog(true);
    }


    if (formData.noOfDays > 9 || formData.noOfDays < 1) {
      toast("No of days should be between 1 and 9");
      return;
    }
    if (!formData.location || !formData.budget || !formData.people || !formData.noOfDays) {
      toast("Please fill all the details");
      return;
    }

    setLoading(true);
    const FINAL_PROMT = AI_PROMT
      .replace('{location}', formData?.location.label)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{budget}', formData?.budget)
      .replace('{people}', formData?.people)
      .replace('{totalDays}', formData?.noOfDays);

    console.log(FINAL_PROMT);
    const result = await chatSession.sendMessage(FINAL_PROMT);
    console.log(result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text())
  }

  const SaveAiTrip = async (tripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AItrips", docId), {
      userSelection: (formData),
      tripData: JSON.parse(tripData),
      userEmail: user?.email,
    });
    setLoading(false)
    navigate('/view-trip/'+docId);

  }

  useEffect(() => {
    console.log(formData);
  }, [formData])




  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10 flex flex-col gap-10 '>
      <h2 className='font-bold text-3xl'>
        Tell us  your travel preferences 🗺️🚂
      </h2>
      <p className='mt-3 text-gray-500 text-xl'>
        Just provide some basic information, and our trip planner wwill generate a customized itinerary based on your preference.
      </p>
      <div className='mt-20 lg:w-1/2'>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is your destination...?</h2>
          <GooglePlacesAutocomplete

            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange:(v) => {
                setPlace(v);
                handleInputChange('location', v);
              }
            }}
          />
        </div>
      </div>
      <div className='lg:w-1/2 '>
        <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip...?</h2>
        <Input
          placeholder={'Ex.3'}
          type="number"
          onChange={(e) => handleInputChange('noOfDays', e.target.value)}
        />
      </div>
      <div>
        <h2 className='text-xl my-3 font-medium'>What is your Budget...?</h2>
        <p className='mt-3 text-gray-500 text-xl'>
          The budge is exclusively allocated for activities and dining purposes.
        </p>
      </div>
      <div className='grid grid-cols-3 gap-5 mt-5'>
        {SelectBudgetOptions.map((item, index) => {
          return (
            <div key={index}
              onClick={() => handleInputChange('budget', item.title)}
              className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg hover:scale-110 transition-scale ease-linear duration-200 ${formData?.budget == item.title && 'border-black'}`}>
              <h2 className='text-4xl '>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500 '>{item.desc}</h2>
            </div>
          )
        })}
      </div>

      <div>
        <h2 className='text-xl my-3 font-medium'>What is your Budget...?</h2>
        <p className='mt-3 text-gray-500 text-xl'>
          The budge is exclusively allocated for activities and dining purposes.
        </p>
      </div>
      <div className='grid grid-cols-3 gap-5 mt-5'>
        {SelectTravelerList.map((item, index) => {
          return (
            <div key={index}
              onClick={() => handleInputChange('people', item.people)}
              className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg hover:scale-110 transition-scale ease-linear duration-200 ${formData?.people == item.people && 'border-black'}`}>
              <h2 className='text-4xl '>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500 '>{item.desc}</h2>
            </div>
          )
        })}
      </div>

      <div className='my-20 flex justify-start'>
        <Button
          onClick={onGenerateTrip}
          disabled={loading}
        >{loading ? <AiOutlineLoading3Quarters className='w-7 h-7 animate-spin' /> : 'Generate Trip'}</Button>
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="" />
              <h2 className='font-bold text-lg mt-7 text-black'>Sign In With Google</h2>
              <p>Sign in to the app with Google authentication security</p>
              <Button onClick={login}
                className='w-full mt-5 flex gap-4 items-center'><FcGoogle className='w-7 h-7' />Sign In With Google </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>


    </div>

  )
}

export default CreateTrip