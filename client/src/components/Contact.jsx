import React from "react";
import { Container, Table, Row, Col } from "react-bootstrap";
import { FaPhoneAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <>
      <Container style={{ marginTop: "10px" }}>
        <Row>
          <Col md={6}>
            <h1>Contact Us Anywhere</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              aliquid sunt reprehenderit ea voluptates dolores eveniet nostrum
              rerum tenetur ullam minima laboriosam expedita dicta ipsam et cum
              explicabo, vel animi quasi illum! Impedit labore aspernatur culpa
              dolore earum. Id quia eaque possimus velit est rem blanditiis eius
              vitae ea consequuntur nobis magnam quo tempore dolores porro,
              saepe harum exercitationem. Accusamus itaque adipisci nulla
              perspiciatis dicta aspernatur laudantium molestiae, fuga, possimus
              ex ducimus assumenda optio totam, consequatur quas nisi molestias
              ipsa blanditiis praesentium cum alias facilis ullam illo neque.
              Necessitatibus dignissimos magni laboriosam explicabo optio!
              Minima impedit fuga optio ea soluta itaque accusamus ratione non
              sunt eveniet, voluptatem explicabo, eligendi ex veniam culpa.
              Explicabo quidem praesentium, quas vel et, dolore animi harum
              repudiandae eaque tenetur voluptatum nesciunt? Inventore facere
              quisquam eaque reprehenderit velit quo assumenda autem aliquam
              neque? Asperiores, temporibus iure numquam delectus omnis dolorum
              eius unde! Numquam harum incidunt vero qui nobis facere
              voluptates? Fugit atque velit ullam. Voluptas magnam illum
              assumenda perspiciatis expedita accusamus dolore eius modi
              corporis architecto vero placeat alias perferendis omnis sequi
              provident sed rem nisi hic, tempore ab. Natus nihil modi, quam
              molestiae ipsa repellendus! Ab similique earum voluptatibus. Natus
              repudiandae pariatur aut a aspernatur?
            </p>

            <Table bordered hover size="sm" className="text-center">
              <tbody>
                <tr>
                  <td>
                    <FaPhoneAlt />
                  </td>
                  <td>Phone</td>
                  <td>0968-5632-4563</td>
                </tr>
                <tr>
                  <td>
                    <FaPhoneAlt />
                  </td>
                  <td>Phone</td>
                  <td>0968-5632-4563</td>
                </tr>
                <tr>
                  <td>
                    <FaPhoneAlt />
                  </td>
                  <td>Phone</td>
                  <td>0968-5632-4563</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Contact;
