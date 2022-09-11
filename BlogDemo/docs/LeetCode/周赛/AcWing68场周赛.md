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

