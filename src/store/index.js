import { configureStore } from '@reduxjs/toolkit'
import TabReducer from './reducers/tab'

export default configureStore({
  reducer: {
    tab: TabReducer,
  },
})

//这段代码创建了一个 Redux store，里面有一个叫 tab 的状态空间，用于管理侧边栏的展开/收起状态。