import Swal from "sweetalert2";
import AdvanceTable from "components/common/advance-table/AdvanceTable";
import AdvanceTableFooter from "components/common/advance-table/AdvanceTableFooter";
import AdvanceTableSearchBox from "components/common/advance-table/AdvanceTableSearchBox";
import AdvanceTableWrapper from "components/common/advance-table/AdvanceTableWrapper";
import React, { useState, useEffect } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import IconButton from "components/common/IconButton";
import FalconCloseButton from "components/common/FalconCloseButton";
import { useForm } from "react-hook-form";
import { isError } from "components/helpers/response";
import { toast } from "react-toastify";
import ExersiseService from "../../services/exersise/exersise";

const ExersiseTypes = () => {
  const dispatch = useDispatch();
  const [dataTableData, setDataTableData] = useState([]);
  const [show, setShow] = useState(false);
  const [view, setView] = useState(false);

  const handleClose = () => {
    reset({ keepDirtyValues: true }, { keepIsValid: true });
    setShow(false);
    setView(false);
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
  }, []);

  useEffect(() => {
    isError(errors);
  });

  const handleShow = (data) => {
    setShow(true);
    setValue("title", "");
    setValue("id", "");
  };
  const handleView = (id) => {
    var data = {
      id: id,
    };
    dispatch(ExersiseService.edit_exersise(data))
      .then((res) => {
        setView(true);

        setValue("title", res.data.title);
        setValue("id", res.data._id);
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  // datatable data

  const getData = () => {
    dispatch(ExersiseService.getType())
      .then((res) => {
        setDataTableData(res.data);
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  // add category

  const addexersise = (data) => {
    dispatch(ExersiseService.addexersise(data))
      .then((res) => {
        getData();
        handleClose();
      })
      .catch((errors) => {
        toast.error(errors.data.message);
      });
  };

  // update category

  const updateExersise = (data) => {
    dispatch(ExersiseService.updateexersise(data))
      .then((res) => {
        getData();
        handleClose();
      })
      .catch((errors) => {
        toast.error(errors.data.message);
      });
  };

  // delete category

  const deleteExersise = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        var data = {
          id: id,
        };
        dispatch(ExersiseService.delete_exersise(data))
          .then((res) => {
            getData();
          })
          .catch((errors) => {
            toast.error(errors.data.message);
          });
      }
    });
  };

  //data table

  const columns = [
    {
      accessor: "_id",
      Header: "No",
      Cell: (rowData) => {
        return parseInt(rowData.row.id) + 1;
      },
    },
    {
      accessor: "title",
      Header: "Title",
    },
    {
      accessor: "createdAt",
      Header: "Action",
      Cell: (rowData) => {
        const row = rowData.row.original;
        return (
          <>
            <div className="t-action-btn">
              <button
                className="btn btn-info"
                onClick={() => handleView(row._id)}
              >
                <FontAwesomeIcon icon={faPencilAlt} />
              </button>

              <button
                className="btn btn-danger"
                onClick={(e) => deleteExersise(row._id)}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
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
        perPage={10}
      >
        <div
          style={{ borderRadius: "0.375rem" }}
          className="py-4 bg-white mb-3 d-flex align-items-center px-3"
        >
          <h5 className="hover-actions-trigger mb-0">Exercise Type</h5>
        </div>
        <Card className="mb-3">
          <Card.Header className="border-bottom border-200">
            <Row className="flex-between-center align-items-end g-2">
              <Col xs={8} sm="auto" className="ms-3 mt-2 text-end ps-0">
                <div id="orders-actions">
                  <IconButton
                    onClick={handleShow}
                    icon="plus"
                    transform="shrink-3"
                    className="btn btn-primary me-2"
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
                className: "fs--1 mb-0 overflow-hidden",
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

      {/* add Modal */}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title> Add Exercise Type</Modal.Title>
          <FalconCloseButton onClick={handleClose} />
        </Modal.Header>
        <Form noValidate onSubmit={handleSubmit(addexersise)}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Exercise Type</Form.Label>
              <Form.Control
                type="text"
                name="title"
                id="title"
                placeholder="Enter Exersise Type"
                isInvalid={!!errors.title}
                {...register("title", { required: "Title is Required" })}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            {/* onClick={() => setValue(() => "")} */}
          </Modal.Footer>
        </Form>
      </Modal>

      {/* update Modal */}

      <Modal
        show={view}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title> Update Exercise Type</Modal.Title>
          <FalconCloseButton onClick={handleClose} />
        </Modal.Header>
        <Form noValidate onSubmit={handleSubmit(updateExersise)}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Control type="hidden" id="id" {...register("id")} />
              <Form.Label>Exercise Type</Form.Label>
              <Form.Control
                type="text"
                id="title"
                placeholder="Enter Exersise Type"
                isInvalid={!!errors.name}
                {...register("title", {
                  required: "Title is Required", pattern: {
                    value: /.*\S.*/,
                    message: "White space not allowed",
                  }
                })}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            {/* onClick={() => setValue(() => "")} */}
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

// export default Interest;
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.Auth.isAuthenticated,
    accessToken: state.Auth.accessToken,
  };
};
export default connect(mapStateToProps)(ExersiseTypes);
