"use client"
import React, { useEffect } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { useContext, useState } from 'react';
import Link from 'next/link';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

// import { useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import { MyContext } from '@/context/ThemeContext';

const Sidebar = (props) => {
    const [value, setValue] = useState([100, 100000]);
    const [value2, setValue2] = useState(0);

    const [catId, setcatId] = useState('');
    const [subCatId, setSubCatId] = useState('');

    const [filterSubCat, setfilterSubCat] = React.useState();
    const [isOpenFilter, setIsOpenFilter] = useState(false);


    const context = useContext(MyContext);


    useEffect(() => {
        if(props.categoryId!==undefined && props.categoryId!==null && props.categoryId!==""){
            setcatId(props.categoryId)
        }
        if(props.subCatId!==undefined && props.subCatId!==null && props.subCatId!==""){
            setSubCatId(props.subCatId)
        }
        
        
    }, [props.categoryId,props.subcatid])

    useEffect(() => {
        setIsOpenFilter(props.isOpenFilter)
    }, [props.isOpenFilter])


    const handleChange = (event) => {
        setfilterSubCat(event.target.value);
        props.filterData(event.target.value)
        setSubCatId(event.target.value)
    };

    useEffect(() => {
        props.filterByPrice(value, props.catId, props.subCatId, );
    }, [value]);

    const filterByRating = (rating) => {
        props.filterByRating(rating, props.catId, props.subCatId);
    }

    return (
        <>
            <div className={`sidebar ${isOpenFilter===true && 'open'}`}>
                <div className="filterBox">
                    <h6>PRODUCT CATEGORIES</h6>

                    <div className='scroll'>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={filterSubCat}
                            onChange={handleChange}
                        >
                            {
                                context.subCategoryData?.length !== 0 && context.subCategoryData?.map((item, index) => {

                                    return (
                                        <FormControlLabel value={item?.id} control={<Radio />} label={item?.subCat} />

                                    )
                                })
                            }
                        </RadioGroup>

                    </div>
                </div>


                <div className="filterBox">
                    <h6>FILTER BY PRICE</h6>

                    <RangeSlider value={value} onInput={setValue} min={100} max={60000} step={5} />


                    <div className='d-flex pt-2 pb-2 priceRange'>
                        <span>From: <strong className='text-dark'>Rs: {value[0]}</strong></span>
                        <span className='ml-auto'>From: <strong className='text-dark'>Rs: {value[1]}</strong></span>
                    </div>
                </div>


                <div className="filterBox">
                    <h6>FILTER BY RATING</h6>

                    <div className='scroll pl-0'>
                        {
                            // <ul>
                            //     <li>
                            //         <FormControlLabel className='w-100' control={<Checkbox />} label="Frito Lay" />
                            //     </li>

                            //     <li>
                            //         <FormControlLabel className='w-100' control={<Checkbox />} label="Nespresso" />
                            //     </li>
                            //     <li>
                            //         <FormControlLabel className='w-100' control={<Checkbox />} label="Frito Lay" />
                            //     </li>

                            //     <li>
                            //         <FormControlLabel className='w-100' control={<Checkbox />} label="Nespresso" />
                            //     </li>
                            //     <li>
                            //         <FormControlLabel className='w-100' control={<Checkbox />} label="Frito Lay" />
                            //     </li>

                            //     <li>
                            //         <FormControlLabel className='w-100' control={<Checkbox />} label="Nespresso" />
                            //     </li>
                            // </ul>
                        }
                        <ul>
                            <li onClick={() => filterByRating(5)} className='cursor' >
                                <Rating name="read-only" value={5} readOnly size="small"
                                />
                            </li>
                            <li onClick={() => filterByRating(4)} className='cursor'>
                                <Rating name="read-only" value={4} readOnly size="small"
                                />
                            </li>
                            <li onClick={() => filterByRating(3)} className='cursor'>
                                <Rating name="read-only" value={3} readOnly size="small"
                                />
                            </li>
                            <li onClick={() => filterByRating(2)} className='cursor'>
                                <Rating name="read-only" value={2} readOnly size="small"
                                />
                            </li>
                            <li onClick={() => filterByRating(1)} className='cursor'>
                                <Rating name="read-only" value={1} readOnly size="small"
                                />
                            </li>
                        </ul>


                    </div>
                </div>


                <br />

                <Link href="/"><img src='https://klbtheme.com/bacola/wp-content/uploads/2021/05/sidebar-banner.gif' className='w-100' /></Link>

            </div>
        </>
    )
}

export default Sidebar;