import { Tag } from "./tag";

export class Task {
    constructor(public id: number, public title: string, public status: string, public sortIndex: number = 0, public tags: string[] =[]) { }
}

