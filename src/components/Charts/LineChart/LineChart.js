import React from 'react';
import ReactApexChart from 'react-apexcharts';
import {LineChartOptions} from '../../../mock-data'
const LineChart = (props) => {
    const _type =props?.type ?? 'line'
    const chartData = LineChartOptions(props)
    return (
        <div>
            <ReactApexChart options={chartData.options} series={chartData.series} type={_type} height={500} {...props.rest}/>
        </div>
    );
};
export default LineChart;
