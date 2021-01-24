import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';
import { Button, InputLabel, MenuItem, Select, TextField, Typography } from "@material-ui/core";
import { SubdirectoryArrowLeftRounded } from "@material-ui/icons";
import AuthService from "../services/auth.service"
import Controls from "./employees/controls/Controls";
import Notification from "./employees/Notification";




const useStyles = makeStyles((theme) => ({
    formControl: {
      marginBottom: theme.spacing(3),
    //   margin: theme.spacing(3),
      minWidth: '30ch',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    avatar: {
        marginBottom: theme.spacing(1),
        marginLeft: theme.spacing(2),
        backgroundColor: theme.palette.secondary.main,
    },
    inputField:{
        width: '30ch',
    },
  }));


export default function SignUp(props) {
    const classes = useStyles();

    const [message, setMessage] = React.useState('');
    const [redirect, setRedirect] = React.useState('');

    const [firstName, setFirstName] = React.useState(null);
    const [lastName, setLastName] = React.useState(null);
    const [email, setEmail] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const [department, setDepartment] = React.useState(null);
    const [role, setRole] = React.useState(null);

    const [emailErrMessage, setEmailErrMessage] = React.useState("")
    const [passwordErrMessage, setPasswordErrMessage] = React.useState("")
    const [valid, setValid] = React.useState(false)
    const [notify, setNotify] = React.useState({ isOpen: false, message: '', type: '' })

    const emailValidate = (emailValue) => {
        let err = ""
        if ((/$^|.+@.+..+/).test(emailValue)){
            err = ""
            setValid(true)
        }
        else{
            err="Email is no valid"
            setValid(false)
        }
        setEmailErrMessage(err)
    }

    const passwordValidate = (passwordValue) => {
        let err = ""
        if (passwordValue.length >= 6 || passwordValue.length < 1){
            err = ""
            setValid(true) 
        }
        else{
            err = "Password should consist more than 6 symbols"
            setValid(false)
        }   
        setPasswordErrMessage(err)
    }

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value)
    }

    const handleLastNameChange = (event) => {
        setLastName(event.target.value)
    }

    const handleEmailChange = (event) =>{
        emailValidate(event.target.value)
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event) =>{
        passwordValidate(event.target.value)
        setPassword(event.target.value)
    }
    const handleDepartmentChange = (event)=>{
        setDepartment(event.target.value)
        console.log(role)

    }

    const handleRoleChange = (event) => {
      setRole(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        if(valid){
            AuthService.register(
                firstName,
                lastName,
                email,
                password,
                department,
                role
            )
            .then(()=>{
                    setRedirect("/sign-in")
                },
                error => {
                    let resMessage = ""
                    console.log(error.response)
                    if(error.response){
                        if (error.response.status == 500) resMessage = "Server error"
                    }
                    else resMessage="Server is not available"
                    setNotify({
                        isOpen: true,
                        message: resMessage,
                        type: "error"
                    })
                    
                    setMessage(resMessage);
                })
        }
    }
    if(redirect){        
        return (
            <div>
                <Redirect to={{
                        pathname: redirect,
                        state: {
                            notify: true
                        }
                    }}/>
            </div>
        )
    }
    return (
    <div className="auth-wrapper">
        <div className="auth-inner-singup">

            <Grid container justify="center">
                <Grid item>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                </Grid>
            </Grid>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={1}>
                        
                        <Grid item md={6}>
                            <Controls.Input 
                            required 
                            className={classes.inputField} 
                            label="Firstname"  
                            margin="normal"
                            onChange={handleFirstNameChange}/>
                                {/* <input type="email" className="form-control" placeholder="Enter email" /> */}
                        </Grid>
                        <Grid item md={6}>
                            <Controls.Input 
                            required 
                            className={classes.inputField} 
                            label="Lastname" 
                            margin="normal"
                            onChange={handleLastNameChange}/>
                        </Grid>

                        <Grid item md={6}>
                            <Controls.Input
                            required 
                            className={classes.inputField} 
                            label="Email" 
                            margin="normal"
                            onChange={handleEmailChange}
                            error={emailErrMessage}
                            errorText="table"
                            errorStyle="relative"/>
                        </Grid>
                        <Grid item md={6}>
                                
                                <Controls.Input 
                                    required 
                                    margin="normal"
                                    className={classes.inputField}
                                    label="Password"
                                    type="password"
                                    onChange={handlePasswordChange}
                                    error={passwordErrMessage}
                                />
                        </Grid>
                        <Grid item md={6}>
                            <Controls.Input 
                            className={classes.inputField} 
                            label="Department" 
                            margin="normal"
                            onChange={handleDepartmentChange}/>
                        </Grid>
                        <Grid item md={6}>

                        <FormControl 
                            margin="normal" 
                            className={classes.formControl}>
                                <InputLabel required>Position</InputLabel>
                                <Select
                                value={role}
                                onChange={handleRoleChange}
                                
                                >
                                    <MenuItem value={"leader"} >Leader</MenuItem>
                                    <MenuItem value={"employee"}>Employee</MenuItem>
                                </Select>
                        </FormControl>
                        </Grid>
                    </Grid>

                    <Grid container md={12} >
                            <Button variant="contained" color="primary" style={{width: '100%'}} type="submit">Sign Up</Button>    
                    </Grid>

                    <Grid container justify="flex-end">
                        <Grid item>
                        <Link to={"/sign-in"} variant="body2">
                            <Typography variant="caption">
                                Already have an account? Sign in
                            </Typography>
                        </Link>
                        </Grid>
                    </Grid>
                </form>
                <Notification
                    notify={notify}
                    setNotify={setNotify}
                />
            </div>
        </div>
    );
}