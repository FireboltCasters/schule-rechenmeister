import React from "react";
import {AdditionBaseTaskGenerator} from "./AdditionBaseTaskGenerator";

export class AdditionTaskGenerator {

    static generateWithoutTenTransition(maxNumber: any) {
        let baseTask = AdditionBaseTaskGenerator.generateWithoutTenTransition(maxNumber);
        let taskWithSolution = {
            task: baseTask.higherNumber + " + " + baseTask.lowerNumber,
            solution: baseTask.solution
        }

        return taskWithSolution;
    }

    static generateWithTenTransition(maxNumber: any) {
        let baseTask = AdditionBaseTaskGenerator.generateWithTenTransition(maxNumber);

        let taskWithSolution = {
            task: baseTask.higherNumber + " + " + baseTask.lowerNumber,
            solution: baseTask.solution
        }

        return taskWithSolution;
    }

    static generateWithTenTransitionSingleNumber(maxNumber: any) {
        let baseTask = AdditionBaseTaskGenerator.generateWithTenTransitionSingleNumber(maxNumber);

        let taskWithSolution = {
            task: baseTask.higherNumber + " + " + baseTask.lowerNumber,
            solution: baseTask.solution
        }

        return taskWithSolution;
    }
}
