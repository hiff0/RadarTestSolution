function getMaxElementsLength(data: (string | number)[][], columnCount: number, rowCount: number) {
    const maxElementsLenghtInRow: number[] = [];
    for (let i = 0; i < columnCount; i += 1) {
        let maxLength = `${data[0][i]}`.length;
        for (let j = 1; j < rowCount; j += 1) {
            if (`${data[j][i]} `.length > maxLength) {
                maxLength = `${data[j][i]} `.length;
            }
        }
        maxElementsLenghtInRow.push(maxLength);
    }
    return maxElementsLenghtInRow;
}

export default getMaxElementsLength;