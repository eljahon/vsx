import { Typography } from "components";
import PieChart from "components/Charts/PieChart/PieChart";
import "../../styles/vsxs.scss";

const PrisonersPieChart = ({ data, className, colors, title }) => {
  const h1Color = colors ? colors[0] : "#C85C5C";

  return (
    <div className="d-flex">
      <div className="prisoners-count">
        <p>{title}</p>
        <h1 style={{ color: h1Color }}>1232</h1>
      </div>
      <PieChart className={className} colors={colors} data={data} />
    </div>
  );
};

export default PrisonersPieChart;
