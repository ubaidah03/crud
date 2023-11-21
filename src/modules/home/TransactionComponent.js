import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row; 
  justify-content: space-between; 
  align-items: center;
  padding: 5px 20px;
  font-size: 18px;
  width: 100%;
  gap: 10px;
  font-weight: bold;
  color: white;
`;


const Cell = styled.div`
  display: flex;
  flex-direction: row;
  padding: 12px 20px;
  font-size: 15px;
  border-radius: 4px;
  background: white;
  gap: 60px;
  font-weight: normal;
  color: ${(props) => (props.isIncome ? "green" : "black")}; /* Set font color based on transaction type */
  border: 1px solid #e6e8e9;
  border-right: 4px solid ${(props) => (props.isExpense ? "red" : "green")};
`;

const TransactionCell = (props) => {
  return (
    <Cell isExpense={props.isExpense}>
      <span>{props.payload.desc}</span>
      <span>${props.payload.amount}</span>
    </Cell>
  );
};

const TransactionComponent = (props) => {
  // Group transactions based on type
  const groupedTransactions = props.transactions.reduce((grouped, transaction) => {
    const key = transaction.type || "UNKNOWN";
    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(transaction);
    return grouped;
  }, {});

  return (
    <Container>
      
      <div>
        <h2>INCOME</h2>
        {groupedTransactions["INCOME"]?.map((payload, index) => (
          <TransactionCell key={index} payload={payload} isExpense={false} />
        ))}
      </div>

      <div>
        <h2>EXPENSES</h2>
        {groupedTransactions["EXPENSE"]?.map((payload, index) => (
          <TransactionCell key={index} payload={payload} isExpense={true} />
        ))}
      </div>
      
    </Container>
  );
};

export default TransactionComponent;
