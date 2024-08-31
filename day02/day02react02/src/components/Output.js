export default (props) => {
    let todoListArr = props.todoListArr;
    return (<div>
        <table id="todoListTbl" className="table table-hover">
            <thead>
                <tr style={{textAlign:"center"}}>
                    <th>Confirm</th>
                    <th>Title</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {todoListArr.map((item, idx)=>{
                    // 중괄호 enter하면 return문을 꼭 넣어야 한다.
                    return (<tr key={item.no}>
                        <td>
                            <input type="checkbox"></input>
                        </td>
                        <td>{item.title}</td>
                        <td>
                            <button className="btn btn-danger" type="button">Delete</button>
                        </td>
                    </tr>);
                })}
            </tbody>
        </table>
    </div>);
}