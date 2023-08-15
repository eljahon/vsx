import { Typography } from "components";
import SemiChart from "components/Charts/SemiChart/SemiChart";
import "../../styles/vsxs.scss";

const PrisonersSemiChart = ({ data, className, colors, text, type }) => {
    const h1Color = colors ? colors[0] : "#C85C5C";

    return (
        <div className='sime'>
            <h1 className='sime__text'>{text}</h1>
            <SemiChart type={type} className={className} colors={colors} data={data} />
        </div>
    );
};

export default PrisonersSemiChart;
