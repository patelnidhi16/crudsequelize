import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react';
import PageHeader from 'components/common/PageHeader';
import FalconComponentCard from 'components/common/FalconComponentCard';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import AdvanceTableFooter from 'components/common/advance-table/AdvanceTableFooter';
import AdvanceTableSearchBox from 'components/common/advance-table/AdvanceTableSearchBox';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import { Card, Col, Row, Tooltip } from 'react-bootstrap';
import SoftBadge from 'components/common/SoftBadge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faToggleOff, faToggleOn, faTrashRestoreAlt } from '@fortawesome/free-solid-svg-icons';
// import  users  from '../../services/user';
import users from '../../services/user/index';
import { connect, useDispatch } from "react-redux";
import Flex from 'components/common/Flex';
import { changeStatus } from 'services/documents/document';
import CommonService from 'services/common';

const User = () => {
  const dispatch = useDispatch();
  const [dataTableData, setDataTableData] = useState([]);
  const getData = async () => {
    dispatch(users.getUsers())
    .then((res) => {
        setDataTableData(res.data);
        // setButtonLoading(false);
    })
    .catch((errors) => {
        console.log(errors);
    })
  }
    useEffect(() => {
      getData();
  }, []); 


const changeStatus = (id,is_verify) => {
  var message = "Are you sure want to verify this!";
  if (is_verify == 0) {
    message = "Are you sure want to not verify this!"
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
        'user_id': id,
        'is_verify':is_verify,
      }
      dispatch(users.verify(data))
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
      accessor: 'username',
      Header: 'Name'
    },
    {
      accessor: 'email',
      Header: 'Email'
    },
    {
      accessor: 'country',
      Header: 'Country'
    },
   
    {
      accessor: 'is_verify',
      Header: 'Status',
      Cell: rowData => {
        const data = rowData.row.original
        return (
          <span className={`badge ${data.is_verify === 1 ? "badge-soft-success" : "badge-soft-danger"}`}>
            {`${data.is_verify === 1 ? "Verify" : "Not-Verify"}`}
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

            <button className={`btn ${row.is_verify === 1 ? "btn-warning" : "btn-danger"} `} onClick={(e)=>changeStatus(row._id,(row.is_verify==1?0:1))} >
              {
                  row.is_verify === 1 ? <FontAwesomeIcon icon={faToggleOn} title="Change Status" /> : <FontAwesomeIcon icon={faToggleOff} title="Change Status" />
              }
            </button>
                  </div>
              </>
          );
      },
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
    <div style={{ borderRadius: "0.375rem" }} className='py-4 bg-white mb-3 d-flex align-items-center px-3'>
				<h5 className="hover-actions-trigger mb-0">
					User List
				</h5>
			</div>
    <Card className='mb-3'>

    <Card.Header className="border-bottom border-200">
      <Row className="align-items-end g-2">
     
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
  );
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.Auth.isAuthenticated,
		accessToken: state.Auth.accessToken,
	}
};
export default connect(mapStateToProps)(User);

