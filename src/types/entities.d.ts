/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

export interface Task {
   /**
    * Unique identifier for each task.
    */
   id: number;

   /**
    * Short title of the task.
    * Must be between 2 and 20 characters.
    */
   source: string;

   /**
    * Detailed description of the task.
    * Maximum length of 80 characters.
    */
   description: string;

   /**
    * Status of the task.
    * True if completed, false if pending.
    */
   completed: boolean;
}
