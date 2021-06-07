import React, {Component} from 'react';
import {Button} from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import "./Login.css"
import axios from "axios";

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            email: '',
            password: '',
            confirmPassword: '',
            openSuccessSnack:false,
            openErrSnack:false,
            errMsg: ''
        }
    }

    onChangeEmail(e) {
        this.setState({email: e.target.value})
    }

    onChangePassword(e) {
        this.setState({password: e.target.value})
    }
    confirmPassword(e) {
        this.setState({confirmPassword: e.target.value})
    }
    onChangeName(e) {
        this.setState({name: e.target.value})
    }
    submit() {
        axios.post('http://localhost:8085/api/v1/user/create', {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        }).then(res => {
            if (res.data['status']) {
                this.setState({openSuccessSnack: true})
            }
            this.props.history.push("/")
        }).catch(err => {
                this.setState({openErrSnack: true, errMsg: err.response ? err.response.data.statusMessage:''})
        })
    }
    render() {
        return (
            <div className={"login"}>
                <h2>Register here</h2>
                <form className={"login_form"}>
                    <input className={"input"} type={"text"} name={"name"} aria-required="true" placeholder={"Name"}
                           value={this.state.name}
                           onChange={(e) => this.onChangeName(e)}/>
                    <input className={"input"} type={"email"} name={"email"} aria-required="true" placeholder={"Email"}
                           value={this.state.email}
                           onChange={(e) => this.onChangeEmail(e)}/>
                    <input className={"input"} type={"password"} placeholder={"Password"} value={this.state.password}
                           onChange={(e) => this.onChangePassword(e)}/>
                    <input className={"input"} type={"password"} name={"confirmPassword"} placeholder={"Confirm Password"} value={this.state.confirmPassword}
                           onChange={(e) => this.confirmPassword(e)}/>
                    <Button variant={'contained'} id={"button"}
                            disabled={this.state.email.length === 0 && this.state.password.length === 0}
                            onClick={() => this.submit()}>Submit</Button>
                </form>
                <Snackbar open={this.state.openSuccessSnack} autoHideDuration={3000}
                          severity="success" message="User Registration Successful"/>
                <Snackbar open={this.state.openErrSnack} autoHideDuration={3000} message={this.state.errMsg}/>
            </div>
        );
    }
}

export default Registration;