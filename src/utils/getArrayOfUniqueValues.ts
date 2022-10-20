import generateToken from "./generateToken";
import isContains from "./contains";

const UNIQUE_TOKEN_LENGTH = 5;
const UNIQUE_ARRAY_MAX_LENGTH = 10000;

/**
 * Возвращает массив уникальных строк
 * @param length - длина массива (max = 10000)
 */
export default function getArrayOfUniqueValues(length: number): string[] {

    if(!length) return [];
    if(length > UNIQUE_ARRAY_MAX_LENGTH) length = UNIQUE_ARRAY_MAX_LENGTH;

    let arrayTemplate: string[] = [];
    for (let i = 0; i < length; i++) {
        addUniqueValue(arrayTemplate);
    }

    return arrayTemplate;
}

function addUniqueValue(arr: string[]): void {
    const token = generateToken(UNIQUE_TOKEN_LENGTH);
    const isTokenAlreadyExist = isContains(arr, token);
    if(isTokenAlreadyExist) addUniqueValue(arr);
    else arr.push(token);
}