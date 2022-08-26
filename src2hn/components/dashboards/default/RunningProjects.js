import React from 'react';
import PropTypes from 'prop-types';
import { Badge, Card, Col, ProgressBar, Row } from 'react-bootstrap';
import FalconCardHeader from 'components/common/FalconCardHeader';
import Flex from 'components/common/Flex';
import classNames from 'classnames';
import DatePicker from 'react-datepicker';
import { useState, useEffect } from 'react';
import DashboardService from '../../../services/dashboard/dashboard.';
import { useDispatch } from "react-redux";
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import AdvanceTableFooter from 'components/common/advance-table/AdvanceTableFooter';
import moodExcited from "../../../assets/images/moods/Excited.png";
import moodHappy from "../../../assets/images/moods/Happy.png";
import moodNeutral from "../../../assets/images/moods/Neutral.png";
import moodSad from "../../../assets/images/moods/Sad.png";
import moodUnhappy from "../../../assets/images/moods/Unhappy.png";
import moment from 'moment';

const Project = ({ project, isLast }) => {
  const { color, progress, duration, title } = project;
  return (
    <Row
      className={classNames('align-items-center py-2', {
        'border-bottom border-200 ': !isLast
      })}
    >
      <Col className="py-1">
        <Flex className="align-items-center">
          <div className="avatar avatar-xl me-3">
            <div className={`avatar-name rounded-circle bg-soft-${color}`}>
              <span className={`fs-0 text-${color}`}>{title[0]}</span>
            </div>
          </div>
          <Flex className="position-relative">
            <Flex tag="h6" align="center" className="mb-0">
              <a className="text-800 stretched-link" href="#!">
                {title}
              </a>
              <Badge pill bg="200" className="ms-2 text-primary">
                {progress}%
              </Badge>
            </Flex>
          </Flex>
        </Flex>
      </Col>
      <Col>
        <Row className="justify-content-end align-items-center">
          <Col xs="auto pe-0">
            <div className="fs--1 fw-semi-bold">{duration}</div>
          </Col>
          <Col xs="5" className="pe-card">
            <ProgressBar now={progress} style={{ height: 5 }} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

Project.propTypes = {
  project: PropTypes.shape({
    color: PropTypes.string.isRequired,
    progress: PropTypes.number.isRequired,
    duration: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }),
  isLast: PropTypes.bool
};

const RunningProjects = ({ data }) => {
  const [date, setDate] = useState("");
  const dispatch = useDispatch();
  const [dataTableData, setDataTableData] = useState([]);
  const handleChange = (date) => {
    setDate(date);
    var d1 = moment(date).format("YYYY-MM-DD");
    var data = {
      date: d1,
  }
    dispatch(DashboardService.getLogDetail(data))
      .then((res) => {
        // console.log(res.data)
        setDataTableData(res.data)

      })
      .catch((errors) => {

      })

  }
  const getData = () => {
    dispatch(DashboardService.getLogDetail())
      .then((res) => {
        // console.log(res.data)
        setDataTableData(res.data)

      })
      .catch((errors) => {

      })

  }

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
      accessor: "name",
      Header: "Full Name",
      Cell: (rowData) => {
        const data = rowData.row.original;
        return <>{data?.firstname + " " + data?.lastname}</>;
      },
    },
    {
      accessor: "logs",
      Header: "Log",
      Cell: rowData => {
        const data = rowData.row.original
        return (
          <span className={`badge ${data?.logs[0]?.log_type == 1 ? "badge-soft-success" :data?.logs[0]?.log_type == 2 ? "badge-soft-danger" : data?.logs[0]?.log_type == 3 ? "badge-soft-danger": "badge-soft-primary"}`}>
            {`${data?.logs[0]?.log_type == 1 ? "Present" :data?.logs[0]?.log_type == 3 ? "Sick Leave" : data?.logs[0]?.log_type == 2 ? "RDO Leave": "Not Entry Yet"}`}
          </span>
        )
      }
    },
    {
      accessor: "Moods",
      Header: "Mood",
      Cell: rowData => {
        const data = rowData.row.original
        return (
          <img src={data?.logs[0]?.mood_type == 1 ? moodNeutral : data?.logs[0]?.mood_type == 2 ? moodUnhappy : data?.logs[0]?.mood_type == 3 ? moodHappy : data?.logs[0]?.mood_type == 4 ? moodSad : data?.logs[0]?.mood_type == 5 ? moodExcited : ""} width="40px">
          </img>
        )
      }
    },
  ];
  return (
    <AdvanceTableWrapper
      columns={columns}
      data={dataTableData}
      sortable
      pagination
      perPage={5}
    >
      <Card className="mb-3">
        <Card.Header className="border-bottom border-200">
          <Row className="flex-between-center align-items-end g-2">
            <Col>
              <FalconCardHeader title="Log Details" />
            </Col>
            <Col xs="auto" sm={6} lg={4} className="text-right" >
              <DatePicker
                selected={date}
                onChange={handleChange}
                className="form-control"
                placeholderText="MM-DD-YYYY"
                dateFormat="MM-dd-yyyy"
                maxDate={new Date()}
              />
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

  );
};

RunningProjects.propTypes = {
  data: PropTypes.arrayOf(Project.propTypes.project).isRequired
};

export default RunningProjects;
