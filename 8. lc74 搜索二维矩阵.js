/***
 * [题解] javascript  二分查找
 * 矩阵从左到右 从上到下满足递增的性质，所以可以把二维数组看成一个一维递增的数组，然后进行二分查找，只需要将一维坐标转换成二维坐标。
 * 
 * 时间复杂度：O(log(mn)), m,n 是矩阵的行数和列数
 * 空间复杂度：O(1)
 * 
 */
 
var searchMatrix = function(matrix, target) {
    // 行数为m  , 每一行的元素个数为 n 
    const m = matrix.length,n = matrix[0].length;
    let low = 0, high = m * n - 1;
    while(low <= high){
        // 取中间值
        const mid = Math.floor((high - low)/2)+low;
        // 一维坐标转换成二维坐标
        const x = matrix[Math.floor(mid / n)][mid % n];
        if(x < target){
            low = mid + 1
        } else if(x > target){
            high = mid - 1
        } else {
            return true;
        }
    }
    return false;
};