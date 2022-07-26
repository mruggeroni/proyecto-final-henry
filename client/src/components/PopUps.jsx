import React from "react";
import Nav from "react-bootstrap/Nav";

export default function PopUps() {
  return (
    <Nav fill variant="tabs" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link href="/home">Icon Fav</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1">Hola User.name</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2">Cart</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
