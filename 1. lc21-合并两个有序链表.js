/*
*[ 解题思路 ] javascript
*[题目要求将两个有序链表合并为一个新的有序链表，并且返回。 并且新的链表是通过拼接给定的两个链表的所有节点组成的。 
*[并且新链表重复利用了原始链表的内存空间，而不需要新建空间。 比如说题目给出 如下：
*[输入：1->2->4 , 1->3->4.
*[输出： 1->1->2->3->4->4
*[当list1 和 list2 都不是空链表时，判断list1 和 list2 哪一个链表的头节点的值更小，
*[将较小值的节点添加到结果里，并且相对应的链表中的节点向后移动一位。 我们假设定定义一个节点prevhead,
*[指针 prev, 我们在比较的过程中只需要移动prev 指针就行。 如果list1 当前节点的值小于list2, 
*[我们就把l1当点的节点接在prev节点后面，同时将list1的指针往后移一位。否则，我们把list2节点的值给到prev节点后面（prve.next),
*[重复此过程，真到list1 或者 list2 指向了null. 不管我们将哪一个元素接在了后面，我们都需要把prev 向后移一位。
*[在循环终止的时候，list1 , list2 基中有一个必须是非空的，由于输入的两个链表都是有序的，所以不管哪个链表是非深的，
*[它包含的所有元素都比前面已经合并链表中的所有元素都要大。我们只需要把非空链表接在合并链表的后面，并返回合并链表即可。
*/

/*
 *   时间复杂度：O(n+m)。n,m 分别代表两个链表的长度。
 *   空间复杂度：O(1)
*/



// 实现代码：( javascript )
var mergeTwoLists = function(list1, list2) {

    // 定义一个空节点，用来存储每次比较的那个较小值

    const prehead = new ListNode(-1);  

    // 定义指针

    let prev = prehead; 

    // 循环比较链表list1 和 list2中的每一个值

    while(list1 != null && list2 !=null){

        if(list1.val <= list2.val){

            // 如果链表1中的值较小，就把较小的这个值留下来，指针往下走，指向链表1的下一个值

            prev.next = list1;

            list1 = list1.next;

        } else {

            // 如果链表2中的值较小，就把2中的较小值留下来，指针继续前进，指向链表2的下一个值去做比较

            prev.next = list2;

            list2 = list2.next;
        }

        // 每比较一次，留下的较小的那个值和下一个得到的较小值进行连接，依次存放

        prev = prev.next

    }

    // l1 与 l2 最后至少有一个是非空的，我们使用链表末尾指针直接指向未合并完的链表尾部即可
    prev.next = list1 === null ? list2 : list1
    return prehead.next;
};

