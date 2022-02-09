import { useState } from "react";
import CheckBox from "./common/CheckBox";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FolderIcon from "@mui/icons-material/Folder";

const Aside = (props) => {
  const [state, setState] = useState({
    same: false,
    different: true,
    local: true,
    origin: true,
  });

  const showTableList = (target, color) =>
    props.tableList[target].map((table) => (
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
    ));

  const showTableList2 = (target, color) =>
    props.tableList[target].map((table) => (
      <ListItem
        sx={{ pt: 0, pb: 0, color }}
        onClick={props.checkTable}
        key={table.tableName}
        dataName={table.tableName}
      >
        <ListItemIcon>
          <FolderIcon sx={{ color }} />
        </ListItemIcon>
        <ListItemText sx={{ cursor: 'pointer' }}>
          <span style={{ fontWeight: "bold" }}>{table.tableName}</span>
          {target === "different" && <sup> {table.tag}</sup>}
          {target === "local" && <sup> 本地</sup>}
          {target === "origin" && <sup> 远程</sup>}
        </ListItemText>
      </ListItem>
    ));

  return (
    <aside>
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

      <ul>
        {/* {state.same && showTableList("same", "green")}
        {state.different && showTableList("different", "orange")}
        {state.local && showTableList("local", "blue")}
        {state.origin && showTableList("origin", "grey")} */}

        {state.same && props.tableList.same.length > 0 && (
          <List dense={true}>{showTableList2("same", "green")}</List>
        )}
        {state.different && props.tableList.different.length > 0 && (
          <List dense={true}>{showTableList2("different", "orange")}</List>
        )}
        {state.local && props.tableList.local.length > 0 && (
          <List dense={true}>{showTableList2("local", "blue")}</List>
        )}
        {state.origin && props.tableList.origin.length > 0 && (
          <List dense={true}>{showTableList2("origin", "grey")}</List>
        )}
      </ul>
    </aside>
  );
};

export default Aside;
