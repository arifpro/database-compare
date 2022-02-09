import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../api";
import DatabaseForm from "./form/DatabaseForm";
import DatabaseInfo from "./form/DatabaseInfo";
import SendIcon from "@mui/icons-material/Send";
import { Grid, Box, Button, Divider } from "@mui/material";
import DatabaseForm2 from "./form/DatabaseForm2";
import CompareArrowsRoundedIcon from "@mui/icons-material/CompareArrowsRounded";
import LoadingButton from "@mui/lab/LoadingButton";

const Header = (props) => {
  const [state, setState] = useState(props);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("state || Header", state);
  }, [state]);
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

  const handleConnect2 = (data) => {
    console.log("handleConnect2", data);
    const { databaseName, url, username, password } = data;

    axios
      .get(
        `${API_URL}/database/conn?url=${url}&username=${username}&password=${password}`
      )
      .then((res) => {
        console.log("执行连接", res);
        // console.log("props", props);
        // let _state = props;
        // _state[databaseName].connected = true;
        // _state[databaseName].databaseList = res.data;
        // console.log("_state", _state);
        // setState(_state);
      });
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

    props.resetTable();
    setLoading(true);

    axios
      .post(`${API_URL}/database/contrast`, data)
      .then((res) => {
        console.log("数据库比对", res);
        setLoading(false);
        props.handleLoadTable(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <div
      style={{
        boxShadow: "0px 0px 10px #ccc",
        margin: "3rem",
        padding: "1rem 0",
        borderRadius: "20px",
      }}
    >
      <Box component="form" noValidate sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <DatabaseForm2
              title="sub"
              information={props.sub}
              handleConnect={handleConnect2}
            />
          </Grid>
          <Grid
            item
            xs={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LoadingButton
              onClick={compare}
              endIcon={<CompareArrowsRoundedIcon />}
              loading={loading}
              loadingPosition="end"
              variant="contained"
            >
              执行比对
            </LoadingButton>
          </Grid>
          <Grid item xs={5}>
            <DatabaseForm2
              title="obj"
              information={props.obj}
              handleConnect={handleConnect2}
            />
          </Grid>
        </Grid>
      </Box>

      {/* <Divider /> */}
      {/* 
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box component="form" noValidate onSubmit={() => null} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
          </Grid>
        </Box>

        <Button variant="contained" endIcon={<SendIcon />} onClick={compare}>
          执行比对
        </Button>
      </div> */}
    </div>
  );
};

export default Header;
