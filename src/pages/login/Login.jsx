import {
  Alert,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Image from "../../components/layout/Image";
import logo from "/public/images/linkedin-logo.png";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Registration = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const [loadingButtonShow, setLoadingButtonShow] = useState(false);
  const [credentialErrorShow, setCredentialErrorShow] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const handleInputData = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
    setError({ ...error, [e.target.name]: "" });
    setCredentialErrorShow(false);
  };

  const handleSubmit = () => {
    let pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!loginData.email) {
      setError({ ...error, email: "please enter your email" });
    } else if (!pattern.test(loginData.email)) {
      setError({ ...error, email: "please enter a valid email" });
    } else if (!loginData.password) {
      setError({ ...error, password: "please enter your password" });
    } else if (loginData.password.length < 6) {
      setError({ ...error, password: "Minimum 6 Chararters" });
    } else {
      setLoadingButtonShow(true);
      signInWithEmailAndPassword(auth, loginData.email, loginData.password)
        .then((userCredential) => {
          console.log(userCredential);
          if (userCredential.user.emailVerified) {
            toast.success(
              "You've successfully logged in. Enjoy your experience!",
              {
                position: "bottom-center",
                autoClose: 3000,
                theme: "light",
              }
            );
            setLoginData({ email: "", password: "" });
            setLoadingButtonShow(false);
            navigate("/home");
          } else {
            setLoadingButtonShow(false);
            toast.error("please varify your mail", {
              position: "bottom-center",
              autoClose: 3000,
              theme: "light",
            });
          }
        })
        .catch((error) => {
          setLoadingButtonShow(false);
          const errorMessage = error.message;
          console.log(errorMessage);
          if (errorMessage.includes("auth/invalid-credential")) {
            setCredentialErrorShow(true);
          }
        });
    }
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        toast.success("Registration Successfull", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "light",
        });
        navigate("/home");
      })
      .catch((erorr) => {});
  };

  return (
    <section id="registration">
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <Box sx={{ textAlign: "center", width: "500px" }}>
          <Image
            imageLink={logo}
            altText={"linkedin-logo"}
            className={"linkedin-logo"}
          />
          <Typography
            variant="h3"
            sx={{ fontWeight: "bold", fontSize: "34px", mt: "42px" }}
          >
            Log in
          </Typography>
          <Typography sx={{ fontSize: "20px", mt: "12px", color: "#888bae" }}>
            Free register and you can enjoy it
          </Typography>

          <Box
            onClick={handleGoogleLogin}
            sx={{
              mt: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0 10px",
              width: "100%",
              border: "1px solid",
              borderColor: "#b8b9ce",
              borderRadius: "8px",
              py: "10px",
              cursor: "pointer",
            }}
          >
            <FcGoogle />
            <Typography sx={{ color: "#b8b9ce" }}>
              Continue with Google
            </Typography>
          </Box>

          <Typography sx={{ color: "#b8b9ce", mt: "35px" }}>- OR -</Typography>
          <Box sx={{ mt: "35px" }}>
            <Box sx={{ position: "relative" }}>
              <TextField
                value={loginData.email}
                error={error.email ? true : false}
                onChange={handleInputData}
                sx={{ width: "100%" }}
                type="text"
                name="email"
                id="outlined-basic"
                label="Email Addres"
                variant="outlined"
              />
              {error.email && (
                <Typography
                  sx={{
                    textTransform: "capitalize",
                    position: "absolute",
                    top: "102%",
                    left: "3px",
                    color: "red",
                  }}
                >
                  {error.email}
                </Typography>
              )}
            </Box>
            <Box sx={{ position: "relative" }}>
              <TextField
                value={loginData.password}
                onChange={handleInputData}
                error={error.password ? true : false}
                sx={{ width: "100%", mt: "32px", borderRadius: "20px" }}
                type="password"
                name="password"
                id="outlined-basic"
                label="Password"
                variant="outlined"
              />
              {error.password && (
                <Typography
                  sx={{
                    textTransform: "capitalize",
                    position: "absolute",
                    top: "102%",
                    left: "3px",
                    color: "red",
                  }}
                >
                  {error.password}
                </Typography>
              )}
              {credentialErrorShow && (
                <Alert
                  sx={{ width: "100%", position: "absolute", top: "101%" }}
                  severity="error"
                >
                  Invalid email or password. Please try again
                </Alert>
              )}
            </Box>
            <Typography sx={{ textAlign: "start", mt: "10px" }}>
              <Link to={"/forgot-password"}>Forgot password?</Link>
            </Typography>
          </Box>
          {loadingButtonShow ? (
            <LoadingButton
              loading
              variant="contained"
              sx={{
                width: "100%",
                mt: "50px",
                borderRadius: "50px",
                py: "10px",
                fontWeight: "500",
                fontSize: "20px",
                textTransform: "capitalize",
              }}
            >
              Submit
            </LoadingButton>
          ) : (
            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{
                width: "100%",
                mt: "50px",
                borderRadius: "50px",
                py: "10px",
                fontWeight: "500",
                fontSize: "20px",
                textTransform: "capitalize",
              }}
            >
              Login
            </Button>
          )}
          <Typography
            sx={{
              mt: "20px",
              color: "#b8b9ce",
              fontWeight: "500",
              textTransform: "capitalize",
            }}
          >
            don't have an account?{" "}
            <Link className="link" to={"/"}>
              Sign in
            </Link>
          </Typography>
        </Box>
      </Container>
    </section>
  );
};

export default Registration;
