import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import "./PageNotFound.css";

function PageNotFound() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Layout>
        <div className="pnf">
          <h1 className="pnf-title">404 ERROR</h1>
          <h1 className="pnf-heading">Oops ! Page Not Found</h1>
          <button className="pnf-btn" onClick={goBack}>
            Go Back
          </button>
        </div>
      </Layout>
    </>
  );
}

export default PageNotFound;
