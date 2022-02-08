import axios from "axios";
import { useState } from "react";
import { API_URL } from "../../api";
import { Aside, Main, Header } from "../index";

const Layout = () => {
  const [state, setState] = useState({
    //本地数据库信息
    sub: {
      //标记状态: 未连接/已连接
      connected: false,
      /*数据库连接字段*/
      url: "192.168.1.183",
      username: "admin",
      password: "123456",
      /* 读取到的数据库列表 */
      databaseList: [],
      selectedDatabase: "leke_lake",
    },
    obj: {
      //标记状态: 未连接/已连接
      connected: false,
      /*数据库连接字段*/
      url: "114.215.148.214",
      username: "dev",
      password: "leke_2020dev",
      /* 读取到的数据库列表 */
      databaseList: [],
      //选中的数据库
      selectedDatabase: "leke_lake",
    },
    //页面中加载的表格
    tableList: {
      same: [],
      different: [],
      local: [],
      origin: [],
    },
    //页面中选中的表格
    tableName: "",
    //页面中加载的字段
    columnList: {
      same: [],
      different: [],
      local: [],
      origin: [],
    },
  });

  //在远程表中添加字段
  const originAddColumn = (e) => {
    //添加字段
    const { sub, obj } = state;
    const columnName = e.target.dataset.columnname;
    console.log("添加表格字段：", columnName);

    const data = {
      from: {
        url: sub.url,
        username: sub.username,
        password: sub.password,
        database: sub.selectedDatabase,
        tablename: state.tableName,
        columnname: columnName,
      },
      to: {
        url: obj.url,
        username: obj.username,
        password: obj.password,
        database: obj.selectedDatabase,
        tablename: state.tableName,
      },
    };

    axios
      .post(`${API_URL}/database/addColumn`, data)
      .then((res) => {
        console.log(res);
        checkTable({ target: { dataset: { name: state.tableName } } });
      })
      .catch((err) => console.log(err));
  };

  //加载表格列表
  const loadTableList = (tableList) => {
    console.log("Index加载tableList:", tableList);

    const same = tableList?.data?.filter((ele) => ele.tag === 0);
    const local = tableList?.data?.filter((ele) => ele.tag === -1);
    const origin = tableList?.data?.filter((ele) => ele.tag === -2);
    const different = tableList?.data?.filter(
      (ele) => ele.tag !== -0 && ele.tag !== -1 && ele.tag !== -2
    );

    setState({
      ...state,
      tableList: { same, different, local, origin },
    });
  };

  const checkTable = (e) => {
    const tableName = e.target.dataset.name;
    console.log("执行表格比对", e);

    //执行表格对比
    const sub = state.sub;
    const obj = state.obj;
    const data = {
      subTable: {
        url: sub.url,
        username: sub.username,
        password: sub.password,
        database: sub.selectedDatabase,
        tablename: tableName,
      },
      objTable: {
        url: obj.url,
        username: obj.username,
        password: obj.password,
        database: obj.selectedDatabase,
        tablename: tableName,
      },
    };

    axios
      .post(`${API_URL}/database/checktable`, data)
      .then((res) => {
        console.log(res);
        setState({ ...state, columnList: res.data.data, tableName: tableName });
      })
      .catch((err) => console.log(err));
  };

  console.log("state.columnList || Layout:", state.columnList);

  return (
    <>
      <Header sub={state.sub} obj={state.obj} handleLoadTable={loadTableList} />

      <section style={{ display: "flex", justifyContent: "space-around" }}>
        <Aside tableList={state.tableList} checkTable={checkTable} />
        <Main columnList={state.columnList} originAddColumn={originAddColumn} />
      </section>
    </>
  );
};

export default Layout;
