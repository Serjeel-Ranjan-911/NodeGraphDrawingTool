import style from "./Header.module.scss";
const Header = (props) => {
    return (
        <header ref={props.topTitle} className={style.head}>
            <img src="./logo.svg" alt="logo" />
            <h1>Node Graph Visualizer</h1>
            <p>Easily visualize your node graph here! Just give input and interact with graph</p>
        </header>
    );
};

export default Header;
