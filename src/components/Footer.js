import React, {useState} from 'react'
import { StaticQuery, graphql } from "gatsby"
import { icons } from "./Icons";
import {useInterval} from "../hooks/userInterval";


const Footer = () => {
  const [animationInterval, setAnimationInterval] = useState(0);

  useInterval(() => {
    setAnimationInterval(animationInterval < 6 ? animationInterval + 1 : 0);
  }, 2000);
  return (
    <StaticQuery
      query={graphql`
        query FooterQuery {
          contactJson {
            address {
              street
              street2
              city
              state
              zip
            }
            phone
            email
            instagram
          }
        }
      `}
      render={data => (
        <footer>
          <div className="container">
            <hr className="marginBottom-5" />
            <div className="paddingBottom-9
                            bp-1_grid-12col
                            bp-1_paddingBottom-11
                            bp-2_paddingBottom-41"
            >
              <div className={` colSpan-6
                                marginBottom-7
                                bp-1_marginBottom-0
                                layer-${ animationInterval }`}
              >
                { icons.footerGIFs }
              </div>
              <div className="f-footer-b
                              colSpan-3
                              marginBottom-5
                              bp-1_marginBottom-0"
              >                
                <b className="f-footer-a">Contact</b>
                <a href="https://goo.gl/maps/cxWiP9aLg6v" target="_blank" rel="noopener noreferrer">
                  <address className="f-footer-b">
                    {data.contactJson.address.street},
                    {" "}
                    {data.contactJson.address.street2}
                    <br />
                    {data.contactJson.address.city}, {data.contactJson.address.state}{" "}
                    {data.contactJson.address.zip}
                    <br />
                  </address>
                </a>
                –
                <div>
                  <a href={`mailto:${data.contactJson.email} `}>
                    {data.contactJson.email}
                  </a>
                </div>
                <div>
                  <a href={`tel:${data.contactJson.phone} `}>
                    {data.contactJson.phone}
                  </a>
                </div>
              </div>
              <div className="f-footer-b colSpan-3" style={{ display: "flex", flexDirection: "column" }}>
                <b className="f-footer-a">Social</b>
                <div>
                  <a href={`http://instagram.com/${data.contactJson.instagram}`} target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                </div>
                {data.contactJson.facebook && 
                  <div style={{ flex: 1 }}>
                    <a href={`http://facebook.com/${data.contactJson.facebook} `} target="_blank" rel="noopener noreferrer">
                      Facebook
                    </a>
                  </div>
                }
                <p className="marginTop-4 bp-1_marginTop-0">@ BC–OA {new Date().getFullYear()}</p>
              </div>
            </div>
          </div>
        </footer>
      )}
    />
  )
}

export default Footer
