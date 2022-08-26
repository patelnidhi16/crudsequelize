import Swal from 'sweetalert2';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import AdvanceTableFooter from 'components/common/advance-table/AdvanceTableFooter';
import AdvanceTableSearchBox from 'components/common/advance-table/AdvanceTableSearchBox';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Form, Modal, Row } from 'react-bootstrap';
import { connect, useDispatch } from "react-redux";

import Interests from '../../services/interest/interest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faToggleOff, faToggleOn, faTrashAlt, faTrashRestoreAlt } from '@fortawesome/free-solid-svg-icons';
import IconButton from 'components/common/IconButton';
import FalconCloseButton from 'components/common/FalconCloseButton';
import { useForm } from "react-hook-form";
import {
	errorResponse,
	successResponse,
	isError,

} from "../helpers/response";
import { toast } from 'react-toastify';
import { removeClassName } from '@react-leaflet/core';
const Interest = () => {
	const dispatch = useDispatch();
	const [dataTableData, setDataTableData] = useState([]);
	const [show, setShow] = useState(false);
	const [image, imageStore] = useState("");
	const [icon, setIcon] = useState();
	const [interestId, setInterestId] = useState('');
	const [inputValue, setInputValue] = useState("");
	const {
		setValue,
		handleSubmit,
		register,
		formState: { errors },
		reset,
	} = useForm();

	useEffect(() => {
		isError(errors);
		getData();
	}, []);

	const handleUserInput = (e) => {
		setInputValue(e.target.value);
	};

	const handleClose = () => {
		reset(
			{ keepDirtyValues: true },
			{ keepIsValid: true }
		);
		setShow(false)
	};

	const handleShow = data => {
		// const div = document.getElementsByClassName('removererror');
		// div.remove('is-invalid')
		imageStore([])
		setShow(true)
		setValue('name', data.name)
		setValue('interest_id', data._id)
		if (data.image) {

			setIcon(process.env.REACT_APP_IMG_URL + data.image);
		} else {

			setIcon('')
		}
		setInterestId(data._id);
	};

	const getData = () => {

		dispatch(Interests.getInterestData())
			.then((res) => {
				setDataTableData(res.data.data);
			})
			.catch((errors) => {
				console.log(errors);
			})

	}


	const InterestAdd = (data) => {

		if (image) {
			data['image'] = image
		}
		dispatch(Interests.addInterest(data))
			.then((res) => {
				getData();
				handleClose();
			})
			.catch((errors) => {
				toast.error((errors.data.errors.name));

			})
	};
	const uploadImage = (ev) => {
		const image = ev.target.files[0];
		const formData = new FormData();
		formData.append('image', image)

		dispatch(Interests.imageUpload(formData))
			.then((res) => {
				setIcon(process.env.REACT_APP_IMG_URL + res);
				if (image) {
					imageStore(res)
				}
			})
			.catch((errors) => {
				console.log(errors);
			})
	};

	const changeStatus = (id, status) => {
		var message = "Are you sure want to active this!";
		if (status == 0) {
			message = "Are you sure want to in-active this!"
		}

		Swal.fire({
			title: 'Are you sure?',
			text: message,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Confirm'
		}).then((result) => {
			if (result.isConfirmed) {
				var data = {
					'interest_id': id,
					'status': status,
				}
				dispatch(Interests.interestStatusChange(data))
					.then((res) => {
						getData();
					})
					.catch((errors) => {
						console.log(errors);
					})
			}
		})
	};
	const deleteInterest = (id, status) => {
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
				dispatch(Interests.deleteInterest(data))
					.then((res) => {
						getData();
					})
					.catch((errors) => {
						console.log(errors);
					})
			}
		})
	};

	const columns = [
		{
			accessor: '_id',
			Header: 'No',
			Cell: rowData => {
				return (parseInt(rowData.row.id) + 1)
			}
		},
		{
			accessor: 'name',
			Header: 'Name'
		},
		{
			accessor: 'image',
			Header: 'Image',
			Cell: rowData => {
				const data = rowData.row.original
				return (
					<img src={process.env.REACT_APP_IMG_URL + data.image} className="profile_pic_img" style={{ "height": "80px", "width": "80px", "borderRadius": "50" }} />
				)
			}
		},
		{
			accessor: 'status',
			Header: 'Status',
			Cell: rowData => {
				const data = rowData.row.original
				return (
					<span className={`badge ${data.status === 1 ? "badge-soft-success" : "badge-soft-danger"}`}>
						{`${data.status === 1 ? "Active" : "InActive"}`}
					</span>
				)
			}
		},
		{
			accessor: 'createdAt',
			Header: 'Action',
			Cell: rowData => {
				const row = rowData.row.original
				return (
					<>
						<div className='t-action-btn'>

							<button className={`btn ${row.status === 1 ? "btn-warning" : "btn-danger"} `} onClick={(e) => changeStatus(row._id, (row.status == 1 ? 0 : 1))} >
								{
									row.status === 1 ? <FontAwesomeIcon icon={faToggleOff} title="Change Status" /> : <FontAwesomeIcon icon={faToggleOn} title="Change Status" />
								}
							</button>

							<button className="btn btn-info ml-2" onClick={() => handleShow(row)}>
								<FontAwesomeIcon icon={faPencilAlt} />
							</button>

							<button className="btn btn-danger ml-2 btn-xs" onClick={(e) => deleteInterest(row._id)} >
								<FontAwesomeIcon icon={faTrashRestoreAlt} />
							</button>
						</div>
					</>
				);
			},
		},
	];
	return (
		<>
			<AdvanceTableWrapper
				columns={columns}
				data={dataTableData}
				sortable
				pagination
				perPage={5}
			>
				<div style={{ borderRadius: "0.375rem" }} className='py-4 bg-white mb-3 d-flex align-items-center px-3'>
					<h5 className="hover-actions-trigger mb-0">
						Interest List
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
										className='btn btn-primary me-2'
									>
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


			<Modal show={show} onHide={handleClose} keyboard={false}>
				<Modal.Header>
					<Modal.Title>Interest Add</Modal.Title>
					<FalconCloseButton onClick={handleClose} />
				</Modal.Header>
				<Form onSubmit={handleSubmit(InterestAdd)}>
					<Modal.Body>
						<Form.Group className="mb-3" >
							<Form.Control
								type="hidden"
								id="interest_id"
								name="interest_id"
								{...register('interest_id')}
							/>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="text"
								id="name"
								name="name"
								className='removererror'
								isInvalid={!!errors.name}
								placeholder="Enter name"
								{...register('name', {
									required: 'Name field is required',
									// pattern: {
									// 	value: /^[a-zA-Z' ']+$/,
									// 	message: 'Number not allowed',
									// },
								})} />
							<Form.Control.Feedback type="invalid">
								{errors.name && errors.name.message}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group className="mb-3" >
							<Form.Label>Image</Form.Label>
							<Form.Control
								type="file"
								id="image"
								name="image"
								className='removererror'
								isInvalid={!!errors.image}
								{...register('image', {
									required: (interestId ? false : 'Image field is required')
								})}
								onChange={(ev) => uploadImage(ev)}
							/>
							<Form.Control.Feedback type="invalid">
								{errors.image && errors.image.message}
							</Form.Control.Feedback>
						</Form.Group>
						{icon ? <div className="form-group">
							<img
								src={icon}
								width="150px" height="150px"
								className="imgBox"
							/>
						</div> : ''}
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
						<Button type="submit" variant="primary">Submit</Button>
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
export default connect(mapStateToProps)(Interest);
