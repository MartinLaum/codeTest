import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";

const Footer = () => {
  return (
    <MDBFooter bgColor="light" className="text-center text-lg-start text-muted">
      <section className="">
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <MDBIcon icon="gem" className="me-3" />
                React-Bootstrap Demo
              </h6>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus sodales id ipsum ac hendrerit. Praesent vitae diam
                suscipit, molestie tellus non, egestas turpis.
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Products</h6>
              <p>
                <a href="#!" className="text-reset">
                  Lorem
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Ipsum
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Lorem
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Ipsum
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
              <p>
                <a href="#!" className="text-reset">
                  Lorem
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Ipsum
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Lorem
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Ipsum
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                New York, NY 10012, US
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                info@example.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> + 01 234 567 88
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" /> + 01 234 567 89
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2023
      </div>
    </MDBFooter>
  );
};

export default Footer;
