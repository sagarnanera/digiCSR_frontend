import React from 'react';
import Chart from 'react-apexcharts';
import "./piechart.css"

function PieChart() {
  // Sample data for the pie and bar charts
  const chartData = {
    pieSeries: [44, 55, 13, 43],
    barSeries: [30, 40, 45, 50],
    options: {
      colors: ['#237AAA', '#4895C6', '#85CCFF', '#A3E9FF'],
      labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4'],
      chart: {
        background: '#343a40',
        foreColor: '#ffffff',
        width: 565,
        type: 'donut',
      },
      legend: {
        position: 'bottom',
      },
      responsive: [
        {
          breakpoint: 520,
          options: {
            chart: {
              width: '100%',
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
      plotOptions: {
        pie: {
          donut: {
            labels: {
              width: 565,
            },
          },
        },
      },
    },
  };

  return (
    <>
    <div className='pie'>
      <div className="donut-chart">
        <Chart
          options={chartData.options}
          series={chartData.pieSeries}
          type="donut"
          width={chartData.options.chart.width}
        />
      </div>

      <div className="bar-chart">
        <Chart
          options={chartData.options}
          series={[{ name: 'Bar', data: chartData.barSeries }]}
          type="bar"
          width={chartData.options.chart.width}
        />
      </div>
      </div>
      <div className='pie'>
      <div className="donut-chart">
        <Chart
          options={chartData.options}
          series={chartData.pieSeries}
          type="pie"
          width={chartData.options.chart.width}
        />
      </div>
      <div className="bar-chart">
        <Chart
          options={chartData.options}
          series={[{ name: 'Bar', data: chartData.barSeries }]}
          type="bar"
          width={chartData.options.chart.width}
        />
      </div>
      </div>
    </>
  );
}

export default PieChart;
