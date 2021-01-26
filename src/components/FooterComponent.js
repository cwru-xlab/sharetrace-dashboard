import React from 'react';

function Footer(props) {
    return(
    <div className="footer">
        <div className="container">
            <div className="row justify-content-center">             
                <div className="col-4 col-sm-2">
                    <h5>Our Address</h5>
                    <address>
                      10900 Euclid Ave<br />
		              Cleveland, OH 44106<br />
		              United States<br />
                    </address>
                </div>
            </div>
            <br />
            <div className="row justify-content-center">             
                <div className="col-auto">
                    <p>@ Copyright ShareTrace</p>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Footer;