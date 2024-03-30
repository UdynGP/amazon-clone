import React from "react";
import Layout from "../../components/Layout/Layout";
import policy from "../../images/policy.jpg";
import "./Policy.css";

const Policy = () => {
  return (
    <Layout>
      <div className="policy">
        <div>
          <img src={policy} alt="policy" className="policy__image" />
        </div>
        <div className="policy__content">
          <p>
            We know that you care how information about you is used and shared,
            and we appreciate your trust that we will do so carefully and
            sensibly. This Privacy Notice describes how Amazon Seller Services
            Private Limited and its affiliates including Amazon.com, Inc.
            (collectively "Amazon") collect and process your personal
            information through Amazon websites, devices, products, services,
            online marketplace and applications that reference this Privacy
            Notice (together "Amazon Services").
          </p>
          <p>
            By using Amazon Services you agree to our use of your personal
            information (including sensitive personal information) in accordance
            with this Privacy Notice, as may be amended from time to time by us
            at our discretion. You also agree and consent to us collecting,
            storing, processing, transferring, and sharing your personal
            information (including sensitive personal information) with third
            parties or service providers for the purposes set out in this
            Privacy Notice.
          </p>
          <p>
            Personal information subject to this Privacy Notice will be
            collected and retained by Amazon, with a registered office at 8th
            floor, Brigade Gateway 26/1 Dr. Rajkumar Road Bangalore Karnataka
            560055 India.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
