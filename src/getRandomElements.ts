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

    if (numOfItems > array.length) {
        numOfItems = array.length;
    }

    if (numOfItems <= 0) {
        return [];
    }

    const arrayCopy = array;
    const randomArray: string[] = [];

    for (let i = 0; i < numOfItems; i += 1) {
        let randomIndex: number = Math.round(Math.random() * (arrayCopy.length - 1));
        let currentEl = arrayCopy[randomIndex];
        arrayCopy.splice(randomIndex, 1);
        randomArray.push(currentEl);
    }

    return randomArray;
}

export default getRandomElements;