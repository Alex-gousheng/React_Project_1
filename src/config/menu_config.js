/* 
左侧Menu导航的数据配置
*/
// 根据menuList生成<Item>和<SubMenu>组件的数组
import {
  HomeOutlined,
  AppstoreOutlined,
  ToolOutlined,
  BarsOutlined,
  UserOutlined,
  SafetyOutlined,
  AreaChartOutlined,
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
const menuList = [
  {
    title: '首页', // 菜单标题名称
    key:'home',
    path: '/admin/home', // 对应的path
    icon: <HomeOutlined />, // 图标名称
    isPublic: true, // 不需要进行权限检查
  },
  {
    title: '商品',
    key:'prod_about',
    path: '/admin/prod_about',
    icon: <AppstoreOutlined />,
    children: [ // 子菜单列表
      {
        title: '分类管理',
        key:'category',
        path: '/admin/prod_about/category',
        icon: <BarsOutlined />
      },
      {
        title: '商品管理',
        key:'product',
        path: '/admin/prod_about/product',
        icon: <ToolOutlined />
      },
    ]
  },

  {
    title: '用户管理',
    key:'user',
    path: '/admin/user',
    icon: <UserOutlined />
  },
  {
    title: '角色管理',
    key:'role',
    path: '/admin/role',
    icon: <SafetyOutlined />,
  },

  {
    title: '图形图表',
    key:'charts',
    path: '/admin/charts',
    icon: <AreaChartOutlined />,
    children: [
      {
        title: '柱状图',
        key:'bar',
        path: '/admin/charts/bar',
        icon: <BarChartOutlined />
      },
      {
        title: '折线图',
        key:'line',
        path: '/admin/charts/line',
        icon: <LineChartOutlined />
      },
      {
        title: '饼状图',
        key:'pie',
        path: '/admin/charts/pie',
        icon: <PieChartOutlined />
      },
    ]
  },
]

export default menuList