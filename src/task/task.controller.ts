import { Controller, Post, Get, Patch, Delete, Body, Param } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from './dto';

@Controller('tasks')
export class TaskController {
    constructor( private taskService : TaskService) {}

    @Post('/')
    createTask(@Param() id:number,dto:TaskDto){
        return this.taskService.createTask(id,dto)
    }
    @Get('/')
    getTask(){
        return this.taskService.getTask()
    }

    @Get(':id')
    getTaskById(@Param() id:number){
        return this.taskService.getTaskById(id)
    }

    @Patch(':id')
    updateTaskById(@Param() id:number, dto:TaskDto){
        return this.taskService.updateTaskById(id,dto)
    }

    @Delete(':id')
    deleteTaskById(@Param() id:number){
        return this.taskService.deleteTaskById(id)
    }

}
