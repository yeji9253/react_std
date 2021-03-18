import React, { Component } from 'react';

class Nav extends Component {
    render() {
        var lists = [];
        var data = this.props.data;
        var i=0;
        while(i < data.length) {
            lists.push(
                <li key={data[i].id}>
                    <a 
                        href={"/content/"+data[i].id}
                        onClick={function(id, e){
                            e.preventDefault();
                            this.props.onChangePage(id);
                        }.bind(this, data[i].id)}
                    >{data[i].title}</a>
                </li>
                
                // 아래 방식으로도 가능함
                // <li key={data[i].id}>
                //     <a 
                //         href={"/content/"+data[i].id}
                //         data-id={data[i].id} 
                //         onClick={function(e){
                //             e.preventDefault();
                //             var id = e.target.dataset.id;
                //             this.props.onChangePage(id);
                //         }.bind(this)}
                //     >{data[i].title}</a>
                // </li>
                )
            i++;
        }
        return (
            <nav>
                <ul>
                    {lists}
                </ul>
            </nav>
        );
    }
}

export default Nav;