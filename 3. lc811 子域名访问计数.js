/**
 *  [题解] javascript
 * 每个子域名配对的格式都是‘num d1.d2.d3' 或者是 'num d1.d2' 。子域名的计数如下：
 *  1. 针对 'num d1.d2.d3', 有3个子域名：‘d1.d2.d3','d2.d3','d3',每个域名被访问的次数均为 num 次
 * 
 *  2. 对于格式'num d1.d2'，有两种子域名：‘d1.d2' 和 ‘d2'.每个子域名各被访问 num 次
 * 
 * 每个子域名的计数配对域名，需要使用哈希表记录每个子域名的计数。
 * 遍历数组 cpdomains，对于每个计数配对域名，获得计数和完整域名，更新哈希表中的每个子域名的访问次数num。
   遍历数组 cpdomains 之后，遍历哈希表，对于哈希表中的每个键值对，关键字是子域名，值是计数，
   将计数和子域名拼接得到计数配对域名，添加到答案中。
 * 
 * 时间复杂度：O(L)。其中 L 是数组 cpdomains 中的所有字符串长度之和。
 * 空间复杂度：O(L)。其中 L 是数组 cpdomains 中的所有字符串长度之和。哈希表需要 O(L) 的空间。
 */



//  子域名访问计数 （js,哈希表)
/**
* @param {string[]} cpdomains
* @return {string[]}
*/
var subdomainVisits = function(cpdomains) {
    const ans = []; // 定义输出
    const counts = new Map(); // 使用map存储
    for (const cpdomain of cpdomains) {
        const space = cpdomain.indexOf(' '); // 找到空格所在的索引
        const count = parseInt(cpdomain.slice(0, space)); // 定义次数变量
        const domain = cpdomain.slice(space + 1);// 拿到域名
        counts.set(domain, (counts.get(domain) || 0) + count);
        for (let i = 0; i < domain.length; i++) {
            if (domain[i] === '.') {
            const subdomain = domain.slice(i + 1);
            counts.set(subdomain, (counts.get(subdomain) || 0) + count);
            }
        }
    }
    for (const [subdomain, count] of counts.entries()) {
     ans.push(count + " " + subdomain);
    }
    return ans;

};
