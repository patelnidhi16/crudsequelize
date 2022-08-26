import Swal from 'sweetalert2';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import AdvanceTableFooter from 'components/common/advance-table/AdvanceTableFooter';
import AdvanceTableSearchBox from 'components/common/advance-table/AdvanceTableSearchBox';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Form, Modal, Row } from 'react-bootstrap';
import { connect, useDispatch } from "react-redux";
import ProductTypes from '../../services/productType/productType';
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
const ProductType = () => {
	const dispatch = useDispatch();
	const [dataTableData, setDataTableData] = useState([]);
	const [show, setShow] = useState(false);
	const [icon, setIcon] = useState();
	const [productTypeId, setproductTypeId] = useState('');
	const [inputValue, setInputValue] = useState("");
	const [valueCategory, setCategory] = useState([]);
	const [valueSubCategory, setSubCategory] = useState([]);
	const [subCategoryValue, getSubCategoryValue] = useState();
	const {
		setValue,
		handleSubmit,
		register,
		formState: { errors },
		reset,
	} = useForm();

	useEffect(() => {
		getData();
		getCategoryData();
		isError(errors);
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
		setShow(true)
		// if(data.ParentCategories){
		// 	getSubCategoryValue(data.ParentCategories._id)
		// }
		setValue('name', data.name)
		setValue('category_id', data._id)
		setValue('parentId', data.ParentCategories)	};
	
	const getData = () => {
		dispatch(ProductTypes.getProductType())
			.then((res) => {
				setDataTableData(res.data.data);
			})
			.catch((errors) => {
				console.log(errors);
			})
	}

	// get category
	const getCategoryData = () => {
		dispatch(ProductTypes.categoryList())
			.then((res) => {
				setCategory(res.data.data);
			})
			.catch((errors) => {
				console.log(errors);
			})
	}

	// get sub category
	const getSubCategoryData = (id) => {
		var data={
			id:id
		}
		dispatch(ProductTypes.subCategoryList(data))
			.then((res) => {
				setSubCategory(res.data.data);
			})
			.catch((errors) => {
				// console.log(errors);
			})
	}

	const productTypeAdd = (data) => {
		dispatch(ProductTypes.addProductType(data,subCategoryValue))
			.then((res) => {
				getData();
				handleClose();
				setValue('name', '');
				setValue('category_id', '');
			})
			.catch((errors) => {
				console.log('1',errors);
				// toast.error((errors.data.errors.name));
			})
	};

	const deleteProductType = (id) => {
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
					category_id: id,
				}
				dispatch(ProductTypes.deleteProductType(data))
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
				return (parseInt(rowData.row.id)+1)
			}
		},
		{
			accessor: 'ParentCategories.0.name',
			Header: 'Category'
		},
		{
			accessor: 'ParentCategories.1.name',
			Header: 'Sub Category'
		},
		{
			accessor: 'name',
			Header: 'Type'
		},
		{
			accessor: 'createdAt',
			Header: 'Action',
			Cell: rowData => {
				const row = rowData.row.original
				return (
					<>
						<div className='t-action-btn'>

							<button className="btn btn-info ml-2" onClick={() => handleShow(row)}>
								<FontAwesomeIcon icon={faPencilAlt} />
							</button>

							<button className="btn btn-danger ml-2 btn-xs" onClick={(e) => deleteProductType(row._id)} >
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
						ProductType List
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
					<Modal.Title>ProductType Add</Modal.Title>
					<FalconCloseButton onClick={handleClose} />
				</Modal.Header>
				<Form noValidate onSubmit={handleSubmit(productTypeAdd)}>
					<Modal.Body>
						<Form.Group className="mb-3" >
							<Form.Control
								type="hidden"
								id="category_id"
								name="category_id"
								{...register('category_id')}
							/>

							<Form.Label>Category</Form.Label>
								<Form.Select name="category_id" aria-label="Default select example"  onChange={(e) => getSubCategoryData(e.target.value)}>
									<option>Select category</option>
									{valueCategory.map((option, i) => (
										<option key={i} value={option._id}>{option.name}</option>
									))}
								</Form.Select>
							<Form.Control.Feedback type="invalid">
								{errors.categoryId && errors.categoryId.message}
							</Form.Control.Feedback>

							<Form.Label>SubCategory</Form.Label>
								<Form.Select name="sub_category_id" aria-label="Default select example" onChange={(e) => getSubCategoryValue(e.target.value)}>
									<option>Select subcategory</option>
									{valueSubCategory.map((option, i) => (
										<option key={i}  value={option._id}>{option.name}</option>
									))}
								</Form.Select>
							<Form.Control.Feedback type="invalid">
								{errors.subcategoryId && errors.subcategoryId.message}	
							</Form.Control.Feedback>

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
										// 	value:/^[a-zA-Z]+$/,
										// 	message: 'Number and space not allowed',
										// },
									})} />
								<Form.Control.Feedback type="invalid">
									{errors.name && errors.name.message}
								</Form.Control.Feedback>
						</Form.Group>
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
export default connect(mapStateToProps)(ProductType);
