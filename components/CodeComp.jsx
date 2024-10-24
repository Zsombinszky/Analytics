import React, { useEffect } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/sunburst.css"; // Choose the theme you like

const CodeComp = () => {
    const codeString = `"https://analytics-chi-murex.vercel.app/api/events";
  const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer {{apiKey}}",
  };
  const eventData = {
      name: "",  //* required
      domain: "",  //* required
      description: "",  // optional
  };
  const sendRequest = async () => {
      axios.post(url, eventData, {headers}).then().catch((error) => {
          console.error("Error:", error)
      });
  };`;

    useEffect(() => {
        hljs.highlightAll();
    }, []);

    return (
        <pre>
      <code className="javascript">{codeString}</code>
    </pre>
    );
};

export default CodeComp;
