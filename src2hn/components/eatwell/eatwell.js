import Swal from "sweetalert2";
import AdvanceTable from "components/common/advance-table/AdvanceTable";
import AdvanceTableFooter from "components/common/advance-table/AdvanceTableFooter";
import AdvanceTableSearchBox from "components/common/advance-table/AdvanceTableSearchBox";
import AdvanceTableWrapper from "components/common/advance-table/AdvanceTableWrapper";
import React, { useState, useEffect } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { connect, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import IconButton from "components/common/IconButton";
import FalconCloseButton from "components/common/FalconCloseButton";
import { useForm } from "react-hook-form";
import { isError } from "components/helpers/response";
import EatwellService from "../../services/eatwell/eatwell";
import { toast } from "react-toastify";
import ToastMe from "components/common/ToastMe";

import {
  Space,
  Form as FormAnt,
  Button as ButtonAnt,
  Input,
  Select,
  Modal as ModelAnt,
} from "antd";
import FormItem from "antd/es/form/FormItem";
import "antd/dist/antd.css";

const SubCategory = () => {
  const dispatch = useDispatch();
  const [dataTableData, setDataTableData] = useState([]);
  const [show, setShow] = useState(false);
  const [valueCategory, setCategory] = useState([]);
  const [image, imageStore] = useState("");
  const [view, setView] = useState(false);
  const [pdf, pdfStore] = useState("");
  const [viewpdf, setpdf] = useState("");
  const [fileDocList, setFileDocList] = useState("");
  const [mainCategory, mainCategorys] = useState("");
  const [activeRecipeDescType, setActiveRecipeDescType] = useState("0");
  const [editReceipeType, setEditReceipeType] = useState("0");
  const [initialDynamicFormData, setInitialDynamicFormData] = useState();
  const [getparent_id, setparent_id] = useState([]);
  const [form] = FormAnt.useForm();

  const { Option } = Select;
  const { TextArea } = Input;

  const handleClose = () => {
    reset({ keepDirtyValues: true }, { keepIsValid: true });
    setShow(false);
    var form = document.getElementById("createForm");
    form.reset();
  };
  const handleCloses = () => {
    setInitialDynamicFormData("");
    reset({ keepDirtyValues: true }, { keepIsValid: true });
    setView(false);
    var form = document.getElementById("updateForm");
    form.reset();
  };
  const {
    setValue,
    register,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    getData();
    getMainCategoryData();
  }, []);

  useEffect(() => {
    isError(errors);
  });

  const handleShow = (data) => {
    form.resetFields();
    setActiveRecipeDescType("0");
    setShow(true);
    mainCategorys("");
  };

  const handleView = (data) => {
    setView(true);
    if (data) {
      const img = `${process.env.REACT_APP_FILE_URL}${data.image}`;
      const pdf = `${process.env.REACT_APP_PDF_URL}${data.pdf}`;
      setFileDocList(img);
      setpdf(pdf);
      pdfStore(data.pdf);
      imageStore(data.image);
      if (data.type == 1) {
        setActiveRecipeDescType("0");
        setEditReceipeType(data.type);
      } else {
        setEditReceipeType("0");
        setActiveRecipeDescType(data.type);
      }
      setInitialDynamicFormData(data.description);
      var types = "";
      if (data.type == 1) {
        types = "Pdf";
      } else if (data.type == 2) {
        types = "Browser Link";
      } else {
        types = "Description";
      }
      form.setFieldsValue({
        title: data.title,
        parent_id: data.parent_id,
        receipe_info: data.receipe_info,
        type: types,
        servings: data.servings,
        kilojoules: data.kilojoules,
        ingredients: data.ingredients,
        id: data._id,
      });
    }
  };

  const getData = () => {
    dispatch(EatwellService.getData())
      .then((res) => {
        setDataTableData(res.data);
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  // get Receipy type data
  const getMainCategoryData = () => {
    dispatch(EatwellService.getMainCategory())
      .then((res) => {
        setCategory(res.data);
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  //Add eatwell

  const addeatwell = (data) => {
    dispatch(EatwellService.addEatWell(data, mainCategory, image, pdf))
      .then((res) => {
        getData();
        handleClose();
      })
      .catch((errors) => {
        toast.error(errors.data.message);
      });
  };

  //Update eatwell

  const updateEatwell = (data) => {
    const form = document.getElementById("updateForm");
    form.reset();
    if (image != "") {
      data["image"] = image;
    }
    if (pdf != "") {
      data["pdf"] = pdf;
    }
    if (data.type == "Pdf") {
      data["type"] = 1;
    }
    if (data.type == "Browser Link") {
      data["type"] = 2;
    }
    if (data.type == "Description") {
      data["type"] = 3;
    }
    dispatch(EatwellService.update_EatWell(data)).then((res) => {
      getData();
      handleCloses();
    });
  };

  // delete category
  const handleChangeParentId = (value) => {
    setValue("parent_id", value);
    setparent_id(value);
  };

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

  // upload image
  const handleChangeImageUpload = (event) => {
    var image_pre = event.target.files[0];

    dispatch(EatwellService.upload_file(image_pre))
      .then((res) => {
        if (res.status == "200") {
          imageStore(res.data.file_url);
        }
      })
      .catch((errors, statusCode) => {
        console.log(errors.data.message, "danger");
      });
  };

  // upload pdf
  const handleChangePDFUpload = (event) => {
    var pdf_pre = event.target.files[0];
    if (pdf_pre.type.includes("pdf") != true) {
      ToastMe("Please select only Pdf");
      return true;
    }
    dispatch(EatwellService.upload_pdf(pdf_pre))
      .then((res) => {
        if (res.status == "200") {
          pdfStore(res.data.pdf_url);
        }
      })
      .catch((errors, statusCode) => {
        console.log(errors.data.message, "danger");
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
      accessor: "eatwell[0].title",
      Header: "Type",
    },
    {
      accessor: "title",
      Header: "Title",
    },
    {
      accessor: "kilojoules",
      Header: "Kilojoules",
    },
    {
      accessor: "servings",
      Header: "Servings",
    },
    {
      accessor: "ingredients",
      Header: "Ingredients",
    },
    {
      accessor: "type",
      Header: "Receipe Info",
      Cell: (rowData) => {
        if (rowData.row.original.type === 3) {
          const data = rowData.row.original.description;
          const listItems = data?.map((item) => (
            <li>
              {item?.title?.length >= 30
                ? item.title.substring(0, 30) + "..."
                : item.title}
              {" - "}
              {item?.description?.length >= 30
                ? item.description.substring(0, 30) + "..."
                : item.description}
            </li>
          ));
          return <ol type="1">{listItems}</ol>;
        } else if (rowData.row.original.type === 2) {
          const data = rowData.row.original.receipe_info;
          return (
            <a target="_blank" href={data}>
              {" "}
              Browser Link{" "}
            </a>
          );
        } else {
          const data = rowData.row.original.pdf;
          return (
            <a target="_blank" href={`${process.env.REACT_APP_PDF_URL}${data}`}>
              {" "}
              Pdf{" "}
            </a>
          );
        }
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

  const handleRecipeDescTypeOnChange = (e) => {
    setEditReceipeType("0");
    setActiveRecipeDescType(e);
  };

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
          <h5 className="hover-actions-trigger mb-0">Eat Well</h5>
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

      {/* add eatwell modal */}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Add Eat Well</Modal.Title>
          <FalconCloseButton onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>
          <FormAnt form={form} onFinish={addeatwell} id="createForm">
            <Form.Label>Receipe Types</Form.Label>
            <FormAnt.Item
              name="parent_id"
              rules={[
                {
                  required: true,
                  message: "Receipe Type is Required",
                },
              ]}
            >
              <Select
                // showSearch={true}
                virtual={false}
                getPopupContainer={(node) => node.parentNode}
                placeholder="Select Receipe Type"
                onChange={(e) => mainCategorys(e)}
              >
                {valueCategory.map((item, i) => (
                  <Option key={i} value={item._id}>
                    {item.title}
                  </Option>
                ))}
              </Select>
            </FormAnt.Item>
            <Form.Label>Title</Form.Label>
            <FormAnt.Item
              name="title"
              rules={[
                {
                  required: true,
                  message: "Title is Required",
                },
                {
                  pattern: /.*\S.*/,
                  message: "White space not allowed",
                },
              ]}
            >
              <Input className="form-control" placeholder="Enter Title " />
            </FormAnt.Item>
            <Form.Label>Image</Form.Label>
            <FormAnt.Item
              name="image"
              rules={[
                {
                  required: true,
                  message: "Image is Required",
                },
              ]}
            >
              <Input
                onChange={(e) => handleChangeImageUpload(e)}
                type="file"
                className="form-control"
              />
            </FormAnt.Item>
            <Form.Label>Servings</Form.Label>
            <FormAnt.Item
              name="servings"
              rules={[
                {
                  required: true,
                  message: "Servings is Required",
                },
                {
                  pattern: /.*\S.*/,
                  message: "White space not allowed",
                },
              ]}
            >
              <Input
                type="number"
                className="form-control"
                placeholder="Enter Servings "
              />
            </FormAnt.Item>
            <Form.Label>Kilojoules</Form.Label>
            <FormAnt.Item
              name="kilojoules"
              rules={[
                {
                  required: true,
                  message: "Kilojoules is Required",
                },
                {
                  pattern: /.*\S.*/,
                  message: "White space not allowed",
                },
              ]}
            >
              <Input
                type="number"
                className="form-control"
                placeholder="Enter Kilojoules "
              />
            </FormAnt.Item>
            <Form.Label>Ingredients</Form.Label>
            <FormAnt.Item
              name="ingredients"
              rules={[
                {
                  required: true,
                  message: "Ingredients is Required",
                },
                {
                  pattern: /.*\S.*/,
                  message: "White space not allowed",
                },
              ]}
            >
              <Input
                className="form-control"
                placeholder="Enter Ingredients "
              />
            </FormAnt.Item>
            <Form.Label>Receipe Description Types</Form.Label>
            <FormAnt.Item
              name="type"
              rules={[
                {
                  required: true,
                  message: "Receipe Description Type is Required",
                },
                {
                  pattern: /.*\S.*/,
                  message: "White space not allowed",
                },
              ]}
            >
              <Select
                showSearch={true}
                virtual={false}
                getPopupContainer={(node) => node.parentNode}
                placeholder="Select Receipe Description Type"
                onChange={(e) => handleRecipeDescTypeOnChange(e)}
              >
                <Option value="" disabled selected>
                  Select Type
                </Option>
                <Option value="1">Pdf </Option>
                <Option value="2">Browser Link </Option>
                <Option value="3">Description</Option>
              </Select>
            </FormAnt.Item>
            {activeRecipeDescType == "2" && (
              <FormAnt.Item
                name="receipe_info"
                rules={[
                  {
                    required: true,
                    message: "Browser Link is Required",
                  },
                  {
                    pattern: /.*\S.*/,
                    message: "White space not allowed",
                  },
                  {
                    type: "url",
                    message: "Enter a Valid URL",
                  },
                ]}
              >
                <Input
                  className="form-control"
                  placeholder="Enter Browser Link"
                />
              </FormAnt.Item>
            )}
            {activeRecipeDescType === "3" && (
              <FormAnt.List name="description">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <div className="recipe_desc_add_container">
                        <Form.Label>Title</Form.Label>
                        <FormAnt.Item
                          {...restField}
                          name={[name, "title"]}
                          rules={[
                            { required: true, message: "Title is Required " },
                            {
                              pattern: /.*\S.*/,
                              message: "White space not allowed",
                            },
                          ]}
                        >
                          <Input placeholder="Enter title" />
                        </FormAnt.Item>
                        <Form.Label>Description</Form.Label>
                        <FormAnt.Item
                          {...restField}
                          name={[name, "description"]}
                          rules={[
                            {
                              required: true,
                              message: "Description is Required ",
                            },
                            {
                              pattern: /.*\S.*/,
                              message: "White space not allowed",
                            },
                          ]}
                        >
                          <TextArea placeholder="Enter description" />
                        </FormAnt.Item>

                        <MinusCircleOutlined
                          className="recipe_desc_add_container_removeBtn"
                          onClick={() => remove(name)}
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
            )}
            {activeRecipeDescType === "1" && (
              <>
                <FormAnt.Item
                  name="pdf"
                  rules={[
                    {
                      required: true,
                      message: "Pdf is Required",
                    },
                  ]}
                >
                  <Input
                    onChange={(e) => handleChangePDFUpload(e)}
                    type="file"
                    className="form-control"
                    placeholder="Enter Title name"
                  />
                </FormAnt.Item>
              </>
            )}

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Modal.Footer>
          </FormAnt>
        </Modal.Body>
      </Modal>

      {/* update eatwell modal */}
      <Modal
        show={view}
        onHide={handleCloses}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Update Eat Well</Modal.Title>
          <FalconCloseButton onClick={handleCloses} />
        </Modal.Header>
        <Modal.Body>
          <FormAnt
            initialValues={{ description: initialDynamicFormData }}
            form={form}
            onFinish={updateEatwell}
            id="updateForm"
          >
            <FormAnt.Item name="id">
              <Input className="form-control" type="hidden" />
            </FormAnt.Item>
            <Form.Label>Receipe Types</Form.Label>
            <FormAnt.Item
              name="parent_id"
              {...register("parent_id", {
                required: true,
              })}
            >
              <Select
                showSearch={true}
                virtual={false}
                getPopupContainer={(node) => node.parentNode}
                placeholder="Select any one"
                onChange={(e) => mainCategorys(e)}
              >
                {valueCategory.map((item, i) => (
                  <Option key={i} value={item._id}>
                    {item.title}
                  </Option>
                ))}
              </Select>
            </FormAnt.Item>
            <Form.Label>Title</Form.Label>
            <FormAnt.Item
              name="title"
              rules={[
                {
                  required: true,
                  message: "Title is Required",
                },
                {
                  pattern: /.*\S.*/,
                  message: "White space not allowed",
                },
              ]}
            >
              <Input className="form-control" placeholder="Enter Title name" />
            </FormAnt.Item>
            <Form.Label>Image</Form.Label>
            <FormAnt.Item name="image">
              <Input
                onChange={(e) => handleChangeImageUpload(e)}
                type="file"
                className="form-control"
              />
            </FormAnt.Item>
            <br></br>
            <div className="vendor_logo_wrapper">
              <img
                src={fileDocList}
                className="img-fluid"
                style={{ height: "80px", width: "80px", borderRadius: "50" }}
                alt="vender logo"
              />
            </div>
            <Form.Label>Servings</Form.Label>
            <FormAnt.Item
              name="servings"
              rules={[
                {
                  required: true,
                  message: "Servings is Required",
                },
                {
                  pattern: /.*\S.*/,
                  message: "White space not allowed",
                },
              ]}
            >
              <Input
                type="number"
                className="form-control"
                placeholder="Enter Servings "
              />
            </FormAnt.Item>
            <Form.Label>Kilojoules</Form.Label>
            <FormAnt.Item
              name="kilojoules"
              rules={[
                {
                  required: true,
                  message: "Kilojoules is Required",
                },
                {
                  pattern: /.*\S.*/,
                  message: "White space not allowed",
                },
              ]}
            >
              <Input
                type="number"
                className="form-control"
                placeholder="Enter Kilojoules "
              />
            </FormAnt.Item>
            <Form.Label>Ingredients</Form.Label>
            <FormAnt.Item
              name="ingredients"
              rules={[
                {
                  required: true,
                  message: "Ingredients is Required",
                },
                {
                  pattern: /.*\S.*/,
                  message: "White space not allowed",
                },
              ]}
            >
              <Input
                className="form-control"
                placeholder="Enter Ingredients "
              />
            </FormAnt.Item>
            <Form.Label>Receipe Description Types</Form.Label>
            <FormAnt.Item
              name="type"
              rules={[
                {
                  required: true,
                  message: "Type is Required",
                },
              ]}
            >
              <Select
                showSearch={true}
                virtual={false}
                getPopupContainer={(node) => node.parentNode}
                placeholder="Select any one"
                onChange={(e) => handleRecipeDescTypeOnChange(e)}
              >
                <Option value="" disabled selected>
                  Select Type
                </Option>
                <Option value="1">Pdf</Option>
                <Option value="2">Browser Link</Option>
                <Option value="3">Description</Option>
              </Select>
            </FormAnt.Item>
            {activeRecipeDescType == "2" && (
              <FormAnt.Item
                name="receipe_info"
                rules={[
                  {
                    required: true,
                    message: "Browser Link is Required",
                  },
                  {
                    pattern: /.*\S.*/,
                    message: "White space not allowed",
                  },
                  {
                    type: "url",
                    message: "Enter Proper URL",
                  },
                ]}
              >
                <Input
                  className="form-control"
                  placeholder="Enter Browser Link"
                />
              </FormAnt.Item>
            )}
            {activeRecipeDescType == "3" && (
              <FormAnt.List name="description">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <div className="recipe_desc_add_container">
                        <FormAnt.Item
                          {...restField}
                          label="Title"
                          name={[name, "title"]}
                          class="form-control"
                          rules={[
                            { required: true, message: "Title is Required" },
                            {
                              pattern: /.*\S.*/,
                              message: "White space not allowed",
                            },
                          ]}
                        >
                          <Input placeholder="Enter Title" />
                        </FormAnt.Item>
                        <FormAnt.Item
                          label="Description"
                          {...restField}
                          name={[name, "description"]}
                          rules={[
                            {
                              required: true,
                              message: "Description is Required",
                            },
                            {
                              pattern: /.*\S.*/,
                              message: "White space not allowed",
                            },
                          ]}
                        >
                          <TextArea placeholder="Enter Description" />
                        </FormAnt.Item>

                        <MinusCircleOutlined
                          className="recipe_desc_add_container_removeBtn"
                          onClick={() => remove(name)}
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
            )}
            {editReceipeType == "1" && (
              <FormAnt.Item name="pdf">
                <Input
                  type="file"
                  className="form-control"
                  onChange={(e) => handleChangePDFUpload(e)}
                />
              </FormAnt.Item>
            )}
            {activeRecipeDescType == "1" && (
              <FormAnt.Item
                name="pdf"
                rules={[
                  {
                    required: true,
                    message: "Pdf is Required",
                  },
                ]}
              >
                <Input
                  type="file"
                  className="form-control"
                  onChange={(e) => handleChangePDFUpload(e)}
                />
              </FormAnt.Item>
            )}

            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloses}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Modal.Footer>
          </FormAnt>
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
export default connect(mapStateToProps)(SubCategory);
