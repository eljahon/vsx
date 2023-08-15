import { Typography } from "components";
import BarChart  from "components/Charts/BarChart/BarChart";
import "../../styles/vsxs.scss";

const PrisonersPieChart = ({ data, className, colors,text,count, size,type,title, ...rest}) => {
  const h1Color = colors ? colors[0] : "#C85C5C";
  const _type = type ? type   : 'radialBar'
  const _data = data?.length ? data : [30];
  const _text = text ? text : 'Percent'
  const _title = title ? title : "title not props";
  return (
          <div className="d-flex">
          <div className="prisoners-count">
            <p>{_title}</p>
            <h1 style={{ color: h1Color }}>{count}</h1>
          </div>
          <BarChart
           data={_data}
           colors={colors}
           type={_type}
           size={60}
           text={_text}
           {...rest}
             />
        </div>
  );
};

export default PrisonersPieChart;
