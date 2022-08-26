import Swal from "sweetalert2";
import AdvanceTable from "components/common/advance-table/AdvanceTable";
import AdvanceTableFooter from "components/common/advance-table/AdvanceTableFooter";
import AdvanceTableSearchBox from "components/common/advance-table/AdvanceTableSearchBox";
import AdvanceTableWrapper from "components/common/advance-table/AdvanceTableWrapper";
import React, { useState, useEffect } from "react";
import ToastMe from "../../components/common/ToastMe";

import {
  Button,
  Card,
  Col,
  Form,
  Modal,
  Row,
  ToastContainer,
  Toast,
  Tooltip,
} from "react-bootstrap";
import { connect, useDispatch } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faTrashAlt,
  faPlayCircle,
  faPauseCircle,
} from "@fortawesome/free-solid-svg-icons";
import IconButton from "components/common/IconButton";
import FalconCloseButton from "components/common/FalconCloseButton";
import { useForm } from "react-hook-form";
import { isError } from "components/helpers/response";
import { toast } from "react-toastify";
import MindfulnessService from "services/mindfulness/mindfulness";

const Mindfulness = () => {
  const dispatch = useDispatch();
  const [dataTableData, setDataTableData] = useState([]);
  const [show, setShow] = useState(false);
  const [view, setView] = useState(false);
  const [audio, audioStore] = useState(false);
  const [duration, playduration] = useState(false);
  const [audioo, setaudio] = useState('');
  const [playing, setPlaying] = useState();
  const [showAudio, setShowAudio] = useState(false);
  const [playAudio, setPlayAudio] = useState("");

  const handleTosterShow = (event) => {
    setPlayAudio(event);
    setShowAudio(true);
  };
  const handleTosterClose = () => {
    setPlayAudio("");
    setShowAudio(false);
  };

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
    isError(errors);
  }, []);

  useEffect(() => {
    isError(errors);
  });

  const handleShow = (data) => {
    setShow(true);
    setValue("title", "");
    setValue("audio", "");
    setValue("play_duration", "");
    setValue("id", "");
    audioStore("");
  };
  const handleView = (id) => {
    var data = {
      id: id,
    };
    dispatch(MindfulnessService.edit_mindfulness(data))
      .then((res) => {
        setView(true);
        setValue("title", res.data.title);
        setaudio(res.data.audio);
        setValue("audio", res.data.audio);
        setValue("play_duration", res.data.play_duration);
        setValue("id", res.data._id);
        audioStore("");
      })
      .catch((errors) => { });
  };
  //datatable data

  const getData = () => {
    dispatch(MindfulnessService.getData())
      .then((res) => {
        setDataTableData(res.data);
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  const handleChangeAudioUpload = (event) => {
    var audio_pre = event.target.files[0];
    // if (audio_pre.type.includes("audio/mpeg") != true) {
    //   ToastMe("Please select only Audio");
    //   return true;
    // }
    dispatch(MindfulnessService.upload_audio(audio_pre))
      .then((res) => {
        if (res.status == "200") {
          audioStore(res.data.file_url);
          playduration(res.data.duration)
        }
      })
      .catch((errors, statusCode) => {
        console.log(errors);
      });
  };

  //add mindfulness
  const addMindfulness = (data) => {
    data["audio"] = audio;
    data["play_duration"] = duration;
    dispatch(MindfulnessService.addMindfulness(data))
      .then((res) => {
        getData();
        handleClose();
      })
      .catch((errors) => {
        console.log(errors.data.message);
      });
  };

  //update mindfulness
  const updateMindfulness = (data) => {
    if (audio != "") {
      data["audio"] = audio;
      data["play_duration"] = duration;
    }

    dispatch(MindfulnessService.update_Mindfulness(data))
      .then((res) => {
        getData();
        handleClose();
      })
      .catch((errors) => {
        toast.error(errors.data.message);
      });
  };

  //delete mindfulness
  const deleteMindfulness = (id) => {
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
        dispatch(MindfulnessService.delete_mindfulness(data))
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
      Header: "Title",
    },
    {
      accessor: "audio",
      Header: "Audio",
      Cell: (rowData) => {
        const data = rowData.row.original;
        const audio = process.env.REACT_APP_AUDIO_URL + data.audio;
        return (
          <>
            <div className="t-action-btn">
              {playAudio !== audio ? (
                <button
                  className="btn btn-primary"
                  onClick={() => handleTosterShow(audio)}
                >
                  <FontAwesomeIcon icon={faPlayCircle} />
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={() => handleTosterShow(audio)}
                >
                  <FontAwesomeIcon icon={faPauseCircle} />
                </button>
              )}
            </div>
          </>
        );
      },
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
                onClick={(e) => deleteMindfulness(row._id)}
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
          <h5 className="hover-actions-trigger mb-0">Mindfulness</h5>
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

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Add Mindfulness</Modal.Title>
          <FalconCloseButton onClick={handleClose} />
        </Modal.Header>
        <Form noValidate onSubmit={handleSubmit(addMindfulness)}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                id="title"
                placeholder="Enter Title name"
                {...register("title", {
                  required: "Title is Required",
                  pattern: {
                    value: /.*\S.*/,
                    message: "White space not allowed",
                  },
                })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Audio </Form.Label>
              <Form.Control
                type="file"
                name="audio"
                id="audio"
                isInvalid={!!errors.audio}
                {...register("audio", {
                  required: "Audio is Required",
                  validate: {
                    acceptedFormats: (files) =>
                      ["audio/mpeg", undefined].includes(files[0]?.type) ||
                      "Only Audio is allowed",
                  },
                })}
                onChange={(e) => handleChangeAudioUpload(e)}
              />
            </Form.Group>
            {/* <Form.Group className="mb-3">
              <Form.Label>Play Duration</Form.Label>
              <Form.Control
                type="number"
                name="play_duration"
                id="play_duration"
                {...register("play_duration", { required: true })}
              />
            </Form.Group> */}
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

      <Modal
        show={view}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Update Mindfulness</Modal.Title>
          <FalconCloseButton onClick={handleClose} />
        </Modal.Header>
        <Form noValidate onSubmit={handleSubmit(updateMindfulness)}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                id="title"
                placeholder="Enter Title name"
                isInvalid={!!errors.title}
                {...register("title", {
                  required: "Title is Required",
                  pattern: {
                    value: /.*\S.*/,
                    message: "White space not allowed",
                  },
                })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Audio Name </Form.Label><br></br>
              <span className="text-primary">{audioo}</span>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Audio </Form.Label>
              <Form.Control
                type="file"
                name="audio"
                id="audio"
                isInvalid={!!errors.audio}
                {...register("audio", { required: false })}
                onChange={(e) => handleChangeAudioUpload(e)}
              />
            </Form.Group>
            {/* <Form.Group className="mb-3">
              <Form.Label>Play Duration</Form.Label>
              <Form.Control
                type="number"
                name="play_duration"
                id="play_duration"
                {...register("play_duration", { required: true })}
              />
            </Form.Group> */}
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
      <ToastContainer
        className="p-3 position-fixed"
        style={{ zIndex: "99" }}
        position={"bottom-end"}
      >
        <Toast onClose={handleTosterClose} show={showAudio} delay={3000}>
          <Toast.Body>
            <Toast.Header className="border-0 p-0 pe-2">
              <audio src={playAudio} controls autoPlay preload="auto" />
            </Toast.Header>
          </Toast.Body>
        </Toast>
      </ToastContainer>
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
export default connect(mapStateToProps)(Mindfulness);
