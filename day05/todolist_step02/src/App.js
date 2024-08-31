import "./App.css";
import {useState} from "react";
import Input from "./Input";
import Output from "./Output";

const App = ()=>{
    // 전역변수를 state로 만들어 주어야 re rendering 된다.
    // 구조분해 할당 = state변수, setter함수
    const [name, setName] = useState("Todo List");
    const [todoList, setTodoLilst] = useState([
        {no:101, title:"공부하기", done: false},
        {no:102, title:"자바하기", done: true},
        {no:103, title:"리액트하기", done: false},
        {no:104, title:"스프링하기", done: false}
    ]);
    const [noCnt, setNoCnt] = useState(105);

    const onClickEvent = (inputTitle) => {
        // 기존 내용에 새 내용을 추가 해서 새 배열을 생성
        setTodoLilst([...todoList, {no:noCnt, title:inputTitle, done: false}]);
        setNoCnt(noCnt+1);
    }

    const onDelete = ({no, title, done}) => {
        const newList = todoList.filter((todo)=> {
            return todo.no != no;
        });
        setTodoLilst(newList);
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
    };

    // 취소선 스타일 설정
    const lineThroughClass = {textDecoration:"line-through", color:"blue"}

    return (<div className="todoList">
        <div className="App-header">
            <h1>{name} App</h1>
        </div>
        {/* todo 타이틀 입력 콤포넌트 위치 */}
        <Input onClickEvent={onClickEvent} />

        {/* todo 목록이 출력 되는 콤포넌트 위치 */}
        <Output todoList={todoList} onDelete={onDelete} onDoneFlag={onDoneFlag} onEdit={onEdit} />
    </div>);
}

export default App;