import { type } from "os";

function createArr(startArr: any[], columnCount: number, rowCount: number) {
    const resArr = startArr;
    for (let i = 0; i < rowCount; i += 1) {
        resArr.push([]);
        for (let j = 0; j < columnCount; j += 1) {
            resArr[i][j] = null;
        }
    }
    return resArr;
}

function insert(array: any[], element: any, index: number): any[] {
    if (index <= array.length && index >= 0) {
        const arrayCopy = array;
        arrayCopy.push('');
        let currentEl: any = arrayCopy[index];
        for (let i = index + 1; i < arrayCopy.length; i += 1) {
            let temp: any = currentEl;
            currentEl = arrayCopy[i];
            arrayCopy[i] = temp;
        }
        arrayCopy[index] = element;
        return arrayCopy;
    } else {
        console.log('Индекс втавки меньше нуля или больше размера массива');
        return array;
    }
}
// Класс колонки
class Column {
    private _count: number;

    constructor(columnCount: number = 0) {
        this._count = columnCount;
    }


    get count(): number {
        return this._count;
    }
}

// Класс строки
class Row {
    private _count: number;

    constructor(rowCount: number = 0) {
        this._count = rowCount;
    }

    get count(): number {
        return this._count;
    }
}

class Table {

    private _column: number;
    private _row: number;
    private _data: any[];

    constructor(columnCount: number = 0, rowCount: number = 0, data: any[] = createArr([], columnCount, rowCount)) {
        this._column = new Column(columnCount).count;
        this._row = new Row(rowCount).count;
        this._data = data;
    }

    print(): void {
        //Ищем максимальную длину слова в каждом столбце
        const maxElementLenght: number[] = [];
        for (let i = 0; i < this._column; i += 1) {
            let maxLength = `${this._data[0][i]}`.length;
            for (let j = 1; j < this._row; j += 1) {
                if (`${this._data[j][i]}`.length > maxLength) {
                    maxLength = this._data[j][i].length;
                }
            }
            maxElementLenght.push(maxLength);
        }

        // Записываем количество табов для каждого элемента
        const dataTabs = this._data;

        for (let i = 0; i < this._column; i += 1) {
            for (let j = 0; j < this._row; j += 1) {
                const tab = ' '.repeat(maxElementLenght[i] - `${this._data[j][i]}`.length + 1);
                dataTabs[j][i] += tab;
            }
        }

        const separator = '='.repeat((dataTabs[0].join(' | ') + '| ' + ' |').length)
        // Вывод таблицы
        console.log(separator);
        for (const row of this._data) {
            console.log('| ' + row.join(' | ') + ' |');
            console.log(separator);
        }
    }

    get column(): number {
        return this._column;
    }

    get row(): number {
        return this._row;
    }

    setData(data: any, column?: number, row?: number): void {
        if (typeof column !== 'undefined' && typeof row !== 'undefined') {
            try {
                if (column < 0 || row < 0 || column > this._column || row > this._row) {
                    throw new Error('Такой ячейки не существует');
                }
                const dataToString: string = `${data}`;
                this._data[row - 1][column - 1] = dataToString;
            } catch (e) {
                console.log(e);
            }
        } else {
            this._data = data;
            this._row = data.length;
            this._column = data[0].length;
        }
    }

    addColumn(columnCount: number = 1, index: number | boolean = true): void {

        if (typeof index === 'boolean') {
            for (let i = 0; i < columnCount; i += 1) {
                if (index) {
                    for (let row of this._data) {
                        row.push(null);
                    }
                } else {
                    for (let row of this._data) {
                        row.unshift(null);
                    }
                }
                this._column += columnCount;
            }
        } else if (index > this._column + 1 || index < 1) {
            console.log('Количество колонок меньше или больше, чем входной индекс')
        } else {
            for (let i = 0; i < columnCount; i += 1) {
                for (const row of this._data) {
                    insert(row, null, index - 1);
                }
                this._column += columnCount;
            }
        }
    }

    addRow(rowCount: number = 1, index: number | boolean = true): void {
        if (typeof index === 'boolean') {
            for (let i = 0; i < rowCount; i += 1) {
                if (index) {
                    const puchArr = [];
                    for (let i = 0; i < this._data[0].length; i += 1) {
                        puchArr.push(null);
                    }

                    this._data.push(puchArr);
                } else {
                    const puchArr = [];
                    for (let i = 0; i < this._data[0].length; i += 1) {
                        puchArr.push(null);
                    }

                    this._data.unshift(puchArr);
                }
                this._row += rowCount;
            }
        } else if (index > this._row + 1 || index < 1) {
            console.log('Количество строк меньше или больше, чем входной индекс');
        } else {
            const pushRow = [];
            while (pushRow.length < this._column) {
                pushRow.push(null);
            }
            for (let i = 0; i < rowCount; i += 1) {
                this._data = insert(this._data, pushRow, index - 1);
                this._row += rowCount;
            }
        }
    }

    removeColumn(columnCount: number = 1, index: number | boolean = true) {

        if (typeof index === 'boolean') {
            if (index) {
                for (let i = 0; i < columnCount; i += 1) {
                    for (const row of this._data) {
                        row.pop();
                    }
                    this._column -= 1;
                }
            } else {
                for (let i = 0; i < columnCount; i += 1) {
                    for (const row of this._data) {
                        row.shift();
                    }
                    this._column -= 1;
                }
            }
        } else if (index > this._column || index < 1 || columnCount + index > this._column) {
            console.log('Конка не существует');
        } else {
            for (let i = 0; i < columnCount; i += 1) {
                for (const row of this._data) {
                    row.splice(index - 1, 1);
                }
                this._column -= 1;
            }
        }
    }

    removeRow(rowCount: number = 1, index: number | boolean = true): void {
        if (typeof index === 'boolean') {
            if (index) {
                for (let i = 0; i < rowCount; i += 1) {
                    this._data.pop();
                    this._row -= 1;
                }
            } else {
                for (let i = 0; i < rowCount; i + 1) {
                    this._data.shift();
                    this._row -= 1;
                }
            }
        } else if (index > this._column || index < 1 || rowCount + index > this._row) {
            console.log('Строка не существует')
        } else {
            for (let i = 0; i < rowCount; i += 1) {
                this._data.splice(index - 1, 1);
                this._row -= 1;
            }
        }
    }
}



export default Table;