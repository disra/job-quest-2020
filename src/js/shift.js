const shiftArray = (array, direction, n) => {
    const length = array.length;
    if (direction === "left") {
        for (let i = 0; i < (n % length); i++) {
            array.push(array.shift());
        }
    } else if (direction === "right") {
        for (let i = 0; i < (n % length); i++) {
            array.unshift(array.pop());
        }
    } else {
        return "You should fill in this  \"shiftArray([yourArray], 'left/right' , n)\" patterns."
    }
    return array;
}

console.log("right", shiftArray([1, 2, 3, 4, 5], 'right', 3));
console.log("left", shiftArray(['john', 'jane', 'sarah', 'alex'], 'left', 2));