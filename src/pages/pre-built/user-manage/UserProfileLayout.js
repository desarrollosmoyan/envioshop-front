import React, { useState, useEffect } from "react";
import Content from "../../../layout/content/Content";
import UserProfileRegularPage from "./UserProfileRegular";
import UserProfileSettingPage from "./UserProfileSetting";
import UserProfileNotificationPage from "./UserProfileNotification";
import UserProfileActivityPage from "./UserProfileActivity";
import { Route, Switch, Link } from "react-router-dom";
import { Icon, UserAvatar } from "../../../components/Component";
import { findUpper } from "../../../utils/Utils";
import {
  Card,
  DropdownItem,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { request } from "../../../constants";
import { useCookie } from "react-use";

const UserProfileLayout = () => {
  const [sm, updateSm] = useState(false);
  const [token] = useCookie("token");
  const [mobileView, setMobileView] = useState(false);
  const [profileName, setProfileName] = useState("Abu Bin Ishtiak");
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });
  useEffect(() => {
    getMe();
  }, []);

  const getMe = async () => {
    try {
      const { data } = await request({
        method: "GET",
        url: "/me",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(data.user);
    } catch (error) {
      setUserData({ name: "", email: "" });
    }
  };
  // function to change the design view under 990 px
  const viewChange = () => {
    if (window.innerWidth < 990) {
      setMobileView(true);
    } else {
      setMobileView(false);
      updateSm(false);
    }
  };

  useEffect(() => {
    viewChange();
    window.addEventListener("load", viewChange);
    window.addEventListener("resize", viewChange);
    document
      .getElementsByClassName("nk-header")[0]
      .addEventListener("click", function () {
        updateSm(false);
      });
    return () => {
      window.removeEventListener("resize", viewChange);
      window.removeEventListener("load", viewChange);
    };
  }, []);

  return (
    <React.Fragment>
      <Content>
        <Card className="card-bordered">
          <div className="card-aside-wrap">
            <div
              className={`card-aside card-aside-left user-aside toggle-slide toggle-slide-left toggle-break-lg ${
                sm ? "content-active" : ""
              }`}
            >
              <div className="card-inner-group">
                <div className="card-inner">
                  <div className="user-card">
                    <UserAvatar
                      text={findUpper(userData.name)}
                      theme="primary"
                    />
                    <div className="user-info">
                      <span className="lead-text">{userData.name}</span>
                      <span className="sub-text">{userData.email}</span>
                    </div>
                  </div>
                </div>
                <div className="card-inner p-0">
                  <ul className="link-list-menu">
                    <li onClick={() => updateSm(false)}>
                      <Link
                        to={`${process.env.PUBLIC_URL}/user-profile-regular`}
                        className={
                          window.location.pathname ===
                          `${process.env.PUBLIC_URL}/user-profile-regular`
                            ? "active"
                            : ""
                        }
                      >
                        <Icon name="user-fill-c"></Icon>
                        <span>Información personal</span>
                      </Link>
                    </li>
                    <li onClick={() => updateSm(false)}>
                      <Link
                        to={`${process.env.PUBLIC_URL}/user-profile-setting`}
                        className={
                          window.location.pathname ===
                          `${process.env.PUBLIC_URL}/user-profile-setting`
                            ? "active"
                            : ""
                        }
                      >
                        <Icon name="lock-alt-fill"></Icon>
                        <span>Seguridad</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card-inner card-inner-lg">
              {sm && mobileView && (
                <div
                  className="toggle-overlay"
                  onClick={() => updateSm(!sm)}
                ></div>
              )}
              <Switch>
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/user-profile-regular`}
                  render={() => (
                    <UserProfileRegularPage
                      updateSm={updateSm}
                      sm={sm}
                      setProfileName={setProfileName}
                    />
                  )}
                ></Route>
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/user-profile-notification`}
                  render={() => (
                    <UserProfileNotificationPage updateSm={updateSm} sm={sm} />
                  )}
                ></Route>
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/user-profile-activity`}
                  render={() => (
                    <UserProfileActivityPage updateSm={updateSm} sm={sm} />
                  )}
                ></Route>
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/user-profile-setting`}
                  render={() => (
                    <UserProfileSettingPage updateSm={updateSm} sm={sm} />
                  )}
                ></Route>
              </Switch>
            </div>
          </div>
        </Card>
      </Content>
    </React.Fragment>
  );
};

export default UserProfileLayout;
