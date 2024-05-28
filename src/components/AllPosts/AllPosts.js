import React, { useEffect, useState } from 'react'
import './AllPosts.css'

function AllPosts() {
  let [posts,updatePosts] = useState([])
  useEffect(()=>{
    async function getAllPosts()
    {
      let base_url = process.env.REACT_APP_SERVER_BASE_URL

      console.log(base_url)

      let result = await fetch(`${base_url}/posts/getAllPosts`)
      result = await result.json()

      // console.log(result.data)

      updatePosts(result.data)

      console.log("fetching posts completed :- ",posts)
    }

    getAllPosts();
  },[])

  return (
    <div>
      <h3>AllPosts</h3>
      <div className='AllPostsParentWindow'>
        {
          posts.map(x=>
            {
              // console.log(x)

              return <div className='AllPostsChildWindow'>
                <a>{x.author}</a>
                <br/>
                <label>posted on : {x.DatePosted}</label>
                <label>modified on : {x.DareModified}</label>
                <br/>
                <div>
                  {
                    (x.content && 1)?
                    <div>
                      {
                      x.content.map(
                        (element,index)=>
                        {
                          if(element.type == 'p')
                            {
                                return <p className='NewPostTextOverFlow'
                                    key={index}
                                    style={{
                                        color:element.textColor,
                                        fontSize:`${element.fontSize}px`,
                                        textAlign:element.textAlign
                                        }}
                                >
                                    {element.value}
                                </p>
                            }
                
                
                            else if(element.type == 'b')
                            {
                
                                return <div>
                                    <b key={index}
                                    style={{
                                        color:element.textColor,
                                        fontSize:`${element.fontSize}px`,
                                        textAlign:element.textAlign
                                    }}
                                >
                                    {element.value}
                                </b>
                                <br/>
                                </div>
                            }
                            
                            
                            else if(element.type == 'link')
                            {
                                return <div>
                                    <br/>
                                    <a key={index}
                                    href={element.linkTo}
                                >
                                    {element.value}
                                </a>
                                <br/>
                                </div>
                            }
                
                            else if(element.type == 'img')
                            {
                                return <img width="400px" height="300px" src={element.src}/>
                            }
                
                            else if(element.type == 'video')
                            {
                                return <video src={element.src} width="400px" height="300px" controls autoPlay loop/>
                            }
                
                            else if(element.type == 'audio')
                            {
                                return <audio src={element.src} controls />
                            }
                            
                            else if(element.type == 'document')
                            {
                                return <div>
                                    <a href={element.src}>{element.name}</a>
                                    <p>size :- {String((element.size)/1024).split('.')[0]}KB</p>
                                </div>
                            }
                            else if(element.type == 'none')
                            {
                              return <p>data not fetched</p>
                            }
                        }
                      )
                    }
                    </div>
                    :
                    <p>Error 500!</p>
                  }
                </div>
                <div>
                  <label>likes = {x.likes}</label>
                  <label>likes = {x.upVotes}</label>
                  <label>likes = {x.downVotes}</label>
                </div>
                </div>
            }
          )
          
        }
      </div>
    </div>
  )
}

export default AllPosts