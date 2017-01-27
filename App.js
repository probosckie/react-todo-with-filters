import React, { Component } from 'react';

import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      todos: [],
      showFilter: 'all'
    }
    this.addTodo = this.addTodo.bind(this);
    this.toggleState = this.toggleState.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
    
 
  }
  addTodo() {
    let { todos } = this.state;
    todos.push({
      text: this.refs.todoInput.value,
      complete: false,
      id: todos.length+1
    });
    this.setState({todos});
  }

  toggleState(id) {
    let {todos} = this.state;
    todos = todos.map(todo => {
      if(todo.id === id)
        todo.complete = !(todo.complete)
      return todo;
    });
    this.setState({todos});
  }

  updateFilter(e){
    e.preventDefault();

    this.setState({showFilter: e.target.innerHTML.toLowerCase()})
  }
  
  render() {
    const { todos, showFilter } = this.state;
    const listWithFilter = todos.filter(todo => {
      if(showFilter === 'all')
        return true
      else if (showFilter === 'active')
        return !todo.complete;
      else
        return todo.complete;
    });
    return (<div>
      <input type="text" value={this.state.currentVal} ref="todoInput"/> <button onClick={this.addTodo}>Add Todo</button>
      <ul>{listWithFilter.map(o => <Todo key={o.id} {...o} onClick={this.toggleState}/> )}</ul>
      Show: <Action onClick={this.updateFilter}>All</Action> <Action onClick={this.updateFilter}>Active</Action>
      <Action onClick={this.updateFilter}>Completed</Action>
    </div>);
  }
}

const Todo = ({text,complete,id,onClick}) => <li className={complete?'complete':'incomplete'} onClick={() => onClick(id)}>{text}</li>;

const Action = ({children, onClick}) => <a href="#" onClick={onClick}>{children}</a>

export default App;
