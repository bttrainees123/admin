import React, { useEffect, useState } from 'react';
import parse from 'react-html-parser';
import ReactEditor from "react-text-editor-kit";
import Sideer from '../../sider/Sideer';
import Header from '../../Header/Header';

const InputParser = () => {
    const [htmlString, setHtmlString] = useState("");
    const [value, setValue] = useState("");

    const handleChange = (value) => {
        setValue(value);
    };

    useEffect(() => {
        HtmlParserComponent()
    }, []);

    const HtmlParserComponent = (htmlString) => {
        return <div>{parse(htmlString)}</div>;
    };
    const showFile = async (e) => {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => {
            const text = (e.target.result)
            setHtmlString(text)
            //   alert(text)
        };
        reader.readAsText(e.target.files[0])
    }


    return (
        <>
            {/* <form>
                <div className="form-group">
                    <label>Input Text: </label><br />
                    <textarea className="form-control" value={htmlString || ""} name="comment" onChange={(e) => setHtmlString(e.target.value)} placeholder="Enter your HTML here..." />
                </div>
                <div className="button-section">
                    <p>{HtmlParserComponent(htmlString)}</p>
                </div>
            </form>
            <div>
                <input type="file" onChange={(e) => showFile(e)} />
            </div> */}
            <div className="main_container">
                <div className="limani_body">
                    <Sideer />
                    <div className="intersight_content">

                        <div className="body_content">
                            <Header />
                            <div >
                                <ReactEditor

                                    value={value}
                                    onChange={handleChange}
                                    mainProps={{ className: "red" }}
                                    placeholder="Write your text here"
                                />
                                <p>{value}</p>
                                <p>{HtmlParserComponent(value)}</p>
                                <div dangerouslySetInnerHTML={{ __html: value }}></div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default InputParser;
