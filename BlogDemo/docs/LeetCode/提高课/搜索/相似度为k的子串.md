---
title: 相似度为k的子串 
date: 2022-09-21
tags:
 - 搜索
 - DFS
 - BFS
---

## [相似度为 K 的字符串](https://leetcode.cn/problems/k-similar-strings/)

```java
//DFS
class Solution {
     int ans = Integer.MAX_VALUE;
    public int kSimilarity(String s1, String s2) {
        int n = s1.length();
        StringBuilder sb1 = new StringBuilder();
        StringBuilder sb2 = new StringBuilder();
        for(int i = 0; i < n; i++) {
            if(s1.charAt(i) != s2.charAt(i)) {
                sb1.append(s1.charAt(i));
                sb2.append(s2.charAt(i));
            }
        }
        if(sb1.length() == 0) return 0;
        int len = sb1.length();
        dfs(0, 0, len, sb1.toString(), sb2.toString());
        return ans;
    }
    private void dfs(int u, int cost, int len,String s1, String s2) {
        if(cost > ans) return;
        while(u < len && s1.charAt(u) == s2.charAt(u)) u++;
        if(u == len){
            ans = Math.min(ans, cost);
            return;
        }
        for(int i = u + 1; i < len; i++) {
            if(s1.charAt(i) == s2.charAt(u)) {
                String next = swap(s1, u, i);
                dfs(u + 1, cost + 1, len, next, s2);
            }
        }
    }
    
    private String swap(String s, int a, int b){
        char[] cs = s.toCharArray();
        char tem = cs[a];
        cs[a] = cs[b];
        cs[b] = tem;
        return String.valueOf(cs);
    }
}
```

```java
class Solution {
     public int kSimilarity(String s1, String s2) {
        //bfs
        int n = s1.length();
        Deque<Node> de = new ArrayDeque<>();
        de.addLast(new Node(s1, 0));
        int step = 0;
        Set<String> visit = new HashSet<>();
        while(!de.isEmpty()) {
            int size = de.size();
            for(int i = 0; i < size; i++) {
                Node node = de.pollFirst();
                String cur = node.s;
                int pos = node.value;
                if(cur.equals(s2)) return step;
                while(pos < n && cur.charAt(pos) == s2.charAt(pos)) pos++;
                //找到不一样的位置
                for(int j = pos + 1; j < n; j++) {
                    if(cur.charAt(j) == s2.charAt(j)) continue;
                    if(cur.charAt(j) == s2.charAt(pos)) {
                        String next = swap(cur, pos, j);
                        if(!visit.contains(next)) {
                            visit.add(next);
                            de.addLast(new Node(next, pos + 1));
                        }
                    }
                }
            }
            step++;
        }
        return step;
    }
    private String swap(String s, int a, int b){
        char[] cs = s.toCharArray();
        char tem = cs[a];
        cs[a] = cs[b];
        cs[b] = tem;
        return String.valueOf(cs);
    }
    class Node{
        String s;
        int value;
        public Node(String s, int value) {
            this.s = s;
            this.value = value;
        }
    }
}
```

