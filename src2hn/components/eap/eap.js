import AdvanceTable from "components/common/advance-table/AdvanceTable";
import AdvanceTableFooter from "components/common/advance-table/AdvanceTableFooter";
import AdvanceTableWrapper from "components/common/advance-table/AdvanceTableWrapper";
import React, { useState, useEffect } from "react";
import { Button, Card, Col, Modal, Row, Form } from "react-bootstrap";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { connect, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import IconButton from "components/common/IconButton";
import FalconCloseButton from "components/common/FalconCloseButton";
import { useForm } from "react-hook-form";
import { isError } from "components/helpers/response";
import EapService from "../../services/eap/eap";
import EatwellService from "../../services/eatwell/eatwell";
import { toast } from "react-toastify";
import ToastMe from "components/common/ToastMe";

import { Form as FormAnt, Button as ButtonAnt, Input } from "antd";
import "antd/dist/antd.css";

const EAP = () => {
  const dispatch = useDispatch();
  const [dataTableData, setDataTableData] = useState([]);
  const [show, setShow] = useState(false);
  const [view, setView] = useState(false);
  const [getflag, setflag] = useState(0);
  const [images, imageStore] = useState([]);
  const [getimage, imageUpload] = useState("");
  const [fileDocList, setFileDocList] = useState();
  const [initialDynamicFormData, setInitialDynamicFormData] = useState();
  const [form] = FormAnt.useForm();
  const handleClose = () => {
    reset({ keepDirtyValues: true }, { keepIsValid: true });
    setView(false);
    setShow(false);
  };
  const {
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    isError(errors);
  });

  const handleShow = (data) => {
    setShow(true);
  };

  const handleView = (data) => {
    setView(true);
    if (data) {
      const img = `${process.env.REACT_APP_FILE_URL}${data.image}`;
      setFileDocList(img);
      imageUpload(data.image);
      setInitialDynamicFormData(data.options);
      form.setFieldsValue({
        mobile: data.mobile,
        id: data._id,
      });
      var image1 = [];
      data.options.map((data) => {
        image1.push(data.image);
      });
      imageStore(image1);
    }
  };

  const updateEap = (data) => {
    if (getimage != "") {
      data["image"] = getimage;
    }
    if (images != "") {
      data.options.map((item, index) => {
        images.map((img, i) => {
          if (i == index) {
            item.image = img;
            delete item.image1;
          }
        });
      });
    }

    dispatch(EapService.addEap(data))
      .then((res) => {
        if (res.status === 200) {
          getData();
          handleClose();
        }
      })
      .catch((errors) => {
        toast.error(errors.data.message);
      });
  };

  const addEap = (data) => {
    if (getimage != "") {
      data["image"] = getimage;
    }

    if (images != "") {
      images.map((items, i) => {
        data.options.map((item, index) => {
          if (i == index) {
            item.image = items;
          }
        });
      });
    }
    dispatch(EapService.addEap(data))
      .then((res) => {
        if (res.status === 200) {
          getData();
          handleClose();
        }
      })
      .catch((errors) => {
        toast.error(errors.data.message);
      });
  };
  const getData = () => {
    dispatch(EapService.getData())
      .then((res) => {
        if (res.data != "") {
          setflag(1);
        } else {
          setflag(0);
        }
        setDataTableData([res.data]);
      })
      .catch((errors) => {
        console.log(errors);
      });
  };
  const remove1 = (i) => {
    images.splice(i, 1);
  };
  const handleChangeImageUpload = (e) => {
    var getData = e.target.id.split("_");
    var b = getData[1];

    var image_pre = e.target.files[0];
    if (e.target.files[0].type.includes("image/") != true) {
      ToastMe("Please select only image");
      return true;
    }
    dispatch(EatwellService.upload_file(image_pre))
      .then((res) => {
        images[b] = res.data.file_url;
        imageStore(images);
      })
      .catch((errors, statusCode) => {
        ToastMe(errors.data.message, "danger");
      });
  };
  const handleImageUpload = (event, index) => {
    var image_pre = event.target.files[0];

    if (event.target.files[0].type.includes("image/") != true) {
      ToastMe("Please select only image");
      return true;
    }
    dispatch(EatwellService.upload_file(image_pre))
      .then((res) => {
        if (res.status == "200") {
          imageUpload(res.data.file_url);
        }
      })
      .catch((errors, statusCode) => {
        ToastMe(errors.data.message, "danger");
      });
  };
  useEffect(() => {
    getData();
  }, []);
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
      accessor: "image",
      Header: "Image",
      Cell: (rowData) => {
        const data = rowData.row.original;
        return (
          <img
            src={`${process.env.REACT_APP_FILE_URL}${data.image}`}
            className="profile_pic_img"
            style={{ height: "80px", width: "80px", borderRadius: "50" }}
            alt="profile"
          />
        );
      },
    },
    {
      accessor: "mobile",
      Header: "Mobile",
    },
    {
      accessor: "options",
      Header: "Options",
      Cell: (rowData) => {
        const data = rowData.row.original.options;
        const listItems = data?.map((item) => (
          <li>
            {item.image ? (
              <img
                src={`${process.env.REACT_APP_FILE_URL}${item.image}`}
                className="profile_pic_img"
                style={{
                  height: "30px",
                  width: "30px",
                  borderRadius: "50",
                  marginTop: "5px",
                }}
                alt="profile"
              />
            ) : (
              ""
            )}{" "}
            <br />
            {" Title "}
            {" - "}
            {item?.title?.length >= 30
              ? item.title.substring(0, 30) + "..."
              : item.title}
            <br />
            {" Description"}
            {" - "}
            {item?.options?.length >= 30
              ? item.options.substring(0, 30) + "..."
              : item.description}{" "}
          </li>
        ));
        return <ol type="1">{listItems}</ol>;
      },
    },
    {
      accessor: "createdAt",
      Header: "Action",
      Cell: (rowData, props) => {
        const row = rowData.row.original;
        return (
          <>
            <div className="t-action-btn">
              <button className="btn btn-info" onClick={() => handleView(row)}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </button>
            </div>
          </>
        );
      },
    },
  ];

  return (
    <>
      {getflag == 1 ? (
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
            <h5 className="hover-actions-trigger mb-0">EAP</h5>
          </div>
          <Card className="mb-3">
            <Card.Header className="border-bottom border-200"></Card.Header>
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
        </AdvanceTableWrapper>
      ) : (
        <>
          <div
            style={{ borderRadius: "0.375rem" }}
            className="py-4 bg-white mb-3 d-flex align-items-center px-3"
          >
            <h5 className="hover-actions-trigger mb-0">EAP</h5>
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
              </Row>
            </Card.Header>
          </Card>
        </>
      )}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Add EAP</Modal.Title>
          <FalconCloseButton onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>
          <div className="col">
            <FormAnt form={form} onFinish={addEap}>
              <Form.Label>Image</Form.Label>

              <FormAnt.Item name="image">
                <Input
                  onChange={(e) => handleImageUpload(e)}
                  type="file"
                  className="form-control"
                />
              </FormAnt.Item>
              <Form.Label>Mobile No.</Form.Label>
              <FormAnt.Item
                name="mobile"
                rules={[
                  {
                    required: true,
                    message: "Mobile is Required",
                  },
                  { pattern: /[0-9]/, message: "Only Numbers allow!" },
                  { min: 8, message: "Min 8 digit is allowed" },
                  { max: 15, message: "Max 15 digit is allowed" },
                ]}
              >
                <Input
                  type="number"
                  className="form-control"
                  placeholder="Enter Mobile No."
                />
              </FormAnt.Item>

              <FormAnt.List name="options">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <div className="recipe_desc_add_container">
                        <FormAnt.Item
                          {...restField}
                          label="Title"
                          name={[name, "title"]}
                          rules={[
                            { required: true, message: "Title is Required" },
                          ]}
                        >
                          <Input placeholder="Enter title" />
                        </FormAnt.Item>
                        <FormAnt.Item
                          {...restField}
                          label="Description"
                          name={[name, "description"]}
                          rules={[
                            {
                              required: true,
                              message: "Description is Required",
                            },
                          ]}
                        >
                          <Input placeholder="Enter description" />
                        </FormAnt.Item>
                        <FormAnt.Item label="Image" name={[name, "image"]}>
                          <Input
                            onChange={(e) => {
                              handleChangeImageUpload(e);
                            }}
                            type="file"
                            className="form-control"
                          />
                        </FormAnt.Item>
                        {/* <img src={}></img> */}

                        <MinusCircleOutlined
                          className="recipe_desc_add_container_removeBtn"
                          onClick={(e) => {
                            remove(name);
                          }}
                        />
                      </div>
                    ))}
                    <FormAnt.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add field
                      </Button>
                    </FormAnt.Item>
                  </>
                )}
              </FormAnt.List>

              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Modal.Footer>
            </FormAnt>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={view}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Update EAP</Modal.Title>
          <FalconCloseButton onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>
          <div className="col">
            <div className="vendor_logo_wrapper">
              <img
                src={fileDocList}
                className="img-fluid"
                style={{
                  height: "150px",
                  width: "150px",
                  borderRadius: "50",
                }}
                alt="vender logo"
              />
            </div>
            <FormAnt
              initialValues={{ options: initialDynamicFormData }}
              form={form}
              onFinish={updateEap}
            >
              <FormAnt.Item name="id">
                <Input type="hidden" />
              </FormAnt.Item>

              <FormAnt.Item name="image">
                <Input
                  onChange={(e) => handleImageUpload(e)}
                  type="file"
                  className="form-control"
                />
              </FormAnt.Item>
              <FormAnt.Item
                name="mobile"
                rules={[
                  {
                    required: true,
                    message: "Mobile is Required",
                  },
                  { pattern: /[0-9]/, message: "Only Numbers allow!" },
                  { min: 8, message: "Min 8 digit is allowed" },
                  { max: 15, message: "Max 15 digit is allowed" },
                ]}
              >
                <Input
                  type="number"
                  className="form-control"
                  placeholder="Enter Mobile No."
                />
              </FormAnt.Item>

              <FormAnt.List name="options">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }, i) => (
                      <div className="recipe_desc_add_container">
                        <FormAnt.Item
                          {...restField}
                          label="title"
                          name={[name, "title"]}
                          rules={[
                            { required: true, message: "Title is Required" },
                          ]}
                        >
                          <Input placeholder="Enter title" />
                        </FormAnt.Item>
                        <FormAnt.Item
                          {...restField}
                          label="description"
                          name={[name, "description"]}
                          rules={[
                            {
                              required: true,
                              message: "Description is Required",
                            },
                          ]}
                        >
                          <Input placeholder="Enter description" />
                        </FormAnt.Item>
                        <FormAnt.Item {...restField} name={[name, "image1"]}>
                          <Input
                            onChange={(e) => {
                              handleChangeImageUpload(e);
                            }}
                            type="file"
                            className="form-control"
                          />
                        </FormAnt.Item>

                        {images?.[i] ? (
                          <div className="vendor_logo_wrapper">
                            <img
                              src={process.env.REACT_APP_FILE_URL + images?.[i]}
                              className="img-fluid"
                              style={{
                                height: "150px",
                                width: "150px",
                                borderRadius: "50",
                              }}
                              alt="vender logo"
                            />
                          </div>
                        ) : (
                          ""
                        )}
                        <MinusCircleOutlined
                          className="recipe_desc_add_container_removeBtn"
                          onClick={(e) => {
                            remove(name);
                            remove1(i);
                          }}
                        />
                      </div>
                    ))}

                    <FormAnt.Item>
                      <ButtonAnt
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add field
                      </ButtonAnt>
                    </FormAnt.Item>
                  </>
                )}
              </FormAnt.List>

              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Modal.Footer>
            </FormAnt>
          </div>
        </Modal.Body>
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
export default connect(mapStateToProps)(EAP);
