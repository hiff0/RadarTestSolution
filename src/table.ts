import getMaxRowLength from "./utils/getMaxRowLength";
import getMaxElementsLength from "./utils/getMaxElementsLegth";

class Table {

    private _column: number;
    private _row: number;
    private _data: (string | number)[][];

    constructor(columnCount = 1, rowCount = 1, data: (string | number)[][] = [[]]) {
        this._row = rowCount < data.length ? data.length : rowCount;
        const [maxRowLength, maxRowIndex] = getMaxRowLength(data);
        this._column = columnCount < maxRowLength ? data[maxRowIndex].length : columnCount;
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
        const maxElementsLenghtInRow: number[] = getMaxElementsLength(this._data, this._column, this._row);
        const dataTabs = this._data.map((row, rowIndex) => row.map((column, columnIndex) => {
            const tab = ' '.repeat(maxElementsLenghtInRow[columnIndex] - `${this._data[rowIndex][columnIndex]}`.length + 1);
            return column += tab;
        }))

        const separator = '='.repeat((dataTabs[0].join(' | ') + '| ' + ' |').length);
        // Вывод таблицы
        console.log(separator);
        for (const row of dataTabs) {
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

    setData(data: ((string | number)[][] | string), column?: number, row?: number): void {
        if (typeof column !== 'undefined' && typeof row !== 'undefined' && typeof data === 'string') {
            try {
                if (column < 0 || row < 0 || column > this._column || row > this._row) {
                    throw new Error('Такой ячейки не существует');
                }
                const dataToString = `${data} `;
                this._data[row - 1][column - 1] = dataToString;
            } catch (e) {
                console.log(e);
            }
        } else if (Array.isArray(data)) {
            if (this._row < data.length) {
                this._row = data.length;
            }
            const [maxRowLength, maxRowIndex] = getMaxRowLength(data);
            if (this._column < maxRowLength) {
                this._column = data[maxRowIndex].length;
            }
            this._data = this.setArray(this._column, this._row, data);
        } else {
            throw new Error('Первый аргумент, не массив, введите номер колонки и номер строки или передайте первым аргументом массив');
        }
    }

    addColumn(columnCount = 1, index: number | boolean = true): void {
        if (typeof index === 'boolean') {
            for (let i = 0; i < columnCount; i += 1) {
                if (index) {
                    for (const row of this._data) {
                        row.push(' ');
                    }
                } else {
                    for (const row of this._data) {
                        row.unshift(' ');
                    }
                }
                this._column += 1;
            }
        } else if (index > this._column + 1 || index < 1) {
            throw new Error('Ошибка добавления колонки(ок). Количество колонок меньше или больше, чем входной индекс');
        } else {
            for (let i = 0; i < columnCount; i += 1) {
                for (const row of this._data) {
                    // insert(row, ' ', index - 1);
                    row.splice(index - 1, 0, ' ');
                }
                this._column += 1;
            }
        }
    }

    addRow(rowCount = 1, index: number | boolean = true): void {
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
            throw new Error('Ошибка добавления строки. Количество строк меньше или больше, чем входной индекс');
        } else {
            for (let i = 0; i < rowCount; i += 1) {
                const pushRow = [];
                while (pushRow.length < this._column) {
                    pushRow.push(' ');
                }
                this._data.splice(index - 1, 0, pushRow);
                this._row += 1;
            }
        }
    }

    removeColumn(columnCount = 1, index: number | boolean = true) {
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
                    console.log(row);
                    row.splice(index - 1, 1);
                }
                this._column -= 1;
            }
        }
    }

    removeRow(rowCount = 1, index: number | boolean = true): void {
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
            throw new Error('Строка не существует');
        } else {
            for (let i = 0; i < rowCount; i += 1) {
                this._data.splice(index - 1, 1);
                this._row -= 1;
            }
        }
    }
}

export default Table;