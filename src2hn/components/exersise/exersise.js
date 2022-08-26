import Swal from 'sweetalert2';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import AdvanceTableFooter from 'components/common/advance-table/AdvanceTableFooter';
import AdvanceTableSearchBox from 'components/common/advance-table/AdvanceTableSearchBox';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Form, Modal, Row } from 'react-bootstrap';
import { connect, useDispatch } from "react-redux";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import IconButton from 'components/common/IconButton';
import FalconCloseButton from 'components/common/FalconCloseButton';
import { useForm } from "react-hook-form";
import { isError } from 'components/helpers/response';
import { toast } from 'react-toastify';
import ExersiseService from '../../services/exersise/exersise';

const Exersise = () => {
    const dispatch = useDispatch();
    const [dataTableData, setDataTableData] = useState([]);
    const [show, setShow] = useState(false);
    const [view, setView] = useState(false);
    const [valueCategory, setCategory] = useState([]);
    const [mainCategory, mainCategorys] = useState('');

    const handleClose = () => {
        reset(
            { keepDirtyValues: true },
            { keepIsValid: true }
        );
        setShow(false)
        setView(false)
    };
    const {
        setValue,
        handleSubmit,
        register,
        formState: { errors },
        reset
    } = useForm();

    useEffect(() => {
        getData();
        getType();
    }, []);

    useEffect(() => {
        isError(errors);
    });
    const handleShow = (data) => {
        setValue("title", '')
        setValue("parent_id", '')
        setValue("description", '')
        setValue("demo_video", '')
        setValue("id", '')
        setShow(true)
        if (data.ParentCategories) {
            mainCategorys(data.ParentCategories._id)
        } else {
            mainCategorys('')
        }
    };
    const handleView = (id) => {
        var data = {
            id: id,
        }
        dispatch(ExersiseService.edit_exersise(data))
            .then((res) => {
                setView(true)

                setValue("title", res.data.title)
                setValue("parent_id", res.data.parent_id)
                setValue("description", res.data.description)
                setValue("demo_video", res.data.demo_video)
                setValue("id", res.data._id)
            })
            .catch((errors) => {
                console.log(errors);
            })

    };

    // datatable data

    const getData = () => {
        dispatch(ExersiseService.getData())
            .then((res) => {
                setDataTableData(res.data);
            })
            .catch((errors) => {
                console.log(errors);
            })

    }

    //dropdown of main category

    const getType = () => {
        dispatch(ExersiseService.getType())
            .then((res) => {
                setCategory(res.data);
            })
            .catch((errors) => {
                console.log(errors);
            })
    }

    //add exersise

    const addExersise = (data) => {
        dispatch(ExersiseService.addexersise(data))
            .then((res) => {
                getData();
                handleClose();
            })
            .catch((errors) => {
                toast.error(errors.data.message);
            })
    }

    //update exersise

    const updateExersise = (data) => {
        dispatch(ExersiseService.updateexersise(data))
            .then((res) => {
                getData();
                handleClose();
                setValue('name', '');
            })
            .catch((errors) => {
                toast.error(errors.data.message);
            })
    }


    // delete exersise

    const deleteExersise = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to delete this?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm'
        }).then((result) => {
            if (result.isConfirmed) {
                var data = {
                    id: id,
                }
                dispatch(ExersiseService.delete_exersise(data))
                    .then((res) => {
                        getData();
                    })
                    .catch((errors) => {
                        toast.error(errors.data.message);
                    })
            }
        })
    }

    //data table
    const columns = [
        {
            accessor: '_id',
            Header: 'No',
            Cell: rowData => {
                return (parseInt(rowData.row.id) + 1)
            }
        },
        {
            accessor: 'type[0].title',
            Header: 'Type'
        },
        {
            accessor: 'title',
            Header: 'Title'
        },
        {
            accessor: 'description',
            Header: 'Description',

            Cell: rowData => {
                const row = rowData.row.original
                return (<>
                    {row.description.length >= 40 ? row.description.substring(0, 40) + '...' : row.description}
                </>)
            }
        },
        {
            accessor: 'image',
            Header: 'Image',
            Cell: rowData => {
                const data = rowData.row.original
                return (
                    <img src={data.image} className="profile_pic_img" style={{ "height": "80px", "width": "80px", "borderRadius": "50" }} />
                )
            }
        },
        {
            filterable: false,
            Header: 'Video URL',
            accessor: 'demo_video',
            Cell: e => <a target="_blank" href={e.value}> video URL </a>

        },
        {
            accessor: 'createdAt',
            Header: 'Action',
            Cell: rowData => {
                const row = rowData.row.original
                return (
                    <>
                        <div className='t-action-btn'>

                            <button className="btn btn-info" onClick={() => handleView(row._id)}>
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </button>

                            <button className="btn btn-danger" onClick={(e) => deleteExersise(row._id)} >
                                <FontAwesomeIcon icon={faTrashAlt} />
                            </button>

                        </div>
                    </>
                )
            }
        },
    ];

    return (
        <>
            <AdvanceTableWrapper
                columns={columns}
                data={dataTableData}
                sortable
                pagination
                perPage={10}>
                <div style={{ borderRadius: "0.375rem" }} className='py-4 bg-white mb-3 d-flex align-items-center px-3'>
                    <h5 className="hover-actions-trigger mb-0">
                        Exercise
                    </h5>
                </div>
                <Card className='mb-3'>
                    <Card.Header className="border-bottom border-200">
                        <Row className="flex-between-center align-items-end g-2">
                            <Col xs={8} sm="auto" className="ms-3 mt-2 text-end ps-0">
                                <div id="orders-actions">
                                    <IconButton onClick={handleShow}
                                        icon="plus"
                                        transform="shrink-3"
                                        className='btn btn-primary me-2'>
                                        <span className="d-none d-sm-inline-block ms-1">Add</span>
                                    </IconButton>
                                </div>
                            </Col>
                            <Col xs="auto" sm={6} lg={4}>
                                <AdvanceTableSearchBox table />
                            </Col>
                        </Row>
                    </Card.Header>
                    <Row className="flex-end-center mb-3">
                        <AdvanceTable
                            table
                            headerClassName="bg-200 text-900 text-nowrap align-middle"
                            rowClassName="align-middle white-space-nowrap"
                            tableProps={{
                                bordered: true,
                                striped: true,
                                className: 'fs--1 mb-0 overflow-hidden'
                            }}
                        />
                    </Row>
                </Card>

                <div className="mt-3">
                    <AdvanceTableFooter
                        rowCount={dataTableData.length}
                        table
                        rowInfo
                        navButtons
                        rowsPerPageSelection
                    />
                </div>
            </AdvanceTableWrapper>

            {/* add modal */}

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header>
                    <Modal.Title>Add Exercise</Modal.Title>
                    <FalconCloseButton onClick={handleClose} />
                </Modal.Header>
                <Form noValidate onSubmit={handleSubmit(addExersise)}>
                    <Modal.Body>
                        <Form.Group className="mb-3" >
                            <Form.Control
                                type="hidden"
                                id="id"
                                {...register('id')}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Types</Form.Label>
                            <Form.Select name="parent_id" id="parent_id" defaultValue={mainCategory} aria-label="Default select example" onChange={(e) => mainCategorys(e.target.value)}
                                isInvalid={!!errors.parent_id}
                                {...register('parent_id', { required: "This field is Required" })}
                            >
                                <option value="">Select Type</option>
                                {valueCategory.map((option, i) => (
                                    <option key={i} value={option._id}>{option.title}</option>

                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" id="title" name="title" placeholder="Enter Title name" isInvalid={!!errors.title}
                                {...register('title', { required: "Title is Required", pattern: {
                                    value: /.*\S.*/,
                                    message: "White space not allowed",
                                  } })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} name="description" id="description" placeholder="Description....."
                                isInvalid={!!errors.description}
                                {...register('description', { required: "Description is Required", pattern: {
                                    value: /.*\S.*/,
                                    message: "White space not allowed",
                                  } })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Video URL</Form.Label>
                            <Form.Control
                                type="text"
                                name="demo_video"
                                id="demo_video"
                                placeholder="Enter Video URL"
                                isInvalid={!!errors.demo_video}
                                {...register("demo_video", {
                                    required: "Video URL is Required",
                                    pattern: {
                                        value: /.*\S.*/,
                                        message: "White space not allowed",
                                      },
                                    pattern: {
                                        value:
                                            /^((https|http|ftp):\/\/)?www\.([A-z]+)\.([A-z]{2,})/,
                                        message: "Invalid url",
                                    }
                                })}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">Submit</Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            {/* update modal */}

            <Modal show={view} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header>
                    <Modal.Title>Update Exercise</Modal.Title>
                    <FalconCloseButton onClick={handleClose} />
                </Modal.Header>
                <Form noValidate onSubmit={handleSubmit(updateExersise)}>
                    <Modal.Body>
                        <Form.Group className="mb-3" >
                            <Form.Control
                                type="hidden"
                                id="id"
                                {...register('id')}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Types</Form.Label>
                            <Form.Select name="parent_id" id="parent_id" defaultValue={mainCategory} aria-label="Default select example" onChange={(e) => mainCategorys(e.target.value)}
                                isInvalid={!!errors.parent_id}
                                {...register('parent_id', { required: "This field is Required" })}
                            >
                                <option value="">Select Type</option>
                                {valueCategory.map((option, i) => (
                                    <option key={i} value={option._id}>{option.title}</option>

                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" id="title" name="title" placeholder="Enter Title name" isInvalid={!!errors.title}
                                {...register('title', { required: "Title is Required", pattern: {
                                    value: /.*\S.*/,
                                    message: "White space not allowed",
                                  } })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} name="description" id="description" placeholder="Description....."
                                isInvalid={!!errors.description}
                                {...register('description', { required: "Description is Required", pattern: {
                                    value: /.*\S.*/,
                                    message: "White space not allowed",
                                  } })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Video URL</Form.Label>
                            <Form.Control
                                type="text"
                                name="demo_video"
                                id="demo_video"
                                placeholder="Enter Video URL"
                                isInvalid={!!errors.demo_video}
                                {...register("demo_video", {
                                    required: "Video URL is Required",
                                    pattern: {
                                        value: /.*\S.*/,
                                        message: "White space not allowed",
                                      },
                                    pattern: {
                                        value:
                                            /^((https|http|ftp):\/\/)?www\.([A-z]+)\.([A-z]{2,})/,
                                        message: "Invalid url",
                                    }
                                })}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">Submit</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>

    );
};

// export default Interest;
const mapStateToProps = state => {
    return {
        isAuthenticated: state.Auth.isAuthenticated,
        accessToken: state.Auth.accessToken,
    }
};
export default connect(mapStateToProps)(Exersise);
