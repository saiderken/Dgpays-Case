type GridProps = {
    source: any;
}

const Grid = ({source}: GridProps) => {
    const tableData = 
    source.map((el:any) => {
        const isLate = el.isBackgroundColorRed ? 'red' : 'none';
        
        return (
        <tr key={el.name}>
            <td style={{backgroundColor: isLate}}> { el.name } </td>
            <td className="mailReceivedDate" style={{backgroundColor: isLate}}> { el.mailReceivedDate } </td>
            <td className="solutionSentDate" style={{backgroundColor: isLate}}> { el.solutionSentDate } </td>
        </tr>
        )
    });

    return(
        <table id="caseTable">
            <thead>
                <tr>
                    <th> Adı Soyadı </th>
                    <th> Ver. Tar. </th>
                    <th> Tes. Tar. </th>
                </tr>
            </thead>
            <tbody>
                { tableData }
            </tbody>
        </table>
    )
}

export default Grid;