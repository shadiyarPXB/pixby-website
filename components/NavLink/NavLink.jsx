import { useRouter } from "next/router";
import Link from "next/link";
import React, { Children } from "react";
import PropTypes from "prop-types";

const NavLink = ({ href, children }) => {
  const router = useRouter();

  let className = children.props.className || "";
  if (router.pathname === href) {
    className = `${className} active`;
  }

  return <Link href={href}>{React.cloneElement(children, { className })}</Link>;
};

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default NavLink;
