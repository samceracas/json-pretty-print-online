import React, { Component } from "react";
import JSONParser from "../lib/json-parser";
import parse from "html-react-parser";
import hljs from "highlight.js/lib/core";
import copy from "copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import { LocalStorage } from "node-localstorage";
import { BsClipboard } from "react-icons/bs";


import "react-toastify/dist/ReactToastify.css";
import "highlight.js/styles/xcode.css";
import "../css/json-markup.css";
import "../css/home.css";

export default class Home extends Component {
  constructor() {
    super();

    if (!global.localStorage) {
      global.localStorage = new LocalStorage("./scratch");
    }

    this.state = {
      input_text: "",
      output_text: "",
    };

    hljs.registerLanguage("json", require("highlight.js/lib/languages/json"));
    if (localStorage.getItem("json")) {
      this.state.input_text = localStorage.getItem("json");
      this.parseJSON(this.state.input_text, true);
    }
  }

  handleInputChange(event) {
    let json = event.target.value;

    this.setState({ output_text: "" });
    this.setState({
      input_text: json,
    });

    if (json.length <= 0) return;

    this.parseJSON(json);
  }

  parseJSON(json, onInit = false) {
    let parseData = JSONParser.parseAndBeautify(json);
    if (parseData.success) {
      localStorage.setItem("json", parseData.rawOutput);
    }
    if (!onInit) {
      this.setState({
        output_text: parseData.success
          ? hljs.highlight("json", parseData.rawOutput).value
          : parseData.htmlOutput,
      });
    } else {
      // eslint-disable-next-line
      this.state.output_text = parseData.success
        ? hljs.highlight("json", parseData.rawOutput).value
        : parseData.htmlOutput;
    }
  }

  setClipboard() {
    let parseData = JSONParser.parseAndBeautify(this.state.input_text);
    if (parseData.success) {
      copy(parseData.rawOutput);
      toast.success("Copied to clipboard!", {
        hideProgressBar: true,
      });
    } else {
      toast.error(
        "Could not copy output due to format errors. Please fix your JSON text.",
        {
          hideProgressBar: true,
        }
      );
    }
  }

  render() {
    return (
      <div className="container mx-auto h-full">
        <ToastContainer />
        <div className="w-full p-2 h-full">
          <div className="text-center p-5">
            <h1>JSON Prettify Online</h1>
            <p className="p-3">
              A simple lightweight online tool to prettify <b>JSON</b> text.{" "}
              <br /> Simply paste your <b>JSON</b> text on the input to
              prettify!
            </p>
          </div>

          <div className="flex mb-4">
            <div className="w-1/2 p-2">
              <div className="py-2">
                <h1 className="p-1">Input</h1>
              </div>
              <textarea
                value={this.state.input_text}
                placeholder="Paste your JSON text here to prettify"
                className="form-input shadow appearance-none border w-full rounded p-2 resize-none leading-tight focus:outline-none focus:shadow-outline"
                onChange={(event) => this.handleInputChange(event)}
              >{this.state.input_text}</textarea>
            </div>
            <div className="w-1/2 p-2 h-full">
              <div className="flex justify-between py-2">
                <h1 className="p-1">Output</h1>
                <button
                  onClick={() => this.setClipboard()}
                  className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                >
                  <BsClipboard />
                </button>
              </div>
              <pre
                suppressContentEditableWarning="true"
                className="shadow p-3 w-full h-full rounded border code-output focus:outline-none focus:shadow-outline"
                contentEditable="true"
              >
                {parse(this.state.output_text)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
