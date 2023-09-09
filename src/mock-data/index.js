    export const columnChart = (props) => {
        const {colors, labels} =props
        const _colors= colors?? ['#F94144', '#90BE6D', '#2D9CDB', '#FFA600'];
        const _labels = labels?? ['ВСХ №1', 'ВСХ №2', 'ВСХ №3', 'ВСХ №4', 'ВСХ №5','ВСХ №6']
           const chartdata = {
               series: [
                   {
                       name: 'Net Profit',
                       data: [44, 55, 57, 56, 61, 58]
                   },
                   {
                       name: 'Revenue',
                       data: [76, 85, 101, 98, 87, 60]
                   }, {
                       name: 'Free Cash Flow',
                       data: [35, 41, 36, 26, 45, 65]
                   }],
               options: {
                   chart: {
                       type: 'bar',
                       height: 350,
                       toolbar: {
                           show: false
                       },
                   },
                   labels: _labels,
                   colors: _colors,
                   legend: {
                       show: false
                   },
                   plotOptions: {
                       bar: {
                           horizontal: false,
                           columnWidth: '30%',
                           endingShape: 'rounded'
                       },
                   },
                   dataLabels: {
                       enabled: false
                   },
                   // dataLabels: {
                   //     formatter: (val) => {
                   //         return val / 1000 + 'K'
                   //     }
                   // },
                   stroke: {
                       show: true,
                       width: 2,
                       colors: ['transparent']
                   },
                   xaxis: {
                       categories: _labels,
                   },
                   yaxis: {
                       labels: {
                           formatter: (val) => [val],
                       },
                       title: {
                           text: ''
                       }
                   },
                   fill: {
                       opacity: 1
                   },
                   responsive: [{
                       breakpoint: 480,
                       options: {
                           chart: {
                               width: 200
                           },
                           legend: {
                               position: 'bottom'
                           }
                       },
                   }],
                   tooltip: {
                       y: {
                           formatter: function (val) {
                               return "$ " + val + " thousands"
                           }
                       }
                   }
               },
           }

return chartdata;
        };
    export const  LineChartOptions =(props) => (
        {
            series: [{
                name: "ВСХ №1",
                data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
            },
                {
                    name: "ВСХ №2",
                    data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35]
                },
                {
                    name: 'ВСХ №3',
                    data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47]
                },
                {
                    name: 'ВСХ №4',
                    data: [80, 50, 70, 90, 70, 30, 60, 40, 80, 50, 45, 47]
                }
            ],
            options:{

                chart: {
                    height: 350,
                    type: 'line',
                    zoom: {
                        enabled: false
                    },
                    toolbar: {
                        show: false
                    },
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    width: [5, 7, 5],
                    curve: 'straight',
                    dashArray: [0, 8, 5]
                },
                title: {
                    text: '',
                    align: 'left'
                },
                legend: {
                    tooltipHoverFormatter: function(val, opts) {
                        return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
                    }
                },

                markers: {
                    size: 0,
                    hover: {
                        sizeOffset: 6
                    }
                },
                xaxis: {
                    categories: ['01 Jan', '02 Jan', '03 Jan', '04 Jan', '05 Jan', '06 Jan', '07 Jan', '08 Jan', '09 Jan',
                        '10 Jan', '11 Jan', '12 Jan'
                    ],
                },
                tooltip: {
                    y: [
                        {
                            title: {
                                formatter: function (val) {
                                    return val + " (mins)"
                                }
                            }
                        },
                        {
                            title: {
                                formatter: function (val) {
                                    return val + " per session"
                                }
                            }
                        },
                        {
                            title: {
                                formatter: function (val) {
                                    return val;
                                }
                            }
                        }
                    ]
                },
                grid: {
                    borderColor: '#f1f1f1',
                }
            }
        }
    )
    export const BarChart = (props) => {
        const {bottom, size, type,colors} = props;
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
                            size: `${size ? size : 70}%`
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
        if (bottom) {
            chartData.options.plotOptions.radialBar['track'] = {
                background: '#E8E8E8',
                startAngle: -150,
                endAngle: 150,
            }
        }
        return chartData;
    }
    export const SemiChart =(props) => {
        const {data, colors,bottom,radius,size,lables,fillColors,type, text} = props;
        const _colors= colors?? ['#003F5C', '#7A5195', '#EF5675', '#FFA600'];
        const _labels = lables?? ['277 модда','268 модда', 'Суд қарори', 'ИИБ қарори']
        let chartData = {
            series: [44, 55, 41, 17],
            options: {
                chart: {
                    type: 'donut',
                    width: 200
                },
                labels: _labels,
                colors: _colors,
                markers: {
                    colors:['#003F5C', '#7A5195', '#EF5675', '#FFA600']
                },
                plotOptions: {
                    pie: {
                        startAngle: -90,
                        endAngle: 90,
                        // offsetY: 39
                    }
                },
                grid: {
                    padding: {
                        bottom: -80
                    }
                },
                legend: {
                    position: 'right',
                    show: true,
                    fontSize: '12px',
                    offsetY: 50,
                    fontWeight: 400
                },
                // itemMargin: {
                //     horizontal: 5,
                //     vertical: 0
                // },
                // dataLabels: {
                //     style: {
                //         colors: ['#F44336', '#E91E63', '#9C27B0']
                //     }
                // },
                stroke: {
                    width: 0,
                },
                fill: {
                    type: 'gradient',
                    colors: fillColors??['#003F5C', '#7A5195', '#EF5675', '#FFA600']
                },
                responsive: [{
                    breakpoint: 900,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom',
                            horizontalAlign: 'center',
                        }
                    },
                },
                    // {
                    //     breakpoint: 2200,
                    //     options: {
                    //         chart: {
                    //             width: 400
                    //         },
                    //         legend: {
                    //             position: 'bottom'
                    //         }
                    //     },
                    // },
                    // {
                    //     breakpoint: 2100,
                    //     options: {
                    //         chart: {
                    //             width: 400
                    //         },
                    //         legend: {
                    //             position: 'bottom'
                    //         }
                    //     },
                    // }
                ]
            },
        };
        return chartData;
    }
    export const DropData =() => [
        {id: 1, title: 'Kamera', items: [{id:Math.round(Math.random()*1000), title: 'Убадуллаев Хожи'+Math.round(Math.random()*1000)},{id: Math.round(Math.random()*1000), title: 'Убадуллаев Хожи '+Math.round(Math.random()*1000)},{id: Math.round(Math.random()*1000), title: 'Убадуллаев Хожи '+Math.round(Math.random()*1000)},{id: Math.round(Math.random()*1000), title: 'Убадуллаев Хожи '+Math.round(Math.random()*1000)},{id:  Math.round(Math.random()*1000), title: 'Убадуллаев Хожи '+Math.round(Math.random()*1000)},{id: Math.round(Math.random()*1000), title: 'Убадуллаев Хожи'+Math.round(Math.random()*1000)},{id:Math.round(Math.random()*1000), title: 'Убадуллаев Хожи '+Math.round(Math.random()*1000)},]},
        {id:2 , title: 'Kamera', items: [{id:Math.round(Math.random()*1000), title: 'Убадуллаев Хожи '+Math.round(Math.random()*1000)},{id: Math.round(Math.random()*1000), title: 'Убадуллаев Хожи '+Math.round(Math.random()*1000)},{id: Math.round(Math.random()*1000), title: 'Убадуллаев Хожи '+Math.round(Math.random()*1000)},{id: Math.round(Math.random()*1000), title: 'Убадуллаев Хожи '+Math.round(Math.random()*1000)},{id:  Math.round(Math.random()*1000), title: 'Убадуллаев Хожи '+Math.round(Math.random()*1000)},{id: Math.round(Math.random()*1000), title: 'Убадуллаев Хожи '+Math.round(Math.random()*1000)},{id:Math.round(Math.random()*1000), title: 'Убадуллаев Хожи '+Math.round(Math.random()*1000)},]},
        {id:3, title: 'Kamera',  items: [{id:Math.round(Math.random()*1000), title: 'Убадуллаев Хожи '+Math.round(Math.random()*1000)},{id: Math.round(Math.random()*1000), title: 'Убадуллаев Хожи '+Math.round(Math.random()*1000)},{id: Math.round(Math.random()*1000), title: 'Убадуллаев Хожи '+Math.round(Math.random()*1000)},{id: Math.round(Math.random()*1000), title: 'Убадуллаев Хожи '+Math.round(Math.random()*1000)},{id:  Math.round(Math.random()*1000), title: 'Убадуллаев Хожи '+Math.round(Math.random()*1000)},{id: Math.round(Math.random()*1000), title: 'Убадуллаев Хожи '+Math.round(Math.random()*1000)},{id:Math.round(Math.random()*1000), title: 'Убадуллаев Хожи'+Math.round(Math.random()*1000)},]},
        {id: 4, title: 'Kamera', items: [{id:Math.round(Math.random()*1000), title: 'Убадуллаев Хожи '+Math.round(Math.random()*1000)},{id: Math.round(Math.random()*1000), title: 'Убадуллаев Хожи '+Math.round(Math.random()*1000)},{id: Math.round(Math.random()*1000), title: 'Убадуллаев Хожи'+Math.round(Math.random()*1000)},{id: Math.round(Math.random()*1000), title: 'Убадуллаев Хожи'+Math.round(Math.random()*1000)},{id:  Math.round(Math.random()*1000), title: 'Убадуллаев Хожи'+Math.round(Math.random()*1000)},{id: Math.round(Math.random()*1000), title: 'Убадуллаев Хожи '+Math.round(Math.random()*1000)},{id:Math.round(Math.random()*1000), title: 'Убадуллаев Хожи '+Math.round(Math.random()*1000)},]},
        {id: 5, title: 'Kamera', items: [{id:Math.round(Math.random()*1000), title: 'Убадуллаев Хожи '+Math.round(Math.random()*1000)},{id: Math.round(Math.random()*1000), title: 'Убадуллаев Хожи '+Math.round(Math.random()*1000)},{id: Math.round(Math.random()*1000), title: 'Убадуллаев Хожи'+Math.round(Math.random()*1000)},{id: Math.round(Math.random()*1000), title: 'Убадуллаев Хожи'+Math.round(Math.random()*1000)},{id:  Math.round(Math.random()*1000), title: 'Убадуллаев Хожи'+Math.round(Math.random()*1000)},{id: Math.round(Math.random()*1000), title: 'Убадуллаев Хожи '+Math.round(Math.random()*1000)},{id:Math.round(Math.random()*1000), title: 'Убадуллаев Хожи '+Math.round(Math.random()*1000)},]},
        {id: 6, title: 'Kamera', items: [{id:Math.round(Math.random()*1000), title: 'Убадуллаев Хожи '+Math.round(Math.random()*1000)},{id: Math.round(Math.random()*1000), title: 'Убадуллаев Хожи '+Math.round(Math.random()*1000)},{id: Math.round(Math.random()*1000), title: 'Убадуллаев Хожи'+Math.round(Math.random()*1000)},{id: Math.round(Math.random()*1000), title: 'Убадуллаев Хожи'+Math.round(Math.random()*1000)},{id:  Math.round(Math.random()*1000), title: 'Убадуллаев Хожи'+Math.round(Math.random()*1000)},{id: Math.round(Math.random()*1000), title: 'Убадуллаев Хожи '+Math.round(Math.random()*1000)},{id:Math.round(Math.random()*1000), title: 'Убадуллаев Хожи '+Math.round(Math.random()*1000)},]},
        {id: 7, title: 'Kamera', items: [{id:Math.round(Math.random()*1000), title: 'Убадуллаев Хожи '+Math.round(Math.random()*1000)},{id: Math.round(Math.random()*1000), title: 'Убадуллаев Хожи '+Math.round(Math.random()*1000)},{id: Math.round(Math.random()*1000), title: 'Убадуллаев Хожи'+Math.round(Math.random()*1000)},{id: Math.round(Math.random()*1000), title: 'Убадуллаев Хожи'+Math.round(Math.random()*1000)},{id:  Math.round(Math.random()*1000), title: 'Убадуллаев Хожи'+Math.round(Math.random()*1000)},{id: Math.round(Math.random()*1000), title: 'Убадуллаев Хожи '+Math.round(Math.random()*1000)},{id:Math.round(Math.random()*1000), title: 'Убадуллаев Хожи '+Math.round(Math.random()*1000)},]},
        {id: 8, title: 'Kamera', items: [{id:Math.round(Math.random()*1000), title: 'Убадуллаев Хожи '+Math.round(Math.random()*1000)},{id: Math.round(Math.random()*1000), title: 'Убадуллаев Хожи '+Math.round(Math.random()*1000)},{id: Math.round(Math.random()*1000), title: 'Убадуллаев Хожи'+Math.round(Math.random()*1000)},{id: Math.round(Math.random()*1000), title: 'Убадуллаев Хожи'+Math.round(Math.random()*1000)},{id:  Math.round(Math.random()*1000), title: 'Убадуллаев Хожи'+Math.round(Math.random()*1000)},{id: Math.round(Math.random()*1000), title: 'Убадуллаев Хожи '+Math.round(Math.random()*1000)},{id:Math.round(Math.random()*1000), title: 'Убадуллаев Хожи '+Math.round(Math.random()*1000)},]},
    ]

