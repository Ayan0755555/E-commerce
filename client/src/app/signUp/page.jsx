"use client"
import { useContext, useEffect, useState } from "react";
import Logo from '../../assets/images/logo.jpg';
import { MyContext } from "@/context/ThemeContext";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from "next/link";

import GoogleImg from '../../assets/images/googleImg.png';
import { postData } from "@/utils/api";
import { useRouter } from 'next/navigation';
import CircularProgress from '@mui/material/CircularProgress';
import Image from "next/image";

const SignUp = () => {

    const [isLoading, setIsLoading] = useState(false); 
    const [formfields, setFormfields] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        isAdmin: false
    })


    const context = useContext(MyContext);
    const history = useRouter();

    useEffect(() => {
        context.setisHeaderFooterShow(false);
    }, []);


    const onchangeInput = (e) => {
        setFormfields(() => ({
            ...formfields,
            [e.target.name]: e.target.value
        }))
    }

    const register = (e) => {
        console.log(formfields)
        e.preventDefault();
        try {

            if (formfields.name === "") {
                context.setAlertBox({
                    open: true,
                    error: true,
                    msg: "name can not be blank!"
                })
                return false;
            }

            if (formfields.email === "") {
                context.setAlertBox({
                    open: true,
                    error: true,
                    msg: "email can not be blank!"
                })
                return false;
            }

            if (formfields.phone === "") {
                context.setAlertBox({
                    open: true,
                    error: true,
                    msg: "phone can not be blank!"
                })
                return false;
            }

            if (formfields.password === "") {
                context.setAlertBox({
                    open: true,
                    error: true,
                    msg: "password can not be blank!"
                })
                return false;
            }

            setIsLoading(true);

            postData("/api/user/signup", formfields).then((res) => {
                if (res.error !== true) {
                    context.setAlertBox({
                        open: true,
                        error: false,
                        msg: "Register Successfully!"
                    });
                   
                    setTimeout(() => {
                        setIsLoading(true);
                        history.push("/signIn");
                        //window.location.href="/signIn";
                    }, 2000);
                }

                else {
                    setIsLoading(false);
                    context.setAlertBox({
                        open: true,
                        error: true,
                        msg: res.msg
                    });
                }

            }).catch(error => {
                setIsLoading(false);
                console.error('Error posting data:', error);
                // Handle error (e.g., show an error message)
            });

        } catch (error) {
            console.log(error)
        }


    }


    return (
        <section className="section signInPage signUpPage">
            <div className="shape-bottom"> <svg fill="#fff" id="Layer_1" x="0px" y="0px" viewBox="0 0 1921 819.8" style={{ enableBackground: 'new 0 0 1921 819.8' }} > <path class="st0" d="M1921,413.1v406.7H0V0.5h0.4l228.1,598.3c30,74.4,80.8,130.6,152.5,168.6c107.6,57,212.1,40.7,245.7,34.4 c22.4-4.2,54.9-13.1,97.5-26.6L1921,400.5V413.1z"></path> </svg>
            </div>

            <div className="container">
                <div className="box card p-3 shadow border-0">
                    <div className="text-center">
                        <Image src={Logo} />
                    </div>


                    <form className="mt-2" onSubmit={register}>
                        <h2 className="mb-3">Sign Up</h2>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <TextField label="Name" name="name" onChange={onchangeInput} type="text" variant="standard" className="w-100" />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <TextField label="Phone No." name="phone" onChange={onchangeInput}  type="text" variant="standard" className="w-100" />
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <TextField id="standard-basic" label="Email" type="email"  name="email" onChange={onchangeInput}   variant="standard" className="w-100" />
                        </div>
                        <div className="form-group">
                            <TextField id="standard-basic" label="Password" name="password" onChange={onchangeInput}  type="password" variant="standard" className="w-100" />
                        </div>



                        <a className="border-effect cursor txt">Forgot Password?</a>

                        <div className="d-flex align-items-center mt-3 mb-3 ">
                            <div className="row w-100">
                                <div className="col-md-6">
                                    <Button type="submit" disabled={isLoading===true ? true : false} className="btn-blue w-100 btn-lg btn-big">
                                    {
                                        isLoading===true ? <CircularProgress/> :'Sign Up'
                                    }
                                    </Button>
                                </div>
                                <div className="col-md-6 pr-0">
                                    <Link href="/" className="d-block w-100"> <Button className="btn-lg btn-big w-100" variant="outlined" onClick={() => context.setisHeaderFooterShow(true)}>Cancel</Button></Link>
                                </div>

                            </div>



                        </div>

                        <p className="txt">Not Registered? <Link href="/signIn" className="border-effect">Sign In</Link></p>

                        <h6 className="mt-4 text-center font-weight-bold">Or continue with social account</h6>

                        <Button className="loginWithGoogle mt-2" variant="outlined"><Image src={GoogleImg} /> Sign In with Google</Button>

                    </form>

                </div>
            </div>
        </section>
    )
}

export default SignUp;