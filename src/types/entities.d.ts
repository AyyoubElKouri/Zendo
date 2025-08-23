/*--------------------------------------------------------------------------------------------------
 *                    Copyright (c) Ayyoub EL Kouri. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
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
   * Maximum length of 200 characters.
   */
  description: string;

  /**
   * Status of the task.
   * True if completed, false if pending.
   */
  completed: boolean;
}

