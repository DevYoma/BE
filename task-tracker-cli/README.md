## How To Use Task-Tracker

### Add New Task

```bash
task-cli add "task 1"
```

### Update Task
```bash
task-cli update 1 "task 1 updated"
```

### Delete Task
```bash
task-cli delete 1
``` 
This deletes task 1

### Updating Task Status
**NB: By default, every task added has the "todo" status**
```bash
task-cli mark-in-progress 1
```
This changes the status of task 1 to **mark-in-progress**

```bash
task-cli mark-done 1
```
This changes the status of task 1 to **done**

### List All Tasks
```bash
task-cli list
```

#### List Tasks Status
```bash
task-cli list todo 
```
lists all the added tasks. This is the default when a task is added

```bash
task-cli list in-progress 
```
lists all tasks that have status: in-progress

```bash
task-cli list todo
```
lists all tasks that have status: todo
