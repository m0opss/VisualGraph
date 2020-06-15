import { Layout, Menu } from "antd";
import { PieChartOutlined, FileOutlined } from "@ant-design/icons";
import "./menu.css";
import React from "react";
import "antd/dist/antd.css";

import Graph from "./Graph";
import axios from "axios";

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

const nodee = [
  { key: "205206", text: "205206", nec: false },
  { key: "1299", text: "1299", nec: false },
  { key: "3491", text: "3491", nec: false },
  { key: "12491", text: "12491", nec: false },
  { key: "328261", text: "328261", nec: true },
  { key: "328185", text: "328185", nec: false },
  { key: "42541", text: "42541", nec: false },
  { key: "3356", text: "3356", nec: false },
  { key: "209650", text: "209650", nec: false },
  { key: "209844", text: "209844", nec: false },
  { key: "56381", text: "56381", nec: false },
  { key: "3257", text: "3257", nec: false },
  { key: "6453", text: "6453", nec: false },
  { key: "3280", text: "3280", nec: false },
  { key: "39737", text: "39737", nec: false },
  { key: "47692", text: "47692", nec: false },
  { key: "30132", text: "30132", nec: false },
  { key: "24875", text: "24875", nec: false },
  { key: "15435", text: "15435", nec: false },
  { key: "12859", text: "12859", nec: false },
  { key: "2914", text: "2914", nec: false },
  { key: "51088", text: "51088", nec: false },
  { key: "1103", text: "1103", nec: false },
  { key: "6908", text: "6908", nec: false },
  { key: "14907", text: "14907", nec: false },
  { key: "8218", text: "8218", nec: false },
  { key: "6461", text: "6461", nec: false },
  { key: "29467", text: "29467", nec: false },
  { key: "50673", text: "50673", nec: false },
  { key: "174", text: "174", nec: false },
  { key: "59605", text: "59605", nec: false },
  { key: "50763", text: "50763", nec: false },
  { key: "8943", text: "8943", nec: false },
  { key: "8283", text: "8283", nec: false },
  { key: "8455", text: "8455", nec: false },
  { key: "199938", text: "199938", nec: false },
  { key: "201709", text: "201709", nec: false },
  { key: "8881", text: "8881", nec: false },
  { key: "64271", text: "64271", nec: false },
  { key: "3214", text: "3214", nec: false },
  { key: "47147", text: "47147", nec: false },
  { key: "60501", text: "60501", nec: false },
  { key: "57264", text: "57264", nec: false },
];
const linke = [
  { from: "205206", to: "1299" },
  { from: "1299", to: "3491" },
  { from: "3491", to: "12491" },
  { from: "12491", to: "328261" },
  { from: "328261", to: "328185" },
  { from: "42541", to: "3356" },
  { from: "3356", to: "3491" },
  { from: "209650", to: "209844" },
  { from: "209844", to: "56381" },
  { from: "56381", to: "3257" },
  { from: "3257", to: "6453" },
  { from: "6453", to: "12491" },
  { from: "3280", to: "39737" },
  { from: "39737", to: "1299" },
  { from: "47692", to: "6453" },
  { from: "30132", to: "6453" },
  { from: "24875", to: "3257" },
  { from: "3257", to: "3491" },
  { from: "15435", to: "3257" },
  { from: "12859", to: "2914" },
  { from: "2914", to: "3491" },
  { from: "51088", to: "6453" },
  { from: "1103", to: "3257" },
  { from: "6908", to: "2914" },
  { from: "14907", to: "3491" },
  { from: "8218", to: "6461" },
  { from: "6461", to: "6453" },
  { from: "29467", to: "2914" },
  { from: "2914", to: "6453" },
  { from: "50673", to: "174" },
  { from: "174", to: "6453" },
  { from: "59605", to: "6453" },
  { from: "50763", to: "8943" },
  { from: "8943", to: "2914" },
  { from: "8283", to: "6453" },
  { from: "8455", to: "3356" },
  { from: "3356", to: "6453" },
  { from: "199938", to: "201709" },
  { from: "201709", to: "8881" },
  { from: "8881", to: "3491" },
  { from: "64271", to: "3214" },
  { from: "3214", to: "2914" },
  { from: "47147", to: "1299" },
  { from: "60501", to: "57264" },
  { from: "57264", to: "174" },
  { from: "174", to: "3491" },
];

// class MyTemplate extends React.Component {
export default () => {
  const [collapsed, setCollapsed] = React.useState(true);
  const [folders, setFolders] = React.useState([]);
  const [node, setNode] = React.useState([]);
  const [link, setLink] = React.useState([]);

  React.useEffect(() => {
    axios
      .post(`http://127.0.0.1:8000/get_dir_info/`, { "scan_status": "start" })
      .then((res) => {
        console.log(res.data);
        setFolders(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const onCollapse = (collapsed) => setCollapsed(collapsed);

  const handleUpdateBD = () => {
    axios
      .post(`http://127.0.0.1:8000/get_dir_info/`, { "scan_status": "start" })
      .then((res) => {
        console.log(res);
        setFolders(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleLoadGraph = (elem) => {
    axios
      .post(`http://127.0.0.1:8000/get_current_files/`, { dir_name: elem })
      .then((res) => {
        console.log(res.data);
        setLink(res.data.link)
        setNode(res.data.node)
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item
            key="0"
            icon={<PieChartOutlined />}
            onClick={() => handleUpdateBD()}
          >
            Обновить БД
          </Menu.Item>
          <SubMenu key="sub1" icon={<FileOutlined />} title="Графы">
            {folders ? folders.map((elem) => {
              return (
                <Menu.Item key={elem} onClick={() => handleLoadGraph(elem)}>
                  {elem}
                </Menu.Item>
              );
            }) : <Menu.Item>Нет директорий</Menu.Item>
          }
          </SubMenu>
        </Menu>
      </Sider>

      <Layout className="site-layout">
        <Content style={{ margin: "0 16px" }}>
          <Graph nodeDataArray={node} linkDataArray={link} />
        </Content>
      </Layout>
    </Layout>
  );
};
