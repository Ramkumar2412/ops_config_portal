import APIService from "./apiService";
import AuthService from "./authService";
import handleCallback from "./Callback";
import { get } from "lodash";

const API = AuthService.getRemoteURL();
const AuthCode = AuthService.getAuthCode();
const accessToken = AuthService._getAccessToken();
const AdminAuthCode = AuthService.getAdminAuthCode();

console.log(API);

const Auth_API = {

  logout(options) {
    return new Promise((resolve, reject) => {
      APIService.fetch(
        `${API}/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            AccessToken: AuthService._getAccessToken(),
            AuthCode: AuthService.getAuthCode(),
          },
          body: JSON.stringify(options),
        },
        handleCallback(resolve, reject)
      );
    });
  },

  adminlogin(options) {
    return new Promise((resolve, reject) => {
      APIService.fetch(
        `${API}/login`,
        {
          method: "POST",
          body: JSON.stringify(options),
          headers: {
            //AuthCode: AdminAuthCode,
            "Content-Type": "application/json",
          },
        },
        handleCallback(resolve, reject)
      );
    });
  },

  getopsconf(){
    return new Promise((resolve , reject) => {
      APIService.request(
        {
          url : `${API}/readConfig`,
          method: "GET",
          headers: {
            //AuthCode: AdminAuthCode,
            "Content-Type": "application/json",
          },
        },

        handleCallback(resolve, reject)
      )
    })
  },

  writeopsconf(){
    return new Promise((resolve , reject) => {
      APIService.request(
        {
          url : `${API}/writeConfig`,
          method: "POST",
          headers: {
            //AuthCode: AdminAuthCode,
            "Content-Type": "application/json",
          },
        },

        handleCallback(resolve, reject)
      )
    })
  },

};
export default Auth_API;
