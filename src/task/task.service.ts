import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {


    createTask(dto){
        return 'Task created';
    }

    getTask(){
        return 'All tasks here';
    }

    getTaskById(id){
        return 'One task retrived';
    }

    updateTaskById(id){
        return 'Task updated';
    }

    deleteTaskById(id){
        return 'Task deleted';
    }
}
