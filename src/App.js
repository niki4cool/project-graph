import { useCallback, useEffect, useRef, useState } from "react";
import { ForceGraph2D, ForceGraph3D } from "react-force-graph";

import DummyData from "./data.json";

import Button from "./Button";
import Info from "./Info";
import Menu from "./Menu";
import Panel from "./Panel";
import Toolbar from "./Toolbar";

import "./styles.css";

const myInitialData = {
  nodes: [
    {
      id: 1341021,
      user: "name1",
      val: 4
    },
    {
      id: 4062045,
      user: "name2",
      val: 4
    }
  ],
  links: [
    {
      source: 1341021,
      target: 4062045
    }
  ]
};

const nodeToAdd = {
  id: 1346410,
  user: "name3",
  val: 4
};

const applyAnalytics = (data) => {
  const nodes = data.nodes.map((node) => {
    return {
      ...node,
      val: Math.floor(Math.random() * 6) + 1
    };
  });

  const links = data.links.map((link) => {
    return {
      ...link,
      width: 2
    };
  });

  return { ...data, nodes, links };
};

export default function App() {
  // const testData = myInitialData;
  const testData = applyAnalytics(myInitialData);

  const [myData, setMyData] = useState(DummyData);
  const [menuData, setMenuData] = useState(false);
  const [panelData, setPanelData] = useState(false);
  const [is3D, setIs3D] = useState(false);

  const refGraph = useRef();

  const handleOnClickRemoveNode = useCallback(() => {
    if (myData.nodes.find((node) => node.id === nodeToAdd.id)) {
      const links = myData.links.filter(
        (link) =>
          link.source.id !== nodeToAdd.id && link.target.id !== nodeToAdd.id
      );

      setMyData({
        ...myData,
        nodes: myData.nodes.filter((node) => node.id !== nodeToAdd.id),
        links
      });
    }
  }, [myData]);

  const jumpToNode = useCallback(
    (refGraph, node) => {
      if (is3D) {
        const distance = 256;
        const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

        refGraph.current.cameraPosition(
          {
            x: node.x * distRatio,
            y: node.y * distRatio,
            z: node.z * distRatio
          },
          node,
          1500
        );
      } else {
        refGraph.current.centerAt(node.x, node.y, 1500);
      }
    },
    [is3D]
  );

  const handleOnClickAddNodePanel = useCallback((node) => {
  const nodeToJumpTo = myData.nodes.find(
        (node) => node.id
      );
      setMyData({
        ...myData,

        links: [
          ...myData.links,
          {
            target: 1346410,
            source: nodeToJumpTo.id,
            width: 0
          }
        ]
      });
       },
       [myData, refGraph, jumpToNode]);


  const handleOnClickAddNode = useCallback(() => {
    const nodeToJumpTo = myData.nodes.find(
      (node) => node.id === myData.nodes[1].id
    );

    jumpToNode(refGraph, nodeToJumpTo);

    if (!myData.nodes.find((node) => node.id === nodeToAdd.id)) {
      setMyData({
        ...myData,
        nodes: [...myData.nodes, nodeToAdd],
        links: [
          ...myData.links

        ]
      });
    }
  }, [myData, refGraph, jumpToNode]);

  const handleOnClickNode = useCallback((node) => {
    setMenuData(false);
    setPanelData({ ...node });
  }, []);

  const handleOnRightClickNode = useCallback((node, event) => {
    setMenuData({
      positionX: event.pageX,
      positionY: event.pageY
    });
  }, []);

  const handleOnClickBackGround = useCallback((e) => {
    setMenuData(false);
  }, []);

  const handleOnRightClickBackGround = useCallback(() => {
    setMenuData(false);
  }, []);

  const handleOnclickClosePanel = useCallback(() => {
    setPanelData(false);
    setMenuData(false);
  }, []);

  const handleOnclickJumpToNode = useCallback(
    (node) => {
      jumpToNode(refGraph, node);
    },
    [refGraph, jumpToNode]
  );

  const handleOnClickToggle3D = useCallback(() => {
    setIs3D(!is3D);
  }, [is3D]);

  const Space = is3D ? ForceGraph3D : ForceGraph2D;

  return (
    <div className="App">
      <Space
        ref={refGraph}
        graphData={myData}
        nodeAutoColorBy={(node) => node.user}
        onNodeClick={handleOnClickNode}
        onNodeRightClick={handleOnRightClickNode}
        onBackgroundClick={handleOnClickBackGround}
        onBackgroundRightClick={handleOnRightClickBackGround}
        nodeVal={(node) => node.val || 0}
        nodeLabel={(node) => node.user}
        onNodeDragEnd={(node) => {
          node.fx = node.x;
          node.fy = node.y;
          node.fz = node.z;
        }}
        linkDirectionalParticles={2}
        linkDirectionalParticleWidth={(link) => {
          return link.width;
        }}
      />
      {panelData && (
        <Panel
          node={panelData}
          onClickClose={handleOnclickClosePanel}
          onClickJumpToNode={handleOnclickJumpToNode}
          addNode={handleOnClickAddNodePanel}
        />
      )}
      {menuData && (
        <Menu positionX={menuData.positionX} positionY={menuData.positionY} />
      )}
      <Toolbar>
        <Button onClick={handleOnClickAddNode}>Добавить точку</Button>
        <Button onClick={handleOnClickRemoveNode}>Удалить точку</Button>
      </Toolbar>
      <Info countNodes={myData.nodes.length} countLinks={myData.links.length} />
    </div>
  );
}
