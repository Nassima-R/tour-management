import React from "react";
import TourCard from "../../shared/TourCard";
import { Col } from "reactstrap";
import useFetch from './../../hooks/useFetch';
import { BASE_URL } from './../../utils/config';

const FeaturedTourList = () => {
  // Récupérer les données du serveur en utilisant le hook useFetch
  const { data: FeaturedTours, loading, error } = useFetch(`${BASE_URL}/tours/search/getFeaturedTours`);

  return (
    <>
      {/* Chargement */}
      {loading && <h4>Loading...</h4>}

      {/* Erreur */}
      {error && <h4 style={{ color: 'red' }}>{error}</h4>}

      {/* Affichage des données */}
      {!loading && !error && Array.isArray(FeaturedTours) && FeaturedTours.length > 0 ? (
        FeaturedTours.map((tour) => (
          <Col lg="3" className="mb-4" key={tour._id}>
            <TourCard tour={tour} />
          </Col>
        ))
      ) : (
        <h4>No featured tours available.</h4>
      )}
    </>
  );
};

export default FeaturedTourList;
