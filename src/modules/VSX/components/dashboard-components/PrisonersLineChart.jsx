import { Typography } from "components";
import LineChart from "components/Charts/LineChart/LineChart";
import "../../styles/vsxs.scss";

const PrisonersLineChart = ({ data, className, colors }) => {
    const h1Color = colors ? colors[0] : "#C85C5C";

    return (
        <div>
            {/*<div className="prisoners-count">*/}
            {/*    <p>{title}</p>*/}
            {/*    <h1 style={{ color: h1Color }}>1232</h1>*/}
            {/*</div>*/}
            <LineChart className={className} colors={colors} data={data} />
        </div>
    );
};

export default PrisonersLineChart;
