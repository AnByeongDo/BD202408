import { useEffect, useState } from "react";
import "./App.css";
import Input from "./Input"
import Output from "./Output";
import axios from "axios";

const App = ()=>{
    const [name, setName] = useState("Todo List");
    const [todoList, setTodoLilst] = useState([]);
    //const [noCnt, setNoCnt] = useState(105);

    useEffect(() => {
        axios.get("http://localhost:5000/todo").then((response) => {
            setTodoLilst(response['data']);
        });
    }, []);

    const onClickEvent = (inputTitle) => {
        // 기존 내용에 새 내용을 추가 해서 새 배열을 생성
        //setTodoLilst([...todoList, {no:noCnt, title:inputTitle, done: false}]);
        //setNoCnt(noCnt+1);
        let newTodo = {title:inputTitle, done: false};
        axios.post("http://localhost:5000/todo", newTodo).then((response) => {
            setTodoLilst(response['data']);
        });
    }

    const onDelete = ({no, title, done}) => {
        // const newList = todoList.filter((todo)=> {
        //     return todo.no != no;
        // });
        // setTodoLilst(newList);
        console.log(no);
        axios.get("http://localhost:5000/todo/delete?no="+no).then((response) => {
            setTodoLilst(response['data']);
        });
    };

    const onDoneFlag = ({no, title, done})=>{
        const newTodoList = [...todoList];
        todoList.forEach((item, idx)=> {
            if(item.no == no) {
                newTodoList[idx].done = !done;
            }
        });
        setTodoLilst(newTodoList);
    };

    const onEdit = ({no, title, done})=>{
        const newTodoList = [...todoList];
        todoList.forEach((item, idx)=> {
            if(item.no == no) {
                newTodoList[idx].done = done;
                newTodoList[idx].title = title;
            }
        });
        setTodoLilst(newTodoList);
        console.log(newTodoList);
    };

    // 취소선 스타일 설정
    const lineThroughClass = {textDecoration:"line-through", color:"blue"}

    return (<div className="todoList">
        <div className="App-header">
            <h1>{name} App</h1>
        </div>
        <Input onClickEvent={onClickEvent} />
        <Output todoList={todoList} onEdit={onEdit} onDoneFlag={onDoneFlag} onDelete={onDelete} />
    </div>);
}

export default App;