/***
 * [题解]   lc130. 被围绕的区域  <javascript>
 * 被围绕的区间不会存在于边界上，换句话说，任何边界上的 'O' 都不会被填充为 'X'。 我们可以想到，所有的不被包围的 O 都直接或间接与边界上的 O 相连。
 * 我们可以利用这个性质判断 O 是否在边界上，具体地说：
 * 1. 对于每一个边界上的 O，我们以它为起点，标记所有与它直接或间接相连的字母 O；
 * 2. 最后我们遍历这个矩阵，对于每一个字母：如果该字母被标记过，则该字母为没有被字母 X 包围的字母 O，我们将其还原为字母 O；
 *    如果该字母没有被标记过，则该字母为被字母 X 包围的字母 O，我们将其修改为字母 X。
 * 我们可以使用深度优先搜索实现标记操作。在下面的代码中，我们把标记过的字母 O 修改为字母 A。
 * 
 * 时间复杂度：O(n×m)，其中 n 和 m 分别为矩阵的行数和列数。深度优先搜索过程中，每一个点至多只会被标记一次。
 * 空间复杂度：O(n×m)，其中 n 和 m 分别为矩阵的行数和列数。主要为深度优先搜索的栈的开销。
 * 
 */

let n,m;
var solve = function(board) {
   n= board.length ;
    if(n == 0){
        return;
    }
    m=board[0].length;

    for(let i = 0;i<n;i++){
        dfs(board,i,0);
        dfs(board,i,m-1)
    }

    for(let i = 0;i<m - 1;i++){
        dfs(board,0,i);
        dfs(board,n - 1,i);
    }

    for(let i = 0;i<n;i++){
        for(let j = 0;j<m;j++){
            if(board[i][j] == 'A'){
                board[i][j] = 'O'
            }else if(board[i][j] == 'O'){
                board[i][j] = 'X';
            }
        }
    }
};

var dfs = (board,x,y) => {
    // 考虑边界问题
        if(x < 0 || x >=n || y < 0 || y >= m || board[x][y] != 'O'){
            return
        }
        board[x][y] = 'A';
        dfs(board,x + 1,y);
        dfs(board,x - 1,y);
        dfs(board,x, y + 1);
        dfs(board,x, y - 1);
    }

