import React from 'react';
import { Helmet } from 'react-helmet';
import favicon from '../../img/favicon.png';

const Header = () => {
  return (
    <Helmet>
      <meta charset='UTF-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <title>ReeR: We got your back:&gt;</title>
      <link
        rel='stylesheet'
        href='https://use.fontawesome.com/releases/v5.15.1/css/all.css'
        integrity='sha384-vp86vTRFVJgpjF9jiIGPEEqYqlDwgyBgEF109VFjmqGmIY/Y4HV4d3Gp2irVfcrp'
        crossorigin='anonymous'
      />
      <link rel='icon' src={favicon} />
      <link rel='preconnect' href='https://fonts.gstatic.com' />
      <link
        href='https://fonts.googleapis.com/css2?family=Raleway:wght@200;300;400;500;600&family=Pacifico&display=swap'
        rel='stylesheet'
      />
    </Helmet>
  );
};
export default Header;
