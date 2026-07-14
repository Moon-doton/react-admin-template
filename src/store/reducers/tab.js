import { createSlice } from '@reduxjs/toolkit'

const tabSlice = createSlice({
  //创建一个名为 tab 的状态切片，包含初始状态和 reducer 函数
  name: 'tab',
  initialState: {
    isCollapsed: false,
    tabList:[
      {
        path:'/',
        name:'home',
        label:'首页'
      }
    ],
    currentMenu:{

    }
  },
  reducers: {
    collapseMenu(state) {
        state.isCollapsed = !state.isCollapsed
    },
    selectMenuList : (state,{payload:val}) => {
            if(val.name !== 'home'){
              state.currentMenu = val
              //如果已经存在，就不添加
              const result =  state.tabList.findIndex(item => item.name === val.name) 
              if(result === -1){
                state.tabList.push(val)
              }else if(val.name === 'home' && state.tabList.length === 1){
                state.currentMenu = {}
              }
            }
        },
        closeTag : (state,{payload:val}) => {
            let res = state.tabList.findIndex(item => item.name === val.name)
            state.tabList.splice(res,1)
        },
        setCurrentMenu : (state,{payload:val}) => {
          if(val.name === 'home'){
            state.currentMenu = {}
          }else{
            state.currentMenu = val
          }
        }
  }
})

export const { collapseMenu,selectMenuList,closeTag,setCurrentMenu } = tabSlice.actions
export default tabSlice.reducer
