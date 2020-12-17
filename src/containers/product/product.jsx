import React, {Component} from 'react'
import {Button, Card, Table, Select, Input, message} from "antd";
import {PlusCircleOutlined, SearchOutlined} from "@ant-design/icons";
import {reqProductList, reqSearchProduct, reqUpdateProdStatus} from "../../api";
import {PAGE_SIZE} from "../../config";
import {connect} from "react-redux";
import {createSaveProductAction} from "../../redux/action_creators/product_action";
const { Option } = Select;

@connect(
    state=>({}),
    {saveProduct:createSaveProductAction}
)
class Product extends Component{
    state={
        productList:[],
        total:'',
        current:1,
        keyWord:'',
        searchType:'productName'
    }
    componentDidMount() {
        this.getProductList()
    }

    getProductList = async (number=1)=>{
        let result
        if (this.isSearch){
            const {searchType, keyWord} = this.state
            result = await reqSearchProduct(number,PAGE_SIZE,searchType,keyWord)
        }else{
            result = await reqProductList(number,PAGE_SIZE)
        }

        const {status,data} = result
        if(status === 0){
            this.setState({
                productList:data.list,
                total:data.total,
                current:data.pageNum
            })
            this.props.saveProduct(data.list)
        }
        else message.error('获取商品列表失败')
    }

    updateProdStatus = async ({_id,status})=>{
        const productList = [...this.state.productList]
        if (status===1) status = 2
        else status = 1
        let result = await reqUpdateProdStatus(_id,status)
        if (result.status === 0) {
            message.success('更新成功')
            productList.map((item)=>{
                if (item._id === _id){
                    item.status = status
                }
                return item
            })
            this.setState({productList})
        }
        else message.error('更新失败')
    }

    search = async ()=>{
        this.isSearch = true
        this.getProductList()
    }

    render(){
        const dataSource = this.state.productList

        const columns = [
            {
                title: '商品名称',
                width:"15%",
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
                key: 'desc',
            },
            {
                title: '价格',
                width:"9%",
                dataIndex: 'price',
                key: 'price',
                render:price=> '¥'+price
            },
            {
                title: '状态',
                // dataIndex: 'status',
                align:'center',
                width: "10%",
                key: 'status',
                render:item=>{
                    return(
                        <div>
                            <Button
                                type={item.status === 1?'danger':'primary'}
                                onClick={()=>{this.updateProdStatus(item)}}
                            >{item.status === 1? '下架':'上架'}</Button><br/>
                            <span>{item.status === 1? '在售':'已停售'}</span>
                        </div>
                    )
                }
            },
            {
                title: '操作',
                width:"10%",
                align:'center',
                // dataIndex: 'opera',
                key: 'opera',
                render:(item)=>{
                    return (
                        <div>
                            <Button type="link" onClick={()=>{this.props.history.push(`/admin/prod_about/product/detail/${item._id}`)}}>详情</Button><br/>
                            <Button type="link" onClick={()=>{this.props.history.push(`/admin/prod_about/product/add_update/${item._id}`)}}>修改</Button>
                        </div>
                    )
                }
            },
        ];
        return (
            <Card
                title={
                    <div>
                        <Select defaultValue='productName' onChange={(value)=>{this.setState({searchType:value})}}>
                            <Option value="productName">按名称搜索</Option>
                            <Option value="productDesc">按描述搜索</Option>
                        </Select>
                        <Input style={{margin:'0 10px',width:"20%"}} placeholder="输入关键字" allowClear onChange={(e)=>{this.setState({keyWord:e.target.value})}}/>
                        <Button type="primary" onClick={this.search}><SearchOutlined />搜索</Button>
                    </div>
                }
                extra={<Button type="primary" onClick={()=>{this.props.history.push('/admin/prod_about/product/add_update')}}><PlusCircleOutlined />添加</Button>}>
                <Table dataSource={dataSource} columns={columns} bordered rowKey="_id" pagination={{
                    total:this.state.total,
                    pageSize:PAGE_SIZE,
                    current:this.state.current,
                    onChange:this.getProductList
                }}/>
            </Card>
        )
    }
}
export default Product