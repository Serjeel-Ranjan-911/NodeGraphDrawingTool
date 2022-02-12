import { useState } from "react";
import Link from "@mui/material/Link";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { AiFillCloseCircle } from "react-icons/ai";
import style from "./InputFormat.module.scss";

const InputFormat = (props) => {
    const [modalToggle, setModalToggle] = useState(false);
    return (
        <>
            <Link underline="hover" onClick={() => setModalToggle(!modalToggle)}>
                Input Format?
            </Link>

            <Modal
                className={style.modal}
                open={modalToggle}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={style.box}>
                    <p>The input format is similar to how many competative programming website give console inputs for graphs and trees</p>
                    <p>First line should be number of nodes(n) and number of edges(m)</p>
                    <p>Rest of the m lines contain info about each edge</p>
                    <p>a b c</p>
                    <p>Above statement implies there is an edge from node a to b with a weight of c where weight is optional</p>
                    <p>Note : currently all nodes are 1-based</p>
                    <p>Example:
                    <br/>  
                    10 10<br/>
                    1 2<br/>
                    2 3<br/>
                    3 4<br/>
                    4 5<br/>
                    5 6<br/>
                    6 7<br/>
                    7 8<br/>
                    8 9<br/>
                    9 10<br/>
                    10 1<br/>
                    </p>
                    <p>This is a graph with 10 nodes and 10 edges connecting them in circle</p>
                    <AiFillCloseCircle
                        className={style.closeIcon}
                        onClick={() => setModalToggle(!modalToggle)}
                    ></AiFillCloseCircle>
                </Box>
            </Modal>
        </>
    );
};

export default InputFormat;
