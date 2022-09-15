---
title: AcWing68场周赛
date: 2022-09-10
categories: 
 - 周赛
---

## 1、[去掉0](https://www.acwing.com/problem/content/4615/)

* 思路：用栈保存0,两个相邻的1之间所有的0都弹出栈

```java
import java.util.*;
class Main{
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        
        int t = sc.nextInt();
        while(t -- > 0){
            char[] cs = sc.next().toCharArray();
            int j = 0;
            Stack<Character> s = new Stack<>();
            int cnt = 0;
            int n = cs.length;
            while(j < n && cs[j] == '0') j++;
            //第一个1
            for(; j < n; j++){
                if(cs[j] == '0'){
                    s.push(cs[j]);
                }else{
                    while(!s.isEmpty() && s.peek() == '0'){
                        s.pop();
                        cnt++;
                    }
                    s.push(cs[j]);
                }
            }
            System.out.println(cnt);
        }
    }
}
```

## 2、[方格跳跃](https://www.acwing.com/problem/content/4616/)

* 思路：左边连续`<`和右边连续`>`才可能出界.

```java
import java.util.*;
class Main{
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        char[] cs = sc.next().toCharArray();
        int ans = 0;
        int i = 0;
        while(i < n && cs[i] == '<'){
            i++;
            ans++;
        }
        int j = n - 1;
        while(j >= 0 && cs[j] == '>'){
            j--;
            ans++;
        }
        System.out.println(ans);
        
    }
}
```

## 3、[匹配价值](https://www.acwing.com/problem/content/4617/)

```java
//状态压缩前缀和预处理
import java.io.*;
import java.util.*;

public class Main {
    static PrintWriter out = new PrintWriter(System.out);
    static Scanner cin = new Scanner(System.in);
    static BufferedReader re = new BufferedReader(new InputStreamReader(System.in));
    static BufferedWriter wr = new BufferedWriter(new OutputStreamWriter(System.out));

    public static int get(String s) {
        int res = 0;
        for (int i = s.length() - 1; i >= 0; i--) {
            res = res * 2 + (s.charAt(i) - '0');
        }
        return res;
    }

    public static void main(String[] args) throws IOException {
        int n = cin.nextInt();
        int m = cin.nextInt();
        int q = cin.nextInt();
        int[] ws = new int[n];
        for (int i = 0; i < n; i++) {
            ws[i] = cin.nextInt();
        }
        int[] weight = new int[1 << n];
        for (int i = 0; i < 1 << n; i++) {
            for (int j = 0; j < n; j++) {
                if ((i >> j & 1) == 1) {
                    weight[i] += ws[j];
                }
            }
        }
        int[] cnt = new int[1 << n];
        for (int i = 0; i < m; i++) {
            String s = cin.next();
            cnt[get(s)]++;
        }
        int all = (1 << n) - 1;
        int[][] dp = new int[1 << n][110];
        for (int i = 0; i < 1 << n; i++) {
            for (int j = 0; j < 1 << n; j++) {
                int curw = weight[i ^ j ^ all];
                if (curw <= 100) {
                    dp[i][curw] += cnt[j];
                }
            }
        }
        for (int i = 0; i < 1 << n; i++) {
            for (int j = 1; j <= 100; j++) {
                dp[i][j] += dp[i][j - 1];
            }
        }
        for (int i = 0; i < q; i++) {
            String s = cin.next();
            int k = cin.nextInt();
            System.out.println(dp[get(s)][k]);
        }
    }
}
```

