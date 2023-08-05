import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useAppContext } from "@/context/state";
import { useRouter } from "next/router";

export default function LoginPage() {
  const { user, onChangeState } = useAppContext();
  const [isSignIn, setIsSignIn] = React.useState<boolean>(true);
  const [name, setName] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [confirm, setConfirm] = React.useState<string>("");
  const [message, setMessage] = React.useState<string>("");
  const router = useRouter();
  const handleSignIn = () => {
    setIsSignIn(true);
  };
  const handleSignUp = () => {
    setIsSignIn(false);
  };
  React.useEffect(() => {
    localStorage.removeItem("user");
    onChangeState({ user: null });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSubmit = () => {
    if (isSignIn) {
      axios({
        method: "POST",
        url: "login",
        headers: { "Content-Type": "application/json" },
        data: {
          UserName: name,
          Password: password,
        },
      })
        .then((response) => {
          if (response.data.message !== "OK") {
            setMessage(response.data.message);
          } else {
            onChangeState({ user: response.data.user });
            localStorage.setItem("user", JSON.stringify(response.data.user));
            router.push("/home");
          }
        })
        .catch((err) => console.log(err));
    } else {
      if (password !== confirm) {
        setMessage("password confirm wrong");
      } else {
        axios({
          method: "POST",
          url: "register",
          headers: { "Content-Type": "application/json" },
          data: {
            UserName: name,
            Password: password,
          },
        })
          .then((response) => setMessage(response.data.message))
          .catch((err) => setMessage(err.response.data.message));
      }
    }
  };
  const handleName = (e: any) => {
    setName(e.target.value);
  };
  const handlePassword = (e: any) => {
    setPassword(e.target.value);
  };
  const handleConfirm = (e: any) => {
    setConfirm(e.target.value);
  };

  React.useEffect(() => {
    setName("");
    setPassword("");
    setConfirm("");
    setMessage("");
  }, [isSignIn]);
  return (
    <Box>
      <Card sx={{ maxWidth: 500, margin: "auto", marginTop: 20 }}>
        <CardContent>
          <Stack spacing={3}>
            {isSignIn ? (
              <Stack spacing={3}>
                <Typography variant="h6" color="text.secondary">
                  Sign in
                </Typography>
                <Stack direction={"column"} spacing={3}>
                  <TextField
                    id="outlined-name"
                    label="name"
                    variant="outlined"
                    onChange={handleName}
                    value={name}
                    required
                  />
                  <TextField
                    type="password"
                    id="outlined-password"
                    label="password"
                    variant="outlined"
                    required
                    onChange={handlePassword}
                    value={password}
                  />
                  <Typography variant="body1" sx={{ color: "#ef5350", fontSize: "13px" }}>
                    {message}
                  </Typography>
                </Stack>
              </Stack>
            ) : (
              <Stack spacing={3}>
                <Typography variant="h6" color="text.secondary">
                  Sign up
                </Typography>
                <Stack direction={"column"} spacing={3}>
                  <TextField
                    id="outlined-name"
                    label="name"
                    variant="outlined"
                    onChange={handleName}
                    value={name}
                    required
                  />
                  <TextField
                    type="password"
                    id="outlined-password"
                    label="password"
                    variant="outlined"
                    required
                    onChange={handlePassword}
                    value={password}
                  />
                  <TextField
                    type="password"
                    id="outlined-confirm"
                    label="confirm password"
                    variant="outlined"
                    required
                    onChange={handleConfirm}
                    value={confirm}
                  />
                  <Typography variant="body1" sx={{ color: "#ef5350", fontSize: "13px" }}>
                    {message}
                  </Typography>
                </Stack>
              </Stack>
            )}
          </Stack>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleSignIn}>
            Sign in
          </Button>
          <Button size="small" onClick={handleSignUp}>
            Sign up
          </Button>
        </CardActions>
        <Button
          type="submit"
          variant="contained"
          sx={{ float: "right", marginBottom: 2, marginRight: 2 }}
          onClick={handleSubmit}
        >
          Continue
        </Button>
      </Card>
    </Box>
  );
}
