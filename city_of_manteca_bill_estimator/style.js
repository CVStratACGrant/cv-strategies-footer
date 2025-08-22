export const sewerBillEstimatorStyle = `
/********** General **********/

input {
    width: fit-content;
}

input::placeholder {
    opacity: 0.5;
}

button {
    background-color: transparent;
    padding: 0.5rem;
}

small {
    color: rgb(255, 128, 0);
    font-weight: bold;
}

/********** Form **********/

legend {
    text-align: center;
}

fieldset {
    width: 25vw;
}

#form-buttons-container {
    align-items: flex-end;
    display: flex;
    justify-content: space-between;
    width: 25vw;
}

/********** Table **********/

table {
    margin-top: 30px;
}

table, th, td {
    border: 1px solid black;
    border-collapse: collapse;
    text-align: center;
}

tr > th {
    padding: 0.75rem;
}

#table-caption {
    caption-side: top;
}

/********** Charge Breakdown **********/

#charge-breakdown-container > :first-child {
    margin-top: 0;
}

/********** Table, Form, Charge Breakdown **********/

#sewer-form-and-table-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

#sewer-bill-estimator-container {
    row-gap: 15px;
}

#sewer-bill-estimator-container, form, form div:not(#form-buttons-container) {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

form div, label, input {
    margin: 5px 0 5px 0;
}

#table-caption, #charge-breakdown-container-header, legend {
    font-size: x-large;
    margin-bottom: 1rem;
}
`;