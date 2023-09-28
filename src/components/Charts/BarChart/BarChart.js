import React from 'react';
import ReactApexChart from 'react-apexcharts';
const BarChart = ({data, colors,bottom, radius,size, type, text, ...rest}) => {
  const chartData = {
    options: {
          chart: {
              height: 250,
              type: type,
          },
          labels: [text],
        responsive: [{
            breakpoint: 992,
            options: {
                radialBar: {
                    hollow: {
                        margin: 10,
                        size: 40
                    }
                }
            },
        }],
          plotOptions: {
                    radialBar: {
                      hollow: {
                        margin: 15,
                        size: `${size ? size  :70}%`
                      },
                      dataLabels: {
                        showOn: "always",
                        name: {
                          offsetY: -20,
                          show: false,
                          color: colors[1],
                          fontSize: "12px"
                        },
                        value: {
                          color: colors[1],
                          fontSize: "20px",
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
  return (
    <div>
      <ReactApexChart options={chartData.options} series={chartData.series} type={type} height={300} {...rest}/>
    </div>
  );
};

export default BarChart;
