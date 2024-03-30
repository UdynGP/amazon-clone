import React from "react";
import Layout from "../../components/Layout/Layout";
import about from "../../images/aboutus.jpg";
import "./About.css";

const About = () => {
  return (
    <Layout>
      <div className="aboutus">
        <div>
          <img src={about} alt="aboutus" className="aboutus__image" />
        </div>
        <div className="aboutus__content">
          <p>
            <strong>Amazon.com, Inc.</strong>, doing business as Amazon, is an
            American multinational corporation and technology company focusing
            on e-commerce, cloud computing, online advertising, digital
            streaming, and artificial intelligence. It is considered one of the
            Big Five American technology companies; the other four are Alphabet,
            Apple, Meta, and Microsoft.
          </p>
          <p>
            Amazon was founded on July 5, 1994, by Jeff Bezos from his garage in
            Bellevue, Washington. The company initially was an online
            marketplace for books, but incrementally expanded into a multitude
            of product categories, a strategy that has earned it the moniker
            "The Everything Store".
          </p>
          <p>
            Amazon has a reputation as a disruptor of industries through
            technological innovation and aggressive reinvestment of profits into
            capital expenditures. As of 2023, it is the world's largest online
            retailer and marketplace, smart speaker provider, cloud computing
            service through AWS, live-streaming service through Twitch, and
            Internet company as measured by revenue and market share. In 2021,
            it surpassed Walmart as the world's largest retailer outside of
            China, driven in large part by its paid subscription plan, Amazon
            Prime, which has close to 200 million subscribers worldwide. It is
            the second-largest private employer in the United States.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
