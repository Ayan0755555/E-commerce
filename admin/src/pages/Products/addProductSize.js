import React, { useContext, useEffect, useState } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { emphasize, styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { MyContext } from '../../App';
import Button from '@mui/material/Button';
import { FaCloudUploadAlt } from "react-icons/fa";
import CircularProgress from '@mui/material/CircularProgress';
import { deleteData, editData, fetchDataFromApi, postData } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

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



const AddProductSize = () => {
    const [editId, setEditId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [productSizeData, setProductSizeData] = useState([]);
    const [formFields, setFormFields] = useState({
        size: '',
    });

    const history = useNavigate();
    const context = useContext(MyContext);

    const inputChange = (e) => {
        setFormFields(() => ({
            ...formFields,
            [e.target.name]: e.target.value
        }))
    }

    useEffect(() => {
        fetchDataFromApi("/api/productSIZE").then((res) => {
            setProductSizeData(res);
        })
    }, []);

    const addproductSize = (e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('size', formFields.size);

        if (formFields.size === "") {
            context.setAlertBox({
                open: true,
                error: true,
                msg: 'Please add Product size'
            });
            return false;
        }

        setIsLoading(true);

        if (editId === "") {
            postData('/api/productSIZE/create', formFields).then(res => {
                setIsLoading(false);
                setFormFields({
                    size: ""
                });


                fetchDataFromApi("/api/productSIZE").then((res) => {
                    setProductSizeData(res);
                })

            });
        } else {
            editData(`/api/productSIZE/${editId}`, formFields).then((res) => {
                fetchDataFromApi("/api/productSIZE").then((res) => {
                    setProductSizeData(res);
                    setEditId("");
                    setIsLoading(false);
                    setFormFields({
                        size: ""
                    });
    
                })
            })
        }


    }

    const deleteItem = (id) => {
        deleteData(`/api/productSIZE/${id}`).then((res) => {
            fetchDataFromApi("/api/productSIZE").then((res) => {
                setProductSizeData(res);
            })
        })
    }

    const updateData = (id) => {
        fetchDataFromApi(`/api/productSIZE/${id}`).then((res) => {
            setEditId(id);
            setFormFields({
                size: res.size
            })
        })
    }

    return (
        <div className="right-content w-100">
            <div className="card shadow border-0 w-100 flex-row p-4 mt-2">
                <h5 className="mb-0">Add Product SIZE</h5>
                <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
                    <StyledBreadcrumb
                        component="a"
                        href="#"
                        label="Dashboard"
                        icon={<HomeIcon fontSize="small" />}
                    />

                    <StyledBreadcrumb
                        component="a"
                        label="Product SIZE"
                        href="#"
                        deleteIcon={<ExpandMoreIcon />}
                    />
                    <StyledBreadcrumb
                        label="Add Product SIZE"
                        deleteIcon={<ExpandMoreIcon />}
                    />
                </Breadcrumbs>
            </div>

            <form className='form' onSubmit={addproductSize}>
                <div className='row'>
                    <div className='col-sm-9'>
                        <div className='card p-4 mt-0'>
                            <div className='row'>
                                <div className='col'>
                                    <div className='form-group'>
                                        <h6>PRODUCT SIZE</h6>
                                        <input type='text' name="size" value={formFields.size} onChange={inputChange} />
                                    </div>
                                </div>

                            </div>


                            <Button type="submit" className="btn-blue btn-lg btn-big w-100"
                            ><FaCloudUploadAlt /> &nbsp;  {isLoading === true ? <CircularProgress color="inherit" className="loader" /> : 'PUBLISH AND VIEW'}  </Button>

                        </div>
                    </div>
                </div>
            </form>



            {
                productSizeData.length !== 0 &&
                <div className='row'>
                    <div className='col-md-9'>
                        <div className='card p-4 mt-0'>
                            <div className="table-responsive mt-3">
                                <table className="table table-bordered table-striped v-align">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>PRODUCT SIZE</th>
                                            <th width="25%">ACTION</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            productSizeData?.map((item, index) => {
                                                return (
                                                    <tr>
                                                        <td>
                                                            {item.size}
                                                        </td>
                                                        <td>
                                                            <div className="actions d-flex align-items-center">

                                                                <Button className="success" color="success" onClick={() => updateData(item.id)}><FaPencilAlt /></Button>

                                                                <Button className="error" color="error" onClick={() => deleteItem(item.id)}><MdDelete /></Button>
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
                </div>
            }

        </div>
    )
}

export default AddProductSize;