import React from "react";

const Location = (name, country, temp, desc, humid, inF) => {
  desc = desc.toUpperCase();
  return { name, country, temp, desc, humid, inF };
};

export default Location;
