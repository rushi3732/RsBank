import React from "react";
import ComposedResponsiveContainer from "./Charts/ComposedResponsiveContainer";
import CustomContentTreemap from "./Charts/CustomContentTreemap";
import SpecifiedDomainRadarChart from "./Charts/SpecifiedDomainRadarChart";
import CustomShapeBarChart from "./Charts/CustomShapeBarChart";
import JointLineScatterChart from "./Charts/JointLineScatterChart";
import LineCharts from "./Charts/LineChart";
import { PieChartCustomizedLabel } from "./Charts/PieChart";
import CustomizedRectangleContent from "./Charts/CustomizedRectangleContent";
import BarCharts from "./Charts/BarChart";

const chartComponents = [
  ComposedResponsiveContainer,
  BarCharts,
  LineCharts,
  PieChartCustomizedLabel,
  CustomizedRectangleContent,
  CustomContentTreemap,
  SpecifiedDomainRadarChart,
  CustomShapeBarChart,
  JointLineScatterChart,
];

const Chart = () => {
  return (
    <div className=" ">
      <div className="bg-white p-4">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {chartComponents.map((ChartComponent, index) => (
            <div
              key={index}
              className="bg-white border-2 p-4  h-96 w-96 rounded-lg"
            >
              <ChartComponent />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chart;
