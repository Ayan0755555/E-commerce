import React, { useContext, useEffect, useState } from "react";
import Button from '@mui/material/Button';

import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagination from '@mui/material/Pagination';
import { MyContext } from "../../App";

import { Link } from "react-router-dom";

import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { deleteData, editData, fetchDataFromApi } from "../../utils/api";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

//breadcrumb code
const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
        theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[800];
    return {
        backgroundColor,
        height: theme.spacing(3),
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover, &:focus': {
            backgroundColor: emphasize(backgroundColor, 0.06),
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(backgroundColor, 0.12),
        },
    };
});


const HomeSlidesList = () => {

    const [slideList, setSlideList] = useState([]);

    const context = useContext(MyContext);

    useEffect(() => {
        window.scrollTo(0, 0);
        context.setProgress(20)
        fetchDataFromApi('/api/homeBanner').then((res) => {
            setSlideList(res);
            context.setProgress(100);
        })

    }, []);

    const deleteSlide = (id) => {
        context.setProgress(30);
        deleteData(`/api/homeBanner/${id}`).then(res => {
            context.setProgress(100);
            fetchDataFromApi('/api/homeBanner').then((res) => {
                setSlideList(res);
                context.setProgress(100);
                context.setProgress({
                    open: true,
                    error: false,
                    msg: "Slide Deleted!"
                })
            })
        })
    }


    return (
        <>
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4 align-items-center">
                    <h5 className="mb-0">Home Banner Slide List</h5>

                    <div className="ml-auto d-flex align-items-center">
                        <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
                            <StyledBreadcrumb
                                component="a"
                                href="#"
                                label="Dashboard"
                                icon={<HomeIcon fontSize="small" />}
                            />

                            <StyledBreadcrumb
                                label="Home Banner Slide"
                                deleteIcon={<ExpandMoreIcon />}

                            />
                        </Breadcrumbs>

                        <Link to="/homeBannerSlide/add"><Button className="btn-blue  ml-3 pl-3 pr-3">Add Home Slide</Button></Link>


                    </div>
                </div>

                <div className="card shadow border-0 p-3 mt-4">
                    <div className="table-responsive mt-3">
                        <table className="table table-bordered table-striped v-align">
                            <thead className="thead-dark">
                                <tr>

                                    <th style={{ width: '200px' }}>IMAGE</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    slideList?.length !== 0 && slideList?.map((item, index) => {
                                        return (
                                            <tr>

                                                <td>
                                                    <div className="d-flex align-items-center " style={{ width: '200px' }}>
                                                        <div className="imgWrapper" style={{ width: '200px', flex: '0 0 200px' }}>
                                                            <div className="img card shadow m-0">
                                                                <LazyLoadImage
                                                                    alt={"image"}
                                                                    effect="blur"
                                                                    className="w-100"
                                                                    src={item.images[0]} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                
                                                <td>
                                                    <div className="actions d-flex align-items-center">
                                                        <Link to={`/homeBannerSlide/edit/${item.id}`}   >                                         <Button className="success" color="success"><FaPencilAlt /></Button>
                                                        </Link>

                                                        <Button className="error" color="error" onClick={() => deleteSlide(item.id)}><MdDelete /></Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }



                            </tbody>

                        </table>


                     

                    </div>


                </div>
            </div>


        </>
    )
}

export default HomeSlidesList;