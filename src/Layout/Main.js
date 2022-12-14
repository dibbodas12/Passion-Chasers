
import Header from "../pages/Shared/Header/Header";
import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import LeftSideNav from "../pages/Shared/LeftSideNav/LeftSideNav";

const Main = () => {
  return (
    <div>
      <Header></Header>
      <Container>
        <Row>
          <Col lg="4" className="d-none d-lg-block">
            <LeftSideNav></LeftSideNav>
          </Col>
          <Col lg="8">
            <Outlet></Outlet>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Main;
