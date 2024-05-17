import get from "lodash/get";
import { useState } from "react";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import useSettings from "../hooks/useSettings";
// components
import Page from "../components/Page";
// form
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
// @mui
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  IconButton,
  InputAdornment,
  Stack,
  Container,
  Box,
  Typography,
} from "@mui/material";

import { RHFTextField, FormProvider } from "src/components/hook-form";
import Auth_API from "src/services/auth";
import { styled } from "@mui/material/styles";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const ContentStyle = styled("div")(({ theme }) => ({
    maxWidth: 480,
    margin: "auto",
    minHeight: 'calc(100vh - 40rem)',
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  }));


export default function EditOpsConfiguration () {
  const { themeStretch } = useSettings();
    const navigate = useNavigate();
    const modbusSchema = Yup.object().shape({
      BOOKING_INVOICE_PREFIX: Yup.string().required("Address Id is required"),
      URL_IMG:Yup.string().required("Port is required"),
      URL_DN: Yup.string().required("Method Id is required"),
      URL_PORTAL:Yup.number().required("Baurdrate is required"),
      PAYU_KEY: Yup.number().required("Scanrate is required"),
      PAYU_SALT:Yup.number().required("Sensor is required")
      });
      const defaultValues = {
        BOOKING_INVOICE_PREFIX: "",
        URL_IMG:"",
        URL_DN: "",
        URL_PORTAL:"",
        PAYU_KEY: "",
        PAYU_SALT:"",

      };
    
      const methods = useForm({
        resolver: yupResolver(modbusSchema),
        defaultValues,
      });
    
      const {
        handleSubmit,
        formState: { errors, isSubmitting },
      } = methods;
      
      const goToPrev = () => {
              navigate("/dashboard/config", {
                replace: true,
              });
      };


      const onSubmit = async (data) => {
        try {
          const options = {
            BOOKING_INVOICE_PREFIX: data.BOOKING_INVOICE_PREFIX,
            URL_IMG:data.URL_IMG,
            URL_DN: data.URL_DN,
            URL_PORTAL:data.URL_PORTAL,
            PAYU_KEY: data.PAYU_KEY,
            PAYU_SALT:data.PAYU_SALT
          };
          const response = await Auth_API.writeopsconf(options);
          console.log("response", response);
          if (response) {
            const opsConf = await Auth_API.getopsconf();
              console.log(opsConf);
              navigate("/dashboard/config", {
                replace: true,
                state:opsConf,
              });
            
            console.log(response);
          }
        } catch (error) {
          console.error(error);
        }
      };  

  return (
    <Page title="Recent Booking">
    <Container maxWidth={themeStretch ? false : "xl"}>
      <Stack position={"column"}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <ContentStyle>
              <Box
                  sx={{
                    width: "3rem",
                    height: "3rem",
                    borderRadius: 2,
                    backgroundColor: "#FFFFFF",
                    border: 1,
                    borderColor: "#b7b7b7",
                    color: "black",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={goToPrev}
                >
                  <ArrowBackIosNewIcon sx={{ color: "#08B4B4" }} fontSize="small" />
                </Box>
              <Typography
                variant="h3"
                sx={{ mt: 2, mb: 2, textAlign: "center", fontWeight: "bold" }}
              >
                OPS Configuration
              </Typography>
            </ContentStyle>
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity="error">
            {get(
              errors,
              "afterSubmit.0.ErrDesc",
              get(errors, "afterSubmit.message")
            )}
          </Alert>
        )}
       <Stack spacing={1}>
          <Typography
            variant="h4"
            sx={{
              textAlign: "left",
              fontWeight: "normal",
              fontSize: "8px",
            }}
          >
            BOOKING_INVOICE_PREFIX
          </Typography>
          <RHFTextField
            sx={{ borderRadius: 5 }}
            name="BOOKING_INVOICE_PREFIX"
            label="Enter the Valid Password"
          />
        </Stack>
        <Stack spacing={1}>
          <Typography
            variant="h4"
            sx={{
              textAlign: "left",
              fontWeight: "normal",
              fontSize: "8px",
            }}
          >
            URL_IMG
          </Typography>
          <RHFTextField
            sx={{ borderRadius: 10 }}
            name="URL_IMG"
            label="Enter the Valid Password"
          />
        </Stack>
        <Stack spacing={1}>
          <Typography
            variant="h4"
            sx={{
              textAlign: "left",
              fontWeight: "normal",
              fontSize: "8px",
            }}
          >
            URL_DN
          </Typography>
          <RHFTextField
            sx={{ borderRadius: 10 }}
            name="URL_DN"
            label="Enter the Valid Password"
          />
        </Stack>
        <Stack spacing={1}>
          <Typography
            variant="h4"
            sx={{
              textAlign: "left",
              fontWeight: "normal",
              fontSize: "8px",
            }}
          >
            URL_PORTAL
          </Typography>
          <RHFTextField
            sx={{ borderRadius: 10 }}
            name="URL_PORTAL"
            label="Enter the Valid Password"
          />
        </Stack>
        <Stack spacing={1}>
          <Typography
            variant="h4"
            sx={{
              textAlign: "left",
              fontWeight: "normal",
              fontSize: "8px",
            }}
          >
            PAYU_KEY
          </Typography>
          <RHFTextField
            sx={{ borderRadius: 10 }}
            name="PAYU_KEY"
            label="Enter the Valid Password"
          />
        </Stack>
        <Stack spacing={1}>
          <Typography
            variant="h4"
            sx={{
              textAlign: "left",
              fontWeight: "normal",
              fontSize: "8px",
            }}
          >
            PAYU_SALT
          </Typography>
          <RHFTextField
            sx={{ borderRadius: 10 }}
            name="PAYU_SALT"
            label="Enter the Valid Password"
          />
        </Stack>
        <LoadingButton
          fullWidth
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{
            background:
              "linear-gradient(135.96deg, #11D6D6 0%, #009797 101.74%)",
            minHeight: "60px",
            borderRadius: 2,
          }}
        >
          <Typography variant="body1" fontWeight="bold">
            Update
          </Typography>
        </LoadingButton>
      </Stack>
    </FormProvider>
    </Stack>  
    </Stack>
      </Container>
    </Page>
  );
}  