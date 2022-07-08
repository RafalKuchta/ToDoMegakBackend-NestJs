import {Injectable} from '@nestjs/common';
import {CreateTaskDto} from './dto/create-task.dto';
import {UpdateTaskDto} from './dto/update-task.dto';

import {TaskInterface} from "../interfaces/task";
import {Task} from "./entities/task.entity";

import {Db} from '../db';
import {Like} from "typeorm";
import {AppDataSource} from "../../data-source";

@Injectable()
export class TasksService {

    filter(task: Task): TaskInterface {
        const {id, name, completed} = task;
        return {id, name, completed};
    }

    async create(req: CreateTaskDto) {
        try {
            const task = new Task();
            task.name = req.name;
            task.completed = req.completed;

            await task.save();

        } catch (e) {
            throw e;
        }

    }

    async findAll(name: string): Promise<TaskInterface[]> {

        // return await AppDataSource.getRepository(Task)
        //     .createQueryBuilder("task")
        //     .select('task')
        //     .from(Task, "task")
        //     .where("task.name like :name", {name: '%' + name + '%' })
        //     .getMany()

         const tasks = (await Task.find({
            where: {
                name: Like('%' + name + '%')
            }
        }));

        console.log(name)
        console.log(tasks)


        return tasks;

    }

    async findOne(id: string) {
        const task = await Task.findOne({
            where: {
                id,
            }
        });

        return task;
    }


    async update(id: string, req: UpdateTaskDto) {
        if (!id) {
            throw new Error('Task not found!')
        }

        const task = await Task.findOne({
            where: {
                id,
            }
        });

        if (task) {
            task.completed = req.completed;
            task.name = req.name;
            await task.save();

            return {
                isSuccess: true,
            };
        }

        return {
            isSuccess: false,
        };
    }

    async remove(id: string) {
        if (!id) {
            throw new Error('Task not found!')
        }

        const task = await Task.findOne({
            where: {
                id,
            }
        });

        if (task) {
            await task.remove();

            return {
                isSuccess: true,
            };
        }

        return {
            isSuccess: false,
        };

    }

}
