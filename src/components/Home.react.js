import React from 'react'
import ChartDisplay from './ChartDisplay.react'
import { months } from '../../lib/months'
import { DateRangePicker } from 'react-dates'

import 'react-dates/lib/css/_datepicker.css'

export default class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      issues: [],
      focusedInput: null,
      startDate: null,
      endDate: null
    }
    this.prepareData = this.prepareData.bind(this)
    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  }
  componentWillMount() {
    fetch('https://api.github.com/repos/liferay/liferay-portal/issues').then(issues => {
      return issues.json()
    }).then(res => this.setState({issues: res}))
  }
  onDatesChange({ startDate, endDate }) {
    this.setState({ startDate, endDate });
  }
  onFocusChange(focusedInput) {
    this.setState({ focusedInput });
  }
  prepareData() {
    let actualData = {}

    this.state.issues.map(issue => {
      let date = new Date(issue.created_at)
      let monthYear = `${date.getFullYear()} ${date.getMonth()}`

      if (actualData[monthYear]) {
        if (!!issue.closed_at)
          actualData[monthYear]['closed'] += 1
        else
          actualData[monthYear]['open'] += 1
      }
      else {
        actualData[monthYear] = {
          'closed': !!issue.closed_at ? 1 : 0,
          'open': !issue.closed_at ? 1 : 0,
          'month': date.getMonth(),
          'year': date.getFullYear()
        }
      }
    })

    let data = []
    let labels = []

    Object.keys(actualData).map(monthYear => {
      if (this.state.startDate && this.state.endDate) {
        let startDate = this.state.startDate._d
        let endDate = this.state.endDate._d

        if (startDate.getFullYear() <= actualData[monthYear]['year'] && endDate.getFullYear() >= actualData[monthYear]['year']) {
          labels.unshift(`${months[actualData[monthYear]['month']]} ${actualData[monthYear]['year']}`)
          data.unshift(actualData[monthYear]['open'])
        }
      } else {
        labels.unshift(`${months[actualData[monthYear]['month']]} ${actualData[monthYear]['year']}`)
        data.unshift(actualData[monthYear]['open'])
      }
    })
    return({labels, data})
  }

  render() {
    let preparedDatapoints = this.prepareData()
    const { focusedInput, startDate, endDate } = this.state

    return(
      <div>
        <h1>Life Ray Issues</h1>
        <form>
          <DateRangePicker
            isOutsideRange={() => false}
            onDatesChange={this.onDatesChange}
            onFocusChange={this.onFocusChange}
            focusedInput={focusedInput}
            startDate={startDate}
            endDate={endDate}
          />
        </form>
        <ChartDisplay {...preparedDatapoints} />
      </div>
    )
  }
}
