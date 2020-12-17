import React, {Component} from 'react'
import {Button, Card, Form, Input, message, Select} from "antd";
import {ArrowLeftOutlined} from '@ant-design/icons'
import {connect} from "react-redux";
import {reqCategoryList, reqAddProduct, reqProdById, reqUpdateProduct} from "../../api";
import PicturesWall from './picture_wall'
import RichTextEditor from "./rich_text_editor";

@connect(
    state=>({
        categoryList:state.categoryList,
        productList:state.productList
    }),
    {}
)
class AddUpdate extends Component{

    state = {
        categoryList: [],
        operaType:'add',
        categoryId:'',
        name:'',
        desc:'',
        price:'',
        detail:'',
        imgs:[],
        _id:''
    }

    componentDidMount() {
        const {categoryList,productList} = this.props
        const {id} = this.props.match.params
        if (categoryList.length) this.setState({categoryList})
        else this.getCategoryList()
        if (id) {
            this.setState({operaType:'update'})
            if (productList.length){
                let result = productList.find((item)=>{
                    return item._id === id
                })
                if (result){
                    this.setState({...result})
                    this.refs.pictureWall.setFileList(result.imgs)
                    this.refs.richTextEditor.setRichText(result.detail)
                }
            }else this.getProductList(id)
        }
    }
    getProductList = async (id)=>{
        let result = await reqProdById(id)
        const {status, data} = result
        if (status === 0){
            this.setState({...data})
            this.refs.pictureWall.setFileList(data.imgs)
            this.refs.richTextEditor.setRichText(data.detail)
        }
    }
    getCategoryList =async ()=>{
        let result = await reqCategoryList()
        const {status, data, msg} = result
        if (status === 0) this.setState({categoryList:data})
        else message.error(msg, 1)
    }
    onFinish = async (values,err)=>{
        const {operaType, _id} = this.state
        let imgs = this.refs.pictureWall.getImgArr()
        let detail = this.refs.richTextEditor.getRichText()
        if (err) return
        let result
        if (operaType==='add')result =await reqAddProduct({...values,imgs,detail})
        else result =await reqUpdateProduct({...values,imgs,detail,_id})
        const {status, msg} = result
        if (status === 0){
            message.success('操作成功')
            this.props.history.replace('/admin/prod_about/product')
        }
        else message.error(msg,1)
    }


    render(){
        const {operaType} = this.state
        setTimeout(()=>{
            this.refs.form.setFieldsValue({
                name:this.state.name || '',
                desc:this.state.desc || '',
                price:this.state.price || '',
                categoryId:this.state.categoryId || '',
            })
        },100)
        const title = (
            <div>
                <Button type='link' onClick={this.props.history.goBack}>
                    <ArrowLeftOutlined />
                    <span>返回</span>
                </Button>
                <span>{operaType==='update'?'商品修改':'商品添加'}</span>
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
                <Form {...formItemLayout} onFinish={this.onFinish} ref='form'>
                    <Form.Item label="商品名称" name="name" rules={[{
                        required:true, message:"请输入商品名称!"},
                    ]}>
                        <Input placeholder="商品名称"/>
                    </Form.Item>

                    <Form.Item label="商品描述" name="desc" set rules={[
                        { required:true, message:"请输入商品名称!"},
                    ]}>
                        <Input placeholder="商品描述"/>
                    </Form.Item>

                    <Form.Item label="商品价格" name="price" rules={[
                        { required:true, message:"请输入商品价格!"},
                    ]}>
                        <Input placeholder="商品价格" addonAfter="元" prefix="¥"/>
                    </Form.Item>

                    <Form.Item label="商品分类" name="categoryId" rules={[
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

                    <Form.Item label="商品图片" wrapperCol={{md:12}}>
                        <PicturesWall ref="pictureWall"/>
                    </Form.Item>

                    <Form.Item label="商品详情"  wrapperCol={{md:20}}>
                        <RichTextEditor ref='richTextEditor'/>
                    </Form.Item>

                    <Button type="primary" htmlType='submit'>提交</Button>
                </Form>
            </Card>
        )
    }
}
export default AddUpdate