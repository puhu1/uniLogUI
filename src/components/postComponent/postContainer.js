import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, CardContent, TextField} from "@material-ui/core";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import {formatDate} from "../constant/constants";


const PostContainer = (props) =>{
    const [post,setPost] = useState('')
    const [openSnack,setSnack] = useState(false)
    const [allPost, setAllPost] = useState([]);
    useEffect(() => {
        getAllPost()
    }, [])

    function getAllPost() {
        setSnack(false)
        setPost('')
        axios.get('http://localhost:8085/api/v1/chat/getAll').then(res => {
            setAllPost([...res.data.response])
        })
    }
    function createPost() {
        let payload = {
            "userId": props.match.params.id,
            "postMessage": post
        }
        axios.post('http://localhost:8085/api/v1/chat/create',payload).then(res => {
            setPost(res.data.response.postMessage)
            setSnack(true)
            getAllPost()

        }).catch(err=>{

        })
    }

    return (
        <div className={'postContainer'}>
            <h2 className={'postheader'}>Your Post !</h2>
            <div className={"textFieldInput"} >
                <TextField className={"textFieldInput"} variant="outlined" placeholder={'Write your thoughts !'}
                           onChange={(e)=>{setPost(e.target.value)}}
                           value={post}
                />
                <Button className={"textFieldInput"} variant={'contained'} onClick={()=>{createPost()}}>Post</Button>
            </div>

            {allPost ? allPost.map((v, i) => {
                return <Card className={'postheader'}>
                    <CardContent>
                        <TextField className={"textField"} key={i} id="filled-basic" label="Your post" value={v.postMessage}
                                   variant="filled" />
                                   <p style={{fontSize:'10px',color:"darkgrey"}}>{formatDate(v.createdAt)}</p>
                    </CardContent>
                </Card>
            }) : ''}
            <Snackbar open={openSnack} autoHideDuration={1000}
                       message="Post Created Successful"/>
        </div>
    )
}

export default PostContainer;