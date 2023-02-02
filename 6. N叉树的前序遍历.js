/***
 * [题解] javascript 
 * 【迭代】
 * 前序遍历就是根-左-右的形式。先考虑边界情况，如果根节点没有孩子，就返回它本身
 * 使用栈来存放N叉树遍边出来的每一个节点，利用栈先进后出的原理，遍历N叉树，从右向左让子节点入栈
 * 然后出栈的时侯节点按左到右的顺序，从而形成前序遍历
 * 
 * 时间复杂度：o(n), n 为N叉树的节点个数
 * 空间复杂度：o(n), n 为N叉树的节点个数，如果N叉树深度为1，则栈的空间为O(n-1),
 * 如果N叉树的深度为 n - 1,则此时栈的空间为o(1). 平均情况下栈的空间是O(logn)
 * 因此空间复杂为 o(n)
 * 
 *  
 */

var preorder = function(root) {
    let req = [];
    if(root == null) return req;
    //用栈模拟递归
    let stack = [];
    stack.push(root);
    while(stack.length > 0){
        let node = stack.pop();
        req.push(node.val);
        //利用栈先进后出的原理，从右向左让子节点入栈，这样可以保证栈里存放的数据是前序遍历的
        for(let i = node.children.length - 1;i >= 0;i--){
          stack.push(node.children[i])
        }
    }
    return req;
};