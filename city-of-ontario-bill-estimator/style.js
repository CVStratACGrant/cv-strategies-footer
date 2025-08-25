export const billEstimatorStyle = `
    /********** General **********/

    caption {
        caption-side: top;
    }

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

    input, select {
        font-size: small;
        padding: 0.5rem;
    }

    label, legend {
        font-size: small;
        text-align: center;
    }

    input, select, button, fieldset, table {
        border: 1px solid gray;
        border-radius: 4px;
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
    }

    #bill-estimator-container details:not(table details),
    #bill-estimator-container summary:not(table summary) {
        display: inline;
        text-align: center;
    }

    .pre-form-inputs {
        margin: 1rem 0;
    }

    .pre-form-inputs select {
        width: 250px;
    }

    #field-finder-figure img {
        width: 60%;
    }

    .column {
        align-items: center;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        justify-content: center;
    }

    .row {
        align-items: center;
        display: flex;
        flex-direction: row;
        gap: 0.5rem;
        justify-content: space-around;
        width: 100%;
    }

    /********** Form **********/

    legend {
        text-align: center;
    }

    form select {
        width: 100%;
    }

    #form-footer {
        margin-top: 1rem;
    }

    form > fieldset {
        padding: 2rem;
    }

    #form-fields-container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
    }

    .scroll-wrapper {
        display: flex;
        flex-direction: column;
        gap: 15px;
        max-height: 200px;
        overflow-y: scroll;
        padding: 20px;
    }

    .scroll-wrapper label {
        align-items: center;
        display: flex;
        gap: 5px;
        justify-content: flex-end;
        width: 100%;
    }

    .overflow {
        background-image: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,128,0,1) 100%);
        background-repeat: no-repeat;
        background-size: 100% 30px;
        background-position: bottom;
    }

    button:is([data-action="append"], [data-action=""]) {
        width: 25px;
        padding: 2px 5px;
        vertical-align: middle;
    }

    /********** Table **********/

    caption#charge-breakdown-caption {
        margin-bottom: 5px;
    }

    table {
        border-radius: 10px;
        min-width: 50%;
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

    #bill-estimator-container {
        font-family: Montserrat, sans-serif;
    }

    #bill-estimator-container,
    #form-and-table-container,
    form div:not(#form-fields-container):not(.row) {
        align-items: center;
        display: flex;
        flex-direction: column;
    }

    #form-and-table-container {
        gap: 1rem;
        margin-top: 1rem;
    }

    caption#charge-breakdown-caption, legend#form-title {
        font-size: larger;
    }
`;