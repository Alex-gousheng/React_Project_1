import React, {Component} from 'react'
import {Button, Card, Form, Input, message, Select} from "antd";
import {ArrowLeftOutlined} from '@ant-design/icons'
import {connect} from "react-redux";
import {reqCategoryList} from "../../api";
import PicturesWall from './picture_wall'

@connect(
    state=>({categoryList:state.categoryList}),
    {}
)
class AddUpdate extends Component{

    state = {
        categoryList: [],
    }

    componentDidMount() {
        const {categoryList} = this.props
        if (categoryList.length) this.setState({categoryList})
        else this.getCategoryList()
    }

    getCategoryList =async ()=>{
        let result = await reqCategoryList()
        const {status, data, msg} = result
        if (status === 0) this.setState({categoryList:data})
        else message.error(msg, 1)
    }
    onFinish = async (values,err)=>{

        let imgs = this.refs.pictureWall.getImgArr()
        if (err) return
        console.log({...values, imgs})
    }


    render(){
        const title = (
            <div>
                <Button type='link' onClick={this.props.history.goBack}>
                    <ArrowLeftOutlined />
                    <span>返回</span>
                </Button>
                <span>商品添加</span>
            </div>
        )
        const formItemLayout = {
            labelCol:{
                md:{span:2}
            },
            wrapperCol:{
                md:{span:9}
            },
        };
        return (
            <Card title={title}>
                <Form {...formItemLayout} onFinish={this.onFinish}>
                    <Form.Item label="商品名称" name="name" rules={[
                        { required:true, message:"请输入商品名称!"},
                    ]}>
                        <Input placeholder="商品名称"/>
                    </Form.Item>

                    <Form.Item label="商品描述" name="desc" initialValue='' rules={[
                        { required:true, message:"请输入商品名称!"},
                    ]}>
                        <Input placeholder="商品描述"/>
                    </Form.Item>

                    <Form.Item label="商品价格" name="price" initialValue='' rules={[
                        { required:true, message:"请输入商品价格!"},
                    ]}>
                        <Input placeholder="商品价格" addonAfter="元" prefix="¥"/>
                    </Form.Item>

                    <Form.Item label="商品分类" name="categoryId" initialValue='' rules={[
                        { required:true, message:"请选择一个分类!"},
                    ]}>
                        <Select>
                            <Select.Option value="">请选择分类</Select.Option>
                            {
                                this.state.categoryList.map((item)=>{
                                    return <Select.Option key={item._id} value={item._id}>{item.name}</Select.Option>
                                })
                            }
                        </Select>
                    </Form.Item>

                    <Form.Item label="商品图片" wrapperCol={{md:24}}>
                        <PicturesWall ref="pictureWall"/>
                    </Form.Item>

                    <Form.Item label="商品详情">
                        此处为富文本编辑器
                    </Form.Item>

                    <Button type="primary" htmlType='submit'>提交</Button>
                </Form>
            </Card>
        )
    }
}
export default AddUpdate