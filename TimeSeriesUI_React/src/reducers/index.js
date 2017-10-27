import { combineReducers } from 'redux'
import {
  SELECT_TIME, INVALIDATE_TIME,
  REQUEST_CPU_DATA, RECEIVE_CPU_DATA,
  REQUEST_MEMORY_DATA, RECEIVE_MEMORY_DATA,
  REQUEST_DISK_DATA, RECEIVE_DISK_DATA 
} from '../actions'

const selectedByTime = (state = 'ByHour', action) => {
  switch (action.type) {
    case SELECT_TIME:
      return action.ByTime
    default:
      return state
  }
}

const cpusData = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case INVALIDATE_TIME:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_CPU_DATA:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_CPU_DATA:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.cpus,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

const cpuBySelect = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_TIME:
    case RECEIVE_CPU_DATA:
    case REQUEST_CPU_DATA:
      return {
        ...state,
        [action.ByTime]: cpusData(state[action.ByTime], action)
      }
    default:
      return state
  }
}

const memoryData = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case INVALIDATE_TIME:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_MEMORY_DATA:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_MEMORY_DATA:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.memories,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

const memoryBySelect = (state = { }, action) => {   
  switch (action.type) {
    case INVALIDATE_TIME:
    case RECEIVE_MEMORY_DATA:
    case REQUEST_MEMORY_DATA:    
      return {
        ...state,
        [action.ByTime]: memoryData(state[action.ByTime], action)
      }
    default:
      return state
  }
}

const diskData = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case INVALIDATE_TIME:
      return {
        ...state,
        didInvalidate: true
      } 
    case REQUEST_DISK_DATA:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }    
    case RECEIVE_DISK_DATA:
     return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.disks,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

const diskBySelect = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_TIME:
    case REQUEST_DISK_DATA:
    case RECEIVE_DISK_DATA:   
      return {
        ...state,
        [action.ByTime]: diskData(state[action.ByTime], action)
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  cpuBySelect,
  memoryBySelect,
  diskBySelect,
  selectedByTime
})

export default rootReducer
