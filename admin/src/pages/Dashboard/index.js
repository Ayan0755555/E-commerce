import DashboardBox from "./components/dashboardBox";
import { HiDotsVertical } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { MdShoppingBag } from "react-icons/md";
import { GiStarsStack } from "react-icons/gi";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useContext, useEffect, useState } from "react";
import { IoIosTimer } from "react-icons/io";
import Button from '@mui/material/Button';
import { Chart } from "react-google-charts";

import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagination from '@mui/material/Pagination';
import { MyContext } from "../../App";

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import Rating from '@mui/material/Rating';
import { deleteData, fetchDataFromApi } from "../../utils/api";

export const data = [
    ["Year", "Sales", "Expenses"],
    ["2013", 1000, 400],
    ["2014", 1170, 460],
    ["2015", 660, 1120],
    ["2016", 1030, 540],
];



export const options = {
    'backgroundColor': 'transparent',
    'chartArea': { 'width': '100%', 'height': '100%' },
};


const Dashboard = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [showBy, setshowBy] = useState(8);
    const [showBysetCatBy, setCatBy] = useState('');
    const [productList, setProductList] = useState([]);
    const [categoryVal, setcategoryVal] = useState('all');


    const [totalUsers, setTotalUsers] = useState();
    const [totalOrders, setTotalOrders] = useState();
    const [totalProducts, setTotalProducts] = useState();
    const [totalProductsReviews, setTotalProductsReviews] = useState();
    const [totalSales, setTotalSales] = useState();

    const open = Boolean(anchorEl);

    const ITEM_HEIGHT = 48;

    const context = useContext(MyContext);

    useEffect(() => {

        context.setisHideSidebarAndHeader(false);
        window.scrollTo(0, 0);
        context.setProgress(40);
        fetchDataFromApi("/api/products?page=1&perPage=8").then((res) => {
            setProductList(res);
            context.setProgress(100);
        })


        fetchDataFromApi("/api/user/get/count").then((res) => {
            setTotalUsers(res.userCount);
        })

        fetchDataFromApi("/api/orders/get/count").then((res) => {
            setTotalOrders(res.orderCount);
        })

        let sales = 0;
        fetchDataFromApi("/api/orders/").then((res) => {
            res.length !== 0 && res?.map((item) => {
                sales += parseInt(item.amount)
            })

            setTotalSales(sales)
        })

        fetchDataFromApi("/api/products/get/count").then((res) => {
            setTotalProducts(res.productsCount);
        })

        fetchDataFromApi("/api/productReviews/get/count").then((res) => {
            setTotalProductsReviews(res.productsReviews);
        })



    }, []);


    const deleteProduct = (id) => {
        context.setProgress(40);
        deleteData(`/api/products/${id}`).then((res) => {
            context.setProgress(100);
            context.setAlertBox({
                open: true,
                error: false,
                msg: 'Product Deleted!'
            });
            fetchDataFromApi("/api/products?page=${1}&perPage=8").then((res) => {
                setProductList(res);
            })
        })
    }


    const handleChange = (event, value) => {
        context.setProgress(40);
        fetchDataFromApi(`/api/products?page=${value}&perPage=8`).then((res) => {
            setProductList(res);
            context.setProgress(100);
        })
    };


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const showPerPage = (e) => {
        setshowBy(e.target.value);
        fetchDataFromApi(`/api/products?page=${1}&perPage=${e.target.value}`).then((res) => {
            setProductList(res);
            context.setProgress(100);
        })
    }

    const handleChangeCategory = (event) => {
        if (event.target.value !== "all") {
            setcategoryVal(event.target.value);
            fetchDataFromApi(`/api/products?category=${event.target.value}`).then((res) => {
                setProductList(res);
                context.setProgress(100);
            })
        }
        if (event.target.value === "all") {
            setcategoryVal(event.target.value);
            fetchDataFromApi(`/api/products?page=${1}&perPage=${8}`).then((res) => {
                setProductList(res);
                context.setProgress(100);
            })
        }

    };

    return (
        <>
            <div className="right-content w-100">
                <div className="row dashboardBoxWrapperRow dashboard_Box dashboardBoxWrapperRowV2">
                    <div className="col-md-12">
                        <div className="dashboardBoxWrapper d-flex">
                            <DashboardBox color={["#1da256", "#48d483"]} icon={<FaUserCircle />} grow={true} title="Total Users" count={totalUsers} />
                            <DashboardBox color={["#c012e2", "#eb64fe"]} icon={<IoMdCart />}
                                title="Total Orders" count={totalOrders} />
                            <DashboardBox color={["#2c78e5", "#60aff5"]} icon={<MdShoppingBag />} title="Total Products" count={totalProducts} />
                            <DashboardBox color={["#e1950e", "#f3cd29"]} icon={<GiStarsStack />} title="Total Reviews" count={totalProductsReviews} />
                        </div>
                    </div>


                    <div className="col-md-4 pl-0 d-none">
                        <div className="box graphBox">
                            <div className="d-flex align-items-center w-100 bottomEle">
                                <h6 className="text-white mb-0 mt-0">Total Sales</h6>

                            </div>

                            <h3 className="text-white font-weight-bold">{totalSales?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h3>

                            <Chart
                                chartType="PieChart"
                                width="100%"
                                height="170px"
                                data={data}
                                options={options}
                            />

                        </div>
                    </div>


                </div>




                <div className="card shadow border-0 p-3 mt-4">
                    <h3 className="hd">Best Selling Products</h3>


                    <div className="row cardFilters mt-3">
                        <div className="col-md-3">
                            <h4>SHOW BY</h4>
                            <FormControl size="small" className="w-100">
                                <Select
                                    value={showBy}
                                    onChange={showPerPage}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    labelId="demo-select-small-label"
                                    className="w-100"
                                >
                                    <MenuItem value={8}>8</MenuItem>
                                    <MenuItem value={20}>20</MenuItem>
                                    <MenuItem value={30}>30</MenuItem>
                                    <MenuItem value={40}>40</MenuItem>
                                    <MenuItem value={50}>50</MenuItem>
                                    <MenuItem value={60}>60</MenuItem>
                                    <MenuItem value={70}>70</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <div className="col-md-3">
                            <h4>CATEGORY BY</h4>
                            <FormControl size="small" className="w-100">
                                <Select
                                    value={categoryVal}
                                    onChange={handleChangeCategory}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    className='w-100'
                                >
                                    <MenuItem value="all">
                                        <em value={"all"}>All</em>
                                    </MenuItem>
                                    {
                                        context.catData?.categoryList?.length !== 0 && context.catData?.categoryList?.map((cat, index) => {
                                            return (
                                                <MenuItem className="text-capitalize" value={cat.id} key={index}>{cat.name}</MenuItem>
                                            )
                                        })
                                    }

                                </Select>
                            </FormControl>
                        </div>


                    </div>


                    <div className="table-responsive mt-3">
                        <table className="table table-bordered table-striped v-align">
                            <thead className="thead-dark">
                                <tr>
                                    <th style={{ width: '300px' }}>PRODUCT</th>
                                    <th>CATEGORY</th>
                                    <th>SUB CATEGORY</th>
                                    <th>BRAND</th>
                                    <th>PRICE</th>
                                    <th>RATING</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    productList?.products?.length !== 0 && productList?.products?.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <div className="d-flex align-items-center productBox">
                                                        <div className="imgWrapper">
                                                            <div className="img card shadow m-0">
                                                                <LazyLoadImage
                                                                    alt={"image"}
                                                                    effect="blur"
                                                                    className="w-100"
                                                                    src={item.images[0]} />
                                                            </div>
                                                        </div>
                                                        <div className="info pl-3">
                                                            <h6>{item?.name}</h6>
                                                            <p>{item?.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td>{item?.category?.name}</td>
                                                <td>{item?.subCat?.subCat}</td>
                                                <td>{item?.brand}</td>
                                                <td>
                                                    <div style={{ width: '70px' }}>
                                                        <del className="old">Rs {item?.oldPrice}</del>
                                                        <span className="new text-danger">Rs {item?.price}</span>
                                                    </div>
                                                </td>
                                                <td><Rating name="read-only" defaultValue={item?.rating} precision={0.5} size="small" readOnly /></td>

                                                <td>
                                                    <div className="actions d-flex align-items-center">

                                                        <Link to={`/product/details/${item.id}`}>
                                                            <Button className="secondary" color="secondary"><FaEye /></Button>
                                                        </Link>


                                                        <Link to={`/product/edit/${item.id}`}>
                                                            <Button className="success" color="success"><FaPencilAlt /></Button>
                                                        </Link>

                                                        <Button className="error" color="error" onClick={() => deleteProduct(item?.id)}><MdDelete /></Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }




                            </tbody>

                        </table>


                        {
                            productList?.totalPages > 1 &&
                            <div className="d-flex tableFooter">
                                <Pagination count={productList?.totalPages} color="primary" className="pagination" showFirstButton showLastButton onChange={handleChange} />
                            </div>
                        }


                    </div>



                </div>


            </div>
        </>
    )
}

export default Dashboard;