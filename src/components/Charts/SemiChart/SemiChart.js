import React from 'react';
import ReactApexChart from 'react-apexcharts';
import {SemiChart} from '../../../mock-data'
const chartType ={
    donut: SemiChart,
}
const LineChart = (props) => {
    const _type = props.type;
    let chartData = chartType[_type](props)
return (
        <div>
            <ReactApexChart options={chartData.options} series={chartData.series} type={_type} height={400} {...props.rest}/>
        </div>
    );
};

export default LineChart;
