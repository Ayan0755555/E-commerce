"use client"
import Sidebar from '@/Components/Sidebar';
import Button from '@mui/material/Button';
import { IoIosMenu } from "react-icons/io";
import { CgMenuGridR } from "react-icons/cg";
import { HiViewGrid } from "react-icons/hi";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import { FaAngleDown } from "react-icons/fa6";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useContext, useEffect, useState } from "react";
import ProductItem from '@/Components/ProductItem';
import Pagination from '@mui/material/Pagination';

import CircularProgress from '@mui/material/CircularProgress';
import { FaFilter } from "react-icons/fa";

import { MyContext } from '@/context/ThemeContext';
import { fetchDataFromApi } from '@/utils/api';

const Listing = ({ params }) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [productView, setProductView] = useState('four');
    const [productData, setProductData] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const [filterId, setFilterId] = useState("");
    const [isOpenFilter, setIsOpenFilter] = useState(false);

    const openDropdown = Boolean(anchorEl);

    const context = useContext(MyContext);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const id = params.subcatid;

    useEffect(() => {
        window.scrollTo(0, 0);

        let url = window.location.href;
        let apiEndPoint = `/api/products?subCat=${id}&location=${localStorage.getItem("location")}`;


        setisLoading(true);
        fetchDataFromApi(`${apiEndPoint}`).then((res) => {
            setProductData(res)
            setisLoading(false);
        })
    }, [id]);


    const filterData = (subCatId) => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })

        setFilterId(subCatId)
        setisLoading(true);

        fetchDataFromApi(`/api/products?subCatId=${subCatId}&location=${localStorage.getItem("location")}`).then((res) => {
            setProductData(res);
            setisLoading(false);
        })
    }

    const filterByPrice = (price, catId, subCatId) => {

        setisLoading(true);

        if (filterId === "") {
            if (subCatId !== "" && subCatId !== null && subCatId !== undefined) {
                fetchDataFromApi(`/api/products?minPrice=${price[0]}&maxPrice=${price[1]}&subCatId=${subCatId}&location=${localStorage.getItem("location")}`).then((res) => {
                    setProductData(res)
                    setisLoading(false);
                    // window.scrollTo({
                    //     top: 0,
                    //     behavior: 'smooth',
                    // })
                })
            }
        }

        if (filterId !== "") {
            fetchDataFromApi(`/api/products?minPrice=${price[0]}&maxPrice=${price[1]}&subCatId=${filterId}&location=${localStorage.getItem("location")}`).then((res) => {
                setProductData(res)
                setisLoading(false);
                // window.scrollTo({
                //     top: 0,
                //     behavior: 'smooth',
                // })
            })
        }

    }

    const filterByRating = (rating, catId, subCatId) => {
        console.log(catId, subCatId)
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
        setisLoading(true);

        if (subCatId !== "" && subCatId !== null && subCatId !== undefined) {
            fetchDataFromApi(`/api/products?rating=${rating}&subCatId=${subCatId}&location=${localStorage.getItem("location")}`).then((res) => {
                setProductData(res)
                setisLoading(false);
            })
        }

    }


    const handleChange = (event, value) => {
        setisLoading(true);
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
        fetchDataFromApi(`/api/products?subCatId=${id}&page=${value}&perPage=6&location=${localStorage.getItem("location")}`).then((res) => {
            setProductData(res);
            setisLoading(false);
        })
    };


    const openFilters = () => {
        setIsOpenFilter(!isOpenFilter)
    }

    return (
        <>
            <section className="product_Listing_Page">
                <div className="container">
                    <div className="productListing d-flex">
                        <Sidebar filterData={filterData} filterByPrice={filterByPrice} filterByRating={filterByRating} isOpenFilter={isOpenFilter} catId={params.categoryId} subCatId={params.subcatid} />

                        <div className="content_right">

                            <div className="showBy mt-0 mb-3 d-flex align-items-center">
                                <div className="d-flex align-items-center btnWrapper">
                                    <Button className={productView === 'one' && 'act'} onClick={() => setProductView('one')}><IoIosMenu />
                                    </Button>

                                    <Button className={productView === 'three' && 'act'} onClick={() => setProductView('three')}>
                                        <CgMenuGridR /></Button>
                                    <Button className={productView === 'four' && 'act'} onClick={() => setProductView('four')}><TfiLayoutGrid4Alt /></Button>
                                </div>

                                <div className="ml-auto showByFilter">
                                    <Button onClick={handleClick}>Show 9 <FaAngleDown /></Button>
                                    <Menu
                                        className="w-100 showPerPageDropdown"
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={openDropdown}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        <MenuItem onClick={handleClose}>10</MenuItem>
                                        <MenuItem onClick={handleClose}>20</MenuItem>
                                        <MenuItem onClick={handleClose}>30</MenuItem>
                                        <MenuItem onClick={handleClose}>40</MenuItem>
                                        <MenuItem onClick={handleClose}>50</MenuItem>
                                        <MenuItem onClick={handleClose}>60</MenuItem>
                                    </Menu>
                                </div>
                            </div>


                            <div className="productListing">
                                {
                                    isLoading === true ?
                                        <div className="loading d-flex align-items-center justify-content-center">
                                            <CircularProgress color="inherit" />
                                        </div>
                                        :

                                        <>
                                            {
                                                productData?.products?.map((item, index) => {
                                                    return (
                                                        <ProductItem key={index} itemView={productView} item={item} />
                                                    )
                                                })
                                            }
                                        </>

                                }



                            </div>




                        </div>
                    </div>
                </div>
            </section>


            {
                context.windowWidth < 992 &&
                <>
                    {
                        context.isOpenNav === false &&
                        <div className="fixedBtn row">
                            <div className="col">
                                <Button className='btn-blue bg-red btn-lg btn-big' onClick={openFilters}>
                                    <FaFilter />
                                    {isOpenFilter === true ? 'Close Filters' : 'Open Filters'}

                                </Button>
                            </div>
                        </div>
                    }
                </>

            }


        </>
    )
}

export default Listing;