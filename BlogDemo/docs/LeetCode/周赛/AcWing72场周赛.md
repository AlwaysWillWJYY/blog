---
title: AcWing72场周赛
date: 2022-10-08
categories: 
 - 周赛
---

### 一、[最小值](https://www.acwing.com/problem/content/4627/)

```java
import java.util.*;
class Main{
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt();
        while(t -- > 0) {
            int a = sc.nextInt();
            int b = sc.nextInt();
            System.out.println(Math.min(a, Math.min(b, (a + b) / 3)));
        }
    }
}
```

### 二、[压缩文件](https://www.acwing.com/problem/content/4628/)

```java
import java.util.*;
class Main{
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int m = sc.nextInt();
        long sum = 0;
        int[] a = new int[n];
        int[] b = new int[n];
        PriorityQueue<Integer> pri = new PriorityQueue<>((o1, o2) -> o2 - o1);
        for(int i = 0; i < n; i++) {
            a[i] = sc.nextInt();
            b[i] = sc.nextInt();
            pri.add(a[i] - b[i]);
            sum += a[i];
        }
        int res = 0;
        while (!pri.isEmpty() && sum > m) {
            int t = pri.poll();
            sum -= t;
            res++;
        }
        if (sum <= m)
            System.out.println(res);
        else
            System.out.println(-1);
    }
}
```

### 三、[最小移动距离](https://www.acwing.com/problem/content/4629/)

```cpp
#include <iostream>
#include <cstring>
using namespace std;
typedef long long LL;
const int N = 110;
int n;
int a[N];
bool vis[N];
LL gcd (LL x,LL y) {
    if (x < y) return gcd (y,x);
    if (!y) return x;
    return gcd (y,x % y);
}
int main () {
    cin >> n;
    for (int i = 1;i <= n;i++) cin >> a[i];
    LL ans = 1;
    for (int i = 1;i <= n;i++) {
        memset (vis,false,sizeof (vis));
        int j = a[i];
        LL res = 1;
        vis[i] = true;
        while (!vis[j]) {
            vis[j] = true;
            j = a[j];
            res++;
        }
        if (j != i) {
            ans = -1;
            break;
        }
        if (res % 2 == 0) res /= 2;
        ans = ans / gcd (ans,res) * res;
    }
    if (ans == -1) cout << -1 << endl;
    else cout << ans << endl;
    return 0;
}
```

