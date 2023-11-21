import { useState } from "react";
import styled from "styled-components";

//income expense tabel
const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin: 10px;
font-family: Calibri;
width: 100%;
color: white;
font-size: 20px;
`;

const CenteredBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

//zero dollar
const BalanceBox=styled.div`
align-items: center;
font-size: 50px;
width: 100%;
font-weight: bold;
display: flex;
flex-direction: row;
color: white;
justify-content: space-between;
`;

//button add transaction
const AddTransaction=styled.div`
background: #5A9B67;
color: white; 
padding: 12px 10px;
border-radius: 6px;
text-align: center;
cursor: pointer;
font-weight: bold;
font-size: 18px;
`;

const AddTransactionContainer=styled.div`
display: flex;
flex-direction: column;
gap: 10px;
width: 100%;
padding: 15px 20px;
margin: 10px 20px;
& input{
    outline: none;
    padding: 12px 10px;
    border-radius: 4px;
    border: 1px solid #e6e8e9;
}
`;

const SelectBox = styled.div`
display: flex;
flex-direction: column;
border-radius: 6px;
gap: 10px;
width: 100%;
padding: 0px 0px;
margin: 5px 0px;
`;


const AddTransactionView=(props)=>{
    const [amount, setAmount] = useState();
    const [desc, setDesc] = useState();
    const [type, setType] = useState("EXPENSE");
    const addTransaction =()=>{
        props.addTransaction({
            amount:Number(amount), 
            desc, 
            type, 
            id:Date.now()});
        props.toggleAddTxn();
    };
 return(
    <AddTransactionContainer>

 
<SelectBox>
<select 
    id="type" 
    name="type" 
    value={type} 
    onChange={(e) => setType(e.target.value)}
>
    <option value="INCOME">+</option>
    <option value="EXPENSE">-</option>
</select>
</SelectBox>


<input placeholder="Add Description" 
value={desc} 
onChange={(e) => setDesc(e.target.value)}
/>

<input
 placeholder="Value" 
 value={amount} 
 type="number"
 onChange={(e) => setAmount(e.target.value)}
 />

<AddTransaction onClick={addTransaction}>Add Transaction</AddTransaction>
    </AddTransactionContainer>
 );
};

const ExpenseContainer = styled.div`
display: flex;
flex-direction: row;
margin: 20px;

`;

const ExpenseBox= styled.div`
display: flex;
flex-direction: column;
border-radius: 4px;
border: 1px solid #e6e8e9; 
padding: 15px 50px;
width: 150px;
text-align: center;
font-weight: bold;
font-size: 20px;
color: white;
& span{
    font-weight: bold;
    font-size: 20px;
    color: ${props=> props.isIncome? "red" : "green"};
}
`;

const OverviewComponent = (props) => {
    const [isAddTxnVisible, toggleAddTxn] = useState(false);
    return (
    <Container>
        <CenteredBox>
          <BalanceBox>
           ${props.income - props.expense}
          </BalanceBox>
         </CenteredBox>
        
         
             <ExpenseContainer>
             <ExpenseBox isIncome={false}>
                INCOME<span>+${props.income}</span>
             </ExpenseBox>
             <ExpenseBox isIncome={true}>
               
                EXPENSE<span>-${Math.abs(props.expense)}</span>
             </ExpenseBox>
             
             </ExpenseContainer>
             Add new transaction
             <AddTransactionView 
             toggleAddTxn={toggleAddTxn} 
             addTransaction={props.addTransaction}
             />
            
    </Container>
    );
};
export default OverviewComponent;
