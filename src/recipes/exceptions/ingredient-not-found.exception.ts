import { NotFoundException } from "@nestjs/common";

export class IngredientNotFoundException extends NotFoundException {
    constructor() {
        super("This ingredient no longer exists or has been moved someplace else");
    }
}
