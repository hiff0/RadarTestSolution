import getRandomElements from "./getRandomElements";
import Table from "./table";
import getArrayOfUniqueValues from "./utils/getArrayOfUniqueValues";

//********************************************************************* 

const N = 100;
const ARRAY_OF_UNIQUE_VALUES = getArrayOfUniqueValues(N);
const result = getRandomElements(ARRAY_OF_UNIQUE_VALUES, 10);
console.log(result);


//*********************************************************************

const tableArr: string[][] =
    [['№', 'Фамилия', 'Имя', 'Должность'],
    ['1', 'Петров', 'Владислав', 'Разработчик'],
    ['2', 'Иванов', 'Иван', 'Менеджер'],
    ['3', 'Николаева', 'Ольга', 'Аналитик', 'Еще какой-то заголовок', '2 Заголовок'],
    ['4', 'Новиков', 'Алексей', 'Директор', 'Текст']];
const table = new Table();
table.setData(tableArr);
table.addColumn(3, 4);
table.addRow(2, 4);
table.setData('Отчество', 4, 1);
table.removeRow(2, 4);
table.removeColumn(3, 4);
table.print();
