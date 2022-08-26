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
import EatwellService from "../../services/eatwell/eatwell";

const SubCategory = () => {
  const dispatch = useDispatch();
  const [dataTableData, setDataTableData] = useState([]);
  const [show, setShow] = useState(false);
  const Uid = () => Math.random().toString(36).substring(2, 9);
  const [view, setView] = useState(false);
  const [descriptionInputFields, setDescriptionInputFields] = useState([
    {
      descId: `desc_${Uid()}`,
      title: "",
      description: "",
    },
  ]);

  useEffect(() => {
    if (descriptionInputFields.length === 0) {
      setDescriptionInputFields([
        {
          descId: `desc_${Uid()}`,
          title: "",
          description: "",
        },
      ]);
    }
  }, [descriptionInputFields]);

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
    dispatch(EatwellService.edit_eatwell(data))
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
    dispatch(EatwellService.getType())
      .then((res) => {
        setDataTableData(res.data);
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  // add eatwell

  const addeatwell = (data) => {
    dispatch(EatwellService.addEatWell(data, "", "", ""))
      .then((res) => {
        getData();
        handleClose();
      })
      .catch((errors) => {
        toast.error(errors.data.message);
      });
  };

  // update eatwell
  const updateeatwell = (data) => {
    dispatch(EatwellService.update_EatWell(data, "", "", ""))
      .then((res) => {
        getData();
        handleClose();
      })
      .catch((errors) => {
        toast.error(errors.data.message);
      });
  };

  // delete eatwell
  const deleteEatwell = (id) => {
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
        dispatch(EatwellService.delete_eatwell(data))
          .then((res) => {
            getData();
          })
          .catch((errors) => {
            toast.error(errors.data.message);
          });
      }
    });
  };

  //datatable

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
      Header: "Type",
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
                onClick={(e) => deleteEatwell(row._id)}
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
          <h5 className="hover-actions-trigger mb-0">Eat Well Type</h5>
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

      {/* add modal */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Add Eat well type</Modal.Title>
          <FalconCloseButton onClick={handleClose} />
        </Modal.Header>
        <Form noValidate onSubmit={handleSubmit(addeatwell)}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                name="title"
                id="title"
                placeholder="Enter type"
                isInvalid={!!errors.title}
                {...register("title", {
                  required: "Type is Required",
                  pattern: {
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
            <Button onClick={() => setValue()} variant="primary" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* update modal */}
      <Modal
        show={view}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Update Eat Well Type</Modal.Title>
          <FalconCloseButton onClick={handleClose} />
        </Modal.Header>
        <Form noValidate onSubmit={handleSubmit(updateeatwell)}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Control
                type="hidden"
                name="id"
                id="id"
                placeholder="Enter type"
                isInvalid={!!errors.title}
                {...register("id")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                name="title"
                id="title"
                placeholder="Enter type"
                isInvalid={!!errors.title}
                {...register("title", { required: "Type is Required" })}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button onClick={() => setValue()} variant="primary" type="submit">
              Submit
            </Button>
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
export default connect(mapStateToProps)(SubCategory);
