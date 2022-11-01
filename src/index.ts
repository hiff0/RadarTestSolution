import getRandomElements from "./getRandomElements";
import Table from "./table";
import getArrayOfUniqueValues from "./utils/getArrayOfUniqueValues";

//********************************************************************* 

const N = 100;
const ARRAY_OF_UNIQUE_VALUES = getArrayOfUniqueValues(N);
const result = getRandomElements(ARRAY_OF_UNIQUE_VALUES, 10);
console.log(result);


//*********************************************************************

const tableArr =
    [['№', 'Фамилия', 'Имя', 'Должность'],
    [1, 'Петров', 'Владислав', 'Разработчик'],
    ['2', 'Иванов', 'Иван', 'Менеджер'],
    [' ', ' ', ' ', ' ', ' '],
    ['3', 'Николаева', 'Ольга', 'Аналитик'],
    ['4', 'Новиков', 'Алексей', 'Директор', 'Текст']];
const table = new Table();
table.setData(tableArr);
table.addRow(2, 3);
table.removeColumn(2);
table.print();
