import React from "react";
import LogoLight2x from "../../images/logo2x.png";
import LogoDark2x from "../../images/logo-dark2x.png";
import LogoSmall from "../../images/logo-small.png";
import EnvishopLogo from "../../images/logo.webp";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to={`${process.env.PUBLIC_URL}/`} className="logo-link">
      <img
        style={{
          width: "50rem",
        }}
        className="w-100 logo-img"
        src={EnvishopLogo}
        alt="logo"
      ></img>
    </Link>
  );
};

export default Logo;
