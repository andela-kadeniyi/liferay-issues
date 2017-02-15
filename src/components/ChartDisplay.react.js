import React from 'react'
import Chart from 'chart.js'

const options = {
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero:true
      }
    }]
  }
}

export default class ChartDisplay extends React.Component {
  setUpChart(labels, actualData) {
    if (labels.length <= 0)
      return null

    let scatterChart = new Chart(
      document.getElementById('myChart'),
      {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: "Data Sheet",
            backgroundColor: "#a12312",
            data: actualData
          }]
        },
        options: options
      }
    )
  }

  render() {
    this.setUpChart(this.props.labels, this.props.data)
    return(
      <canvas id="myChart" ></canvas>
    )
  }
}
