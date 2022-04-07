import './Dentaku.css';
import React, { useEffect, useState } from "react";

function Dentaku() {

    let divide = String.fromCharCode(parseInt("00F7", 16));
    let multiple = String.fromCharCode(parseInt("00D7", 16));
    let minus = String.fromCharCode(parseInt("2212", 16));
    let plus = String.fromCharCode(parseInt("002B", 16));


    useEffect(() => {
      document.body.style.overflow = "hidden";
    },[]);

    
    const [valDisplay, setValDisplay] = useState("");
    const [valNumberA, setValNumberA] = useState("");
    const [valNumberB, setValNumberB] = useState("");
    const [valOperand, setValOperand] = useState("");
    const [valState, setValState] = useState(0);

    const operand = [divide, multiple, minus, plus];
   
 
    const updateOperand = value =>{


        if(valState === 1 && valNumberB != ""){
            calculation();
            setValOperand(value);
            setValState(1);
        }else if(valState === 1){
            setValOperand(value);
        }

        
        if(valState === 0 && valNumberA != ""){
            setValOperand(value);
            setValState(1);
        }

    }   

    const updateDisplay = value =>{

        if(valDisplay.includes('.') && value === '.'){
            return;
        }

        switch (valState) {
            case 0:
                setValNumberA(prevA => prevA + value);
                setValDisplay(prevValDisplay => prevValDisplay + value);
                break;
            case 1:

                if(valNumberB === ""){
                    setValDisplay("");
                }
                setValNumberB(prevB => prevB + value);
                setValDisplay(prevValDisplay => prevValDisplay + value);
                break;
            case 2:
                setValState(0);
                setValNumberA(value.toString());
                setValDisplay(value.toString());
                break;
        
        
            default:
                break;
        } 

    }

    const calculation = () => {
     
        if(valState === 1 && valNumberB != ""){
            let tempA = Number(valNumberA);
            let tempB = Number(valNumberB);
            let tempResult = 0;
            switch (valOperand) {
                case divide:
                    tempResult = (tempA / tempB);
                    break;
                case multiple:
                    tempResult = (tempA * tempB);
                    break;
                case minus:
                    tempResult = (tempA - tempB);
                    break;
                case plus:
                    tempResult = (tempA + tempB);
                    break;
            
                default:
                    return;
                    break;
            }
            setValNumberA(tempResult.toString());
            setValDisplay(tempResult.toString());
            setValNumberB("");
            setValOperand("");
            setValState(2);
        }

    }

    const setPlusMinus = () => {

        let temp;
        switch (valState) {
            case 0:
                temp = Number(valNumberA);
                temp = temp * -1;
                setValNumberA(temp.toString());
                break;
            case 1:
                temp = Number(valNumberB);
                temp = temp * -1;
                setValNumberB(temp.toString());
                break;
        
            default:
                break;
        }

        setValDisplay(temp.toString());

    }

    const clearAll = () =>{
        setValDisplay("");
        setValNumberA("");
        setValNumberB("");
        setValState(0);
        setValOperand("");
    }

    const singleClear = () =>{
        switch (valState) {
            case 0:
                setValNumberA(prevA => prevA.slice(0, -1));
                setValDisplay(prevValDisplay => prevValDisplay.slice(0, -1));
                break;
            case 1:
                if(valNumberB === ""){
                    setValOperand("");
                    setValState(0);
                }else{
                    setValNumberB(prevB => prevB.slice(0, -1));
                    setValDisplay(prevValDisplay => prevValDisplay.slice(0, -1)); 
                }
                break;
        
            default:
                break;
        }
    }


    const summonDigits = () => {

        const digits = [];
        for(let i = 7; i < 10; i++){
            digits.push(<button key={i} onClick={() => {updateDisplay(i)}}>{i}</button>);
        }
        for(let i = 4; i < 7; i++){
            digits.push(<button key={i} onClick={() => {updateDisplay(i)}}>{i}</button>);
        }
        for(let i = 1; i < 4; i++){
            digits.push(<button key={i} onClick={() => {updateDisplay(i)}}>{i}</button>);
        }

        return digits;

    }

    return (
        <div className="Dentaku">
            <div className="dentakuApp">
                <div className="valDisplayOperand">{valOperand}</div>
                <div className="valDisplay">
                    {valDisplay ? valDisplay : "0"}
                    </div>
                <div className="utility">
                    <button onClick={() => {clearAll()}}>AC</button>
                    <button onClick={() => {singleClear()}}>C</button>
                    <button onClick={() => {setPlusMinus()}}>+-</button>
                </div>
                <div className="digits">
                    {summonDigits()}
                    <button onClick={() => {updateDisplay('0')}}>0</button>
                    <button onClick={() => {updateDisplay('.')}}>.</button>
                    <button onClick={() => {calculation()}}>=</button>
                </div>
                <div className="operator">
                    <button onClick={() => {updateOperand(divide)}}>{divide}</button>
                    <button onClick={() => {updateOperand(multiple)}}>{multiple}</button>
                    <button onClick={() => {updateOperand(minus)}}>{minus}</button>
                    <button className="plusButton" onClick={() => {updateOperand(plus)}}>{plus}</button>
                </div>

            </div>
        </div>
    );
}

export default Dentaku;