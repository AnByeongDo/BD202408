import Photo from "../Photo";

export default ({photoArr}) =>{
    return (<div>
        <div className="w3-content">
            <h1>Phto List</h1>
            {
                photoArr.map(function(item, idx){
                    return <Photo key={item.no} item={item} />
                })
            }
        </div>
    </div>);
}