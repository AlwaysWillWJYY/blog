---
title: 红与黑
date: 2022-09-06
tags:
 - 搜索
 - DFS之连通性模型
---


```java
/**
dfs+floodfill算法
*/

import java.util.*;
class Main{
    static int N = 25;
    static char[][] g = new char[N][N];
    static boolean[][] st = new boolean[N][N];
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        while(true){
            int m = sc.nextInt();
            int n = sc.nextInt();
            if(m == 0 && n == 0) break;
            for(int i = 0; i < n; i++){
                for(int j = 0; j < m; j++){
                    st[i][j] = false;
                }
            }
            for(int i = 0; i < n; i++){
                String s = sc.next();
                for(int j = 0; j < m; j++){
                    g[i][j] = s.charAt(j);
                }
            }
            int x = -1;
            int y = -1;
            for(int i = 0; i < n; i++){
                for(int j = 0; j < m; j++){
                    if(g[i][j] == '@'){
                        x = i;
                        y = j;
                        break;
                    }
                }
            }
            System.out.println(dfs(x, y, n, m));
        }
    }
    static int[] dx = new int[]{-1, 0, 1, 0};
    static int[] dy = new int[]{0, 1, 0, -1};
    public static int dfs(int x, int y, int n, int m){
        int cnt = 1;
        st[x][y] = true;
        for(int i = 0; i < 4; i++){
            int nx = x + dx[i];
            int ny = y + dy[i];
            if(nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
            if(g[nx][ny] != '.') continue;
            if(st[nx][ny]) continue;
            cnt += dfs(nx, ny, n, m);
        }
        return cnt;
    }
}
```

