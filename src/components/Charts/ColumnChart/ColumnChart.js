import React from 'react';
import ReactApexChart from 'react-apexcharts';
import {columnChart} from '../../../mock-data'
const ColumnChart = (props) => {
    const prop = props.props;
    const _type =prop?.type ?? 'bar'
    const chartData = columnChart(props)
    return (
        <div>
            <ReactApexChart options={chartData.options} series={chartData.series} type={_type} height={500} {...prop.rest}/>
        </div>
    );
};
export default ColumnChart;
