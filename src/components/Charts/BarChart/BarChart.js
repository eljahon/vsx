import React from 'react';
import ReactApexChart from 'react-apexcharts';
const BarChart = ({data, colors,bottom, radius,size, type, text, ...rest}) => {
  const chartData = {
    options: {
          chart: {
              height: 300,
              type: type,
          },
          labels: [text],
          plotOptions: {
                    radialBar: {
                      hollow: {
                        margin: 15,
                        size: `${size ? size  :70}%`
                      },
                      dataLabels: {
                        showOn: "always",
                        name: {
                          offsetY: -10,
                          show: false,
                          color: colors[1],
                          fontSize: "13px"
                        },
                        value: {
                          color: colors[1],
                          fontSize: "30px",
                          show: true
                        }
                      }
                    }
                  },
          stroke: {
                    lineCap: "round",
                  },
                  colors: [colors[0]],
        },
    series: data,
    fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "horizontal",
            gradientToColors: ["#87D4F9"],
            stops: [0, 100]
          }
        }
  };
if(bottom) {
          chartData.options.plotOptions.radialBar['track'] =  {
                                background: '#E8E8E8',
                                startAngle: -150,
                                endAngle: 150,
                              }
}
  return (
    <div>
      <ReactApexChart options={chartData.options} series={chartData.series} type={type} height={300} {...rest}/>
    </div>
  );
};

export default BarChart;