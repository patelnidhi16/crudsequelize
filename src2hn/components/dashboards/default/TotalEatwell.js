import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Tooltip, OverlayTrigger } from 'react-bootstrap';
import Flex from 'components/common/Flex';
import { getColor } from 'helpers/utils';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { useState, useEffect } from 'react';
import { connect, useDispatch } from "react-redux";
import DashboardService from '../../../services/dashboard/dashboard.';

import {
  GridComponent,
  TooltipComponent,
  TitleComponent
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

import classNames from 'classnames';

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  BarChart,
  CanvasRenderer
]);


const TotalEatwell = ({ amountClassName }) => {
  const dispatch = useDispatch();
  const [eatwell, totalEatwell] = useState("");
  const getData = () => {
    dispatch(DashboardService.getData())
      .then((res) => {
        totalEatwell(res.data.eatwell)
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
        <h6 className="mb-0 mt-2">
          Total Eatwell

        </h6>
      </Card.Header>

      <Card.Body as={Flex} alignItems="end" justifyContent="between">
        <div>
          <h2
            className={classNames(
              amountClassName,
              'mb-1 text-700 fw-normal lh-1'
            )}
          >
            {eatwell}
          </h2>
        </div>
      </Card.Body>
    </Card>
  );
};

TotalEatwell.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.string,
  amountClassName: PropTypes.string
};

export default TotalEatwell;
