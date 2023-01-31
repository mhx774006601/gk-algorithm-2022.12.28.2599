/**
 * [题解] 
 *  javascript , 哈希表
 * 
 * 假设原数组中出现次数最多的数为 m ,那么和原数组的度相同的最短连续子数组也一定包含了原数组中的所有 m 。 
 * 并且两端恰好为m 第一次出现和最后一次出现的位置。
 * 符合条件的 m 可能会有多个，即多个不同的数在原数组中出现的次数相同，为了找到这样的子数组，我们需要统计每一个数出现的次数。
 * 同时还要统计每一个数第一次出现和最后一次出现的位置。
 * 我们可以用哈希表来表示，哈希表的长度设定为3，里面有3个元素，一个元素nums表示这个数在数组中出现的次数，第二个元素left表示
 * 这个数在数组中第一次出现的位置，第三个元素right 表示这个数在数组中最一次出现的位置。
 * 记录完这些信息后，开始遍历哈希表，找到元素出现次数最多，且前后位置相差最小的数。
 * 
 * 时间复杂度：o(n),n 代表原数组的长度
 * 空间复杂度：O(n),n 代表原数组的长度
 */


var findShortestSubArray = function(nums) {
    // 定义一个空对象存储哈希
    const mp = {};
    // 把nums 遍历成key,value 的形式
    for(const [i,num] of nums.entries()){
        // 判断num值是否在mp中，如果在，就是找到这个数的索引+1，
        //同时把entries遍历出来的索引 i 给到 mp 中的末位的数所在的位置索引
        if(num in mp){
            mp[num][0]++;
            mp[num][2] = i;
        } else {
            mp[num] = [1,i,i];
        }
    }
    
    // 定义数组的度为0，最短连续子数组长度为0
    let maxNum = 0, minLen = 0;
    // 把mp对象中的value值放在数组中，同时使用left,right 两个边界进行判断最短长度
    for (const [count,left,right] of Object.values(mp)){
        console.log(count,left,right)
        //如果数组的度小于数组元素个数count。使用right ,left 两个边界的值算出连续子数组的最短长度
        if(maxNum < count){
            maxNum = count;
            minLen = right - left + 1;
        } else if(maxNum === count){
            //如果数组的度和count相等，并且连续子数组的长度大于左右边界的值，就取小一点的值
            if(minLen > (right - left + 1)){
                minLen = right - left + 1;
            }
        }
    }
    return minLen;
};