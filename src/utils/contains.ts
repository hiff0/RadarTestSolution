/**
 * Проверяет содержит ли массива какой-то элемент
 * @param arr - массив значений
 * @param elem - искомый элемент
 */
export default function isContains<T>(arr: T[], elem: T): boolean {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === elem) {
            return true;
        }
    }
    return false;
}