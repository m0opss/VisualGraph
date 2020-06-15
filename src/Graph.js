import React from "react";
import "./App.css";
import * as go from "gojs";
import { ReactDiagram } from "gojs-react";


const initDiagram = () => {
  const $ = go.GraphObject.make; // for conciseness in defining templates

  const myDiagram = $(go.Diagram, {
    initialAutoScale: go.Diagram.Uniform, // an initial automatic zoom-to-fit
    contentAlignment: go.Spot.Center, // align document to the center of the viewport
    layout: $(go.LayeredDigraphLayout),
    model: $(go.GraphLinksModel, {
      linkKeyProperty: "key", // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
    }),
  });

  myDiagram.layout.direction = 90;
  myDiagram.layout.columnSpacing = 5;
  myDiagram.layout.layerSpacing = 100;

  const bluegrad = "#90CAF9";

  function necASconverter(nec) {
    if (nec) return bluegrad;
    return "orange";
  }
  
  myDiagram.nodeTemplate = $(
    go.Node,
    "Auto",
    { locationSpot: go.Spot.Center },
    $(
      go.Shape,
      "Rectangle",
      {
        fill: $(go.Brush, "Linear", { 0: "rgb(255, 255, 255)" }),
        stroke: "black",
      },
      new go.Binding("fill", "nec", necASconverter)
    ),
    $(
      go.TextBlock,
      { font: "bold 10pt helvetica, bold arial, sans-serif", margin: 4 },
      new go.Binding("text", "text")
    )
  );

  // replace the default Link template in the linkTemplateMap
  myDiagram.linkTemplate = $(
    go.Link, // the whole link panel

    // +_________________Ortogonal links
    // { routing: go.Link.Orthogonal, corner: 5, selectable: false },

    $(go.Shape, { strokeWidth: 1, stroke: "#424242" }),
    // $(go.Shape,  // the link shape
    //   { stroke: "black" }),
    $(
      go.Shape, // the arrowhead
      { toArrow: "standard", stroke: null }
    ),
    $(
      go.Panel,
      "Auto",
      // label for arrow
      // $(go.Shape,  // the label background, which becomes transparent around the edges
      //   {
      //     fill: $(go.Brush, "Linear", { 0: "rgb(255, 255, 255)", 0.3: "rgb(245, 218, 113)", 0.7: "rgb(245, 218, 113)", 1: "rgb(255, 255, 255)"}),
      //     stroke: null
      //   }),
      $(
        go.TextBlock, // the label text
        {
          textAlign: "center",
          font: "10pt helvetica, arial, sans-serif",
          stroke: "#555555",
          margin: 4,
        },
        new go.Binding("text", "text")
      )
    )
  );

  // myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
  return myDiagram;
};

const Graph = (props) => {
  return (
      <ReactDiagram
        divClassName="diagram-component"
        initDiagram={initDiagram}
        nodeDataArray={props.nodeDataArray}
        linkDataArray={props.linkDataArray}
      />

  );
};

export default Graph;
