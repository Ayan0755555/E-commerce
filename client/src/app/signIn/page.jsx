"use client"
import { useContext, useEffect, useState } from "react";
import Logo from '../../assets/images/logo.jpg';
import { MyContext } from "@/context/ThemeContext";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import Link from "next/link";

import GoogleImg from '../../assets/images/googleImg.png';
import CircularProgress from '@mui/material/CircularProgress';
import { postData } from "@/utils/api";
import Image from "next/image";

const SignIn = () => {

    const [isLoading, setIsLoading] = useState(false);
    const context = useContext(MyContext);
    const history = useRouter();


    useEffect(() => {
        context.setisHeaderFooterShow(false);
    }, []);

    const [formfields, setFormfields] = useState({
        email: "",
        password: ""
    })


    const onchangeInput = (e) => {
        setFormfields(() => ({
            ...formfields,
            [e.target.name]: e.target.value
        }))
    }


    const login = (e) => {
        e.preventDefault();

        if (formfields.email === "") {
            context.setAlertBox({
                open: true,
                error: true,
                msg: "email can not be blank!"
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
        postData("/api/user/signin", formfields).then((res) => {

            try {

                if (res.error !== true) {
                    localStorage.setItem("token", res.token);

                    const user = {
                        name: res.user?.name,
                        email: res.user?.email,
                        userId: res.user?.id
                    }

                    localStorage.setItem("user", JSON.stringify(user));


                    context.setAlertBox({
                        open: true,
                        error: false,
                        msg: "User Login Successfully!"
                    });

                    setTimeout(() => {
                        //history("/dashboard");
                        setIsLoading(false);
                        window.location.href = "/";
                    }, 2000);
                }

                else {
                    context.setAlertBox({
                        open: true,
                        error: true,
                        msg: res.msg
                    });
                    setIsLoading(false);
                }

            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }

        })


    }


    return (
        <section className="section signInPage">
            <div className="shape-bottom"> <svg fill="#fff" id="Layer_1" x="0px" y="0px" viewBox="0 0 1921 819.8" style={{ enableBackground: 'new 0 0 1921 819.8' }} > <path class="st0" d="M1921,413.1v406.7H0V0.5h0.4l228.1,598.3c30,74.4,80.8,130.6,152.5,168.6c107.6,57,212.1,40.7,245.7,34.4 c22.4-4.2,54.9-13.1,97.5-26.6L1921,400.5V413.1z"></path> </svg>
            </div>

            <div className="container">
                <div className="box card p-3 shadow border-0">
                    <div className="text-center">
                        <Image src={Logo} />
                    </div>


                    <form className="mt-3" onSubmit={login}>
                        <h2 className="mb-4">Sign In</h2>

                        <div className="form-group">
                            <TextField id="standard-basic" label="Email" type="email" required variant="standard" className="w-100" name="email" onChange={onchangeInput}/>
                        </div>
                        <div className="form-group">
                            <TextField id="standard-basic" label="Password" type="password" required variant="standard" className="w-100" name="password" onChange={onchangeInput}/>
                        </div>



                        <a className="border-effect cursor txt">Forgot Password?</a>

                        <div className="d-flex align-items-center mt-3 mb-3 ">
                            <Button type="submit" className="btn-blue col btn-lg btn-big">
                                {
                                    isLoading === true ? <CircularProgress /> : 'Sign In'
                                }
                            </Button>
                            <Link href="/"> <Button className="btn-lg btn-big col ml-3"  variant="outlined" onClick={()=>context.setisHeaderFooterShow(true)}>Cancel</Button></Link>
                        </div>

                        <p className="txt">Not Registered? <Link href="/signUp" className="border-effect">Sign Up</Link></p>

                        <h6 className="mt-4 text-center font-weight-bold">Or continue with social account</h6>

                        <Button className="loginWithGoogle mt-2" variant="outlined"><Image src={GoogleImg} /> Sign In with Google</Button>

                    </form>

                </div>
            </div>
        </section>
    )
}

export default SignIn;