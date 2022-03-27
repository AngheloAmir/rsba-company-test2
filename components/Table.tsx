export interface PropsRecieve {
    data :Column[];
    staticProps: {
        data: Column[];
    }
    hasError: boolean;
}

export interface Column {
    Year        :number | string;
    Rank        :number | string;
    Recipient   :string;
    Country     :string;
    Career      :string;
    Tied        :number | string;
    Title       :string;
}

export default function Table(props :PropsRecieve) {
    if(props.hasError)
        return <div></div>;
    
    const datas = props.data != null && props.data.length > 0 ?
        props.data :
        props.staticProps.data;

    return (
        <table>
            <thead>
                <tr><th>Stored in the database</th></tr>
                <tr>
                    <th>Year</th>
                    <th>Rank</th>
                    <th>Recipient</th>
                    <th>Country</th>
                    <th>Career</th>
                    <th>Tied</th>
                    <th>Title</th>
                </tr>
            </thead>
            <tbody>
            { datas.map((data :Column, index :number) => {
                return (
                    <tr key={index}>
                        <td>{data.Year}</td>
                        <td>{data.Rank}</td>
                        <td>{data.Recipient}</td>
                        <td>{data.Country}</td>
                        <td>{data.Career}</td>
                        <td>{data.Tied}</td>
                        <td>{data.Title}</td>
                    </tr>
                )
            })
            }
            </tbody>
        </table>
    );
}
