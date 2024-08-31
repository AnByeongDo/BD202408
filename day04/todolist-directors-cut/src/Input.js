import { useEffect, useLayoutEffect, useRef, useState } from "react";

const Input = ({onClickEvent})=>{
    const [inputTitle, setInputTtile] = useState("");
    const inputFocus = useRef(null);

    return (<>
        <div className="input-title">
          <div className="container" style={{padding: "10px"}}>
            <div className="input-group mb-3">
                <input autoFocus ref={inputFocus} value={inputTitle} onChange={(e)=>setInputTtile(e.target.value)} type="text" className="form-control"/>
                <div className="input-group-append">
                    <button className="btn btn-success" onClick={(e)=>{
                        onClickEvent(inputTitle);
                        setInputTtile("");
                        inputFocus.current.focus();
                    }}>Save</button>
                </div>
            </div>
          </div>
        </div>
    </>);
}

export default Input;