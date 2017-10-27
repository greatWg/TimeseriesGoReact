export const REQUEST_CPU_DATA = 'REQUEST_CPU_DATA'
export const RECEIVE_CPU_DATA = 'RECEIVE_CPU_DATA'
export const SELECT_TIME = 'SELECT_TIME'
export const INVALIDATE_TIME = 'INVALIDATE_TIME'
export const REQUEST_MEMORY_DATA = 'REQUEST_MEMORY_DATA'
export const RECEIVE_MEMORY_DATA = 'RECEIVE_MEMORY_DATA'
export const REQUEST_DISK_DATA = 'REQUEST_DISK_DATA'
export const RECEIVE_DISK_DATA = 'RECEIVE_DISK_DATA'

export const selectByTime = ByTime => ({
  type: SELECT_TIME,
  ByTime
})

export const invalidateByTime = ByTime => ({
  type: INVALIDATE_TIME,
  ByTime
})

export const requestCpuData = ByTime => ({
  type: REQUEST_CPU_DATA,
  ByTime
})

export const receiveCpuData = (ByTime, {cpus}) => ({
  type: RECEIVE_CPU_DATA,
  ByTime,
  cpus: cpus,
  receivedAt: Date.now()
})


export const requestMemoryData = ByTime => ({
  type: REQUEST_MEMORY_DATA,
  ByTime
})

export const receiveMemoryData = (ByTime, {memories}) => ({
  type: RECEIVE_MEMORY_DATA,
  ByTime,
  memories: memories,
  receivedAt: Date.now()
})

export const requestDiskData = ByTime => ({
  type: REQUEST_DISK_DATA,
  ByTime
})

export const receiveDiskData  = (ByTime, {disks}) => ({
  type: RECEIVE_DISK_DATA,
  ByTime,
  disks: disks,
  receivedAt: Date.now()
})

const fetchData = (ByTime, type) => dispatch => {
  console.log("******FetchData*", ByTime, type , "********")
  if (type === "memories"){
    dispatch(requestMemoryData(ByTime))
    return fetch(`http://localhost:12345/${type}${ByTime}`)
      .then(response => response.json())
      .then(memories => dispatch(receiveMemoryData(ByTime, {memories})))
   } else if (type === "disks") {
     dispatch(requestDiskData(ByTime))
     return fetch(`http://localhost:12345/${type}${ByTime}`)
      .then(response => response.json())
      .then(disks => dispatch(receiveDiskData(ByTime, {disks})))
   }
   else{
      dispatch(requestCpuData(ByTime))
     return fetch(`http://localhost:12345/${type}${ByTime}`)
      .then(response => response.json())
      .then(cpus => dispatch(receiveCpuData(ByTime, {cpus})))
   }
}

const shouldFetchData = (state, ByTime, type) => {
  let data;
  console.log("Time .. ..... type",  type, ByTime)
  if (type ==="disks")
    data = state.diskBySelect[ByTime]
  else if (type === "memories" ) 
    data = state.memoryBySelect[ByTime]
  else 
    data = state.cpuBySelect[ByTime]
  if (!data) {
    return true
  }
  if (data.isFetching) {
    return false
  }
  return data.didInvalidate
}

export const fetchDataIfNeeded = (ByTime, type) => (dispatch, getState) => {
  if (shouldFetchData(getState(), ByTime, type)) {
    return dispatch(fetchData(ByTime, type))
  }                
}