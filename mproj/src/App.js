import { useState } from 'react';
import './App.css';

function Header(props){
  console.log('props', props, props.title);
  return  <header>
  <h1><a href="/" onClick={(event)=>{
    event.preventDefault();
    props.onChangeMode();
  }}>{props.title}</a></h1>
  </header>
}

function Nav(props) {
  const lis = [] 
  for(let  i = 0; i<props.topics.length; i++){
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id = {t.id} href={"/read/ "+ t.id} onClick={event=>{
        event.preventDefault();
        props.onChangeMode(Number(event.target.id));
      }}>{t.title}</a>
      </li>)
  }
  return <nav>
    <oi>
      {lis}
    </oi>
  </nav> 

}

function Article(props){
  return <h2>
    <h2>{props.title}</h2>
    <a>{props.body}</a>
  </h2>
}
function Create(props){
  return( <article>
    <h2>Create</h2>  
    <form onSubmit={event=>{
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onCreate(title,body);
    }}>
      <p><input type="text" name="title" placeholder="tltle"/></p>
      <p><textarea name="body" placeholder='body' ></textarea></p>
      <p><input type="submit" value="Create"></input></p>
    </form>
  </article>
  )
}
function Update(props){
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
    return( <article>
    <h2>Update</h2>  
    <form onSubmit={event=>{
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onUpdate(title,body);
    }}>
      <p><input type="text" name="title" placeholder="tltle" value={title} onChange={event=>{
        setTitle(event.target.value)
      }}/></p>
      <p><textarea name="body" placeholder='body' value={body} onChange={event=>{
        setBody(event.target.value)
      }}></textarea></p>
      <p><input type="submit" value="Update"></input></p>
    </form>
  </article>
  )
}
function App() {
  const [mode, setMode] = useState('welcome');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'javascript', body:'javascript is ...'}
  ])
  let content = null;
  let contextControl= null;
  if(mode === 'welcome'){
    content = <Article title="welcome" body=" Hello, WEB"></Article>
  }else if(mode == 'read'){
    let title , body = null;
    for(let  i = 0; i<topics.length; i++ ){
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      } 
    }

    content = <Article title={title} body={body}></Article>
    contextControl=  <>
    <li><a href={'/update/'+id} onClick={event=>{
      event.preventDefault();
      setMode('UPDATE');
    }}>Update</a></li>
    <li><input type="button" value="Delete" onClick={()=> {
      const newTopics =[]
      for(let i = 0; i<topics.length; i++){
        if(topics[i].id !== id){
          newTopics.push(topics[i]);
        }
      }
      setTopics(newTopics);
      setMode('welcome');
    }}></input></li>
    </>
  }
  else if(mode === 'CREATE'){
    content = <Create onCreate={(_title,_body)=>{
      const newTopic = {id:nextId, title:_title, body:_body}
      const newTopics =  [...topics]
      newTopics.push(newTopic);
      setTopics(newTopics);
      setMode('read');
      setId(nextId);
      setNextId(nextId+1);
    }}></Create>
  }else if (mode === 'UPDATE'){
    let title , body = null;
    for(let  i = 0; i<topics.length; i++ ){
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      } 
    }
    content = <Update title={title} body={body} onUpdate = {(title, body) =>{
      const newTopics = [...topics]
      const updateTopic = {id:id, title:title, body:body}
      for(let i=0; i<newTopics.length; i++){
        if(newTopics[i].id ==  id)
          newTopics[i] = updateTopic;
        break
      }
      setTopics(newTopics);
      setMode('read');
    }}></Update>
  }
    return(<>
  <div className="App">
    <Header title = "WEB" onChangeMode={(id)=>{
      setMode('welcome');
    }}></Header>
    <Nav topics={topics} onChangeMode={(id)=>{
      setMode('read');
      setId(id);
    }}></Nav>
    {content}
    <ul>
        <li><a href="/create" onClick={event=>{
        event.preventDefault();
        setMode('CREATE')
      }}>Create</a></li>
      {contextControl}
    </ul>
  </div>

    </>);
};

// 컴포넌트를 모듈에 등록
// -> 프로젝트의 모든 JS 파일에서 import 가능.
export default App;