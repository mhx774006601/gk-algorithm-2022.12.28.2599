/***
 * [ 题解 ]
 * 现在你总共有 n 门课需要选，记为 0 到 n-1。
 * 在选修某些课程之前需要一些先修课程。 例如，想要学习课程 0 ，你需要先完成课程 1 ，我们用一个匹配来表示他们: [0,1]
 * 给定课程总量以及它们的先决条件，返回你为了学完所有课程所安排的学习顺序。
 * 可能会有多个正确的顺序，你只要返回一种就可以了。如果不可能完成所有课程，返回一个空数组。
 * 示例 1:
 * 输入: 2, [[1,0]] 
 * 输出: [0,1]
 * 解释: 总共有 2 门课程。要学习课程 1，你需要先完成课程 0。因此，正确的课程顺序为 [0,1] 。
 * 
 * 示例 2:
 * 输入: 4, [[1,0],[2,0],[3,1],[3,2]]
 * 输出: [0,1,2,3] or [0,2,1,3]
 * 解释: 总共有 4 门课程。要学习课程 3，你应该先完成课程 1 和课程 2。并且课程 1 和课程 2 都应该排在课程 0 之后。
 *   因此，一个正确的课程顺序是 [0,1,2,3] 。另一个正确的排序是 [0,2,1,3] 。
 * 说明:
 * 输入的先决条件是由边缘列表表示的图形，而不是邻接矩阵。
 * 你可以假定输入的先决条件中没有重复的边。
 * 
 * 时间复杂度：O(n + m), n 为课程数， m 为先修课程的数量
 * 空间复杂度：O(n + m), n 为课程数， m 为先修课程的数量
 * 
 * 
 */


/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function(numCourses, prerequisites) {
    let hash = {};
    let res = [];
    //初始化hash表
    for(let i = 0; i < numCourses; i++) {
        hash[i] = [];
    }
    //收集课程的前置课程
    for(let i = 0; i < prerequisites.length; i++) {
        hash[prerequisites[i][0]] = Array.from(new Set([...hash[prerequisites[i][0]], ...prerequisites[i].slice(1)]));
    }
    // 遍历直到res排满
    while (res.length < numCourses) {
        let count = 0;//标记hash中的前序为空的课程。
        //遍历hash，碰到前序为空的，放入res，然后删除，最后在hash各课程的前序中去掉它。
        for (key in hash) {
            if (hash[key].length === 0) {
                count++;
                res.push(Number(key));
                delete hash[key]
                for (key2 in hash) {
                    hash[key2].indexOf(Number(key)) > -1 ? hash[key2].splice(hash[key2].indexOf(Number(key)), 1) : ''
                }
            }
        }
        // 如果遍历hash没有找到前置为空的课程，表示存在循环，返回[]
        if (!count) {
            return []
        }
    }
    return res;
};
