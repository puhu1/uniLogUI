import React, {createContext, useEffect, useState} from 'react';

import "./Login.css"
import {Button} from "@material-ui/core";
import axios from "axios";
import Snackbar from '@material-ui/core/Snackbar';

const Login = (props) => {

        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')
        const [openSuccessSnack, setSuccessSnack] = useState(false)
        const [openErrSnack, setErrSnack] = useState(false)
        const [errMsg, setErrMsg] = useState('')

        function onChangeEmail(e) {
            setEmail(e.target.value)
        }

        function onChangePassword(e) {
            setPassword(e.target.value)
        }

        function submitLogin() {
            axios.post('http://localhost:8085/api/v1/user/login', {
                email: email,
                password: password,
            }).then(res => {
                if (res.data['status']) {
                    setSuccessSnack(true)
                }
                props.history.push(`/post/${res.data.response.userId}`)
            }).catch(err => {
                setErrSnack(true)
                setErrMsg(err.response.data.statusMessage)
            })
        }

        return (
                <div className={"login"}>
                    <div>
                        <h2>Login</h2>
                        <form className={"login_form"}>
                            <input className={"input"} type={"email"} name={"email"} aria-required="true"
                                   placeholder={"Email"}
                                   value={email}
                                   onChange={(e) => onChangeEmail(e)}/>
                            <input className={"input"} type={"password"} placeholder={"Password"}
                                   value={password}
                                   onChange={(e) => onChangePassword(e)}/>
                            <Button variant={'contained'} id={"button"}
                                    disabled={email.length === 0 && password.length === 0}
                                    onClick={() => submitLogin()}>Submit</Button>
                            <Button id={'button'} variant={'contained'}
                                    onClick={() => props.history.push('/registration')}>Register
                                here</Button>
                        </form>
                    </div>
                    <Snackbar open={openSuccessSnack} autoHideDuration={3000}
                              severity="success" message="User Registration Successful"/>
                    <Snackbar open={openErrSnack} autoHideDuration={3000} message={errMsg}/>
                </div>
        )
}

export {Login};
