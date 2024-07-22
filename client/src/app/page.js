"use client"
import banner1 from '../assets/images/banner1.jpg';
import banner2 from '../assets/images/banner2.jpg';
import Button from '@mui/material/Button';
import { IoIosArrowRoundForward } from "react-icons/io";
import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import ProductItem from "@/Components/ProductItem";
import HomeCat from "@/Components/HomeCat";

import banner3 from '../assets/images/banner3.jpg';
import banner4 from '../assets/images/banner4.jpg';

import { MyContext } from "@/context/ThemeContext";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { fetchDataFromApi } from "@/utils/api";
import HomeBanner from '@/Components/HomeBanner';
import Image from 'next/image';


export default function Home() {


  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [selectedCat, setselectedCat] = useState();
  const [filterData, setFilterData] = useState([]);
  const [homeSlides, setHomeSlides] = useState([]);

  const [value, setValue] = React.useState(0);

  const context = useContext(MyContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const selectCat = (cat) => {
    setselectedCat(cat);
  }


  useEffect(() => {
    window.scrollTo(0, 0);

    setselectedCat(context.categoryData[0]?.name)


    const location = localStorage.getItem("location");
    if (location !== null && location !== "" && location !== undefined) {
        fetchDataFromApi(`/api/products/featured?location=${location}`).then((res) => {
            setFeaturedProducts(res)
        })


        fetchDataFromApi(`/api/products?page=1&perPage=8&location=${location}`).then((res) => {
            setProductsData(res);
        })
    } else{
     // setselectedCountry("All");
      localStorage.setItem("location", "All");
    }

    fetchDataFromApi("/api/homeBanner").then((res) => {
      setHomeSlides(res);
    })

  }, [])


  useEffect(() => {
    if (context.categoryData[0] !== undefined)
      setselectedCat(context.categoryData[0].name)
  }, [context.categoryData])


  useEffect(() => {
    if (selectedCat !== undefined) {
        const location = localStorage.getItem("location");
        fetchDataFromApi(`/api/products?catName=${selectedCat}&location=${location}`).then((res) => {
            setFilterData(res.products);
            // console.log(selectedCat)
        })
    }

}, [selectedCat]);

  return (
    <>
      <div className='marginTop'></div>
      {
        homeSlides?.length !== 0 && <HomeBanner data={homeSlides} />
      }

      {
        context.categoryData?.length !== 0 && <HomeCat catData={context.categoryData} />
      }



      <section className="homeProducts">
        <div className="container">
          <div className="row homeProductsRow">
            <div className="col-md-3">
              <div className="sticky">
                <div className="banner">
                  <Image src={banner1} className="cursor w-100" />
                </div>

                <div className="banner mt-4">
                  <Image src={banner2} className="cursor w-100" />
                </div>
              </div>
            </div>

            <div className="col-md-9 productRow">
              <div className="d-flex align-items-center res-flex-column">
                <div className="info" style={{ width: "35%" }}>
                  <h3 className="mb-0 hd">Popular Products</h3>
                  <p className="text-light text-sml mb-0">Do not miss the current offers until the end of March.</p>
                </div>

                <div className="ml-auto res-full" style={{ width: "65%" }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    className="filterTabs"
                  >
                    {
                      context.categoryData?.map((item, index) => {
                        return (
                          <Tab className="item" label={item.name}
                            onClick={() => selectCat(item.name)} />
                        )
                      })
                    }
                  </Tabs>
                </div>

              </div>


              <div className="product_row w-100 mt-2">
                <Swiper
                  slidesPerView={4}
                  spaceBetween={0}
                  navigation={true}
                  slidesPerGroup={context.windowWidth > 992 ? 3 : 1}
                  modules={[Navigation]}
                  className="mySwiper"
                  breakpoints={{
                    300: {
                      slidesPerView: 1,
                      spaceBetween: 5,
                    },
                    400: {
                      slidesPerView: 2,
                      spaceBetween: 5,
                    },
                    600: {
                      slidesPerView: 3,
                      spaceBetween: 5,
                    },
                    750: {
                      slidesPerView: 4,
                      spaceBetween: 5,
                    }
                  }}
                >
                  {
                    filterData?.length !== 0 && filterData?.slice(0)?.reverse()?.map((item, index) => {
                      return (
                        <SwiperSlide key={index}>
                          <ProductItem item={item} />
                        </SwiperSlide>
                      )
                    })
                  }

                </Swiper>
              </div>


              <div className="d-flex mt-4 mb-3 bannerSec">
                <div className="banner">
                  <Image src={banner3} className="cursor w-100" />
                </div>

                <div className="banner">
                  <Image src={banner4} className="cursor w-100" />
                </div>

                <div className="banner">
                  <Image src={banner4} className="cursor w-100" />
                </div>

              </div>



              <div className="d-flex align-items-center mt-3">
                <div className="info w-75">
                  <h3 className="mb-0 hd">NEW PRODUCTS</h3>
                  <p className="text-light text-sml mb-0">New products with updated stocks.</p>
                </div>

              </div>



              <div className="product_row productRow2 w-100 mt-4 d-flex">
                {
                  productsData?.products?.length !== 0 && productsData?.products?.slice(0).reverse().map((item, index) => {
                    return (
                      <ProductItem key={index} item={item} />
                    )
                  })
                }


              </div>




              <div className="d-flex align-items-center mt-4">
                <div className="info">
                  <h3 className="mb-0 hd">featured products</h3>
                  <p className="text-light text-sml mb-0">Do not miss the current offers until the end of March.</p>
                </div>


              </div>


              <div className="product_row w-100 mt-2">
                <Swiper
                  slidesPerView={4}
                  spaceBetween={0}
                  navigation={true}
                  slidesPerGroup={context.windowWidth > 992 ? 3 : 1}
                  modules={[Navigation]}
                  className="mySwiper"
                  breakpoints={{
                    300: {
                      slidesPerView: 1,
                      spaceBetween: 5,
                    },
                    400: {
                      slidesPerView: 2,
                      spaceBetween: 5,
                    },
                    600: {
                      slidesPerView: 3,
                      spaceBetween: 5,
                    },
                    750: {
                      slidesPerView: 4,
                      spaceBetween: 5,
                    }
                  }}
                >
                  {
                    featuredProducts?.length !== 0 && featuredProducts?.slice(0)?.reverse()?.map((item, index) => {
                      return (
                        <SwiperSlide key={index}>
                          <ProductItem item={item} />
                        </SwiperSlide>
                      )
                    })
                  }

                </Swiper>
              </div>



            </div>

          </div>
        </div>
      </section>


    </>
  );
}
