import React, { useEffect, useState } from "react";
import AdvanceTable from "components/common/advance-table/AdvanceTable";
import AdvanceTableFooter from "components/common/advance-table/AdvanceTableFooter";
import AdvanceTableSearchBox from "components/common/advance-table/AdvanceTableSearchBox";
import AdvanceTableWrapper from "components/common/advance-table/AdvanceTableWrapper";
import { Card, Col, Row } from "react-bootstrap";

import manager from "../../services/manager/manager";
import { connect, useDispatch } from "react-redux";
const Manager = () => {
  const dispatch = useDispatch();
  const [dataTableData, setDataTableData] = useState([]);
  const getData = async () => {
    dispatch(manager.getManager())
      .then((res) => {
        setDataTableData(res.data);
      })
      .catch((errors) => {
        console.log(errors);
      });
  };
  useEffect(() => {
    getData();
  }, []);

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
      Header: "Profile",
      Cell: (rowData) => {
        const data = rowData.row.original.profile_image;
        return (
          <img
            src={`${process.env.REACT_APP_FILE_URL}${data}`}
            className="profile_pic_img"
            style={{ height: "55px", width: "65px", borderRadius: "50" }}
            alt="profile"
          />
        );
      },
    },
    {
      accessor: "fullname",
      Header: "Full Name",
    },
    {
      accessor: "email",
      Header: "Email",
    },
    {
      accessor: "mobile",
      Header: "Mobile",
    },
    {
      accessor: "gender",
      Header: "Gender",
    },
    {
      accessor: "company_position",
      Header: "Company Position",
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
      <div
        style={{ borderRadius: "0.375rem" }}
        className="py-4 bg-white mb-3 d-flex align-items-center px-3"
      >
        <h5 className="hover-actions-trigger mb-0">Manager List</h5>
      </div>
      <Card className="mb-3">
        <Card.Header className="border-bottom border-200">
          <Row className="flex-between-center align-items-end g-2">
            <Col xs={8} sm="auto" className="ms-3 mt-2 text-end ps-0">
              <div id="orders-actions"></div>
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
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.Auth.isAuthenticated,
    accessToken: state.Auth.accessToken,
  };
};
export default connect(mapStateToProps)(Manager);
