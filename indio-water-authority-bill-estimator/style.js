export const billEstimatorStyle = `
    /********** General **********/

    h1, h2, h3, h4, h5, h6 {
        margin-bottom: 1rem;
    }

    figure {
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    figcaption {
        text-align: center;
        font-weight: bold;
        background-color: #2b62ae;
        color: white;
        font-style: italic;
        padding: 0.5rem;
        text-align: center;
        width: fit-content;
    }

    input::placeholder {
        opacity: 0.5;
    }

    button {
        background-color: transparent;
        padding: 0.5rem;
    }

    button:hover {
        background-color: lightgray;
    }

    small {
        color: rgb(255, 128, 0);
        font-weight: bold;
        margin-bottom: 0.5rem;
        text-align: center;
        width: 50ch;
    }

    input, select {
        padding: 0.4rem;
        min-width: 10ch;
    }

    input, select, button {
        border: 1px solid gray;
        border-radius: 4px;
    }

    label, input, select, caption {
        margin-bottom: 1rem;
    }

    caption, legend {
        font-size: larger;
    }

    #bill-estimator-container details:not(table details),
    #bill-estimator-container summary:not(table summary) {
        display: inline;
        text-align: center;
    }

    .pre-form-inputs {
        margin-bottom: 0;
    }

    /********** Form **********/

    legend {
        text-align: center;
    }

    #form-footer {
        display: flex;
        justify-content: space-around;
        margin-top: 1rem;
        width: 100%;
    }

    fieldset {
        padding: 2rem;
        border: 1px solid gray;
    }

    /********** Table **********/

    table {
        margin-top: 2rem;
    }

    caption {
        caption-side: top;
    }

    table, th, td {
        border: 1px solid black;
        border-collapse: collapse;
        text-align: center;
    }

    tr > th, td {
        padding: 0.75rem;
        min-width: 7ch;
    }

    tbody td {
        border-bottom: none;
    }

    tfoot td {
        border-top: 0;
        padding: 0;
    }

    /********** Charge Breakdown **********/

    table details[open] {
        padding: 0.75rem;
        width: min(250px, 30vw);
        word-break: break-word;
    }

    table details[open] p {
        height: min(250px, 30vh);
        overflow-y: scroll;
    }

    table details[open] p::-webkit-scrollbar {
        width: 12px; /* Ensure scrollbar always shows */
    }

    table details[open] p::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.2); /* Set the color of the thumb */
        border-radius: 10px;
    }

    table details[open] p::-webkit-scrollbar-track {
        background: #f1f1f1; /* Set the track color */
    }

    summary {
        cursor: pointer;
        padding: 0.5em;
    }

    /********** Table, Form, Charge Breakdown **********/

    #bill-estimator-container, form, form div:not(#form-footer){
        align-items: center;
        display: flex;
        flex-direction: column;
        font-family: Montserrat, sans-serif;
    }

    #form-and-table-container {
        align-items: center;
        display: flex;
        flex-direction: column;
    }
`;