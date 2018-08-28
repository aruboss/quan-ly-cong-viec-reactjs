import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm'
import Control from './components/Control'
import TaskList from './components/TaskList'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      tasks: [], //id: duy nhat (unique), name, status
      isDisplayForm: false
    }

  }
//gọi khi component của mình đc gán vào (khi load lại trang)
  componentWillMount(){
      if(localStorage && localStorage.getItem('tasks')){
        var tasks = JSON.parse(localStorage.getItem('tasks'));
        this.setState({
          tasks: tasks
        });
      }
  }


  // random ra 1 số bất kỳ 
    s4(){
      return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1);
    }

    generateID(){
      return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +this.s4() + this.s4() +this.s4();   
    }
    onToggleForm = () => {
      this.setState({
        isDisplayForm: !this.state.isDisplayForm
      });
    }
    onCloseForm = () => {
      this.setState({
        isDisplayForm: false
      });
    }

    onSubmit = (data) => {
      var {tasks} = this.state;
      data.id = this.generateID();//task
      tasks.push(data);
      this.setState({
        tasks: tasks
      });
      localStorage.setItem('tasks',JSON.stringify(tasks));
    }

  render() {
    var {tasks, isDisplayForm} = this.state;
    var elmTaskForm = isDisplayForm ? <TaskForm onSubmit={this.onSubmit} onCloseForm={this.onCloseForm} /> : '';
    return (
      <div>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Title Page</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossOrigin="anonymous" />
        <div className="container">
          <div className="text-center">
            <h1>Quản Lý Công Việc</h1>
            <hr />
          </div>
          <div className="row">
            <div className={isDisplayForm?"col-xs-4 col-sm-4 col-md-4 col-lg-4":''}>
            {/*Form*/}
              {elmTaskForm}
            </div>
            <div className={isDisplayForm?"col-xs-8 col-sm-8 col-md-8 col-lg-8":"col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={this.onToggleForm}
              >
                <span className="fa fa-plus mr-5" />Thêm Công Việc
              </button>
                {/*tìm kiếm và sắp xếp */}
                <Control />
              <div className="row mt-15">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <TaskList tasks={tasks}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
