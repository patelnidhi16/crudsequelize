import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge, Card } from 'react-bootstrap';
import Flex from 'components/common/Flex';
import { getColor, rgbaColor } from 'helpers/utils';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { useState, useEffect } from 'react';
import { connect, useDispatch } from "react-redux";
import DashboardService from '../../../services/dashboard/dashboard.';

import {
  GridComponent,
  TooltipComponent,
  TitleComponent
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import BasicECharts from 'components/common/BasicEChart';

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LineChart,
  CanvasRenderer
]);



const TotalExersise = () => {
  const dispatch = useDispatch();
  const [exersise, totalExersise] = useState("");
  const getData = () => {
    dispatch(DashboardService.getData())
      .then((res) => {
        totalExersise(res.data.exercise)
      })
      .catch((errors) => {

      })

  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <Card className="h-md-100">
      <Card.Header className="pb-0">
        <h6 className="mb-0 mt-2">Total Exercise</h6>
      </Card.Header>

      <Card.Body
        as={Flex}
        alignItems="end"
        justifyContent="between"
        className="pt-0"
      >
        <div>
          <h2 className="fw-normal text-700 mb-1 lh-1">{exersise}</h2>
          
        </div>
        <div className="ps-0">
        </div>
      </Card.Body>
    </Card>
  );
};

TotalExersise.propTypes = { data: PropTypes.array.isRequired };

export default TotalExersise;
