---
title: AcWing70场周赛
date: 2022-09-25
categories: 
 - 周赛
---

## 1、[两个素数](https://www.acwing.com/problem/content/4621/)

```java
import java.util.*;
class Main{
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int x = sc.nextInt();
        List<Integer> list = new ArrayList<>();
        for(int i = 1; i <= 500; i++) {
            if(is_prime(i)) list.add(i);
        }
        for(int i = 0; i < list.size(); i++) {
            for(int j = i; j < list.size(); j++) {
                if(list.get(i) * list.get(j) == x) {
                    System.out.println(list.get(i) + " " +  list.get(j));
                    return;
                }
            }
        }
    }
    public static boolean is_prime(int n){
        if(n < 2) return false;
        for(int i = 2; i <= n / i; i++){
            if(n % i == 0) return false;
        }
        return true;
    }
}
```

### 二、[减法操作](https://www.acwing.com/problem/content/4622/)

```java
import java.util.*;
class Main{
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] a = new int[n];
        for(int i = 0; i < n; i++){
            a[i] = sc.nextInt();
            if(a[i] > 2) {
                a[i] = a[i] % 2 == 1 ? 1 : 2;
            }
        }
        for(int i = 0; i < n; i++) {
            if(a[i] == 1) {
                if(i == n - 1 || a[i + 1] == 0) {
                    System.out.println("NO");
                    return;
                }
                a[i + 1]--;
            }
        }
        System.out.println("YES");
    }
}
```

### 三、[旅行](https://www.acwing.com/problem/content/4623/)

```java
//类似于算法提高课，求树的最长路径，树形dp

import java.util.*;
class Main{
    static int N = (int)(3e5 + 10);
    static int M = 2 * N;
    static int[] h = new int[N];
    static int[] e = new int[M];
    static int[] ne = new int[M];
    static int idx;
    static int[] quan = new int[M];
    static int[] f = new int[N];
    static int[] w = new int[N];
    static long ans;
    public static void add(int a, int b, int c) {
        e[idx] = b;
        quan[idx] = c;
        ne[idx] = h[a];
        h[a] = idx++;
    }
    public static long dfs(int u, int fa) {
        long dist = 0, d1 = 0, d2 = 0;
        for(int i = h[u]; i != -1; i = ne[i]) {
            int j = e[i];
            if(j == fa) continue;
            long t = dfs(j, u) - quan[i];
            dist = Math.max(dist, t);
            if(t > d1) {
                d2 = d1;
                d1 = t;
            }else if(t > d2) {
                d2 = t;
            }
        }
        ans = Math.max(ans, d1 + d2 + w[u]);
        return dist + w[u]; //返回此节点的最大值
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        for(int i = 1; i <= n; i++) {
            w[i] = sc.nextInt();
        }
        Arrays.fill(h, -1);
        for(int i = 0; i < n - 1; i++) {
            int x = sc.nextInt();
            int y = sc.nextInt();
            int z = sc.nextInt();
            add(x, y, z);
            add(y, x, z);
        }
        dfs(1, -1);
        System.out.println(ans);
        return;
    }
}
```

