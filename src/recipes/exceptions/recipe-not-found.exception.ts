import { NotFoundException } from "@nestjs/common";

export class RecipeNotFoundException extends NotFoundException {
    constructor() {
        super("This recipe no longer exists or has been moved someplace else");
    }
}
