import { useEffect, useState } from "react";

export default function TransistionSide({addDataToFirebBase,setValue,setDetail,setType,dataList}){
    
    const Incomes =dataList.filter(item=>item.Type ==="Income").reduce((acmulator,currentValue)=>{
        return acmulator + parseFloat(currentValue.Price)
    },0)

    const Expenses =dataList.filter(item=>item.Type ==="Expense").reduce((acmulator,currentValue)=>{
        return acmulator + parseFloat(currentValue.Price)
    },0)

    const Balance = Incomes - Expenses ;

    const ExpBal = (Balance < 0 ? 1:( Balance !== 0 ? (Expenses / Incomes) : 0))
   

    
    const [ExpPer,setExpPer]=useState(0);
    const Exp = ExpBal*252;
    useEffect(()=>{
        setExpPer(252-Exp)
    },[ExpBal])

    

    return(
        <div className="side1">
            <div className="Statics">

            <div className="IncomesStatics">
                    <p>Remaining Income :</p>
                <div className="IncomesStatics-leftSide">
                <h4>{Balance === 0 ? Balance.toFixed(2): (100 - ExpBal*100).toFixed(2)}%</h4>
                <svg width="100px" height="100px">
                    <g transform="rotate(180 50 50)">
                        <circle
                            cx="50"
                            cy="50"
                            r="40"
                            stroke="rgb(92, 133, 231,0.05)"
                            strokeWidth="15"
                            fill="transparent"
                            style={{
                                strokeDasharray: 252,
                                strokeDashoffset: 0,
                            }}
                        />
                        <circle
                            cx="50"
                            cy="50"
                            r="40"
                            stroke= "#5C85E7"
                            strokeWidth="15"
                            fill="transparent"
                            style={{
                                strokeDasharray: 252,
                                strokeDashoffset: (Balance === 0 ? 252 :(ExpPer >= 0? 252 - ExpPer:0)),
                                transition: "stroke-dashoffset 1s ease-out",
                                animation:"reverse"
                            }}
                        />
                    </g>
                </svg>
                </div>
               
                </div>

                <div className="ExpencesStatics">
                    <p>Your Expenses :</p>
                    <div className="IncomesStatics-leftSide">
                    <h4>{(ExpBal*100).toFixed(2)}%</h4>
                <svg width="100px" height="100px">
                    <g transform="rotate(180 50 50)">
                        <circle
                            cx="50"
                            cy="50"
                            r="40"
                            stroke="rgb(92, 133, 231,0.05)"
                            strokeWidth="15"
                            fill="transparent"
                            style={{
                                strokeDasharray: 252,
                                strokeDashoffset: 0,
                            }}
                        />
                        <circle
                            cx="50"
                            cy="50"
                            r="40"
                            stroke= {Exp >= 252 ? "red":"#5C85E7"}
                            strokeWidth="15"
                            fill="transparent"
                            style={{
                                strokeDasharray: 252,
                                strokeDashoffset: Exp >= 252 ? 0 : ExpPer,
                                transition: "stroke-dashoffset 1s ease-out",
                                animation:"reverse"
                            }}
                        />
                    </g>
                </svg>
                </div>
                </div>

            </div>
   
                
                <div className="inputs-infos">
                    <div className="inputs">
                      <input id="in" type="text" placeholder='Details' onChange={(e)=>setDetail(e.target.value)} />
                      <input id="in" type="number" placeholder='Value' onChange={(e)=>setValue(e.target.value)} />

                        <input type="radio" id='Income' name="type"  onClick={()=>setType("Income")} />
                        <label htmlFor="Income">Income</label>

                        <input type="radio" id='Expense' name="type"  onClick={()=>setType("Expense")} />
                        <label htmlFor="Expense">Expense</label>
                    </div>
                    <button onClick={addDataToFirebBase}>Add</button>
                </div>

                <div className="money">
                    <div className="ExpencesIncomes">
                        <div>
                           <h2>Incomes</h2>
                           <h3>{Incomes} $</h3>    
                        </div>

                        <div>
                           <h2>Expenses</h2>
                           <h3>{Expenses} $</h3>
                        </div>
                    </div>
                    <div className="balnce">
                        <h1>YourBalance</h1>
                        <h2 style={Balance <0?{color :'red'}:{color :'green'}}>{Balance} $</h2>
                    </div>
                </div>
            </div>
    )
};