import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <h1>CRUD APP</h1>
      <Nav defaultActiveKey="/home" as="ul">
        <Nav.Item as="li">
          <NavLink to="/">Home</NavLink>
        </Nav.Item>
        <Nav.Item as="li">
          <NavLink to="post/add">Add Post</NavLink>
        </Nav.Item>
        <Nav.Item as="li">
          <NavLink to="">log in</NavLink>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Header;
