import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from 'react-icons/fc'
import axios from 'axios'



const Header = () => {

  const [openDialog, setOpenDialog] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'))

  const login = useGoogleLogin({
    onSuccess: (codeResp) => { GetUserProfile(codeResp) },
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
      window.location.reload();
    })
  }


  useEffect(() => {
    console.log(user)
  }, [])

  return (
    <div className="p-2 shadow-md flex justify-between items-center px-5">

      <a href="/">
      <img src="/logo.svg" alt="" />
      </a>
      
      {user ?
        <div className=' flex items-center gap-3'>
          <Button varient="outline" className=' rounded-2xl'>My Trips</Button>
          <Popover>
            <PopoverTrigger>
              <img src={user.picture} alt="" className=' h-[30px] w-[30px] rounded-full' />
            </PopoverTrigger>
            <PopoverContent>
              <h2 className=' cursor-pointer' onClick={() => {
                googleLogout();
                localStorage.clear();
                window.location.reload();
              }}>Log Out</h2>
            </PopoverContent>
          </Popover>


        </div> :
        <Button onClick={()=>setOpenDialog(true)}> Sign In</Button>}

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

export default Header