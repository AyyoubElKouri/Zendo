/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import { Task } from '@/types/entities';

/**
 * Abstract repository defining persistence operations for Task entity.
 *
 * Exceptions:
 *  - TaskException: violation of business rules or task not found
 *  - RepositoryException: persistence/storage error
 */
export abstract class TaskRepository {
   /**
    * @throws TaskException if the task informations not respect the business rules for Task Entity
    *
    * @throws RepositoryException if a persistence/storage error occurs
    */
   abstract addTask(task: Task, position?: number): Promise<Task>;

   /**
    * @throws TaskException if the task informations not respect the business rules for Task Entity
    *         or the task with id provided not exists.
    *
    * @throws RepositoryException if a persistence/storage error occurs
    */
   abstract updateTask(id: number, updates: Partial<Task>): Promise<Task>;

   /**
    * @throws TaskException if the task with the id provided was not found
    *
    * @throws RepositoryException if a persistence/storage error occurs
    */
   abstract deleteTask(id: number): Promise<void>;

   /**
    * @throws RepositoryException if a persistence/storage error occurs
    */
   abstract deleteAllTasks(): Promise<void>;

   /**
    * @throws RepositoryException if a persistence/storage error occurs
    */
   abstract findTaskById(id: number): Promise<Task | null>;

   /**
    * @throws RepositoryException if a persistence/storage error occurs
    */
   abstract findAllTasks(): Promise<Task[]>;

   /**
    * @throws RepositoryException if a persistence/storage error occurs
    */
   abstract countTasks(): Promise<number>;
}
