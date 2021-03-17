import React, { Component } from 'react';
import Subject from './components/Subject';
import Nav from './components/Nav';
import Article from './components/Article';
import './App.css';

class App extends Component {
  
  // 1. render() 함수보다 constructor()가 먼저 호출되어, 컴포넌트 내부에서 사용할 state값들을 먼저 초기화 해준다
  // 2. state/props 값이 변경될 때마다 render() 함수가 호출 된다
  // 3. 컴포넌트 정의 시, 첫문자는 항상 대문자로 해야한다 ( ex. <subject> -> <Subject> )
  // 4. react는 유사 자바스크립트 언어로, JS가 아닌 JSX이다
  constructor(props) {
    super(props);
    this.state = {
      mode: 'read',
      subject: {title: 'WEB', sub: 'World Wide Web!'},
      welcome: {title: 'welcome', desc:'Hello, React!!'},
      contents:[
        {id: 1, title: 'HTML', desc:'HTML is for informatioin'},
        {id: 2, title: 'CSS', desc:'CSS is for Design'},
        {id: 3, title: 'JavaScript', desc:'JavaScript is for interactive'},
      ]
    }
  }

  render() {
    var _title, _desc = null;
    if(this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    } else if(this.state.mode === 'read') {
      _title = this.state.contents[0].title;
      _desc = this.state.contents[0].desc;
    }
    return (
      <div className="App">
        <Subject 
          title={this.state.subject.title}
          sub={this.state.subject.sub}>
        </Subject>
        <Nav data={this.state.contents}></Nav>
        <Article title={_title} desc={_desc}></Article>
      </div>
    );
  }
}

export default App;
