/*
[题解过程] javascript
数组遍历
1. 末位无进位，则末位加一即可，因为末位无进位，前面也不可能产生进位，比如 45 => 46
2. 末位有进位，在中间位置进位停止，则需要找到进位的典型标志，即为当前位 %10后为 0，则前一位加 1，直到不为 0 为止，比如 499 => 500
3. 末位有进位，并且一直进位到最前方导致结果多出一位，对于这种情况，需要在第 2 种情况遍历结束的基础上，进行单独处理，比如 999 => 1000

时间复杂度：O(n)

空间复杂度：O(1)

*/

/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
    let n = digits.length;
    //遍历数组，从最高位开始
    for(let i = n - 1;i>=0;i--){
        if(digits[i] !== 9){
            //如果最高位比9小，则直接增1
             ++digits[i];
             // 如果末尾有若干个9,加1后需置成0
            for(let j = i + 1;j<n;++j){
                digits[j] = 0;
            }
            return digits;
        }      
    }

    // digits 中所有元素都为9
    const ans = new Array(n + 1).fill(0);
    ans[0] = 1;
    return ans;
};