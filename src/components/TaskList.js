import React, { Component } from 'react';
import TaskItem from './TaskItem';

class TaskList extends Component {
  render() {
    var elmTasks = this.props.tasks.map((item,index)=>{
      return <TaskItem 
                key={index} 
                index={index} 
                task={item} 
                onUpdateStatus={this.props.onUpdateStatus} 
                onDelete={this.props.onDelete}
                onUpdate={this.props.onUpdate}
             />
    });
    return (
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th className="text-center">STT</th>
                <th className="text-center">Tên</th>
                <th className="text-center">Trạng Thái</th>
                <th className="text-center">Hành Động</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td />
                <td>
                  <input className="form-control" type="text" />
                </td>
                <td>
                  <select className="form-control">
                    <option value={-1}>Tất Cả</option>
                    <option value={0}>Ẩn</option>
                    <option value={1}>Kích Hoạt</option>
                  </select>
                </td>
                <td />
              </tr>
              {elmTasks}
            </tbody>
          </table>
    );
  }
}

export default TaskList;     
