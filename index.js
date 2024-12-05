import { GanttComponent, ColumnsDirective, ColumnDirective, Edit, Inject } from '@syncfusion/ej2-react-gantt';
import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [tasks, setTasks] = React.useState([]);

  React.useEffect(() => {
    fetch('http://127.0.0.1:5000/tasks?project_id=1')
      .then(response => response.json())
      .then(data => {
        setTasks(data.map(task => ({
          TaskID: task.id,
          TaskName: task.name,
          StartDate: new Date(task.start_date),
          EndDate: new Date(task.end_date),
          Status: task.status,
          Predecessor: task.dependency_ids ? task.dependency_ids.split(',') : []
        })));
      });
  }, []);

  const updateTask = (args) => {
    const updatedTask = {
      name: args.data.TaskName,
      start_date: args.data.StartDate.toISOString().split('T')[0],
      end_date: args.data.EndDate.toISOString().split('T')[0],
      status: args.data.Status,
      dependency_ids: args.data.Predecessor
    };

    fetch(`http://127.0.0.1:5000/tasks/${args.data.TaskID}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask)
    })
      .then(response => response.json())
      .then(data => { console.log(data.message); })
      .catch(err => console.error(err));
  };

  return (
    <GanttComponent
      dataSource={tasks}
      taskFields={{
        id: 'TaskID',
        name: 'TaskName',
        startDate: 'StartDate',
        endDate: 'EndDate',
        dependency: 'Predecessor'
      }}

      editSettings={{ allowEditing: true, allowTaskbarEditing: true }}
      actionComplete={updateTask}
      height="450px"
    >
      <ColumnsDirective>
        <ColumnDirective field="TaskID" headerText="ID" width="70" />
        <ColumnDirective field="TaskName" headerText="Task Name" />
        <ColumnDirective field="StartDate" headerText="Start Date" format="yMd" />
        <ColumnDirective field="EndDate" headerText="End Date" format="yMd" />
        <ColumnDirective field="Status" headerText="Status" />
      </ColumnsDirective>
      <Inject services={[Edit]} />
    </GanttComponent>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));