import React from 'react'
import Chart from 'chart.js'

export default class  extends React.Component {
  componentDidMount() {
    this.setUpChart()
  }

  setUpChart() {
    let ctx = document.getElementById("myChart")

    let scatterChart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [{
            label: 'Scatter Dataset',
            data: [{
                x: -10,
                y: 0
            }, {
                x: 0,
                y: 10
            }, {
                x: 10,
                y: 5
            }]
        }]
      },
      options: {
          scales: {
              xAxes: [{
                  type: 'linear',
                  position: 'bottom'
              }]
          }
      }
  })

  }
  render() {
    return(
      <div>
        <h1>Life Ray Issues</h1>
        <canvas id="myChart" ></canvas>
        <form>
          <label>
            Open/Closed
            <input ref='type' />
          </label>
          <label>
            Start Date
            <input ref='start-date' />
          </label>
          <label>
            End Date
            <input ref='end-date' />
          </label>
        </form>
      </div>
    )
  }
}
