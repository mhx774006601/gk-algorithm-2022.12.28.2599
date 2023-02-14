/**
 * [题解] lc327 区间和的个数  javascript  归并排序
 * 假设给定两个升序的数组n1,n2；找出所有的下标对[i,j],满足 n2[j] - n1[i] 在区间[lower,upper]中
 * 在已知两个数组均为升序的情况下，这一问题是相对简单的：我们在 n2中维护两个指针 l,r。起初，它们都指向 n2的起始位置。
 * 然后我们查看n1 的第1个元素，首先，不断地将指针l向右移动，直到 n2[l] >= n1[0] + lower为止，
 * 此时， l 及其右边的元素均大于或等于 n1[0]+lower 。
 * 随后，再不断的将指针r向右移动，直到 n2[r] > n1[0] + upper 为止
 * 则 r 左边的元素均小于或等于 n1[0] + upper 。
 * 所在在区间[l,r]中的所有下标j ,都满足 n2[j] - n1[0] 都在范围[lower,upper]中
 * 然后第二步，我们检查n1的第2个元素，由于n1 是递增的，所以不难发现 l, r 只可能向右移动。
 * 按照上面操作，依次检查剩下的数，对于n1中的每一个下标，都记录相应的区间[l,r]的大小。
 * 最终我们就能得到下标对[i,j]的数量。
 * 
 * 
 * 
 * * */

/**
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {number}
 */
var countRangeSum = function(nums, lower, upper) {
    let s = 0;
    const sum = [0];
    for(const v of nums) {
        s += v;
        sum.push(s);
    }
    return countRangeSumRecursive(sum, lower, upper, 0, sum.length - 1);

};

const countRangeSumRecursive = (sum, lower, upper, left, right) => {
    if (left === right) {
        return 0;
    } else {
        const mid = Math.floor((left + right) / 2);
        const n1 = countRangeSumRecursive(sum, lower, upper, left, mid);
        const n2 = countRangeSumRecursive(sum, lower, upper, mid + 1, right);
        let ret = n1 + n2;

        // 首先统计下标对的数量
        let i = left;
        let l = mid + 1;
        let r = mid + 1;
        while (i <= mid) {
            while (l <= right && sum[l] - sum[i] < lower) l++;
            while (r <= right && sum[r] - sum[i] <= upper) r++;
            ret += (r - l);
            i++;
        }

        // 随后合并两个排序数组
        const sorted = new Array(right - left + 1);
        let p1 = left, p2 = mid + 1;
        let p = 0;
        while (p1 <= mid || p2 <= right) {
            if (p1 > mid) {
                sorted[p++] = sum[p2++];
            } else if (p2 > right) {
                sorted[p++] = sum[p1++];
            } else {
                if (sum[p1] < sum[p2]) {
                    sorted[p++] = sum[p1++];
                } else {
                    sorted[p++] = sum[p2++];
                }
            }
        }
        for (let i = 0; i < sorted.length; i++) {
            sum[left + i] = sorted[i];
        }
        return ret;
    }
}
