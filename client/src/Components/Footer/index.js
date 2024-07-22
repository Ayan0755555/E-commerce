"use client"
import { LuShirt } from "react-icons/lu";
import { TbTruckDelivery } from "react-icons/tb";
import { RiDiscountPercentLine } from "react-icons/ri";
import { CiBadgeDollar } from "react-icons/ci";
import Link from "next/link";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import newsLetterImg from '../../assets/images/newsletter.png';
import Button from '@mui/material/Button';
import { IoMailOutline } from "react-icons/io5";
import Image from "next/image";

import { MyContext } from "@/context/ThemeContext";
import { useContext } from "react";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import ProductModal from "../ProductModal";

const Footer = () => {

    const context = useContext(MyContext);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        context.setAlertBox({
            open: false
        });
    };


    return (
        <>

            <Snackbar open={context.alertBox.open} autoHideDuration={6000} onClose={handleClose} className="snackbar">
                <Alert
                    onClose={handleClose}
                    autoHideDuration={6000}
                    severity={context.alertBox.error === false ? "success" : 'error'}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {context.alertBox.msg}
                </Alert>
            </Snackbar>

            {
                context.isHeaderFooterShow === true &&
                <>
                    <section className="newsLetterSection mt-3 mb-3 d-flex align-items-center">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6">
                                    <p className="text-white mb-1">$20 discount for your first order</p>
                                    <h3 className="text-white">Join our newsletter and get...</h3>
                                    <p className="text-light">Join our email subscription now to get updates on<br /> promotions and coupons.</p>


                                    <form className="mt-4">
                                        <IoMailOutline />
                                        <input type="text" placeholder="Your Email Address" />
                                        <Button>Subscribe</Button>
                                    </form>

                                </div>

                                <div className="col-md-6">
                                    <Image src={newsLetterImg} alt="image" />
                                </div>
                            </div>
                        </div>
                    </section>
                    <footer>
                        <div className="container">
                            <div className="topInfo row">
                                <div className="col d-flex align-items-center">
                                    <span><LuShirt /></span>
                                    <span className="ml-2">Everyday fresh products</span>
                                </div>


                                <div className="col d-flex align-items-center">
                                    <span><TbTruckDelivery /></span>
                                    <span className="ml-2">Free delivery for order over $70</span>
                                </div>

                                <div className="col d-flex align-items-center">
                                    <span><RiDiscountPercentLine /></span>
                                    <span className="ml-2">Daily Mega Discounts</span>
                                </div>


                                <div className="col d-flex align-items-center">
                                    <span><CiBadgeDollar /></span>
                                    <span className="ml-2">Best price on the market</span>
                                </div>


                            </div>



                            <div className="row mt-5 linksWrap">
                                <div className="col">
                                    <h5>FRUIT & VEGETABLES</h5>
                                    <ul>
                                        <li><Link href="/">Fresh Vegetables</Link></li>
                                        <li><Link href="/">Herbs & Seasonings</Link></li>
                                        <li><Link href="/">Fresh Fruits</Link></li>
                                        <li><Link href="/">Cuts & Sprouts</Link></li>
                                        <li><Link href="/">Exotic Fruits & Veggies</Link></li>
                                        <li><Link href="/">Packaged Produce</Link></li>
                                        <li><Link href="/">Party Trays</Link></li>
                                    </ul>
                                </div>

                                <div className="col">
                                    <h5>BREAKFAST & DAIRY</h5>
                                    <ul>
                                        <li><Link href="/">Fresh Vegetables</Link></li>
                                        <li><Link href="/">Herbs & Seasonings</Link></li>
                                        <li><Link href="/">Fresh Fruits</Link></li>
                                        <li><Link href="/">Cuts & Sprouts</Link></li>
                                        <li><Link href="/">Exotic Fruits & Veggies</Link></li>
                                        <li><Link href="/">Packaged Produce</Link></li>
                                        <li><Link href="/">Party Trays</Link></li>
                                    </ul>
                                </div>

                                <div className="col">
                                    <h5>MEAT & SEAFOOD</h5>
                                    <ul>
                                        <li><Link href="/">Fresh Vegetables</Link></li>
                                        <li><Link href="/">Herbs & Seasonings</Link></li>
                                        <li><Link href="/">Fresh Fruits</Link></li>
                                        <li><Link href="/">Cuts & Sprouts</Link></li>
                                        <li><Link href="/">Exotic Fruits & Veggies</Link></li>
                                        <li><Link href="/">Packaged Produce</Link></li>
                                        <li><Link href="/">Party Trays</Link></li>
                                    </ul>
                                </div>

                                <div className="col">
                                    <h5>BEVERAGES</h5>
                                    <ul>
                                        <li><Link href="/">Fresh Vegetables</Link></li>
                                        <li><Link href="/">Herbs & Seasonings</Link></li>
                                        <li><Link href="/">Fresh Fruits</Link></li>
                                        <li><Link href="/">Cuts & Sprouts</Link></li>
                                        <li><Link href="/">Exotic Fruits & Veggies</Link></li>
                                        <li><Link href="/">Packaged Produce</Link></li>
                                        <li><Link href="/">Party Trays</Link></li>
                                    </ul>
                                </div>

                                <div className="col">
                                    <h5>BREADS & BAKERY</h5>
                                    <ul>
                                        <li><Link href="/">Fresh Vegetables</Link></li>
                                        <li><Link href="/">Herbs & Seasonings</Link></li>
                                        <li><Link href="/">Fresh Fruits</Link></li>
                                        <li><Link href="/">Cuts & Sprouts</Link></li>
                                        <li><Link href="/">Exotic Fruits & Veggies</Link></li>
                                        <li><Link href="/">Packaged Produce</Link></li>
                                        <li><Link href="/">Party Trays</Link></li>
                                    </ul>
                                </div>
                            </div>



                            <div className="copyright mt-3 pt-3 pb-3 d-flex">
                                <p className="mb-0">Copyright 2024. All rights reserved</p>
                                <ul className="list list-inline ml-auto mb-0 socials">
                                    <li className="list-inline-item">
                                        <Link href="/"><FaFacebookF /></Link>
                                    </li>

                                    <li className="list-inline-item">
                                        <Link href="/"><FaTwitter /></Link>
                                    </li>

                                    <li className="list-inline-item">
                                        <Link href="/"><FaInstagram /></Link>
                                    </li>
                                </ul>
                            </div>



                        </div>
                    </footer>
                </>
            }




            {
                context.isOpenProductModal === true && <ProductModal data={context.productData} />
            }

        </>
    )
}

export default Footer;