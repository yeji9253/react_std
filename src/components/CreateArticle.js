import React, { Component } from 'react';

class CreateArticle extends Component {
    render() {
      return (
        <article>
          <h2>Craete</h2>
          <form action="/create_process" method="post"
            onSubmit={function(e){
              e.preventDefault(); // create_process 페이지로 이동되지 않도록 해놓음.
              this.props.onSubmit(
                e.target.title.value,
                e.target.desc.value
              );
            }.bind(this)}
          >
              <p><input type="text" name="title" placeholder="title"/></p>
              <p><textarea name="desc" placeholder="description"></textarea></p>
              <p><input type="submit"></input></p>
          </form>
        </article>
      );
    }
}

export default CreateArticle;