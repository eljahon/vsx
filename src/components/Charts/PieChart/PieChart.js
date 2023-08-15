// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/pie
import { ResponsivePie } from "@nivo/pie";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const centeredMetricData = {
  labels: ['Centered'],
  datasets: [
    {
      data: [450], // This value should be calculated or set according to your requirements
      backgroundColor: ['#ffffff'], // Set the background color for the center data
      hoverBackgroundColor: ['#ffffff'], // Set the hover background color for the center data
    },
  ],
};
// const styles = {
//   root: {
//     fontFamily: "consolas, sans-serif",
//     textAlign: "center",
//     position: "relative",
//     width: 600,
//     height: 600
//   },
//   overlay: {
//     position: "absolute",
//     top: 0,
//     right: margin.right,
//     bottom: 0,
//     left: margin.left,
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     fontSize: 96,
//     color: "#FFFFFF",
//     // background: "#FFFFFF33",
//     textAlign: "center",
//     // This is important to preserve the chart interactivity
//     pointerEvents: "none"
//   },
//   totalLabel: {
//     fontSize: 24
//   }
// };
const PieChart = ({ data /* see data tab */, style, className, colors }) => (
  <div className={className}>
 {/* <Pie {...commonProperties} 

 innerRadius={0.8} 

 enableArcLabels={false} 

 arcLinkLabel={d => `${d.id} (${d.formattedValue})`} 

 activeInnerRadiusOffset={commonProperties.activeOuterRadiusOffset} 

 layers={['arcs', 'arcLabels', 'arcLinkLabels', 'legends', CenteredMetric]} /> */}
    <ResponsivePie
      style={style}
      data={data}
      innerRadius={0.8}
      startAngle={360}
      endAngle={0}
      padAngle={0.7}
      cornerRadius={0}
    
      layers={['arcs', 'arcLabels', 'arcLinkLabels', 'legends', 'CenteredMetric']}
      colors={colors}
      activeOuterRadiusOffset={0}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      innerLabel={() => `${123}%`}
      sliceLabel={(datum) => `${datum.label} (${datum.value}%)`}
      arcLabel={false}
      enableArcLabels={false}
      enableArcLinkLabels={false}
      //   arcLinkLabelsSkipAngle={10}
      //   arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={0}
      //   arcLinkLabelsColor={{ from: "color" }}
      //   arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      //   defs={[
      //     {
      //       id: "dots",
      //       type: "patternDots",
      //       background: "inherit",
      //       color: "rgba(255, 255, 255, 0.3)",
      //       size: 4,
      //       padding: 1,
      //       stagger: true,
      //     },
      //     {
      //       id: "lines",
      //       type: "patternLines",
      //       background: "inherit",
      //       color: "rgba(255, 255, 255, 0.3)",
      //       rotation: -45,
      //       lineWidth: 6,
      //       spacing: 10,
      //     },
      //   ]}
      //   fill={[
      //     {
      //       match: {
      //         id: "elixir",
      //       },
      //       id: "lines",
      //     },
      //     {
      //       match: {
      //         id: "javascript",
      //       },
      //       id: "lines",
      //     },
      //   ]}
      //   legends={[
      //     {
      //       anchor: "bottom",
      //       direction: "row",
      //       justify: false,
      //       translateX: 0,
      //       translateY: 56,
      //       itemsSpacing: 0,
      //       itemWidth: 100,
      //       itemHeight: 18,
      //       itemTextColor: "#999",
      //       itemDirection: "left-to-right",
      //       itemOpacity: 1,
      //       symbolSize: 18,
      //       symbolShape: "circle",
      //       effects: [
      //         {
      //           on: "hover",
      //           style: {
      //             itemTextColor: "#000",
      //           },
      //         },
      //       ],
      //     },
      //   ]}
    />
    {/* <div style={styles.overlay}>
      <span>5</span>
      <span style={styles.totalLabel}>total components</span>
    </div> */}
  </div>
);

export default PieChart;
