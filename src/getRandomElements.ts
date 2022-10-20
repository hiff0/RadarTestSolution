/**
 * Функция возвращает numOfItems случайных, не повторяющихся
 * элементов из массива array.
 * 
 * Примечание: если array.length < numOfItems возвращаем 
 * array.length случайных элементов.
 * 
 * @param array - входной массив
 * @param numOfItems - кол-во элементов которое вернет ф-я
 * @returns массив случайных неповторяющихся элементов
 */

function getRandomElements(array: string[], numOfItems: number): string[] {
    // если количество элементов выходного массива больше или равно исходному, 
    // то возвращаем исходный массив
    if (numOfItems >= array.length) {
        return array;
    }

    // если количество выходных элементов <= 0, то просто вывыодим пустой массив
    if (numOfItems <= 0) {
        return [];
    }

    const randomArray: string[] = []; // результирующий массив

    for (let i = 0; i < numOfItems; i += 1) {
        let randomIndex: number = Math.round(Math.random() * (array.length - 1)); // рандомный индекс
        let currentEl = array[randomIndex]; // рандомный элемент из массива
        while (randomArray.includes(currentEl)) { //если в результирующем массиве есть такой элемент, то берем другой
            randomIndex = Math.round(Math.random() * (array.length - 1));
            currentEl = array[randomIndex];
        }
        randomArray.push(currentEl);
    }

    return randomArray;
}

export default getRandomElements;