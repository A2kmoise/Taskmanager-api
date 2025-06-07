import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { title } from 'process';

@Injectable()
export class TaskService {
    constructor(@InjectRepository(Task) private taskRepository: Repository<Task>) { }

    async createTask(dto) {
        try {
            
        //find if task exists
        const extinguishtask = await this.taskRepository.findOne({ where: { title: dto.title } });
        if (extinguishtask) throw new ConflictException('Task already exists');
        //create a task
        const task = await this.taskRepository.create({
            title: dto.title,
            description: dto.description
        });

        await this.taskRepository.save(task);

        return {
            message: "Task created successfully",
            task: {
                title: task.title,
                description: task.description
            }
        }
                } catch (error) {
            console.error(error);
        }

    }

    async getTask() {
      //retrieve all tasks
    const tasks = await this.taskRepository.find();

    return{
        message: "All tasks",
        tasks
    }
    }

    async getTaskById(id) {
        //find if task exists
        const task = await this.taskRepository.findOne({ where: id});
        if (!task) throw new NotFoundException('This task doesn\'t exist');

        return {
            message: "The single task retrieved",
            task: {
                id: task.id,
                title: task.title,
                description: task.description
            }
        }
    }

   async  updateTaskById(id, dto) {
        // find if task exists
        const task =  await this.taskRepository.findOne({where:{ id }});
        if (!task) throw new NotFoundException('This task doesn\'t exist');
           //update a task

      const updatedtask = this.taskRepository.merge(task, dto )

      await this.taskRepository.save(updatedtask);
    }

    async deleteTaskById(id) {
      const result = await this.taskRepository.delete({id});

      if ( result ) {
        return {
            message: "Task deleted"
        }
      }
    }
}
