import { Typography } from "components";
import ColumnChart  from "components/Charts/ColumnChart/ColumnChart";

const ColumnChartRendor = (props) => {
    return (
        <div>
            <ColumnChart
                props={props}
            />
        </div>
    );
};

export default ColumnChartRendor;
