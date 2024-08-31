import React from 'react';
import "./App.css";
import Input from "./components/Input";
import Output from "./components/Output";

const App = ()=>{
    // useState() 훅을 이용해서 state 생성
    // Input 컴포넌트에서 데이터를 추가 하고
    // Ouput 컴포넌트에서 데이터를 접근 할 수 있다.
    const [todoListArr, setTodoList] = React.useState([
        {no:101, title:'운동하기', done:false},
        {no:102, title:'운동하기2', done:false},
        {no:103, title:'운동하기3', done:false}
    ]);
    const [noCnt, setNoCnt] = React.useState(104);

    function appendItem(title) {
        // setTodoList 함수를 이용해서 데이터 갱신
        // 스프리드 연산자 사용하면 편리함.
        const newItem = {no:noCnt, title:title, done:false};
        setNoCnt(noCnt+1);
        setTodoList([...todoListArr, newItem]);
    }

    return (<div>
        <header className="jumbotron">
            <h1>Todo List</h1>
            <p>오늘 할 일을 입력 하세요</p>
        </header>
        {/* 입력 기능 */}
        <Input appendItem={appendItem} />
        {/* 목록 출력 기능 - 추가된 속성은 props로 전달. */}
        <Output todoListArr={todoListArr} />
    </div>);
};

export default App;