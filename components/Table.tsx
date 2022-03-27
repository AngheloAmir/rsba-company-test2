export interface PropsRecieve {
    data :Column[];
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
    return (
        <table>
            <thead>
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
            { props.data.map((data :Column, index :number) => {
                return (
                    <tr key={index}>
                        <td>{data.Year}</td>
                        <td>{data.Rank}</td>
                        <td>{data.Career}</td>
                        <td>{data.Country}</td>
                        <td>{data.Recipient}</td>
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
