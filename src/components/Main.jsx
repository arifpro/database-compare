import { useState } from "react";
import CheckBox from "./common/CheckBox";

const Main = (props) => {
  const [state, setState] = useState({
    same: false,
    different: true,
    local: true,
    origin: true,
  });

  const showColumnList = (target, color, title) =>
    props.columnList[target]?.map((column) => {
      return (
        <tr className={color} key={column.subName}>
          <td>{title}</td>
          <td>{column.subName}</td>
          <td>{column.subType}</td>
          <td>{column.objName}</td>
          <td>{column.objType}</td>

          <td>
            {target === "different" && (
              <>
                <button>修改远程</button>
                <button>修改地</button>
              </>
            )}

            {target === "local" && (
              <>
                <button
                  data-columnname={column.subName}
                  onClick={props.originAddColumn}
                >
                  远程添加
                </button>
              </>
            )}

            {target === "origin" && (
              <>
                <button>本地添加</button>
                <button>远程删除</button>
              </>
            )}
          </td>
        </tr>
      );
    });

  return (
    <main>
      <form>
        <CheckBox title="相同" name="same" state={state} setState={setState} />
        <CheckBox
          title="差别"
          name="different"
          state={state}
          setState={setState}
        />
        <CheckBox title="本地" name="local" state={state} setState={setState} />
        <CheckBox
          title="远程"
          name="origin"
          state={state}
          setState={setState}
        />
      </form>

      {(props.columnList.same.length > 0 ||
        props.columnList.different.length > 0 ||
        props.columnList.local.length > 0 ||
        props.columnList.origin.length > 0) && (
        <table rules="all">
          <thead>
            <tr>
              <th colSpan={3}>本地</th>
              <th colSpan={2}>远程</th>
            </tr>
            <tr>
              <td></td>
              <td>名称</td>
              <td>类型</td>
              <td>名称</td>
              <td>类型</td>
              <td>操作</td>
            </tr>
          </thead>
          <tbody>
            {state.same && showColumnList("same", "green", "相同")}
            {state.different && showColumnList("different", "orange", "相异")}
            {state.local && showColumnList("local", "blue", "本地")}
            {state.origin && showColumnList("origin", "grey", "远程")}
          </tbody>
        </table>
      )}
    </main>
  );
};

export default Main;
