import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

const DatabaseForm = ({ id, information, handleFormEdit, handleConnect }) => {
  const adName = "ad" + id;
  const acName = "ac" + id;
  const paName = "pa" + id;

  return (
    <section>
      <form className="databaseForm" id={id}>
        <label htmlFor={adName}>地址</label>
        <input
          id={adName}
          name="url"
          // value={information.url}
          onChange={handleFormEdit}
        />

        <label htmlFor={acName}>账号</label>
        <input
          id={acName}
          name="username"
          // value={information.username}
          onChange={handleFormEdit}
        />

        <label htmlFor={paName}>密码</label>
        <input
          id={paName}
          name="password"
          // value={information.password}
          onChange={handleFormEdit}
        />

        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={handleConnect}
        >
          连接
        </Button>
      </form>
    </section>
  );
};

export default DatabaseForm;
