import { useState } from "react";
import axios from "axios";
import { API_URL } from "../api";
import DatabaseForm from "./form/DatabaseForm";
import DatabaseInfo from "./form/DatabaseInfo";

const Header = (props) => {
  const [state, setState] = useState();
  /*
    事件监听
    数据库表单输入
  */
  const handleFormEdit = (event) => {
    const { form, name, value } = event.target;
    const databaseName = form.id;

    let _state = props;
    _state[databaseName][name] = value;
    setState(_state);
  };

  /*
    事件监听 
    执行数据库连接
  */
  const databaseConnect = (e) => {
    //form的id对应state中对应的【数据库链接对象】的键
    const databaseName = e.target.form.id;
    const url = props[databaseName].url;
    const username = props[databaseName].username;
    const password = props[databaseName].password;
  
    axios
      .get(
        `${API_URL}/database/conn?url=${url}&username=${username}&password=${password}`
      )
      .then((res) => {
        console.log("执行连接", res);
        let _state = props;
        _state[databaseName].connected = true;
        _state[databaseName].databaseList = res.data;
        setState(_state);
      });
  };

  /*
    事件监听
    数据库切换
  */
  const databaseSwitch = (e) => {
    console.log("数据库切换：", e);
    let _state = props;
    const databaseName = e.target.form.id;
    _state[databaseName].selectedDatabase = e.target.value;
    setState(_state);
  };

  //断开数据库连接
  const databaseBreak = (e) => {
    //form的id对应state中对应的【数据库链接对象】的键
    let _state = props;
    const databaseName = e.target.form.id;
    _state[databaseName].connected = false;
    setState(_state);
  };

  //执行比对
  const compare = () => {
    console.log("执行比对:", props);
    const { sub, obj } = props;

    const data = {
      subDatabse: {
        url: sub.url,
        username: sub.username,
        password: sub.password,
        database: sub.selectedDatabase,
      },
      objDatabase: {
        url: obj.url,
        username: obj.username,
        password: obj.password,
        database: obj.selectedDatabase,
      },
    };

    axios
      .post(`${API_URL}/database/contrast`, data)
      .then((res) => {
        console.log("数据库比对", res);
        props.handleLoadTable(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <header>
      {props.sub.connected ? (
        <DatabaseInfo
          id="sub"
          information={props.sub}
          databaseSwitch={databaseSwitch}
          databaseBreak={databaseBreak}
        />
      ) : (
        <DatabaseForm
          id="sub"
          information={props.sub}
          handleConnect={databaseConnect}
          handleFormEdit={handleFormEdit}
        />
      )}

      <button onClick={compare}>执行比对</button>

      {props.obj.connected ? (
        <DatabaseInfo
          id="obj"
          information={props.obj}
          databaseSwitch={databaseSwitch}
          databaseBreak={databaseBreak}
        />
      ) : (
        <DatabaseForm
          id="obj"
          information={props.obj}
          handleConnect={databaseConnect}
          handleFormEdit={handleFormEdit}
        />
      )}
    </header>
  );
};

export default Header;
