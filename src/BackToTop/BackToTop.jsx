import React from "react";
import "./BackToTop.css";
const BackToTop = () => {
  return (
    <div>
      <div
        className="backtoTop-container shadow"
        onClick={() => window.scrollTo(0, 0)}
      >
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC70lEQVR4nO2Z2WsUQRCHx2g0GvGOUTCCqIgGdY0bNSoiQQyKCOZN8NEHwT9E8EFfBPFRRDzXMyYaT1QQFW8UREG8It668Ub4pGFCxknV7s5sT7IT5gf7slNTVd9Wd1d3r+MkSpQoUaL+KGCg+Tj9AGI3cBAY5MQYYg/dOgSUO3ESUA5kPBDxgwEGA0fRdbjkYYAhwHHyK1OyMMBQoF1IuhP4FgsYYBhwVkj2C9AALAWywvMWU0WnFARUAhcUiEUeOw3mVJ/DAMOBi0Jyn4EFgv2SkoMBRgLXhKQ+Aekc72kwrUBFb0OMAq4LybwFZhfw/mLga5/CAOOAO0ISHcBMwb7KfAJUpiXyYQaMB+4Lwd8As5TK3QLumR9AeN6gVKYtssoA1cADIegLYJoCcdNjdxcYK9jNd+eVX6etwwATgIdCsOfAVGUhkOaQGZJjFJiPgv0Z02htQdQAT4Qgz4ApSl+5jK7bwGjhvbrIYIDJwFPB+WNgktLhL5FfZtkeEQCmPTSMGTLu0PHrETAxAMQr4KXw/VXTUAU/9W5DtQMDNAG/fc7MZK9WNoznlCV5BjAdeC08N0OwUvCXVhaAjYFBXIergF+eVadKOX+Ytd+vd0Ctx06DuaJUJgV88NhtCwXhcdgM3FD6gIE4IST3XurwbnU6AlQm5cJsLwrC47BMOc4eE5IykzWVw1etWy1pdaoQ7GusQOS4WNinbN3rC3h/jlu1gmCihNgrJGG2GgsD+JnrmwNdauuNvVaZ74qnS+YouyyEv5TSN1ojgwEGALuEoN+B5UX4nafAHLF+pnchdgrBfgCNFvzXKX0jY+2G0oXYIQQxzXK1lSDdW/qscqlXPAywVYFYY4Wg58kxK8Q7UBQMsEVw+gdYa5Wg58mxU4i7P9StPrBJgVgXCcH/sRvd+efX5jDOzLnivMfJX2B9JJnL8Vf4YE6GXpI9N4gGYoP1bPPHXwn8tHKL727Rm6xlFzx+OrZ/EiVKlChRIicu+gdHYymgoKMdmwAAAABJRU5ErkJggg=="
          alt="double-up"
        />
      </div>
    </div>
  );
};

export default BackToTop;
