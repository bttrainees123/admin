import React from 'react';
import parse from 'react-html-parser';

const HtmlParserComponent = ({ htmlString }) => {
  return <div>{parse(htmlString)}</div>;
};

export default HtmlParserComponent;
