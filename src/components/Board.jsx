    import "../styles/Board.css";
    import { useState, useEffect } from "react";
    function Board() {
        const matrices = [
            {
                mats1: [
                    ["", "", "", "", "", ""],
                    ["", "", "", "", "", ""],
                    ["", "", "moon", "moon", "", ""],
                    ["", "", "sun", "sun", "", ""],
                    ["", "", "", "", "", ""],
                    ["", "", "", "", "", ""],
                ],
                mats2: [
                    ["x", "", "", "", "="],
                    ["", "", "", "", ""],
                    ["x", "", "", "", "="],
                    ["=", "", "", "", "x"],
                    ["", "", "", "", ""],
                    ["x", "", "", "", "="]
                ],
                mats3: [
                    ["=", "", "=", "=", "","="],
                    ["", "", "", "", "",""],
                    ["", "", "", "", "",""],
                    ["", "", "", "", "",""],
                    ["x", "", "=", "=", "","x"],
                ]
            }
        ];
        
        

console.log(matrices);

        const [matIndex, setMatIndex] = useState(0); 
        const [mat1, setMat1] = useState(() => matrices[matIndex].mats1.map(row => [...row]));
        const [selectedItem, setSelectedItem] = useState(null);
        const [errorCells, setErrorCells] = useState(new Set());
        const [isCompleted, setIsCompleted] = useState(false);
        const [theme, setTheme] = useState("light");
        const [howPlay, setHowPlay] = useState(false);
        const mats1 = matrices[matIndex].mats1;
        const mats2 = matrices[matIndex].mats2;
        const mats3 = matrices[matIndex].mats3;

        const handleCellClick = (rowIndex, colIndex) => {
            if (!selectedItem || matrices[0].mats1[rowIndex][colIndex] !== "") return;
            
            const newMat1 = mat1.map(row => [...row]);
            newMat1[rowIndex][colIndex] = selectedItem;
            setMat1([...newMat1]);
        };

        const checkConstraints = (matrix) => {
            let invalidCells = new Set();
            const rowCount = matrix.length;
            const colCount = matrix[0].length;
        
            for (let i = 0; i < mats2.length; i++) {
                for (let j = 0; j < mats2[i].length; j++) {
                    if (j + 1 < matrix[i].length) { 
                        if (mats2[i][j] === "=" && matrix[i][j] && matrix[i][j + 1] && matrix[i][j] !== matrix[i][j + 1]) {
                            invalidCells.add(`${i}-${j}`).add(`${i}-${j + 1}`);
                        }
                        if (mats2[i][j] === "x" && matrix[i][j] && matrix[i][j + 1] && matrix[i][j] === matrix[i][j + 1]) {
                            invalidCells.add(`${i}-${j}`).add(`${i}-${j + 1}`);
                        }
                    }
                }
            }
        
            for (let i = 0; i < mats3.length; i++) {
                for (let j = 0; j < mats3[i].length; j++) {
                    if (i + 1 < matrix.length) { 
                        if (mats3[i][j] === "=" && matrix[i][j] && matrix[i + 1][j] && matrix[i][j] !== matrix[i + 1][j]) {
                            invalidCells.add(`${i}-${j}`).add(`${i + 1}-${j}`);
                        }
                        if (mats3[i][j] === "x" && matrix[i][j] && matrix[i + 1][j] && matrix[i][j] === matrix[i + 1][j]) {
                            invalidCells.add(`${i}-${j}`).add(`${i + 1}-${j}`);
                        }
                    }
                }
            }
        
            for (let i = 0; i < rowCount; i++) {
                for (let j = 0; j < colCount; j++) {
                    if (j + 2 < colCount) {
                        if (
                            matrix[i][j] &&
                            matrix[i][j] === matrix[i][j + 1] &&
                            matrix[i][j] === matrix[i][j + 2]
                        ) {
                            invalidCells.add(`${i}-${j}`).add(`${i}-${j + 1}`).add(`${i}-${j + 2}`);
                        }
                    }
                    if (i + 2 < rowCount) { 
                        if (
                            matrix[i][j] &&
                            matrix[i][j] === matrix[i + 1][j] &&
                            matrix[i][j] === matrix[i + 2][j]
                        ) {
                            invalidCells.add(`${i}-${j}`).add(`${i + 1}-${j}`).add(`${i + 2}-${j}`);
                        }
                    }
                }
            }
        
            for (let i = 0; i < rowCount; i++) {
                let sunCountRow = 0, moonCountRow = 0;
                let sunCountCol = 0, moonCountCol = 0;
        
                for (let j = 0; j < colCount; j++) {
                    if (matrix[i][j] === "sun") sunCountRow++;
                    if (matrix[i][j] === "moon") moonCountRow++;
                    if (matrix[j] && matrix[j][i] === "sun") sunCountCol++;
                    if (matrix[j] && matrix[j][i] === "moon") moonCountCol++;
                }
        
                const maxAllowed = Math.floor(colCount / 2); 
        
                if (sunCountRow > maxAllowed) {
                    for (let j = 0; j < colCount; j++) {
                        if (matrix[i][j] === "sun") invalidCells.add(`${i}-${j}`);
                    }
                }
                if (moonCountRow > maxAllowed) {
                    for (let j = 0; j < colCount; j++) {
                        if (matrix[i][j] === "moon") invalidCells.add(`${i}-${j}`);
                    }
                }
        
                if (sunCountCol > maxAllowed) {
                    for (let j = 0; j < rowCount; j++) {
                        if (matrix[j][i] === "sun") invalidCells.add(`${j}-${i}`);
                    }
                }
                if (moonCountCol > maxAllowed) {
                    for (let j = 0; j < rowCount; j++) {
                        if (matrix[j][i] === "moon") invalidCells.add(`${j}-${i}`);
                    }
                }
            }
        
            setErrorCells(invalidCells);
        };
        
        

        useEffect(() => {
            checkConstraints(mat1);

            const allFilled = mat1.every(row => row.every(cell => cell !== ""));
            if (allFilled && errorCells.size === 0) {
                setIsCompleted(true);
            } else {
                setIsCompleted(false);
            }
        }, [mat1]);
        useEffect(() => {
            document.documentElement.setAttribute("data-theme", theme);
        }, [theme]);

        return (
            <>
                <div className="Board_body">
                    
                {isCompleted && (
                    <div className="success-message">
                        🎉 Congratulations! You successfully completed the puzzle! 🎉
                    </div>
                )}
                    <div className="rules">
                        <div className="rule-head">
                            <div className="rule-topic">
                                <p>How to Play</p>
                                <button onClick={()=>setHowPlay(prevPlay => !prevPlay)} className={`upa ${howPlay ? "rotate" : ""}`}> <svg height={20} width={20} viewBox="0 0 20 20">
                                    <polyline points="3,12 10,3 17,12" stroke="currentColor" strokeWidth={2} fill="none"  className="uparrow"/>
                                </svg>
                                </button>
                               
                            </div>
                            {howPlay && (<div className="rule-points">
                                <ul>
                                    <li>Fill the grid so that each cell contains either a <Sun/>or a <Moon/> </li>
                                    <li>No more than 2 <Sun/>or <Moon/>  may be next to each other, either vertically or horizontally. </li>
                                    <ul>
                                        <li><Sun/><Sun/><Tick/></li>
                                        <li><Sun/><Sun/><Sun/><Cross/></li>
                                    </ul>
                                    <li>Each row (and column) must contain the same number of <Sun/> and <Moon/> .</li>
                                    <li>Cells separated by an = sign must be of the same type.</li>
                                    <li>Cells separated by a <Cross/> sign must be of the opposite type.</li>
                                    <li>Each puzzle has one right answer and can be solved via deduction (you should never have to make a guess).</li>
                                </ul>
                            </div>)}
                        </div>
                    </div>
                    <div className="game">
                    <button className="switch" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                    {theme === "light" ? (
                        <img src="/sun.png" alt="Switch to Dark Mode" />
                    ) : (
                        <img src="/brightness.png" alt="Switch to Light Mode" />
                    )}
                    </button>

                        <div className="game-container">
                        {mat1.map((row, rowIndex) => (
                            <div key={rowIndex} className="row">
                            {row.map((cell, colIndex) => {
                                const isError = errorCells.has(`${rowIndex}-${colIndex}`);

                                return (
                                    <button
                                        key={colIndex}
                                        className={`cell ${isError ? "error" : ""}`}
                                        onClick={() => handleCellClick(rowIndex, colIndex)}
                                    >
                                        <span>
                                        {rowIndex < mats2.length && colIndex < mats2[0]?.length
                                            ? mats2[rowIndex][colIndex] === "="
                                            ? <Equal />
                                            : mats2[rowIndex][colIndex] === "x"
                                            ? <Cross />
                                            : <Empty/>
                                            : null }
                                        </span>
                                        <p className={isError ? "error" : ""}>
                                        {rowIndex < mats1.length - 1 
                                            ? mats3[rowIndex][colIndex] === "=" 
                                            ? <Equal />  
                                            : mats3[rowIndex][colIndex] === "x" 
                                                ? <Cross /> 
                                                : null 
                                            : null}
                                        </p>
                                        <aside> {cell ? (cell === "moon" ? <Moon /> : <Sun />) : null }
                                        </aside>
                                    </button>
                                );
                                })}
                                </div>
                            ))}
                            <div className="buttons">
                                <button onClick={() => setSelectedItem("moon")}><Moon /></button>
                                <button onClick={() => setSelectedItem("sun")}><Sun /></button>
                            </div>

                            
                        

                        </div>
                    </div>
                </div>
            </>
        );
    }

    function Moon() {
        return (
            <svg height={25} width={22} viewBox="0 -2 10 25">
                <path d="M 14 2 A 10 10 0 1 0 14 18 A 6 6 0 1 1 14 2 Z" fill="blue" stroke="darkblue" strokeWidth="1" />
            </svg>
        );
    }

    function Sun() {
        return (
            <svg height={20} width={20} viewBox="0 0 20 18">
                <circle cx={10} cy={10} r={8} fill="yellow" stroke="orange" strokeWidth={2} />
            </svg>
        );
    }

    function Equal() {
        return (
            <svg height={20} width={20} viewBox="0 0 20 20">
                <rect x={4} y={6} width={12} height={2} fill="orange" />
                <rect x={4} y={12} width={12} height={2} fill="orange" />
            </svg>
        );
    }

    function Cross() {
        return (
            <svg height={20} width={20} viewBox="0 0 20 20">
                <line x1={5} y1={5} x2={15} y2={15} stroke="red" strokeWidth={2} />
                <line x1={5} y1={15} x2={15} y2={5} stroke="red" strokeWidth={2} />
            </svg>
        );
    }

    function Empty() {
        return <svg height={20} width={20} viewBox="0 0 20 20" className="empty"></svg>;
    }
    function Tick() {
        return (
            <svg height={20} width={20} viewBox="0 0 10 25">
                <polyline 
                    points="4,10 8,15 16,5" 
                    stroke="green" 
                    strokeWidth={2} 
                    fill="none"
                    className="tick"
                />
            </svg>
        );
    }



    export default Board;
