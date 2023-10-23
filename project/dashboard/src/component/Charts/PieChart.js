import React, { useState } from "react";
import { PieChart, Pie, Cell, Sector } from "recharts";

import { noticePeriod } from "./ChartData";

export const PieChartCustomizedLabel = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toK = (value) => {
    return value / 1000 + "K";
  };

  const Info = () => {
    if (activeIndex === null) {
      return <div></div>;
    }

    const data = noticePeriod[activeIndex];

    return (
      <div className="pie-info absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h2 className="font-bold">{toK(data.candidates)}</h2>
        <p>
          {data.label} {data.unit}
        </p>
      </div>
    );
  };

  const COLORS = ["#3E5ED6", "#50E2C2", "#FDCC72", "#FA8686"];

  function renderActiveShape(props) {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } =
      props;

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 8}
          outerRadius={outerRadius + 11}
          fill={fill}
        />
      </g>
    );
  }

  function onPieHover(data, index) {
    setActiveIndex(index);
  }

  function onMouseLeave() {
    setActiveIndex(0);
  }
  const DataCard = ({ data, index }) => {
    const color = COLORS[index % COLORS.length];
    return (
      <div
        className={`data-card ${
          activeIndex === index ? "border-1 border-blue-500" : ""
        } p-1 rounded-md shadow mb-1`}
        key={index}
      >
        <div className="flex items-center space-x-2">
          <div
            className={`dot w-4 h-3 rounded-full ${
              activeIndex === index ? "bg-blue-500" : `bg-${color}`
            }`}
          ></div>
          <span className="label text-sm">
            {data.label} {data.unit}
          </span>
        </div>
        <span
          className={`text-base font-bold ${
            activeIndex === index ? "text-blue-500" : "text-sm"
          }`}
        >
          {toK(data.candidates)} Candidates
        </span>
      </div>
    );
  };
  return (
    <div className="pie-chart relative">
      <div className="chart relative">
        <div className="pie relative">
          <div className="pie-info-container relative top-28 right-5 ">
            <Info />
          </div>
          <PieChart width={325} height={230}>
            <Pie
              activeIndex={activeIndex}
              data={noticePeriod}
              dataKey="candidates"
              nameKey="name"
              outerRadius={100}
              innerRadius={80}
              activeShape={renderActiveShape}
              onMouseOver={onPieHover}
              onMouseLeave={onMouseLeave}
            >
              {noticePeriod.map((entry, index) => {
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                );
              })}
            </Pie>
          </PieChart>
        </div>
        {/* <div className="data">
          <ul>
            {noticePeriod.map((entry, index) => {
              const color = COLORS[index % COLORS.length];
              return (
                <li
                  className={activeIndex === index ? 'active' : ''}
                  onMouseOver={() => onPieHover(null, index)}
                  onMouseLeave={onMouseLeave}
                  key={index}
                >
                  <span className="dot" style={{ backgroundColor: color }}></span>
                  <span className="label">
                    {entry.label} {entry.unit}
                  </span>
                  <span>{toK(entry.candidates)} Candidates</span>
                </li>
              );
            })}
          </ul>
        </div> */}
        <div className="data grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-2 mt-2 ">
          {noticePeriod.map((entry, index) => (
            <DataCard data={entry} index={index} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};
