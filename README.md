# react-injection
IOC Container for Angular-style dependency injection for React

### Introduction
react-injection uses decorators to declare singleton services and wrap React components to inject dependant services into their props by providing IOC Container handles similar to Angular.

### Advantages
- Easy migration from/to Angular
- Simplifies writing Unit Tests for components
- Allows managing application's state by creating stateful services
- Zero learning curve, unlike Redux, MobX etc.
- Can be used with other state management libraries like Redux
- Tiny in size

### Configure
Enable decorators in your typescript project in *tconfig.json*
```
{
  "compilerOptions": {
    ...
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    ...
  }
}
```

### Usage
Create injectable services
```
import { Service, Autowired } from 'react-injection';

@Service()
class HttpService {
    get(url: string): Promise<Response> {
        return fetch(url);
    }

    post(url: string, body: any): Promise<Response> {
        return fetch(url, { method: 'POST', body: JSON.stringify(body) });
    }
}

@Service()
class TodoService {
    
    @Autowired({ service: HttpService })
    private readonly httpService: HttpService;

    getTodos(): Todo[] {
        return this.httpService.get(TODO_GET_URL)
            .then(response => response.json())
    }

    addTodo(todo: Todo) {
        return this.httpService.post(TODO_POST_URL, todo);
    }
}
```

Inject services into React components through composition

```
import React from 'react'
import { Component } from 'react-injection';

interface TodoComponentProps {
    todoService: TodoService
}

@Component({
    services: { todoService: TodoService }
})
class TodoComponent extends React.Component<TodoComponentProps> {

    constructor(props) {
        super(props);

        this.state = { todos: [] };
    }

    render() {
        // Return JSX
    }

    componenetDidMount() {
        this.props.todoService.getTodos()
            .then(todos => this.setState({ todos }));
    }

}
```