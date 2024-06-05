import React from 'react'
import bgVideo from './background.mp4'
import './Description.css'

function Description() {
  return (
    <div>
        <h1 className='DescriptionFirstText'>Hi every welcome to our social media application</h1>
        <h3 className='DescriptionFirstText'>Login if you already has an account</h3>
        <h4 className='DescriptionFirstText'>(or)</h4>
        <h3 className='DescriptionFirstText'>create a new account by clicking on Sign Up</h3>
        <p className='DescriptionFirstText'>To know about the developer ,<br/> and the technologies used ,<br/>hard situations came across developing the application.<br/> click on <b>about us</b></p>
        <h5 style={{color:"black"}}>If you are confused of the stuff simply hit Help</h5>
    </div>
  )
}

export default Description