import style from "./NodeGraph.module.scss";
import { useEffect, useRef, useState } from "react";
import Graph from "react-graph-vis";
import Header from "../Header/Header.js";
import g1 from "./SampleGraphs/g.json";
import Button from "@mui/material/Button";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { AiFillGithub } from "react-icons/ai";
import { RiFullscreenFill } from "react-icons/ri";

import InputFormat from "./InputFormat/InputFormat.js";

import { createTheme } from "@mui/material/styles";

var directed = false;
var fullScreen = false;

const theme = createTheme({
    palette: {
        primary: {
            light: "#5833ff",
            main: "#2200bb",
            dark: "#170080",
            contrastText: "#fff",
        },
        secondary: {
            light: "#ff87ca",
            main: "#ff60b8",
            dark: "#b80066",
            contrastText: "#fff",
        },
    },
});

var canvas = null;
var ctx = null;
var network = null;

const NodeGraph = (props) => {
    const canvasRef = useRef(null);
    const textInput = useRef(null);

    const topTitle = useRef(null);
    const leftMenu = useRef(null);
    const rightMenu = useRef(null);

    var pos = { x: 0, y: 0 };
    var graph = {
        nodes: [
            { id: 1, label: " 1" },
            { id: 2, label: " 2" },
            { id: 3, label: " 3" },
        ],
        edges: [
            { from: 1, to: 2, label: "10", arrows: { to: true } },
            { from: 2, to: 3, label: "20", arrows: { to: false } },
            { from: 1, to: 3, label: "30", arrows: { to: false } },
        ],
    };

    const parseInput = (input) => {
        try {
            input = input.trim().split("\n");
            let [n, m] = input[0].split(" ").map((i) => parseInt(i));
            if (isNaN(n)) throw Error("Please Give numbers");
            // if (m !== input.length - 1)
            //     //check if number of correct edges are given
            //     throw Error("Number of edges mismatch");

            let nodes = [];
            for (let i = 1; i <= n; i++) {
                nodes.push({
                    id: i,
                    label: " " + i,
                });
            }

            let edges = [];

            for (let i = 1; i < input.length; i++) {
                let [a, b, c] = input[i].split(" ").map((i) => parseInt(i));
                if (!(a && b)) throw Error("Please give all edges");
                if (a > n || b > n) throw Error("Wrong node value given");
                edges.push({
                    from: a,
                    to: b,
                    label: c ? "" + c : null,
                    arrows: { to: directed },
                });
            }
            graph = { nodes, edges };
            network.setData(graph);
            setFeedback(true, "Success &#10003;");
        } catch (err) {
            console.log(err);
            setFeedback(false, err.message);
        }
    };

    const setFeedback = (status, text) => {
        const feed = document.getElementById("feedback");
        feed.innerHTML = text;
        if (status) {
            feed.style.color = "#6dff37";
        } else {
            feed.style.color = "#ff6565";
        }
    };

    let options = {
        layout: {
            hierarchical: false,
        },
        edges: {
            color: "#3e0080",
            width: 2.5,
            font: {
                color: "#ff0866",
                size: 20,
            },
        },
        nodes: {
            borderWidth: 1,
            color: {
                background: "#ff0866",
                border: "#ff96bf",
                highlight: {
                    background: "#ff619d",
                    border: "#ff96bf",
                },
            },
            font: {
                color: "#f9f0ff",
                size: 20,
            },
            shape: "circle",
        },
        physics: {
            enabled: true,
        },
        interaction: {
            multiselect: false,
            dragView: false,
            dragNodes: true,
        },
    };

    useEffect(() => {
        canvas = canvasRef.current.Network.canvas.frame.canvas;
        canvas.width = window.innerWidth;
        canvas.height = window.innerWidth;
        ctx = canvas.getContext("2d");
        resize();
        window.addEventListener("resize", resize);
        document.addEventListener("mousemove", draw);
        document.addEventListener("mousedown", setPosition);
        document.addEventListener("mouseenter", setPosition);
    }, []);

    function resize() {
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
    }

    function setPosition(e) {
        pos.x = e.clientX;
        pos.y = e.clientY;
    }

    function draw(e) {
        if (e.buttons !== 1) return;

        ctx.beginPath(); // begin

        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.strokeStyle = "#37ed00";

        ctx.moveTo(pos.x, pos.y); // from
        setPosition(e);
        ctx.lineTo(pos.x, pos.y); // to
        ctx.stroke(); // draw it!
    }

    const fullScreenToggle = async () => {
        if (!fullScreen) {
            try {
                fullScreen = true;
                let el = document.body;
                let requestMethod =
                    el.requestFullScreen ||
                    el.webkitRequestFullScreen ||
                    el.mozRequestFullScreen ||
                    el.msRequestFullScreen;
                await requestMethod.call(el);
            } catch (err) {}

            topTitle.current.style.display = "none";
            leftMenu.current.style.display = "none";
            rightMenu.current.style.display = "none";
        } else {
            try {
                fullScreen = false;
                if (document.exitFullscreen) {
                    await document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    await document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    await document.msExitFullscreen();
                }
            } catch (err) {}

            topTitle.current.style.display = "block";
            leftMenu.current.style.display = "block";
            rightMenu.current.style.display = "block";
        }
    };

    return (
        <>
            <a href="https://github.com/Serjeel-Ranjan-911" target="_blank">
                <AiFillGithub className={style.github}></AiFillGithub>
            </a>
            <RiFullscreenFill className={style.fullScreen} onClick={fullScreenToggle}></RiFullscreenFill>
            <Header topTitle={topTitle} />

            <main ref={leftMenu} className={style.main}>
                <div>
                    <Button
                        className={style.button}
                        theme={theme}
                        variant="outlined"
                        onClick={() => {
                            let temp = g1[parseInt(Math.random() * g1.length)].graphinput;
                            parseInput(temp);
                            textInput.current.value = temp;
                        }}
                    >
                        Sample Graph
                    </Button>
                </div>
                <InputFormat />

                <p>Input here &darr;</p>
                <textarea
                    ref={textInput}
                    cols="12"
                    rows="15"
                    placeholder="n m
                1 2
                2 3
                3 4 
            "
                    onChange={(e) => parseInput(e.target.value)}
                ></textarea>

                <p id="feedback"></p>
            </main>

            <Graph
                ref={canvasRef}
                graph={graph}
                options={options}
                getNetwork={(net) => {
                    network = net;
                }}
            />

            <div ref={rightMenu} className={style.rightMenu}>
                <div className={style.switchButton}>
                    <FormControlLabel
                        control={
                            <Switch
                                theme={theme}
                                color="primary"
                                onChange={() => {
                                    options.interaction.dragNodes = !options.interaction.dragNodes;
                                    network.setOptions(options);
                                }}
                            />
                        }
                        label="Lock Nodes"
                    />
                </div>
                <div className={style.switchButton}>
                    <FormControlLabel
                        control={
                            <Switch
                                theme={theme}
                                color="primary"
                                onChange={() => {
                                    options.layout.hierarchical = !options.layout.hierarchical;
                                    network.setOptions(options);
                                }}
                            />
                        }
                        label="Heirarchy"
                    />
                </div>
                <div className={style.switchButton}>
                    <FormControlLabel
                        control={
                            <Switch
                                theme={theme}
                                color="primary"
                                defaultChecked
                                onChange={() => {
                                    options.physics.enabled = !options.physics.enabled;
                                    network.setOptions(options);
                                }}
                            />
                        }
                        label="Physics"
                    />
                </div>

                <ToggleButtonGroup
                    className={style.multiToggle}
                    exclusive
                    onChange={(e) => {
                        directed = e.target.value === "directed";
                        parseInput(textInput.current.value);
                    }}
                >
                    <ToggleButton className={style.multiToggleButton} value="directed">
                        Directed
                    </ToggleButton>
                    <ToggleButton className={style.multiToggleButton} value="undirected">
                        Undirected
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
        </>
    );
};

export default NodeGraph;
