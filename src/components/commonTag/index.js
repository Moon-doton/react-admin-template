import React from 'react'
import './index.css'
import { Tag,Space } from 'antd'
import { useSelector,useDispatch } from 'react-redux' //从store中获取collapsed状态
import { useLocation,useNavigate } from 'react-router-dom'
import { closeTag,setCurrentMenu } from '../../store/reducers/tab'


const CommonTag = () => {
    const tabsList = useSelector(state =>state.tab.tabList)
    const dispatch = useDispatch()
    const action = useLocation()
    const navigate = useNavigate()
    const currentMenu = useSelector(state =>state.tab.currentMenu)
    console.log(tabsList)
    //关闭tag
    const handleClose = (tag,index) => {
        console.log(tabsList)
        let length = tabsList.length-1
        dispatch(closeTag(tag))
        //如果关闭的不是当前的tag,就不跳转
        if(tag.path!== action.pathname){
            return
        }
        if(index === length){
            //如果关闭的是最后一个tag,就跳转到前一个tag
            const currentData = tabsList[index-1]
            dispatch(setCurrentMenu(currentData))
            navigate(currentData.path)
        }else{
            //如果至少存在一个tag,就跳转到下一个tag 
            if(tabsList.length > 1){
                //下一个tag
                const nextData = tabsList[index+1]
                dispatch(setCurrentMenu(nextData))
                navigate(nextData.path)
            }
        }

    }
    //点击tag
    const handlechange = (tag)=>{
        dispatch(setCurrentMenu(tag))
        navigate(tag.path)
    }
    //tag的显示
    const setTag = (flag,item,index) => {
        return (
            flag ?
            <Tag color="#55acee" closeIcon onClose={()=>{handleClose(item,index)}} key={item.name}>{item.label}</Tag>
            :
            <Tag onClick={()=>handlechange(item)} key={item.name} >{item.label}</Tag>
        )
    }
    return(
        <Space className="common-tag" size={[0, 8]} wrap>
            {/* <Tag>首页</Tag>
            <Tag color="#55acee" closeIcon onClose={()=>{}}>
                用户列表
            </Tag> */}
        { 
            currentMenu.name && tabsList.map((item,index)=>setTag(item.path === currentMenu.path,item,index))
        }
        </Space>
    )
}

export default CommonTag