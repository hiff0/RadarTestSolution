import getRandomElements from "./getRandomElements";
import Table from "./table";
import getArrayOfUniqueValues from "./utils/getArrayOfUniqueValues";

/*
    Здесь вы можете как угодно эксперементировать с написанным вами кодом;

    ARRAY_OF_UNIQUE_VALUES - массив уникальных значений из N элементов,
    возможно, будет полезно :)

*/

//********************************************************************* 

const N = 1000;
const ARRAY_OF_UNIQUE_VALUES = getArrayOfUniqueValues(N);

console.time('Some tag');
const result = getRandomElements(ARRAY_OF_UNIQUE_VALUES, 999);
console.timeEnd('Some tag');
console.log(result);


//*********************************************************************

// const tableArr: any[] =
//     [['№', 'Фамилия', 'Имя', 'Должность'],
//     ['1', 'Петров', 'Владислав', 'Разработчик'],
//     ['2', 'Иванов', 'Иван', 'Менеджер'],
//     ['3', 'Николаева', 'Ольга', 'Аналитик'],
//     ['4', 'Новиков', 'Алексей', 'Директор']];
// const table = new Table();
// table.setData(tableArr);
// table.removeRow();
// table.removeColumn();
// table.setData('Васильев', 2, 3);
// table.print();