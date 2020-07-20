import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css';


const Table = (props) => {

    const array = useState([])
    const entries = array[0]
    const setReturns = array[1]

    useEffect(() => {
        processData(props.index, props.results)
    },[props.index, props.results])

    const processData = (index, results) => {

        let temp;
        temp = results.filter(function(arr) {
            return arr.year > index[0] - 1 && arr.year < index[1] + 1;
        });

       for(let i = temp.length- 1; i > -1; i--){
            temp[i]['cumul'] = temp[i].totalReturn
        }

        for(let i = 1; i < temp.length; i++){
            temp[i]['cumul'] = parseFloat(temp[i].cumul) + parseFloat(temp[i - 1].cumul)
            temp[i]['cumul'] = temp[i]['cumul'].toFixed(2)
        }
        
        setReturns(temp);
    }


    const renderHeader = () => {
        let headerElement = ['Year', 'Return', 'Cumulative Return'] 

        return headerElement.map((key, index) => {
            return <th key={index}>{key}</th>
        })
    }

    const renderBody = () => {

        return entries && entries.map(({ year, totalReturn, cumul }) => {
            return (
                <tr key={year}>
                    <td>{year}</td>
                    <td>{totalReturn}</td>
                    <td>{cumul}</td>
                </tr>
            )
        })
    }

    return (
        <>
            <h2>SP-500 Returns</h2>
            <table className='table'>
                <thead><tr>{renderHeader()}</tr></thead>
                <tbody>{renderBody()}</tbody>
            </table>
        </>
    )
}


export default Table