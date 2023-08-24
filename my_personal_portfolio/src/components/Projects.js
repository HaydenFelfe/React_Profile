import { Col, Container, Tab, Row, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import projImg1 from "../assets/img/theworkoutforum.png";
import projImg2 from "../assets/img/workoutForumscreenshot.png";
import projImg3 from "../assets/img/helpinghomeless.png";

export const Projects = () => {
  const projects = [
    {
      title: "Business Startup",
      description: "Design & Development",
      imgUrl: projImg1,
    },
    {
      title: "Business Startup",
      description: "Design & Development",
      imgUrl: projImg2,
    },
    {
      title: "Business Startup",
      description: "Design & Development",
      imgUrl: projImg3,
    },
  ];
  return (
    <section className="project" id="project">
      <Container>
        <Row>
          <Col>
            <h2>Projects</h2>
            <p>
              DEFAULT DEFAULT DEFAULT DEFAULT DEFAULT DEFAULT DEFAULT DEFAULT
              DEFAULT DEFAULT DEFAULT DEFAULT DEFAULT{" "}
            </p>
            <Tab.Container id="project-tabs" defaultActiveKey="first">
              <Nav variant="pills" className="nav-pills mb-5">
                <Nav.Item>
                  <Nav.Link eventKey="first">Front & Back End</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Front End</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third">Tab Three</Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <Row className="row">
                    {projects.map((project, index) => {
                      if (project.imgUrl === projImg2) {
                        return <ProjectCard key={index} {...project} />;
                      }
                      return null;
                    })}
                  </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  {" "}
                  <div className="d-flex justify-content-center align-items-center">
                    <img
                      src={projImg3}
                      alt="Project Image"
                      style={{ width: "50%", height: "auto" }}
                    />
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="third">Hayden Felfe</Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
