import React, { Component } from 'react';
import Subject from './components/Subject';
import Nav from './components/Nav';
import ReadArticle from './components/ReadArticle';
import CreateArticle from './components/CreateArticle';
import UpdateArticle from './components/UpdateArticle';
import Control from './components/Control';
import './App.css';

class App extends Component {
  
  // 1. render() 함수보다 constructor()가 먼저 호출되어, 컴포넌트 내부에서 사용할 state값들을 먼저 초기화 해준다
  // 2. state/props 값이 변경될 때마다 render() 함수가 호출 된다
  // 3. 컴포넌트 정의 시, 첫문자는 항상 대문자로 해야한다 ( ex. <subject> -> <Subject> )
  // 4. react는 유사 자바스크립트 언어로, JS가 아닌 JSX이다
  // github authorization token:
  // vscode://vscode.github-authentication/did-authenticate?windowid=3&code=f959d16f6c4bd7380b01&state=9386f14a-2247-4746-b8c7-13b28a19aa21
  constructor(props) {
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode: 'welcome',
      selectedContentId: 2,
      subject: {title: 'WEB', sub: 'World Wide Web!'},
      welcome: {title: 'welcome', desc:'Hello, React!!'},
      contents:[
        {id: 1, title: 'HTML', desc:'HTML is for informatioin'},
        {id: 2, title: 'CSS', desc:'CSS is for Design'},
        {id: 3, title: 'JavaScript', desc:'JavaScript is for interactive'},
      ]
    }
  }

  getReadContent() {
    var i = 0;
      while(i < this.state.contents.length) {
        var data = this.state.contents[i];
        if(data.id === this.state.selectedContentId) {
          return data;
        }
        i++;
      }

  }

  getContent() {
    var _title, _desc, _article, _content = null;
    if(this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadArticle title={_title} desc={_desc}></ReadArticle>
    } else if(this.state.mode === 'read') {
      _content = this.getReadContent();
      _article = <ReadArticle title={_content.title} desc={_content.desc}></ReadArticle>
    } else if(this.state.mode === 'create') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <CreateArticle 
                   onSubmit={function(_title, _desc){
                      this.max_content_id++;
                      
                      // array.push()는 원본의 배열객체에 추가되기때문에, 원본배열 자체가 변경됨
                      // this.state.contents.push({
                      //   id: this.max_content_id, title: _title, desc: _desc
                      // });
                      
                      // array.concat()은 원본 배열객체에 원소를 추가한 새로운 객체를 리턴해줌. 원본배열은 변경되지 않음.
                      // var _contents = this.state.contents.concat({
                      //   id: this.max_content_id, title: _title, desc: _desc
                      // })
  
                      var newContents = Array.from(this.state.contents);
                      newContents.push({id: this.max_content_id, title: _title, desc: _desc});
                      this.setState({
                        contents: newContents,
                        mode: 'read',
                        selectedContentId: this.max_content_id
                      });
                   }.bind(this)}></CreateArticle>
    } else if (this.state.mode === 'update') {
      _content = this.getReadContent();
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <UpdateArticle 
                   data={_content}
                   onSubmit={function(_id, _title, _desc){
                    var _contents = Array.from(this.state.contents);
                    var i = 0;
                    while(i < _contents.length) {
                      if(_contents[i].id === _id) {
                        _contents[i] = {id: _id, title: _title, desc: _desc};
                        break;
                      }
                      i++;
                    }
                    this.setState({
                      contents: _contents,
                      mode:'read'
                    });
                   }.bind(this)}></UpdateArticle>
    }

    return _article;
  }

  render() {
    return (
      <div className="App">
        <Subject 
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function(){
            this.setState({mode:'welcome'});
          }.bind(this)}
        >
        </Subject>

        <Nav 
          onChangePage={function(id){
            this.setState({
              mode:'read',
              selectedContentId: Number(id)
            });
          }.bind(this)} 
          data={this.state.contents}
        >  
        </Nav>

        <Control 
          onChangeMode={function(_mode){
            if(_mode === 'delete') {
              if(window.confirm('really?')) {
                var _contents = Array.from(this.state.contents);
                var i = 0;
                while(i < _contents.length) {
                  if(_contents[i].id === this.state.selectedContentId) {
                    _contents.splice(i,1);
                    break;
                  }
                  i++;
                }
                this.setState({
                  mode: 'welcome',
                  contents: _contents
                });
                alert('deleted!');
              }
            } else {
              this.setState({
                mode: _mode
              })
            }
          }.bind(this)}>
        </Control>

        {this.getContent()}
        
      </div>
    );
  }
}

export default App;
