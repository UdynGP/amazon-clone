import React from "react";
import Layout from "../../components/Layout/Layout";
import contact from "../../images/contactus.jpg";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
import "./Contact.css";

const Contact = () => {
  return (
    <Layout>
      <div className="contactus">
        <div className="contactus__image">
          <img src={contact} alt="contactus" />
        </div>
        <div className="contactus__content">
          <h1>CONTACT US</h1>
          <p>
            Any query or information about the product feel free to call
            anytime. Customer support is provided 24x7.
          </p>
          <p>
            <BiMailSend /> : support@amazon.com
          </p>
          <p>
            <BiPhoneCall /> : 012-3456789
          </p>
          <p>
            <BiSupport /> : 1-888-280-4331 (toll free)
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
