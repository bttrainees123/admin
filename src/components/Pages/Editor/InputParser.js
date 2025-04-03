import React, { useEffect, useState } from 'react';
import parse from 'react-html-parser';

const InputParser = () => {
    const [htmlString, setHtmlString] = useState("");

    useEffect(() => {
        HtmlParserComponent()
    }, []);

    const HtmlParserComponent = (htmlString ) => {
        return <div>{parse(htmlString)}</div>;
    };

    return (
        <>
        <form>
            <div className="form-group">
              <label>Input Text: </label><br />
              <textarea className="form-control" value={htmlString || ""} name="comment" onChange={(e) => setHtmlString(e.target.value)} placeholder="Enter your HTML here..." />
            </div>
            <div className="button-section">
          <p>{HtmlParserComponent(htmlString)}</p>
        </div>
        </form>
        </>
        
    );
};

export default InputParser;
