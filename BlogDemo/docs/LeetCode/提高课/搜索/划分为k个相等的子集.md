---
title: 划分为k个相等的子集
date: 2022-09-20
tags:
 - 搜索
 - 剪枝
---


## [划分为k个相等的子集](https://leetcode.cn/problems/partition-to-k-equal-sum-subsets/)

### 第一版，暴力过

```java
class Solution {
    public boolean canPartitionKSubsets(int[] nums, int k) {
        //回溯即可
        int n = nums.length;
        int sum = 0;
        for(int i = 0; i < n; i++) sum += nums[i];
        int tar = sum / k;
        if(sum % k != 0) return false;
        Arrays.sort(nums);
        int[] bu = new int[k + 1];
        boolean[] st = new boolean[n];
        return dfs(nums,st, 0, k, tar, bu);
    }
    //非空集合，目标和为tar
    public boolean dfs(int[] nums,boolean[] st, int index, int k, int tar, int[] bu){
        if(k == 0) return true;
        if(bu[k] == tar) {
            return dfs(nums,st, 0, k - 1, tar, bu);
        }
        for(int i = index; i < nums.length; i++) {
            if(bu[k] + nums[i] > tar || st[i]) continue;
            bu[k] += nums[i];
            st[i] = true;
            if(dfs(nums, st, i + 1, k, tar, bu)) return true;
            st[i] = false;
            bu[k] -= nums[i];
        }
        return false;
    }

}
```

### 第二版，加记忆化

```java
class Solution {
    public boolean canPartitionKSubsets(int[] nums, int k) {
        //回溯即可
        int n = nums.length;
        int sum = 0;
        for(int i = 0; i < n; i++) sum += nums[i];
        int tar = sum / k;
        if(sum % k != 0) return false;
        Arrays.sort(nums);
        int[] bu = new int[k + 1];
        boolean[] st = new boolean[n];
        return dfs(nums,st, 0, k, tar, bu);
    }
    //非空集合，目标和为tar
    HashMap<String, Boolean> map = new HashMap<>();
    public boolean dfs(int[] nums,boolean[] st, int index, int k, int tar, int[] bu){
        if(k == 0) return true;
        String key = Arrays.toString(st);
        if(bu[k] == tar) {
            boolean res = dfs(nums,st, 0, k - 1, tar, bu);
            map.put(key, res);
            return res;
        }
        if(map.containsKey(key)){
            return map.get(key);
        }
        for(int i = index; i < nums.length; i++) {
            if(bu[k] + nums[i] > tar || st[i]) continue;
            bu[k] += nums[i];
            st[i] = true;
            if(dfs(nums, st, i + 1, k, tar, bu)) return true;
            st[i] = false;
            bu[k] -= nums[i];
        }
        return false;
    }

}
```

### 第三版,如果本次失败，下一次相同的数也失败，最优性剪枝

```java
class Solution {
    public boolean canPartitionKSubsets(int[] nums, int k) {
        //回溯即可
        int n = nums.length;
        int sum = 0;
        for(int i = 0; i < n; i++) sum += nums[i];
        int tar = sum / k;
        if(sum % k != 0) return false;
        Arrays.sort(nums);
        int[] bu = new int[k + 1];
        boolean[] st = new boolean[n];
        return dfs(nums,st, 0, k, tar, bu);
    }
    //非空集合，目标和为tar
    HashMap<String, Boolean> map = new HashMap<>();
    public boolean dfs(int[] nums,boolean[] st, int index, int k, int tar, int[] bu){
        if(k == 0) return true;
        String key = Arrays.toString(st);
        if(bu[k] == tar) {
            boolean res = dfs(nums,st, 0, k - 1, tar, bu);
            map.put(key, res);
            return res;
        }
        if(map.containsKey(key)){
            return map.get(key);
        }
        int fail = -1;
        for(int i = index; i < nums.length; i++) {
            if(bu[k] + nums[i] > tar || st[i] || nums[i] == fail) continue;
            bu[k] += nums[i];
            st[i] = true;
            if(dfs(nums, st, i + 1, k, tar, bu)) return true;
            fail = nums[i];
            st[i] = false;
            bu[k] -= nums[i];
        }
        return false;
    }

}
```

### 第四版,位运算

```java
class Solution {
    public boolean canPartitionKSubsets(int[] nums, int k) {
        //回溯即可
        int n = nums.length;
        int sum = 0;
        for(int i = 0; i < n; i++) sum += nums[i];
        int tar = sum / k;
        if(sum % k != 0) return false;
        Arrays.sort(nums);
        int[] bu = new int[k + 1];
        int st = 0;
        return dfs(nums,st, 0, k, tar, bu);
    }
    //非空集合，目标和为tar
    HashMap<Integer, Boolean> map = new HashMap<>();
    public boolean dfs(int[] nums,int st, int index, int k, int tar, int[] bu){
        if(k == 0) return true;
        if(bu[k] == tar) {
            boolean res = dfs(nums,st, 0, k - 1, tar, bu);
            map.put(st, res);
            return res;
        }
        if(map.containsKey(st)){
            return map.get(st);
        }
        int fail = -1;
        for(int i = index; i < nums.length; i++) {
            if(bu[k] + nums[i] > tar || (st >> i & 1) == 1 || nums[i] == fail) continue;
            bu[k] += nums[i];
            st |= 1 << i;
            if(dfs(nums, st, i + 1, k, tar, bu)) return true;
            fail = nums[i];
            st ^= 1 << i;
            bu[k] -= nums[i];
        }
        return false;
    }

}
```

### 第五版，可行性加顺序性剪枝

```java
class Solution {
    int[] nums;
    int n, t, k;
    public boolean canPartitionKSubsets(int[] _nums, int _k) {
        nums = _nums; k = _k;
        int tot = 0;
        for (int x : nums) tot += x;
        if (tot % k != 0) return false; // 可行性剪枝
        Arrays.sort(nums);
        n = nums.length; t = tot / k;
        return dfs(n - 1, 0, 0, new boolean[n]);
    }
    boolean dfs(int idx, int cur, int cnt, boolean[] vis) {
        if (cnt == k) return true;
        if (cur == t) return dfs(n - 1, 0, cnt + 1, vis);
        if (idx == -1) return false;
        for (int i = idx; i >= 0; i--) {  // 顺序性剪枝
            if (vis[i] || cur + nums[i] > t) continue;
            vis[i] = true;
            if (dfs(i - 1, cur + nums[i], cnt, vis)) return true;
            vis[i] = false;
            if (cur == 0) return false; // 可行性剪枝
        }
        return false;
    }

}
```

