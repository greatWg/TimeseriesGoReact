import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { selectByTime,
   fetchDataIfNeeded,
   invalidateByTime } from '../actions'
import Picker from '../components/Picker'
import TimeSeriesCharts from '../components/TimeSeriesCharts'
import "../index.css"

class App extends Component {
  static propTypes = {
    selectedByTime: PropTypes.string.isRequired,
    cpus: PropTypes.array.isRequired,
    memories: PropTypes.array.isRequired,
    disks: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  }
  
  componentDidMount() {
    const { dispatch, selectedByTime } = this.props
    dispatch(fetchDataIfNeeded(selectedByTime, "cpus"))
    dispatch(fetchDataIfNeeded(selectedByTime, "memories" ))
    dispatch(fetchDataIfNeeded(selectedByTime, "disks"))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedByTime !== this.props.selectedByTime) {
      const { dispatch, selectedByTime } = nextProps
      dispatch(fetchDataIfNeeded(selectedByTime, "cpus"))
      dispatch(fetchDataIfNeeded(selectedByTime, "memories"))
      dispatch(fetchDataIfNeeded(selectedByTime, "disks"))
    }
  }

  handleChange = nextReddit => {
    this.props.dispatch(selectByTime(nextReddit))
  }

  handleRefreshClick = e => {
    e.preventDefault()
   
    const { dispatch, selectedByTime } = this.props
    console.log( "dis", dispatch, "sele", selectedByTime);
    dispatch(invalidateByTime(selectedByTime))
    dispatch(fetchDataIfNeeded(selectedByTime, "cpus"))
    dispatch(fetchDataIfNeeded(selectedByTime, "memories"))
    dispatch(fetchDataIfNeeded(selectedByTime, "disks"))
  }

  render() {    
    const { selectedByTime, cpus, memories, disks, isFetching, lastUpdated } = this.props
    const isEmpty = cpus.length === 0
    return (
      <div id ="apps">
        <h1> Timeseries Data </h1>
        <Picker value={selectedByTime}
                onChange={this.handleChange}
                options={[ 'ByHour', 'ByDay' ]} />
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <button onClick={this.handleRefreshClick}>
              Refresh
            </button>
          }
        </p>
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div style={{ opacity: isFetching ? 0.5 : 1}}  id= "charts" >
              <TimeSeriesCharts cpuDataList = {cpus} memoryDataList = {memories} diskDataList = {disks}/>
            </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { selectedByTime, cpuBySelect, memoryBySelect, diskBySelect } = state
  const { isFetching, lastUpdated, items: cpus } = cpuBySelect[selectedByTime] 
     || { isFetching: true, items: [] }

  const { items : memories } = memoryBySelect[selectedByTime] || {isFetching: true, items: [] }
  const { items : disks } = diskBySelect[selectedByTime] || {isFetching: true, items:[] }
  
  return {
    selectedByTime,
    cpus,
    memories,
    disks,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(App)

