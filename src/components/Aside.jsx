import { useState } from "react";
import CheckBox from "./common/CheckBox";

const Aside = (props) => {
  const [state, setState] = useState({
    same: false,
    different: true,
    local: true,
    origin: true,
  });

  const showTableList = (target, color) =>
    props.tableList[target].map((table) => {
      return (
        <li
          className={color}
          onClick={props.checkTable}
          key={table.tableName}
          data-name={table.tableName}
        >
          {table.tableName}
          {target === "different" && <sup>{table.tag}</sup>}
          {target === "local" && <sup>本地</sup>}
          {target === "origin" && <sup>远程</sup>}
        </li>
      );
    });

  return (
    <aside>
      <form>
        <CheckBox title="相同" name="same" state={state} setState={setState} />
        <CheckBox title="差别" name="different" state={state} setState={setState} />
        <CheckBox title="本地" name="local" state={state} setState={setState} />
        <CheckBox title="远程" name="origin" state={state} setState={setState} />
      </form>
      
      <ul>
        {state.same && showTableList("same", "green")}
        {state.different && showTableList("different", "orange")}
        {state.local && showTableList("local", "blue")}
        {state.origin && showTableList("origin", "grey")}
      </ul>
    </aside>
  );
};

export default Aside;
