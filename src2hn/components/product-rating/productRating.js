import React, { useEffect, useState } from 'react';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import AdvanceTableFooter from 'components/common/advance-table/AdvanceTableFooter';
import AdvanceTableSearchBox from 'components/common/advance-table/AdvanceTableSearchBox';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import { Card, Col, Row, Tooltip } from 'react-bootstrap';
import productRating from '../../services/product-rating/productRating';
import { connect, useDispatch } from "react-redux";
import Rating from 'react-rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ProductRating = () => {
  const dispatch = useDispatch();
  const [dataTableData, setDataTableData] = useState([]);
  const getData = async () => {
    dispatch(productRating.getProductRatingData())
      .then((res) => {
        setDataTableData(res.data.data);
        // setButtonLoading(false);
      })
      .catch((errors) => {
        console.log(errors);
      })
  }
  useEffect(() => {
    getData();
  }, []);


  const columns = [
    {
      accessor: '_id',
      Header: 'No',
      Cell: rowData => {
        return (parseInt(rowData.row.id) + 1)
      }
    },
    {
      accessor: 'name',
      Header: 'Name'
    },
    {
      accessor: 'image',
      Header: 'Image',
      Cell: rowData => {
        const data = rowData.row.original
        return (
          <img src={data.image} className="profile_pic_img" style={{ "height": "80px", "width": "80px", "borderRadius": "50" }} />
        )
      }
      // Cell: rowData => {
      // 	const data = rowData.row.original.image
      // 	return (
      // 		data.length > 0 ? data.map((item, index) => {
      // 			return (
      // 				<div key={index}>
      // 					<img src={item.image} className="profile_pic_img" style={{ "height": "80px", "width": "80px", "borderRadius": "50" }} />
      // 				</div>
      // 			)
      // 	 }) : <span>No Image</span>
      // 	)
      // }
    },
    // {
    //   accessor: 'comment',
    //   Header: 'Comment'
    // },
    {
      accessor: 'averageRating',
      Header: 'Rating',
      Cell:rowData => {
        const data = rowData.row.original
        return (
          <Rating
            initialRating={data.averageRating}
            readonly
            fullSymbol={
              <FontAwesomeIcon icon="star" className="text-warning fs-2" />
            }
            emptySymbol={
              <FontAwesomeIcon icon="star" className="text-300 fs-2" />
            }
          />
        );
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
      <div style={{ borderRadius: "0.375rem" }} className='py-4 bg-white mb-3 d-flex align-items-center px-3'>
        <h5 className="hover-actions-trigger mb-0">
          Product Rating List
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
export default connect(mapStateToProps)(ProductRating);

