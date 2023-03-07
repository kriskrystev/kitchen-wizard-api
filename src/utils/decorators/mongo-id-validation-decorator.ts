import { BadRequestException, createParamDecorator, ExecutionContext, HttpException } from "@nestjs/common";

const ObjectId = require("mongoose").Types.ObjectId;
type DbDataEntry = [number, { modelName: string, onMissing: () => HttpException }];

/**
 * Validates a request id parameter.
 */
export const ValidMongoID = createParamDecorator(
    (id: string = "id", ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();

        if (!ObjectId.isValid(request.params[id])) {
            throw new BadRequestException("Invalid id");
        }

        return request;
    }
)

/**
 * Goes through an array of tuples representing
 * 1. The position of the id parameter in the method declaration to check for in the database
 * 2. A Configuration Object - used for letting the decorator know what model name we are using. That name is completely
 * up to the client of this code to decide. e.g you defined ModelX in the constructor, you should then pass 'ModelX' as
 * a string to the modelName param.
 *
 * If a record exists - it returns the arguments that were originally passed to the function with an additional result entity
 * then that result entity will be assigned to the parameter index that has been set in the entity object
 *
 * Attaches the data from the query to the database to a destinationIdx
 *
 * This decorator uses the findById mongoose model method.
 * @param data - An array of DbDataEntry tuples
 * @param data.modelName - The name of the model that you defined in your constructor
 * @param data.exception - A callback that you pass for when the findById returns null
 * @param destinationIdx - The index of the parameter in the method declaration. Used for placing the result entity
 * in the correct place, because the javascript arguments array only has the values of the arguments and not their names
 */
export function ExistsInDB(data: Array<DbDataEntry>, destinationIdx?: number) {
    return (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) => {
        let method = descriptor.value!;

        descriptor.value = async function (...args) {
            for (let i = 0; i < data.length; i++) {
                const index = data[i][0];
                const schema = data[i][1];

                const queryResult = await this[schema.modelName].findById(args[index]);

                if (!queryResult) {
                    schema.onMissing();
                }

                if (destinationIdx) {
                    if (!args[destinationIdx]) args[destinationIdx] = [];
                    args[destinationIdx].push(queryResult);
                }
            }

            return method.apply(this, [...args]);
        }
    }
}
