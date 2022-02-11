import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import CableRoundedIcon from "@mui/icons-material/CableRounded";
import { useState } from "react";

const theme = createTheme();

export default function DatabaseForm2({
  title,
  dbName,
  information,
  handleConnect,
}) {
  const [form, setForm] = useState({
    url: information.url,
    username: information.username,
    password: information.password,
  });

  const handleOnChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleConnect({
      databaseName: dbName,
      url: form.url,
      username: form.username,
      password: form.password,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Avatar sx={{ bgcolor: "primary.main", mr: 1 }}>
              <StorageRoundedIcon />
            </Avatar>
            {title} 数据库
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  size="small"
                  label="地址"
                  name="url"
                  value={form.url}
                  onChange={handleOnChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  size="small"
                  label="账号"
                  name="username"
                  value={form.username}
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  size="small"
                  label="密码"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleOnChange}
                />
              </Grid>
            </Grid>
            <Button
              // type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
              endIcon={<CableRoundedIcon />}
              onClick={handleSubmit}
            >
              连接
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
