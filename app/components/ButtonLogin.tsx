import React from "react";
import { Link } from "@remix-run/react";

interface ButtonLoginProps {
  className?: string;
}

const ButtonLogin: React.FC<ButtonLoginProps> = ({ className = "" }) => {
  const buttonText = "Continue to App"; // Or any generic text you prefer
  const linkTo = "/dashboard"; // Always link to dashboard

  return (
    <Link to={linkTo} className={`btn btn-primary ${className}`}>
      {buttonText}
    </Link>
  );
};

export default ButtonLogin;
