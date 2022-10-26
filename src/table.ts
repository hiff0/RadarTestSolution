import { type } from "os";

function getMaxRowLength(dataArray: (string | number)[][]): number[] {
    let maxRowLength = dataArray[0].length;
    let maxRowIndex = 0;
    for (const row of dataArray) {
        if (row.length > maxRowLength) {
            maxRowLength = row.length;
            maxRowIndex = dataArray.indexOf(row);
        }
    }
    return [maxRowLength, maxRowIndex];
}

function insert(array: any[], element: string | string[], index: number): any[] {
    if (index <= array.length && index >= 0) {
        const arrayCopy = array;
        arrayCopy.push(' ');
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

class Table {

    private _column: number;
    private _row: number;
    private _data: (string | number)[][];

    constructor(columnCount: number = 0, rowCount: number = 0, data: (string | number)[][] = [[]]) {
        if (rowCount < data.length) {
            this._row = data.length;
        } else {
            this._row = rowCount;
        }

        const [maxRowLength, maxRowIndex] = getMaxRowLength(data);
        if (columnCount < maxRowLength) {
            this._column = data[maxRowIndex].length;
        } else {
            this._column = columnCount;
        }
        this._data = this.setArray(this._column, this._row, data);
    }

    private setArray(columnCount: number, rowCount: number, data: (string | number)[][] = [[]]) {
        const dataArr: (string | number)[][] = data;

        if (dataArr.length !== 1 && dataArr[0].length !== 0) {
            for (let i = 0; i < rowCount; i += 1) {
                if (i >= dataArr.length) {
                    dataArr.push([]);
                }
                for (let j = 0; j < columnCount; j += 1) {
                    if (j >= dataArr[i].length) {
                        dataArr[i][j] = ' ';
                    }
                }
            }
            return dataArr;
        }

        for (let i = 0; i < rowCount - 1; i += 1) {
            dataArr.push([]);
        }

        for (const row of dataArr) {
            for (let i = 0; i < columnCount; i += 1) {
                row.push(' ');
            }
        }
        return dataArr;
    }

    print(): void {
        //Ищем максимальную длину слова в каждом столбце
        const maxElementLenght: number[] = [];
        for (let i = 0; i < this._column; i += 1) {
            let maxLength = `${this._data[0][i]}`.length;
            for (let j = 1; j < this._row; j += 1) {
                if (`${this._data[j][i]} `.length > maxLength) {
                    maxLength = `${this._data[j][i]} `.length;
                }
            }
            maxElementLenght.push(maxLength);
        }

        // Записываем количество табов для каждого элемента
        const dataTabs = this._data;

        for (let i = 0; i < this._column; i += 1) {
            for (let j = 0; j < this._row; j += 1) {
                const tab = ' '.repeat(maxElementLenght[i] - `${this._data[j][i]} `.length + 1);
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
                const dataToString: string = `${data} `;
                this._data[row - 1][column - 1] = dataToString;
            } catch (e) {
                console.log(e);
            }
        } else {
            if (this._row < data.length) {
                this._row = data.length;
            }
            const [maxRowLength, maxRowIndex] = getMaxRowLength(data);
            if (this._column < maxRowLength) {
                this._column = data[maxRowIndex].length;
            }
            this._data = this.setArray(this._column, this._row, data);
        }
    }

    addColumn(columnCount: number = 1, index: number | boolean = true): void {

        if (typeof index === 'boolean') {
            for (let i = 0; i < columnCount; i += 1) {
                if (index) {
                    for (let row of this._data) {
                        row.push(' ');
                    }
                } else {
                    for (let row of this._data) {
                        row.unshift(' ');
                    }
                }
                this._column += 1;
            }
        } else if (index > this._column + 1 || index < 1) {
            console.log('Ошибка добавления колонки(ок). Количество колонок меньше или больше, чем входной индекс');
        } else {
            for (let i = 0; i < columnCount; i += 1) {
                for (const row of this._data) {
                    insert(row, ' ', index - 1);
                }
                this._column += 1;
            }
        }
    }

    addRow(rowCount: number = 1, index: number | boolean = true): void {
        if (typeof index === 'boolean') {
            for (let i = 0; i < rowCount; i += 1) {
                if (index) {
                    const puchArr = [];
                    for (let i = 0; i < this._data[0].length; i += 1) {
                        puchArr.push(' ');
                    }

                    this._data.push(puchArr);
                } else {
                    const puchArr = [];
                    for (let i = 0; i < this._data[0].length; i += 1) {
                        puchArr.push(' ');
                    }

                    this._data.unshift(puchArr);
                }
                this._row += 1;
            }
        } else if (index > this._row + 1 || index < 1) {
            console.log('Ошибка добавления строки. Количество строк меньше или больше, чем входной индекс');
        } else {
            const pushRow = [];
            while (pushRow.length < this._column) {
                pushRow.push(' ');
            }
            for (let i = 0; i < rowCount; i += 1) {
                this._data = insert(this._data, pushRow, index - 1);
                this._row += 1;
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
                for (let i = 0; i < rowCount; i += 1) {
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