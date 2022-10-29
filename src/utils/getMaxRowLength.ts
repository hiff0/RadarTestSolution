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

export default getMaxRowLength;