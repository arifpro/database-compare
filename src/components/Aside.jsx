import { useState } from "react";
import CheckBox from "./common/CheckBox";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FolderIcon from "@mui/icons-material/Folder";
import { Toolbar } from "@mui/material";

const Aside = (props) => {
  const [onHover, setOnHover] = useState("");
  const [state, setState] = useState({
    same: false,
    different: true,
    local: true,
    origin: true,
  });

  const showTableList = (target, color) =>
    props.tableList[target].map((table) => (
      <ListItem
        sx={{
          pt: 0,
          pb: 0,
          color,
        }}
        onClick={props.checkTable}
        key={table.tableName}
        dataName={table.tableName}
        onMouseEnter={() => setOnHover(table.tableName)}
        onMouseLeave={() => setOnHover("")}
      >
        <ListItemIcon>
          <FolderIcon
            sx={{
              color,
              bgcolor: onHover === table.tableName ? "#1976d2" : "transparent",
              borderRadius: "10px",
            }}
          />
        </ListItemIcon>
        <ListItemText sx={{ cursor: "pointer" }}>
          <span style={{ fontWeight: "bold" }}>{table.tableName}</span>
          {target === "different" && <sup> {table.tag}</sup>}
          {target === "local" && <sup> 本地</sup>}
          {target === "origin" && <sup> 远程</sup>}
        </ListItemText>
      </ListItem>
    ));

  return (
    <div className="customPaper">
      <Toolbar
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div>
          <CheckBox
            title="相同"
            name="same"
            state={state}
            setState={setState}
          />
          <CheckBox
            title="差别"
            name="different"
            state={state}
            setState={setState}
          />
          <CheckBox
            title="本地"
            name="local"
            state={state}
            setState={setState}
          />
          <CheckBox
            title="远程"
            name="origin"
            state={state}
            setState={setState}
          />
        </div>
      </Toolbar>

      <ul>
        {state.same && props.tableList.same.length > 0 && (
          <List dense={true}>{showTableList("same", "green")}</List>
        )}
        {state.different && props.tableList.different.length > 0 && (
          <List dense={true}>{showTableList("different", "orange")}</List>
        )}
        {state.local && props.tableList.local.length > 0 && (
          <List dense={true}>{showTableList("local", "blue")}</List>
        )}
        {state.origin && props.tableList.origin.length > 0 && (
          <List dense={true}>{showTableList("origin", "grey")}</List>
        )}
      </ul>
    </div>
  );
};

export default Aside;
