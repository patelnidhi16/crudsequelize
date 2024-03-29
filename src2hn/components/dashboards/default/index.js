import React from 'react';
import TotalEatwell from './TotalEatwell';
import { Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import {
  
  runningProjects
} from 'data/dashboard/default';

import TotalManager from './TotalManager';
import TotalExersise from './TotalExersise';
import TotalSales from './TotalSales';
import RunningProjects from './RunningProjects';
import StorageStatus from './StorageStatus';
import SpaceWarning from './SpaceWarning';
import BestSellingProducts from './BestSellingProducts';
import SharedFiles from './SharedFiles';
import ActiveUsers from './ActiveUsers';
import BandwidthSaved from './BandwidthSaved';
import TopProducts from './TopProducts';
import TotalEmployee from './TotalEmployee';


const Dashboard = () => {

  return (

    <>
      <Row className="g-3 mb-3">
      <Col md={6} xxl={3}>
          <TotalManager  />
        </Col>
        <Col md={6} xxl={3}>
          <TotalEmployee  />
        </Col>
        <Col md={6} xxl={3}>
          <TotalExersise  />
        </Col>
        <Col md={6} xxl={3}>
          <TotalEatwell />
        </Col>
       
      </Row>
      
      <Row className="g-3 mb-3">
        <Col lg={12}>
          <RunningProjects data={runningProjects} />
        </Col>
      </Row>
{/* 
      <Row className="g-3 mb-3">
        <Col lg={6} xl={7} xxl={8}>
          <StorageStatus className="h-lg-100" data={storageStatus} />
        </Col>
        <Col lg={6} xl={5} xxl={4}>
          <SpaceWarning />
        </Col>
      </Row>

      <Row className="g-3 mb-3">
        <Col lg={7} xl={8}>
          <BestSellingProducts products={products} />
        </Col>
        <Col lg={5} xl={4}>
          <SharedFiles files={files} className="h-lg-100" />
        </Col>
      </Row>

      <Row className="g-3">
        <Col sm={6} xxl={3}>
          <ActiveUsers className="h-100" users={users} />
        </Col>
        <Col sm={6} xxl={3} className="order-xxl-1">
          <BandwidthSaved />
        </Col>
        <Col xxl={6}>
          <TopProducts data={topProducts} className="h-100" />
        </Col>
      </Row> */}
    </>
  );
};

export default Dashboard;
