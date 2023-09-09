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
          <div className="row">
          <div className="prisoners-count col-2 col-md-12 col-sm-12 col-lg-2">
            <p>{_title}</p>
            <h1 style={{ color: h1Color }}>{count}</h1>
          </div>
          <div className='col-10 col-md-12 col-lg-10'>
              <BarChart
                  // width={200}
                  data={_data}
                  colors={colors}
                  type={_type}
                  size={45}
                  text={_text}
                  {...rest}
              />
          </div>
        </div>
  );
};

export default PrisonersPieChart;
