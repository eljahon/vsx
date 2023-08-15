import React from "react";
import { Fields, PageHeading } from "components";
// import PieChart from "components/Charts/PieChart/PieChart";
import PrisonersBarChart from "../components/dashboard-components/PrisonersBarChart";
import SamiChart from "../components/dashboard-components/PrisonersSemi";
import PrisonersLineChart from '../components/dashboard-components/PrisonersLineChart'
import '../styles/dashbord.scss'
import { utils } from "services";
import ColumnChart from "../components/dashboard-components/ColumnChart";
// import PrisonersPieChart from "../components/PrisonersPieChart";

const data = [
  {
    id: "erlang",
    label: "erlang",
    value: 365,
    color: "#C85C5C",
  },
  {
    id: "sass",
    label: "sass",
    value: 548,
    color: "#E8E8E8",
  },
];

const Dashboard = () => {
  return (
    <>
      <PageHeading
        links={[
          { link: "/", label: "Bosh sahifa" },
          { link: "/", label: "Toshkent" },
          { label: "Statistika" },
        ]}
        title="Статистика"
        btnText={"Хисобот юклаб олиш"}
        isFilter
      />
     <div>
         <div className="row">
             <div className="col-12 col-md-6 col-lg-3">
                 {/* <PrisonersPieChart

            className={"pie"}
            data={data}
            title={"Умумий сақланаётган махбуслар"}
          /> */}
                 <PrisonersBarChart
                     bottom
                     data={[40]}
                     colors={["#C85C5C", "#000"]}
                     count={1225}
                     title={"Умумий сақланаётган махбуслар"}

                 />

             </div>
             <div className="col-12 col-md-6 col-lg-3">
                 {/* <PrisonersPieChart

            className={"pie"}
            data={data}

          /> */}
                 <PrisonersBarChart
                     bottom
                     colors={["#5BBA7C", "#000"]}
                     data={[29]}
                     count={500}
                     title="Бўш ўринлар сони"

                 />
             </div>
             <div className="col-12 col-md-6 col-lg-3">
                 {/* <PrisonersPieChart
            colors={[, "#E8E8E8"]}
            className={"pie"}
            data={data}
            title="Ишлашга жўнатилганлар сони"
          /> */}
                 <PrisonersBarChart
                     bottom
                     colors={["#223263", "#000"]}
                     count={225}
                     data={[13]}
                     title="Ишлашга жўнатилганлар сони"

                 />
             </div>
             <div className="col-12 col-md-6 col-lg-3">
                 {/* <PrisonersPieChart
            colors={["#223263", "#E8E8E8"]}
            className={"pie"}
            data={data}
            title="Озод этилганларлар сони"
          /> */}
                 <PrisonersBarChart
                     bottom
                     colors={["#223263", "#000"]}
                     count={225}
                     data={[2.89]}
                     title="Озод этилганларлар сони"

                 />
             </div>
         </div>
     </div>
   <div className='line__chart'>
       <div className="row">
           <div className="col-12 col-md-6 col-lg-6">
               <PrisonersLineChart/>
           </div>
   </div>

      </div>
        <div className='person'>
            <h1 className='person__title'>Шахслар бўйича статистика</h1>
            <div className="row">
                <div className="col-12 col-md-6 col-lg-4">
                        <SamiChart type={'donut'} text={'Ёшлар кесимида'}/>
                </div>  <div className="col-12 col-md-6 col-lg-4">
                        <SamiChart type={'donut'} text={'Ёшлар кесимида'}/>
                </div>  <div className="col-12 col-md-6 col-lg-4">
                        <SamiChart type={'donut'} text={'Ёшлар кесимида'}/>
                </div>
            </div>
        </div>
        <div className='statick'>
            <div className='d-flex justify-content-between mb_50'>
                <div className="flex">
                  <Fields.RangePicker
                    size="xsm"
                    className="filter__control mr_15"
                    onDateChange={(date) => {
                      const { start_at, end_at } = utils.formatters.getRange(date);

                      setFieldValue("range", date);
                      setFilter((prev) => ({
                        ...prev,
                        start_at,
                        end_at,
                      }));
                    }}
                  />
                </div>
                <h1>ВСХлар бўйича статистика</h1>
<div>
    <button>on</button>
    <button>on</button>
</div>
            </div>
          <div className='statick__chart'>
              <ColumnChart/>
          </div>
        </div>
    </>
  );
};

export default Dashboard;
