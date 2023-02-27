import { ModelError, MultipleErrors } from "@/generated/openapi";

export const isMultipleErrors = (error: ModelError): error is MultipleErrors => {
    return (error as MultipleErrors).errors !== undefined;
}