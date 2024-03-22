import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import "./ForgotPassword.css";
import { MdOutlineMail } from "react-icons/md";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgetPassword = () => {
  const auth = getAuth();
  let navigate = useNavigate();
  const [resetEmail, setResetEmail] = useState("");
  const [loadingButtonShow, setLoadingButtonShow] = useState(false);

  const handleSendButtonClick = () => {
      if (resetEmail) {
    setLoadingButtonShow(true);
      sendPasswordResetEmail(auth, resetEmail)
        .then(() => {
          setLoadingButtonShow(false);
          setResetEmail("");
          toast.success("Please check your email for reset your password", {
            position: "bottom-center",
            autoClose: 3000,
            theme: "dark",
          });
          setLoadingButtonShow(false);
          navigate("/log-in");
        })
        .catch((error) => {
          const errorMessage = error.message;
          setLoadingButtonShow(false);
        });
    }
  };
  return (
    <section>
      <Box
        sx={{
          bgcolor: "gray",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "600px",
            bgcolor: "white",
            borderRadius: "10px",
            px: "50px",
            py: "30px",
          }}
        >
          <Typography sx={{ fontSize: "30px", fontWeight: "600" }}>
            Reset Password
          </Typography>
          <Typography
            sx={{
              mt: "10px",
              fontWeight: "500",
              color: "secondaryText.main",
            }}
          >
            Forgot your password? No problem! Enter your email address and we'll
            send you a link. Click Link & Enter Your New Password
          </Typography>
          <Typography
            sx={{
              mt: "18px",
              fontSize: "20px",
              fontWeight: "500",
            }}
          >
            Enter Your Email
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              border: "1px solid",
              borderColor: "#d3d3d3",
              px: "15px",
              borderRadius: "6px",
              mt: "5px",
            }}
          >
            <MdOutlineMail className="icon" />
            <input
              value={resetEmail}
              name="email"
              onChange={(e) => setResetEmail(e.target.value)}
              type="text"
              placeholder="enter Your Email"
            />
          </Box>

          {loadingButtonShow ? (
            <LoadingButton
              loading
              variant="contained"
              sx={{
                borderRadius: "6px",
                width: "100%",
                py: "10px",
                mt: "15px",
                textTransform: "capitalize",
                fontSize: "16px",
              }}
            >
              Submit
            </LoadingButton>
          ) : (
            <Button
              onClick={handleSendButtonClick}
              variant="contained"
              sx={{
                borderRadius: "6px",
                width: "100%",
                py: "10px",
                mt: "15px",
                textTransform: "capitalize",
                fontSize: "16px",
              }}
            >
              Send reset Email
            </Button>
          )}
        </Box>
      </Box>
    </section>
  );
};

export default ForgetPassword;
