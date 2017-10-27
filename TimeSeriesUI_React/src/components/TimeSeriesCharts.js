import React from 'react';
import FusionCharts from 'fusioncharts';
// Load the charts module
import charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from './ReactFC'
import PropTypes from 'prop-types'
import '../index.css'

// Pass fusioncharts as a dependency of charts
charts(FusionCharts)

class TimeSeriesCharts extends  React.Component{      
    render () {
        const cpuDataSource = {data:this.props.cpuDataList}     
        const memoryDataSource= {data: this.props.memoryDataList}
        const diskDataSource = {data: this.props.diskDataList}
        // type == bar2D or line  or Column2D 
        return(
            <div>           
                <h2>CPU Utilization</h2>
                <ReactFC type = "Column2D" className = "fc-column2d" dataFormat = "JSON" renderAt="containerA" 
                    dataSource = {cpuDataSource} />                 
                <h2>Memory Utilization</h2>
                <ReactFC type = "Column2D" className = "fc-column2d" dataFormat = "JSON" renderAt="containerB"
                    dataSource = {memoryDataSource}/>                
                <h2>Disk Utilization</h2>
                <ReactFC type = "Column2D" className = "fc-column2d" dataFormat = "JSON" renderAt="containerC" 
                    dataSource = {diskDataSource}/> 
            </div>
        )
    }
};

TimeSeriesCharts.PropTypes= {
    cpuDataList :PropTypes.array.isRequired,
    memoryDataList : PropTypes.array.isRequired,
    diskDataList: PropTypes.array.isRequired    
}

export default TimeSeriesCharts