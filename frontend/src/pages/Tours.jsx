import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import CommonSection from "../shared/CommonSection";
import "../styles/tour.css";
import tourData from "../assets/data/tours";
import SearchBar from "./../shared/SearchBar";
import TourCard from "./../shared/TourCard";
import Newsletter from "./../shared/Newsletter";

const Tours = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0); // Start with page 1


  useEffect(() => {
    // Simulating fetching data from backend to determine pageCount
    const pages = Math.ceil(5 / 4); // Assuming 4 items per page
    setPageCount(pages);
  }, [page]);


  const handlePageClick = (pageNumber) => {
    setPage(pageNumber + 1); // pageNumber is zero-based, so increment by 1 for actual page number
  };

  return (
    <>
      <CommonSection title={"Tour Search Result"} />
      <section>
        <Container>
          <Row>
            <SearchBar />
          </Row>
        </Container>
      </section>
      <section className="pt-0">
        <Container>
          <Row>
            {tourData
              ?.slice((page - 1) * 4, page * 4) // Displaying 4 tours per page
              .map((tour) => (
                <Col lg="3" className="mb-4" key={tour.id}>
                  <TourCard tour={tour} />
                </Col>
              ))}
            <Col lg="12">
              <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                {[...Array(pageCount).keys()].map((number) => (
                  <span
                    key={number}
                    onClick={() => handlePageClick(number)}
                    className={`pagination-number ${
                      page === number + 1 ? "active" : ""
                    }`}
                  >
                    {number + 1}
                  </span>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Newsletter/>
    </>
  );
};

export default Tours;
