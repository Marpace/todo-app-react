import React from "react";


function LoadingScreen(props) {
    return (
        <div className={`loading-screen ${props.state}`}>
            <div className="loading-screen__spinner">
                <div className="inner-spinner"></div>
            <h3>Loading</h3>
            </div>
        </div>
    );
}





export default LoadingScreen;