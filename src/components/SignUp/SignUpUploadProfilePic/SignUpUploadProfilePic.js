import React, { useState } from 'react'
import './SignUpUploadProfilePic.css'

import store from '../../../store';
import { useLocation, useNavigate } from 'react-router-dom';
import { type } from '@testing-library/user-event/dist/type';


function SignUpUploadProfilePic() {
    let navigate = useNavigate();
    let location = useLocation();

    console.log(location,location.state)

    let [imageURL,updateImageImageURL] = useState()

    

    async function UploadProfilePic(event)
    {
        let ImageFile = event.target.files[0];
        if(ImageFile)
        {
            let formData = new FormData();
            formData.append("photo",ImageFile);
            console.log("formData object : ",formData)

            try
            {
                let base_url = process.env.REACT_APP_SERVER_BASE_URL;
                // let base_url = "http://localhost:4000"
                const response = await fetch(`${base_url}/media/uploadPostImage`,{
                    method:'POST',
                    body:formData
                });

                const data = await response.json();
                console.log(data)

                if(response.ok)
                {
                    console.log(data.file.path)
                    
                    // alert('image uploaded successfully')

                    // store.dispatch({
                    //     type:'signUp',
                    //     subType:'profilePic',
                    //     profilePic:data.file.path
                    // })
                    updateImageImageURL(data.file.path)

                    // alert('login with created userName and password')
                    
                    navigate('../SetUpPassword',{state:{"userName":location.state.userName,"email":location.state.email,"ProfilePic":imageURL}})
                }
                else
                {
                    alert('image upload failed')
                    console.log(response)
                }
            }
            catch(err)
            {
                alert(err)
                console.log(err)
            }
        }
    }

    async function UploadProfilePic2(event)
    {
        // dispatch image url to store here

        // console.log(event.target.src)
        // store.dispatch({
        //     type:'signUp',
        //     subType:'profilePic',
        //     profilePic:event.target.src
        // })
        updateImageImageURL(event.target.src)
        
        navigate('../setExtraDetails',{state:{"userName":location.state.userName,"email":location.state.email,"ProfilePic":imageURL}})
    }
  return (
    <div style={{textAlign:"center"}}>
        <center>
            <b>upload your profile picture</b><br/>
            <label>your a/c status</label>
            <div style={{width:"300px",height:"15px",borderRadius:"5px",border:"1px solid black",display:"flex",padding:"0px"}}>
                <div style={{width:"60px",height:"15px",backgroundColor:"green",BorderRadiusTopleft:"5px",borderBottomLeftRadius:"5px"}}></div>
                <div style={{width:"60px",height:"15px",backgroundColor:"green",BorderRadiusTopright:"5px"}}></div>
            </div>
        </center>
        <p>- If you are not interested to share your picture<br/> you can choose any one of the avatar below.</p>
        {
            imageURL?
            <div>
                <h4>Image you have choosen</h4>
                <img style={{width:"100px",height:"100px",borderRadius:"50px"}} src={imageURL} alt='slow network'/>
            </div>
            :
            <div>
                <label style={{color:"red"}}>Image not choosen</label>
            </div>
        }
        <form>
            <p style={{fontSize:"20px",color:"black",fontFamily:"cursive"}}>Sample avatar's</p>
            <div className='templateProfilePicturesdiv'>
                <img className='templateProfilePictures' onClick={(event)=>{UploadProfilePic2(event)}} src='https://res.cloudinary.com/dxvjbmgta/image/upload/v1717232938/socialProfileImages/6769264_60111_g7xu2r.jpg'/>
                <img className='templateProfilePictures' onClick={(event)=>{UploadProfilePic2(event)}} src='https://res.cloudinary.com/dxvjbmgta/image/upload/v1717233288/socialProfileImages/images_l7mduh.jpg'/>
                {/* <img className='templateProfilePictures' onClick={(event)=>{UploadProfilePic2(event)}} src='https://res.cloudinary.com/dxvjbmgta/image/upload/v1717233069/socialProfileImages/27470334_7309681_t3lunt.jpg'/>
                <img className='templateProfilePictures' onClick={(event)=>{UploadProfilePic2(event)}} src='https://res.cloudinary.com/dxvjbmgta/image/upload/v1717233246/socialProfileImages/pngtree-cute-girl-avatar-material-png-image_4023832_tb3ywg.jpg'/>
                <img className='templateProfilePictures' onClick={(event)=>{UploadProfilePic2(event)}} src='https://res.cloudinary.com/dxvjbmgta/image/upload/v1717233004/socialProfileImages/136483868_a2c7690e-ee45-4286-b04c-21c03bac2a9b_pxohvg.jpg'/>
                <img className='templateProfilePictures' onClick={(event)=>{UploadProfilePic2(event)}} src='https://res.cloudinary.com/dxvjbmgta/image/upload/v1717233216/socialProfileImages/user-woman-avatar-female-profile-icon-woman-character-portrait-with-smile-vector_555028-184_ntoza7.jpg'/> */}
            </div>
            <input type='file' accept='image/*' onChange={(event)=>{UploadProfilePic(event)}}/>
        </form>
    </div>

  )
}

export default SignUpUploadProfilePic