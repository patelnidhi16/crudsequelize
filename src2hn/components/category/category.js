import Swal from 'sweetalert2';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import AdvanceTableFooter from 'components/common/advance-table/AdvanceTableFooter';
import AdvanceTableSearchBox from 'components/common/advance-table/AdvanceTableSearchBox';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Form, Modal, Row } from 'react-bootstrap';
import { connect, useDispatch } from "react-redux";

import Categories from '../../services/category/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import IconButton from 'components/common/IconButton';
import FalconCloseButton from 'components/common/FalconCloseButton';
import { useForm } from "react-hook-form";
import { errorResponse, isError } from 'components/helpers/response';

const Category = () => {
	const dispatch = useDispatch();
	const [dataTableData, setDataTableData] = useState([]);
	const [show, setShow] = useState(false);
	const [inputValue, setInputValue] = useState("");
		
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
	const {
		setValue,
		handleSubmit,
		register,
		formState: { errors },
		reset,
	} = useForm();
	
	useEffect(() => {		
		getData();
		isError(errors);
	}, []);

	const handleShow = (data) => {
		setShow(true)
		setValue('name', data.name)
		setValue('category_id', data._id)
	};

	const getData = () => {
		dispatch(Categories.getCategory())
            .then((res) => {
				setDataTableData(res.data.data);
                // setButtonLoading(false);
            })
            .catch((errors) => {
               
            })
	
	}

	const addCategory = (data) => {
		dispatch(Categories.addCategory(data))
			.then((res) => {
				getData();
				handleClose();
				setValue('name', '');
			})
			.catch((errors) => {
				if (errors.response) {
                    errorResponse(errors);
                }
			})
	}

	// delete category
	const deleteCategory = (id) => {
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
				dispatch(Categories.delete_Category(data))
					.then((res) => {
						getData();
					})
					.catch((errors) => {
						
					})
			}
		})
	}


	
	const columns = [
		{
			accessor: '_id',
			Header: 'No',
			Cell: rowData => {
				return (parseInt(rowData.row.id)+1)
			}
		},
		{
			accessor: 'name',
			Header: 'Name'
		},
		{
            accessor: 'createdAt',
            Header: 'Action',
			Cell: rowData => {
				const row = rowData.row.original
				return (
					<>
					<div className='t-action-btn'>
						    
							<button className="btn btn-info" onClick={() => handleShow(row)}> 
								<FontAwesomeIcon icon={faPencilAlt} />
							</button>
							
							<button className="btn btn-danger" onClick={(e) => deleteCategory(row._id) } >
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
		  perPage={5}
		>
		<div style={{ borderRadius: "0.375rem" }} className='py-4 bg-white mb-3 d-flex align-items-center px-3'>
			<h5 className="hover-actions-trigger mb-0">
				Category List
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

		<Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
				<Modal.Header>
					<Modal.Title>Category Add</Modal.Title>
					<FalconCloseButton onClick={handleClose} />
				</Modal.Header>
					<Form noValidate onSubmit={handleSubmit(addCategory)}>
						<Modal.Body>
								<Form.Group className="mb-3" >
									<Form.Control
										type="hidden"
										id="category_id"
										name="category_id"
										{...register('category_id')}
									/>
									<Form.Label>Name</Form.Label>
									<Form.Control type="text" name="name" id="name" onChange={handleUserInput} placeholder="Enter category name" isInvalid={!!errors.name}
										{...register('name', {
											required: 'Name field is required',
										})} 
									/>
									<Form.Control.Feedback type="invalid">
										{errors.name && errors.name.message}
              						</Form.Control.Feedback>
									
								</Form.Group>
						</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={handleClose}>
								Close
							</Button>
							<Button variant="primary" type="submit">Submit</Button>
							{/* onClick={() => setValue(() => "")} */}
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
export default connect(mapStateToProps)(Category);
