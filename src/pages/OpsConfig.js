import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Dialog,
    Grid,
    MenuItem,
    Paper,
    Select,
    Typography,
    Item,
    FormControl,
    FormControlLabel,
    InputLabel,
    useMediaQuery
  } from "@mui/material";
  // hooks
  import useSettings from "../hooks/useSettings";
  import { useEffect, useState } from "react";
  import { useNavigate , useLocation } from "react-router-dom";
  import { Toaster, toast } from "react-hot-toast";
  import Page from "../components/Page";
  import Image from "../components/Image"
  import { styled } from "@mui/material/styles";
  import { LoadingButton } from "@mui/lab";
  import { useForm } from "react-hook-form";
  import { RHFTextField, FormProvider } from "src/components/hook-form";
import { Stack } from "@mui/system";
import RefreshIcon from "@mui/icons-material/Refresh";
import { ErrorCodes } from "src/constants/ErrorConstants";
import Loader from "src/components/Loader";
import Auth_API from "src/services/auth";
const ContentStyle = styled("div")(({ theme }) => ({
    maxWidth: 480,
    margin: "auto",
    minHeight: 'calc(100vh - 40rem)',
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  }));
  

export default function OpsConfiguration () {
  //const [viewModbusConf , setviewModbusConf] = useState([]);
  const isMinWidth400px = useMediaQuery("(max-width:400px)");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const opsConfig = location.state.result;
  //setviewModbusConf(modbus.channels);

  console.log("Modbus",opsConfig);
  //var configObj = JSON.parse(opsConfig);

// Accessing values using keys
var urlImg = opsConfig["config['URL_IMG']"];
var urlDn = opsConfig["config['URL_DN']"];
var urlPortal = opsConfig["config['URL_PORTAL']"];
var payuKey = opsConfig["config['PAYU_KEY']"];
var payuSalt = opsConfig["config['PAYU_SALT']"];

// Print the values
// console.log("Booking Invoice Prefix:", bookingInvoicePrefix);
// console.log("Support Number Prefix:", supportNumberPrefix);
// console.log("Shops Logo Directory:", shopsLogoDir);
// console.log("Malls Logo Directory:", mallsLogoDir);
// console.log("Brands Logo Directory:", brandsLogoDir);
// console.log("Camera Logo Directory:", cameraLogoDir);
// console.log("Offers Image Directory:", offersImageDir);



  const handleClick = () => {
    setLoading(true);

    setTimeout(() => {
    
        navigate('/dashboard/edit_config',{
          replace: true
        }); // Provide the path to the target page
        setLoading(false);
    }, 2000);
};


    return(

        <Page title="OPS Configuration">
              <Container>
            <ContentStyle>
              <Typography
                variant="h3"
                sx={{ mt: 2, mb: 2, textAlign: "center", fontWeight: "bold" }}
              >
                Welcome Back
              </Typography>
            </ContentStyle>

        <Card>
        <CardContent
                  sx={{
                    height: isMinWidth400px ? "calc(100vh - 15rem)":"calc(100vh - 19rem)",
                    overflowY: "auto",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    "&::-webkit-scrollbar": {
                      display: "none",
                    },
                  }}
                >
                    <Card sx={{ width: "100%", marginTop: 1 }}>
                      <CardContent
                          sx={{
                            height: "300px",
                            bgcolor: "#ECECEC",
                          }}
                        >
                          <Stack>
                             <Typography>
                              <Box
                                sx={{
                                  marginBottom: 1,
                                  marginTop: 1,
                                  mr: 2,
                                  fontWeight: "Bold",
                                }}
                              >
                                Url Image :  {opsConfig ? urlImg: ""}
                              </Box>
                              <Box
                                sx={{
                                  marginBottom: 1,
                                  marginTop: 1,
                                  mr: 2,
                                  fontWeight: "Bold",
                                }}
                              >
                                URL Domain Name :  {opsConfig ? urlDn: ""}
                              </Box>
                              <Box
                                sx={{
                                  marginBottom: 1,
                                  marginTop: 1,
                                  mr: 2,
                                  fontWeight: "Bold",
                                }}
                              >
                                URL Portal:  {opsConfig ? urlPortal : ""}
                              </Box>
                              <Box
                                sx={{
                                  marginBottom: 1,
                                  marginTop: 1,
                                  mr: 2,
                                  fontWeight: "Bold",
                                }}
                              >
                                Payu key :  {opsConfig ? payuKey : ""}
                              </Box>
                              <Box
                                sx={{
                                  marginBottom: 1,
                                  marginTop: 1,
                                  mr: 2,
                                  fontWeight: "Bold",
                                }}
                              >
                                Payu Salt :  {opsConfig ? payuSalt : ""}
                              </Box>
                            </Typography>
                          </Stack>
                          <LoadingButton
                            variant="contained"
                            loading={loading}
                            onClick={handleClick}
                            sx={{
                              background:
                                "linear-gradient(135.96deg, #11D6D6 0%, #009797 101.74%)",
                              minHeight: "60px",
                              borderRadius: 2,
                                }}
                              >
                              <Typography variant="body1" fontWeight="bold">
                                Edit
                              </Typography>
                            </LoadingButton>
                        </CardContent>
                    </Card>            
                 
                  </CardContent>


        </Card>
            <Box sx={{ mt: 5,}}>
              <Image
                visibleByDefault
                disabledEffect
                src="/assets/Group.png"
                alt="theme"
              />
            </Box>
          </Container>
      </Page>
    )
}