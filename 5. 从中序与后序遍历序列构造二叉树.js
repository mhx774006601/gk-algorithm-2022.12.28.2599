/**
 * 【题解】
 * 可以利用后序数组的最后一个节点，即根节点作为切割节，去切中序数组。
 * 找到切割点在中序数组的位置，然后先把根节点找到拿出来，再对中序数组进行左子树和右子树的构造
 * 被切割的中序数组中的左右子树采用递归调用的方法，每次通过后序数组的根节点去切割中序数组的左右孩子
 * 中序数组会被切割成左中序数组，右中序数组
 * 后序数组会被切割成左后序数组，右后序数组
 * 
 * 时间复杂度： O(n), n 是树的节点的个数
 * 空间复杂度： O(n), n 是存储哈希表的空间
 * 
 */

var buildTree = function(inorder, postorder) {
    let post_idx; // 定义一个下标索引
    let idx_map = new Map();
    //定义递归函数
    const helper = (in_left,in_right) => {
        // 如果这里没有节点构造二叉树了，就结束
        if(in_left > in_right){
            return null
        }
        
        // 后序遍历最好的一个节点，作为根节点。选择 post_idx 位置的元素作为当前子树根节点
        const root_val = postorder[post_idx]; // 切割点的值
        const root = new TreeNode(root_val); // 构造根节点
        // 根据 root 所在位置分成左右两棵子树
        const index = idx_map.get(root_val);
        
        post_idx--; // 下标减一
        root.right = helper(index+1,in_right); // 构造右子树
        root.left = helper(in_left, index-1); // 构造左子树
        return root;
    }
    
    // 从后序遍历的最后一个元素开始
    post_idx = postorder.length - 1;
    
    // 建立（元素，下标）键值对的哈希表
    //后序数组遍历它的值和下标，存入哈希表中，然后再根据根节点进行递归调用
    let idx = 0;
    inorder.forEach((val,idx) => {
        idx_map.set(val,idx)
    })
    return helper(0,inorder.length - 1);
};