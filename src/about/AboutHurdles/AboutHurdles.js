import React from 'react'

function AboutHurdles() {
    let childBoxStyle = {backgroundColor:"white",margin:"20px",padding:"10px",textAlign:"left",borderRadius:"10px",width:"80vw"}
  return (
    <div style={{color:"black"}}>
        <h3>Problems i faced during development</h3>
        <div style={{display:"flex",justifyContent:"space-around",flexWrap:"wrap"}}>
            <div style={childBoxStyle}>
                <h4>use of UseEffect</h4>
                <ul>
                    <li>using dependency array to render only once.</li>
                    <li>how to use <b>await, async </b> functions inside useEffect.</li>
                    <li>Use of alternative to <b>Protected routes</b> using usenavigate by checking store data</li>
                </ul>
            </div>
            <div style={childBoxStyle}>
                <h4>use of Redux</h4>
                <ul>
                    <li>package : <b>@reduxjs/toolkit</b></li>
                    <li>parameres : </li>
                    <li>action.type</li>
                    <li>import store from 'path'</li>
                    <li>let var = store.getState()</li>
                    <li>store.dispathch("type":"action_type","value1":"value_1",...)</li>
                    <li>using cookies inside the reducer methods</li>
                    <li>Checking wheather the user is signed in by using <b>START FUNCTIONS</b> before initiation of switch .</li>
                    <li>setting time to cookies, when to expire.</li>
                </ul>
            </div>
            <div style={childBoxStyle}>
                <h4>Conditional rendering</h4>
                <b>--Identified as most important usecase , that should be implemented.</b>
                <ul>
                    <li>use return statement when rendering is not working, exspecially when there is some functional logic inside the component.</li>
                    <li>nested,else-if ladder type rendering possible.</li>
                </ul>
            </div>
            <div style={childBoxStyle}>
                <h4>Cloudinary configuration error</h4>
                <b>-- !DOCTYPE  is not valid json ... someting shit.</b>
                <ul>
                    <li>Dont't know correctly even today.</li>
                    <li>but the point here is the server sent a <b>html file </b> indicating an error on the server configuration only.</li>
                    <li>It took most of the development process time about 15 days to make complete setup of the post upload configuration on client, server side.</li>
                    <li>using of 'auto' type during accepting the files of the type audio,files at the server.</li>
                    <li><b>data.file.path</b> consists of the url sent by the cloudinary middeleware.</li>
                    <li>during accessing the cloudinary we have to install 3 packages :
                        <ol>
                            <li>npm i cloudinary</li>
                            <li>npm i multer</li>
                            <li>npm i multer-storage-cloudinary</li>
                        </ol>
                    </li>
                    <li>use formData() to send files to the server from client , during <b>file uploads</b></li>
                    <li>additionally <b>zipping</b> can be implemented to reduce the file size, but a middleware has to executed first at the server to <b>unzip</b> the file and add to <b>re.uploadedFileFromClient</b> object.</li>
                    <li>but zipping is not implemented due to high risk</li>
            
                </ul>
            </div>
            <div style={childBoxStyle}>
                <h4>Google OAuth 2.0</h4>
                <b>--not a big problem, but a silly one.</b>
                <ul>
                    <li>import the required packages.
                        <ol>
                            <li>npm i @react-oauth/google</li>
                            <li>npm i google-auth-library</li>
                        </ol>
                    </li>
                    <li>using <b><b>GoogleOAuthProvider</b> clientId="client_id_generated_at_the_conole.developer.google.com" <b>GoogleOAuthProvider</b></b> at the higher level of the application(<b>index.js</b>) , or at the root level(<b>App.js</b>).</li>
                    <li>configure the ClientId, client secret, API properties correctly.must include [<b>http://localhost </b> , <b> http://localhost:3000</b>] at the authorized urls .</li>
                    <li>if user email id is visible in on the button to be clicked every thing is perfect.</li>
                </ul>
            </div>
            <div style={childBoxStyle}>
                <h4>3 - Types of styling possible in React</h4>
                <b>--improves readability , and code maintainence</b>
                <ul>
                    <li>The best one of all is the old and default one , by creating a <b>.css</b> file in the same folder.</li>
                    <li>using <b>style</b> attribute inside the component.</li>
                    <li><p style={{color:"red",backgroundColor:"green",borderRadius:"5px"}}>content</p> , this is the most simple and quick approach.</li>
                    <li>creating custom variables for styles , as <p style={style_variable_name}>content</p> , style_variable_name is an object </li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default AboutHurdles