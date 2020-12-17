//引入库
import React, {Component } from 'react'
import { Card , Button , Table , message , Modal, Form, Input} from 'antd';
import {PlusCircleOutlined} from '@ant-design/icons'
import {connect} from "react-redux";
import {reqCategoryList, reqAddCategory,reqUpdateCategory} from '../../api/index'
import {PAGE_SIZE} from "../../config";
import {createSaveCategoryAction} from "../../redux/action_creators/category_action";

@connect(
    state=>({}),
    {saveCategory:createSaveCategoryAction}
)
class Category extends Component {
// 为Form建立引用
    form = React.createRef();
// 在state内存储modal的visible值
    state={
        categoryList:[],
        visible:false,
        operType:'',
        isLoading:true,
        modalCurrentValue:'',
        modalCurrentId:'',
    }
    componentDidMount() {
        this.getCategoryList()
    }
    toAdd = async (values)=>{
        let result = await reqAddCategory(values)
        const {status,data,msg} = result
        if (status === 0) {
            message.success('添加成功')
            let categoryList = [...this.state.categoryList]
            categoryList.unshift(data)
            this.setState({categoryList})
        }
        if (status === 1) {
            message.error(msg,1)
            this.setState({
                visible: true,
            });
        }
    }

// 点击submit，form校验成功后获取到form表单的值
    onFinish = (e) => {
        e.preventDefault()
        const {operType} = this.state
        this.form.current.validateFields()
            .then(value =>{
                if (operType === 'add'&& value.categoryName !== '') this.toAdd(value)
                if (operType==='update') {
                    const categoryId = this.state.modalCurrentId
                    const categoryName = value.categoryName
                    const categoryObj = {categoryId, categoryName}
                    reqUpdateCategory(categoryObj)
                        .then(() =>{
                            this.getCategoryList().then(() =>{
                                message.success('更新成功',1)
                            })
                        })
                        .catch(msg=>{
                            message.error(msg,1)
                        })
                }
                this.setState({
                    visible: false,
                });
            })

    };
    getCategoryList = async ()=>{
        let result = await reqCategoryList()
        this.setState({isLoading:false})
        let {status,data,msg} = result
        if (status === 0){
            this.setState({categoryList:data.reverse()})
            this.props.saveCategory(data)

        }else message.error(msg,1)
    }
    showAdd = ()=>{
        this.setState({
            visible:true,
            operType:'add',
            modalCurrentValue:'',
            modalCurrentId:''
        })
    }
    showUpdate = (item)=>{
        const {_id, name} = item
        this.setState({
            modalCurrentValue:name,
            modalCurrentId:_id,
            visible:true,
            operType:'update',
        })
    }
    onCancel = ()=>{
        this.setState({
            visible:false,
        })
    }
    render() {
        const dataSource = this.state.categoryList
        let {operType, visible, isLoading} = this.state
        const columns = [
            {
                title: '分类名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '操作',
                // dataIndex: 'age',
                key: 'age',
                render:(item)=>{return <Button type="link" onClick={()=>{this.showUpdate(item)}}>修改分类</Button>},
                width:'25%',
                align:'center'
            },

        ];
        return (
            <>
                <Card extra={<Button type="primary" onClick={this.showAdd}><PlusCircleOutlined />添加</Button>}>
                    <Table
                        loading={isLoading}
                        dataSource={dataSource}
                        columns={columns}
                        bordered rowKey="_id"
                        pagination={{pageSize:PAGE_SIZE,showQuickJumper:true}}
                    />
                </Card>
                {
                    this.state.visible?<Modal
                        title={operType === 'add' ? '新增分类' : '修改分类'}
                        visible={visible}
                        //删去了form表单自带的submit，在modal的footer自行渲染了一个button，点击后回调`onFinish`函数
                        onCancel={()=>{
                            this.setState({visible: false})
                        }}
                        footer={[
                            <Button key={'Cancel'} onClick={this.onCancel}>取消</Button>,
                            <Button type="primary" onClick={this.onFinish} key={'submit'}>
                                确定
                            </Button>
                        ]}
                    >
                        <Form
                            name="basic"
                            initialValues={{remember: true}}
                            ref={this.form}
                        >
                            <Form.Item name="categoryName"
                                       initialValue={this.state.modalCurrentValue}
                                       rules={[{ required:true, whitespace: true, message:"必须输入分类名!"}]}
                            >
                                <Input
                                    placeholder="请输入分类名"
                                />
                            </Form.Item>
                        </Form>
                    </Modal> : ''
                }
            </>
        );
    }
}

export default Category;