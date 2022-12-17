(window.webpackJsonp=window.webpackJsonp||[]).push([[170],{628:function(v,_,e){"use strict";e.r(_);var o=e(1),c=Object(o.a)({},(function(){var v=this,_=v._self._c;return _("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[_("h3",{attrs:{id:"linux-常见面试题"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#linux-常见面试题"}},[v._v("#")]),v._v(" Linux 常见面试题")]),v._v(" "),_("p",[v._v("1、"),_("code",[v._v("crontab")]),v._v("的使用")]),v._v(" "),_("p",[_("code",[v._v("crontab")]),v._v("是用来让使用者在固定时间或固定间隔执行程序之用，换句话说，也就是类似使用者的时程表。")]),v._v(" "),_("p",[_("code",[v._v("-u user_a")]),v._v(" 是指设定指定 "),_("code",[v._v("user_a")]),v._v(" 的时程表，这个前提是你必须要有其权限(比如说是 "),_("code",[v._v("root")]),v._v(")才能够指定他人的时程表。如果不使用 "),_("code",[v._v("-u user")]),v._v(" 的话，就是表示设定自己的时程表")]),v._v(" "),_("p",[v._v("基本格式 :")]),v._v(" "),_("p",[v._v("*　　*　　*　　*　　*　　command")]),v._v(" "),_("p",[v._v("分 　时　 日　 月　 周　 命令")]),v._v(" "),_("p",[v._v("第1列表示分钟1～59 每分钟用或者 /1表示")]),v._v(" "),_("p",[v._v("第2列表示小时1～23（0表示0点）")]),v._v(" "),_("p",[v._v("第3列表示日期1～31")]),v._v(" "),_("p",[v._v("第4列表示月份1～12")]),v._v(" "),_("p",[v._v("第5列标识号星期0～6（0表示星期天）")]),v._v(" "),_("p",[v._v("第6列要运行的命令")]),v._v(" "),_("p",[_("strong",[v._v("常用命令")]),v._v(":")]),v._v(" "),_("p",[v._v("添加任务： "),_("code",[v._v("crontab -e")])]),v._v(" "),_("p",[v._v("查看任务："),_("code",[v._v("crontab -l")])]),v._v(" "),_("p",[v._v("删除任务： "),_("code",[v._v("crontab-d")])]),v._v(" "),_("p",[v._v("使用权限 : 所有使用者")]),v._v(" "),_("p",[v._v("crontab 每分钟、每小时、每天、每周、每月、每年定时执行")]),v._v(" "),_("p",[v._v("每五分钟执行 /5 * * * commond")]),v._v(" "),_("p",[v._v("每小时执行 0 * * * * commond")]),v._v(" "),_("p",[v._v("每天执行 0 0 * * * commond")]),v._v(" "),_("p",[v._v("每周执行 0 0 * * 0 commond")]),v._v(" "),_("p",[v._v("每月执行 0 0 1 * * commond")]),v._v(" "),_("p",[v._v("每年执行 0 0 1 1 * commond")]),v._v(" "),_("p",[v._v("下面通过一些例子直观学习下：")]),v._v(" "),_("p",[v._v("30 21 * * * /usr/local/etc/rc.d/lighttpd restart\n1\n上面的例子表示每晚的21:30重启apache。")]),v._v(" "),_("p",[v._v("45 4 1,10,22 * * /usr/local/etc/rc.d/lighttpd restart\n1\n上面的例子表示每月1、10、22日的4 : 45重启apache。")]),v._v(" "),_("p",[v._v("10 1 * * 6,0 /usr/local/etc/rc.d/lighttpd restart\n1\n上面的例子表示每周六、周日的1 : 10重启apache。")]),v._v(" "),_("p",[v._v("0,30 18-23 * * * /usr/local/etc/rc.d/lighttpd restart\n1\n上面的例子表示在每天18 : 00至23 : 00之间每隔30分钟重启apache。")]),v._v(" "),_("p",[v._v("0 23 * * 6 /usr/local/etc/rc.d/lighttpd restart\n1\n上面的例子表示每星期六的23 : 00 pm重启apache。")]),v._v(" "),_("p",[v._v("**/1 * * *   /usr/local/etc/rc.d/lighttpd restart\n1\n每一小时重启apache")]),v._v(" "),_("p",[v._v("*23-7/1 * * * /usr/local/etc/rc.d/lighttpd restart\n1\n晚上11点到早上7点之间，每隔一小时重启apache")]),v._v(" "),_("p",[v._v("0 11 4 * mon-wed /usr/local/etc/rc.d/lighttpd restart\n1\n每月的4号与每周一到周三的11点重启apache")]),v._v(" "),_("p",[v._v("0 4 1 jan * /usr/local/etc/rc.d/lighttpd restart\n1\n一月一号的4点重启apache")]),v._v(" "),_("p",[v._v("2、查找文件内容:")]),v._v(" "),_("p",[v._v("查找当前目录下所有文件，将含有"),_("code",[v._v("test")]),v._v("的文件列出")]),v._v(" "),_("p",[_("code",[v._v("grep test *")])]),v._v(" "),_("p",[v._v("3、 查看硬盘的使用情况及文件目录大小命令")]),v._v(" "),_("p",[_("strong",[v._v("查看文件系统各个硬盘大小")])]),v._v(" "),_("p",[_("code",[v._v("df -a")]),v._v(" 列出所有的文件系统")]),v._v(" "),_("p",[_("code",[v._v("df -k")]),v._v(" 以K为单位显示")]),v._v(" "),_("p",[_("code",[v._v("df -h")]),v._v(" 以人性化单位显示，可以是b,k,m,g,t..")]),v._v(" "),_("p",[_("strong",[v._v("查看目录的大小")])]),v._v(" "),_("p",[_("code",[v._v("du -sh dirname")])]),v._v(" "),_("p",[_("code",[v._v("-s")]),v._v(" 仅显示总计")]),v._v(" "),_("p",[_("code",[v._v("-h")]),v._v(" 以K、M、G为单位，提高信息的可读性。KB、MB、GB是以1024为换算单位， -H以1000为换算单位。")]),v._v(" "),_("p",[v._v("4、"),_("code",[v._v("screen")]),v._v("命令详解")]),v._v(" "),_("p",[_("strong",[v._v("背景")]),v._v(": 作为程序员一定会用到"),_("code",[v._v("linux")]),v._v("系统，经常打开多个"),_("code",[v._v("shell")]),v._v(",运行一些需要很长时间才能完成的任务，通常情况下我们都是为每一个这样的任务开一个终端窗口,必须等待它们执行完毕，在此期间不能关掉窗口，否则这个任务就会被杀掉。")]),v._v(" "),_("p",[_("strong",[v._v("简介")]),v._v(":")]),v._v(" "),_("p",[v._v("GNU Screen是一款由GNU计划开发的用于命令行终端切换的自由软件。用户可以通过该软件同时连接多个本地或远程的命令行会话，并在其间自由切换。")]),v._v(" "),_("p",[v._v("GNU Screen可以看作是窗口管理器的命令行界面版本。它提供了统一的管理多个会话的界面和相应的功能。")]),v._v(" "),_("p",[v._v("常用的"),_("code",[v._v("screen")]),v._v(" 命令:")]),v._v(" "),_("p",[_("code",[v._v("screen -S yourname")]),v._v(" -> 新建一个叫"),_("code",[v._v("yourname")]),v._v("的"),_("code",[v._v("session")])]),v._v(" "),_("p",[_("code",[v._v("screen -ls")]),v._v(" -> 列出当前所有的"),_("code",[v._v("session")])]),v._v(" "),_("p",[_("code",[v._v("screen -r yourname")]),v._v(" -> 回到"),_("code",[v._v("yourname")]),v._v("这个"),_("code",[v._v("session")])]),v._v(" "),_("p",[_("code",[v._v("screen -d yourname")]),v._v(" -> 远程"),_("code",[v._v("detach")]),v._v("某个"),_("code",[v._v("session")])]),v._v(" "),_("p",[_("code",[v._v("screen -d -r yourname")]),v._v(" -> 结束当前"),_("code",[v._v("session")]),v._v("并回到"),_("code",[v._v("yourname")]),v._v("这个"),_("code",[v._v("session")])]),v._v(" "),_("p",[v._v("常用快捷键组合")]),v._v(" "),_("p",[v._v("C-a c -> 创建一个新的运行shell的窗口并切换到该窗口")]),v._v(" "),_("p",[v._v("C-a n -> Next，切换到下一个 window")]),v._v(" "),_("p",[v._v("C-a p -> Previous，切换到前一个 window")]),v._v(" "),_("p",[v._v("C-a d -> detach，暂时离开当前session，将目前的 screen session丢到后台执行，并会回到还没进 screen 时的状态，此时在 screen session 里，每个screen内运行的 process (无论是前台/后台)都在继续执行，即使 logout 也不影响。")]),v._v(" "),_("p",[v._v("exit 关闭当前session")]),v._v(" "),_("p",[v._v("5、服务器之间复制文件:")]),v._v(" "),_("p",[_("code",[v._v("scp")]),v._v("是"),_("code",[v._v("securecopy")]),v._v("的简写，用于在"),_("code",[v._v("Linux")]),v._v("下进行远程拷贝文件的命令，和它类似的命令有"),_("code",[v._v("cp")]),v._v("，不过"),_("code",[v._v("cp")]),v._v("只是在本机进行拷贝不能跨服务器，而且"),_("code",[v._v("scp")]),v._v("传输是加密的，可能会稍微影响一下速度。")]),v._v(" "),_("p",[v._v("一般有6种用法：")]),v._v(" "),_("p",[v._v("1）本地复制远程文件（把远程的文件复制到本地）：")]),v._v(" "),_("p",[_("code",[v._v("scp root@10.108.84.108:/val/test/test.tar.gz /val/test/test.tar.gz")])]),v._v(" "),_("p",[v._v("2）远程复制本地文件（把本地的文件复制到远程主机上）：")]),v._v(" "),_("p",[_("code",[v._v("scp /val/test.tar.gz root@10.108.84.108:/val/test.tar.gz")])]),v._v(" "),_("p",[v._v("3）本地复制远程目录（把远程的目录复制到本地；参数 r 递归复制）：")]),v._v(" "),_("p",[_("code",[v._v("scp -r root@www.test.com:/val/test/ /val/test/")])]),v._v(" "),_("p",[v._v("4）远程复制本地目录（把本地的目录复制到远程主机上）：")]),v._v(" "),_("p",[_("code",[v._v("scp -r /val/ root@10.108.84.108:/val/")])]),v._v(" "),_("p",[v._v("5）本地复制远程文件到指定目录（把远程的文件复制到本地）：")]),v._v(" "),_("p",[_("code",[v._v("scp root@www.test.com:/val/test/test.tar.gz /val/test/")])]),v._v(" "),_("p",[v._v("6）远程复制本地文件到指定目录（把本地的文件复制到远程主机上）：")]),v._v(" "),_("p",[_("code",[v._v("scp /val/test.tar.gz root@www.test.com:/val/")])]),v._v(" "),_("p",[v._v("6、查看CPU机器型号 内存等信息")]),v._v(" "),_("p",[_("strong",[v._v("系统")])]),v._v(" "),_("p",[_("code",[v._v("uname -a")]),v._v(" # 查看内核/操作系统/CPU信息")]),v._v(" "),_("p",[_("code",[v._v("cat /proc/cpuinfo")]),v._v(" # 查看CPU信息")]),v._v(" "),_("p",[_("code",[v._v("hostname")]),v._v(" # 查看计算机名")]),v._v(" "),_("p",[_("code",[v._v("env")]),v._v(" # 查看环境变量")]),v._v(" "),_("p",[_("code",[v._v("lsb_release -a")]),v._v(" #即可列出所有版本信息")]),v._v(" "),_("p",[_("code",[v._v("cat /etc/issue")]),v._v(" #查看版本信息")]),v._v(" "),_("p",[_("strong",[v._v("资源")])]),v._v(" "),_("p",[_("code",[v._v("free -h")]),v._v(" # 查看内存使用量和交换区使用量")]),v._v(" "),_("p",[_("code",[v._v("df -h")]),v._v(" # 查看各分区使用情况")]),v._v(" "),_("p",[_("code",[v._v("du -sh <目录名>")]),v._v(" # 查看指定目录的大小")]),v._v(" "),_("p",[_("code",[v._v("grep MemTotal /proc/meminfo")]),v._v(" # 查看内存总量")]),v._v(" "),_("p",[_("code",[v._v("grep MemFree /proc/meminfo")]),v._v(" # 查看空闲内存量")]),v._v(" "),_("p",[_("code",[v._v("uptime")]),v._v(" # 查看系统运行时间、用户数、负载")]),v._v(" "),_("p",[_("code",[v._v("cat /proc/loadavg")]),v._v(" # 查看系统负载")]),v._v(" "),_("p",[_("strong",[v._v("磁盘和分区")])]),v._v(" "),_("p",[_("code",[v._v("mount | column -t")]),v._v(" # 查看挂接的分区状态")]),v._v(" "),_("p",[_("code",[v._v("fdisk -l")]),v._v(" # 查看所有分区")]),v._v(" "),_("p",[_("code",[v._v("swapon -s")]),v._v(" # 查看所有交换分区")]),v._v(" "),_("p",[_("code",[v._v("hdparm -i /dev/hda")]),v._v(" # 查看磁盘参数(仅适用于IDE设备)")]),v._v(" "),_("p",[_("code",[v._v("dmesg | grep IDE")]),v._v(" # 查看启动时IDE设备检测状况")]),v._v(" "),_("p",[_("strong",[v._v("网络")])]),v._v(" "),_("p",[_("code",[v._v("ifconfig")]),v._v(" # 查看所有网络接口的属性")]),v._v(" "),_("p",[_("code",[v._v("iptables -L")]),v._v(" # 查看防火墙设置")]),v._v(" "),_("p",[_("code",[v._v("route -n")]),v._v(" # 查看路由表")]),v._v(" "),_("p",[_("code",[v._v("netstat -lntp")]),v._v(" # 查看所有监听端口")]),v._v(" "),_("p",[_("code",[v._v("netstat -antp")]),v._v(" # 查看所有已经建立的连接")]),v._v(" "),_("p",[_("code",[v._v("netstat -s")]),v._v(" # 查看网络统计信息")]),v._v(" "),_("p",[_("strong",[v._v("进程")])]),v._v(" "),_("p",[_("code",[v._v("ps -ef")]),v._v(" # 查看所有进程")]),v._v(" "),_("p",[_("code",[v._v("top")]),v._v(" # 实时显示进程状态")]),v._v(" "),_("p",[_("strong",[v._v("用户")])]),v._v(" "),_("p",[_("code",[v._v("w")]),v._v(" # 查看活动用户")]),v._v(" "),_("p",[_("code",[v._v("id <用户名>")]),v._v(" # 查看指定用户信息")]),v._v(" "),_("p",[_("code",[v._v("last")]),v._v(" # 查看用户登录日志")]),v._v(" "),_("p",[_("code",[v._v("cut -d: -f1 /etc/passwd")]),v._v(" 　#系统所有用户")]),v._v(" "),_("p",[_("code",[v._v("cut -d: -f1 /etc/group")]),v._v(" # 查看系统所有组")]),v._v(" "),_("p",[_("code",[v._v("crontab -l")]),v._v(" # 查看当前用户的计划任务用户")]),v._v(" "),_("p",[v._v("7、关闭防火墙")]),v._v(" "),_("p",[_("code",[v._v("systemctl stop firewalld.service")])]),v._v(" "),_("p",[v._v("关闭开机启动： "),_("code",[v._v("systemctl disable firewalld.service")])]),v._v(" "),_("p",[v._v("查看防火墙状态： "),_("code",[v._v("systemctl status firewalld.service")])]),v._v(" "),_("p",[v._v("8、ssh远程登录")]),v._v(" "),_("p",[_("code",[v._v("ssh root@10.108.84.108")])]),v._v(" "),_("p",[v._v("9、 主机名相关")]),v._v(" "),_("p",[v._v("查看： "),_("code",[v._v("hostnamectl status")])]),v._v(" "),_("p",[v._v("修改: "),_("code",[v._v("hostnamectl set-hostname “storage_node1”")])]),v._v(" "),_("p",[v._v("10、挂载硬盘:")]),v._v(" "),_("p",[_("code",[v._v("mount -t ext3 -o rw /dev/sdb1 /newfile")]),v._v(" #挂载硬盘")]),v._v(" "),_("p",[_("code",[v._v("-t")]),v._v(" 跟磁盘格式 可以省略 系统会自动检测一下")]),v._v(" "),_("p",[_("code",[v._v("-o")]),v._v(" 跟挂载方式 "),_("code",[v._v("rw")]),v._v(" 可读可写")]),v._v(" "),_("p",[_("code",[v._v("/newfile")]),v._v(" 这是硬盘分区挂载的目录，可以随意变换")]),v._v(" "),_("p",[v._v("11、lsof 使用以及修改系统进程打开的文件数限制")]),v._v(" "),_("p",[v._v("该命令用于查看进程或应用程序打开的文件描述符信息")]),v._v(" "),_("p",[v._v("输出信息")]),v._v(" "),_("p",[_("code",[v._v("MMAND PID USER FD TYPE DEVICE SIZE NODE NAME")])]),v._v(" "),_("p",[_("code",[v._v("COMMAND")]),v._v("：进程的名称")]),v._v(" "),_("p",[_("code",[v._v("PID")]),v._v("：进程标识符")]),v._v(" "),_("p",[_("code",[v._v("USER")]),v._v("：进程所有者")]),v._v(" "),_("p",[_("code",[v._v("FD")]),v._v("：文件描述符，应用程序通过文件描述符识别该文件。如"),_("code",[v._v("cwd")]),v._v("、"),_("code",[v._v("txt")]),v._v("等")]),v._v(" "),_("p",[_("code",[v._v("TYPE")]),v._v("：文件类型，如"),_("code",[v._v("DIR")]),v._v("、"),_("code",[v._v("REG")]),v._v("等")]),v._v(" "),_("p",[_("code",[v._v("DEVICE")]),v._v("：指定磁盘的名称")]),v._v(" "),_("p",[_("code",[v._v("SIZE")]),v._v("：文件的大小")]),v._v(" "),_("p",[_("code",[v._v("NODE")]),v._v("：索引节点（文件在磁盘上的标识）")]),v._v(" "),_("p",[_("code",[v._v("NAME")]),v._v("：打开文件的确切名称")]),v._v(" "),_("p",[v._v("其中"),_("code",[v._v("FD")]),v._v(" 列中的文件描述符"),_("code",[v._v("cwd")]),v._v(" 值表示应用程序的当前工作目录，这是该应用程序启动的目录，除非它本身对这个目录进行更改。")]),v._v(" "),_("p",[_("code",[v._v("txt")]),v._v(" 类型的文件是程序代码，如应用程序二进制文件本身或共享库，其次数值表示应用 程序的文件描述符，这是打开该文件时返回的一个整数。")]),v._v(" "),_("p",[_("code",[v._v("u")]),v._v(" 表示该文件被打开并处于读取/写入模式，而不是只读 ® 或只写 (w) 模式。同时还有大写 的"),_("code",[v._v("W")]),v._v("表示该应用程序具有对整个文件的写 锁。该文件描述符用于确保每次只能打开一个应用程序实例。初始打开每个应用程序时，都具有三个文件描述符，从 0 到\n2， 分别表示标准输入、输出和错误流。所以大多数应用程序所打开的文件的 FD 都是从 3 开始。")]),v._v(" "),_("p",[v._v("与 "),_("code",[v._v("FD")]),v._v(" 列相比，"),_("code",[v._v("Type")]),v._v(" 列则比较直观。文件和目录分别称为 "),_("code",[v._v("REG")]),v._v(" 和 "),_("code",[v._v("DIR")]),v._v("。而"),_("code",[v._v("CHR")]),v._v(" 和 "),_("code",[v._v("BLK")]),v._v("，分别表示字符和块设备；\n或者 "),_("code",[v._v("UNIX")]),v._v("、"),_("code",[v._v("FIFO")]),v._v(" 和 "),_("code",[v._v("IPv4")]),v._v("，分别表示 "),_("code",[v._v("UNIX")]),v._v(" 域套接字、先进先出 ("),_("code",[v._v("FIFO")]),v._v(") 队列和网际协议 ("),_("code",[v._v("IP")]),v._v(") 套接字。")]),v._v(" "),_("p",[_("code",[v._v("lsof filename")]),v._v(" 显示打开指定文件的所有进程")]),v._v(" "),_("p",[_("code",[v._v("lsof -a")]),v._v(" 表示两个参数都必须满足时才显示结果")]),v._v(" "),_("p",[_("code",[v._v("lsof -c string")]),v._v(" 显示"),_("code",[v._v("COMMAND")]),v._v("列中包含指定字符的进程所有打开的文件")]),v._v(" "),_("p",[_("code",[v._v("lsof -u username")]),v._v(" 显示所属"),_("code",[v._v("user")]),v._v("进程打开的文件")]),v._v(" "),_("p",[_("code",[v._v("lsof -g （-p）gid")]),v._v(" 显示归属"),_("code",[v._v("gid")]),v._v("的进程情况")]),v._v(" "),_("p",[_("code",[v._v("lsof +d /DIR/")]),v._v(" 显示目录下被进程打开的文件")]),v._v(" "),_("p",[_("code",[v._v("lsof +D /DIR/")]),v._v(" 同上，但是会搜索目录下的所有目录，时间相对较长")]),v._v(" "),_("p",[_("code",[v._v("lsof -d FD")]),v._v(" 显示指定文件描述符的进程")]),v._v(" "),_("p",[_("code",[v._v("lsof -n")]),v._v(" 不将"),_("code",[v._v("IP")]),v._v("转换为"),_("code",[v._v("hostname")]),v._v("，缺省是不加上"),_("code",[v._v("-n")]),v._v("参数")]),v._v(" "),_("p",[_("code",[v._v("lsof -i")]),v._v(" 用以显示符合条件的进程情况")]),v._v(" "),_("p",[_("code",[v._v("lsof -p 进程PID")]),v._v(" 查看某特定进程打开的文件描述符")]),v._v(" "),_("p",[_("code",[v._v("lsof -a -p PID -d txt")]),v._v(" 筛选文件描述符为 txt的记录 参数 -a（and的意思）表示筛选两个参数均满足的记录")]),v._v(" "),_("p",[_("code",[v._v("lsof /home/test.py")]),v._v(" 查找打开某个文件的应用程序")]),v._v(" "),_("p",[_("code",[v._v("lsof |grep 33872 |wc -l")]),v._v(" 统计某进程打开的文件描述符的数量")]),v._v(" "),_("p",[v._v("查看本次登陆的"),_("code",[v._v("session")]),v._v("其文件描述符的限制")]),v._v(" "),_("p",[_("code",[v._v("ulimit -n")])]),v._v(" "),_("p",[v._v("临时修改文件描述符的限定，可以通过"),_("code",[v._v("ulimit")]),v._v("。")]),v._v(" "),_("p",[_("code",[v._v("ulimit -SHn 2048")])]),v._v(" "),_("p",[v._v("永久变更需要编辑 "),_("code",[v._v("/etc/security/limits.conf")]),v._v(" 文件，添加如下两行：")]),v._v(" "),_("p",[v._v("在"),_("code",[v._v("/etc/security/limits.conf")]),v._v("修改限制的格式如下")]),v._v(" "),_("p",[_("code",[v._v("domino type item value")])]),v._v(" "),_("p",[v._v("参数 描述")]),v._v(" "),_("p",[_("code",[v._v("domino")]),v._v(" 是以符号@开头的用户名或组名，*表示所有用户")]),v._v(" "),_("p",[_("code",[v._v("type")]),v._v(" 设置为"),_("code",[v._v("hard or soft")])]),v._v(" "),_("p",[_("code",[v._v("item")]),v._v(" 指定想限制的资源。如"),_("code",[v._v("cpu,core nproc or maxlogins")])]),v._v(" "),_("p",[_("code",[v._v("value")]),v._v(" 是相应的")]),v._v(" "),_("ul",[_("li",[_("p",[v._v("hard nofile 4096")])]),v._v(" "),_("li",[_("p",[v._v("soft nofile 4096")])])]),v._v(" "),_("p",[v._v("保存退出后重新登录，其最大文件描述符已经被永久更改了")]),v._v(" "),_("p",[v._v("内核参数对文件描述符也有限制，如果设置的值大于内核的限制，也是不行的：")]),v._v(" "),_("p",[v._v("查找file-max的内核参数：")]),v._v(" "),_("p",[v._v("sysctl -a|grep file-max")]),v._v(" "),_("p",[v._v("更改file-max的内核参数：")]),v._v(" "),_("p",[v._v("sysctl -w file-max=65535")]),v._v(" "),_("p",[_("code",[v._v("Sysctl")]),v._v("也是临时的，要想永久生效，可以通过更改"),_("code",[v._v("sysctl")]),v._v("的文件，编辑"),_("code",[v._v("/etc/sysctl.conf")]),v._v("文件，添加或修改以下一行：")]),v._v(" "),_("p",[_("code",[v._v("fs.file-max=65535")])]),v._v(" "),_("p",[v._v("保存退出后使用"),_("code",[v._v("sysctl -p")]),v._v("命令使其生效")]),v._v(" "),_("p",[v._v("需要注意的是，文件描述符的限制，不局限于这里描述的这些，还可能和进程的启动参数、用户的环境设置有关。当然，如果是进程"),_("code",[v._v("BUG")]),v._v("造成文件描述符没有及时关闭回收，这增大限制也只是治标，根本上还得修复"),_("code",[v._v("BUG")]),v._v("。")]),v._v(" "),_("p",[v._v("此外，"),_("code",[v._v("lsof")]),v._v("会列出系统中所占用的资源,但是这些资源不一定会占用打开的文件描述符(比如共享内存,信号量,消息队列,内存映射.等,虽然占用了这些资源,但不占用打开文件号)，因此有可能出现"),_("code",[v._v("cat /proc/sys/fs/file-max")]),v._v(" 的值小于"),_("code",[v._v("lsof | wc -l")]),v._v("。")]),v._v(" "),_("p",[_("code",[v._v("cat /proc/sys/fs/nr_open")])]),v._v(" "),_("p",[v._v("单个进程可分配的最大文件数")]),v._v(" "),_("p",[_("code",[v._v("cat /proc/sys/fs/file-max")])]),v._v(" "),_("p",[v._v("内核可分配的最大文件数")]),v._v(" "),_("p",[v._v("所有进程打开的文件描述符数不能超过 "),_("code",[v._v("/proc/sys/fs/file-max")])]),v._v(" "),_("p",[v._v("单个进程打开的文件描述符数不能超过 "),_("code",[v._v("user limit")]),v._v("中 "),_("code",[v._v("nofile")]),v._v("的 "),_("code",[v._v("soft limit")])]),v._v(" "),_("p",[_("code",[v._v("nofile")]),v._v("的"),_("code",[v._v("soft limit")]),v._v("不能超过其"),_("code",[v._v("hard limit")])]),v._v(" "),_("p",[_("code",[v._v("nofile")]),v._v("的"),_("code",[v._v("hard limit")]),v._v("不能超过"),_("code",[v._v("/proc/sys/fs/nr_open")])]),v._v(" "),_("p",[v._v("12、修改系统时间")]),v._v(" "),_("p",[_("code",[v._v("Linux")]),v._v("时钟分为系统时钟（"),_("code",[v._v("System Clock")]),v._v("）和硬件（"),_("code",[v._v("Real Time Clock")]),v._v("，简称RTC）时钟。")]),v._v(" "),_("p",[v._v("系统时钟是指当前"),_("code",[v._v("Linux Kernel")]),v._v("中的时钟，而硬件时钟则是主板上由电池供电的时钟，这个硬件时钟可以在"),_("code",[v._v("BIOS")]),v._v("中进行设置。当Linux启动时，硬件时钟会去读取系统时钟的设置，然后系统时钟就会独立于硬件运作。")]),v._v(" "),_("p",[_("code",[v._v("Linux")]),v._v("中的所有命令（包括函数）都是采用的系统时钟设置。在"),_("code",[v._v("Linux")]),v._v("中，用于时钟查看和设置的命令主要有"),_("code",[v._v("date")]),v._v("、"),_("code",[v._v("hwclock")]),v._v("。")]),v._v(" "),_("p",[_("code",[v._v("date –s")]),v._v("：按字符串方式修改时间\n可以只修改日期,不修改时间,输入:")]),v._v(" "),_("p",[_("code",[v._v("date -s 2007-08-03")]),v._v("\n1\n只修改时间,输入:")]),v._v(" "),_("p",[_("code",[v._v("date -s 14:15:00")]),v._v("\n1\n同时修改日期时间,注意要加双引号,日期与时间之间有一空格，输入:")]),v._v(" "),_("p",[_("code",[v._v('date -s "2007-08-03 14:15:00"')]),v._v("\n1")]),v._v(" "),_("p",[v._v("查看硬件时间：")]),v._v(" "),_("p",[_("code",[v._v("hwclock")])]),v._v(" "),_("p",[v._v("设置硬件时间:")]),v._v(" "),_("p",[_("code",[v._v("hwclock -set -date=”07/07/06 10:19” （月/日/年 时:分:秒）")])]),v._v(" "),_("p",[v._v("硬件时间和系统时间的同步:")]),v._v(" "),_("p",[v._v("按照前面的说法，重新启动系统，硬件时间会读取系统时间，实现同步，但是在不重新启动的时候，需要用"),_("code",[v._v("hwclock")]),v._v("命令实现同步。")]),v._v(" "),_("p",[v._v("硬件时钟与系统时钟同步：")]),v._v(" "),_("p",[_("code",[v._v("hwclock –hctosys")]),v._v(" （hc代表硬件时间，sys代表系统时间）")]),v._v(" "),_("p",[v._v("系统时钟和硬件时钟同步：（让系统的时间同步到硬件时钟）")]),v._v(" "),_("p",[_("code",[v._v("hwclock -w ––systohc")])]),v._v(" "),_("p",[v._v("13、压缩文件:")]),v._v(" "),_("p",[_("code",[v._v("tar -zcvf /home/sms.tar.gz /sms")])]),v._v(" "),_("p",[_("code",[v._v("tar -zcvf [打包后生成的文件名全路径] [要打包的目录]")])]),v._v(" "),_("p",[_("code",[v._v("zip -q -r sms.zip /home/sms -q 表示安静模式（在压缩的时候不显示指令的执行过程） -r表示递归")])]),v._v(" "),_("p",[_("code",[v._v("zip [参数] [打包后的文件名] [打包的目录路径]")])]),v._v(" "),_("p",[v._v("14、查看是否安装某软件")]),v._v(" "),_("p",[_("code",[v._v("rpm -qa|grep soft_name")])]),v._v(" "),_("p",[v._v("15、测试硬盘的IO")]),v._v(" "),_("p",[v._v("硬盘读取速度")]),v._v(" "),_("p",[_("code",[v._v("time dd if=/var/test of=/dev/null bs=2k")])]),v._v(" "),_("p",[_("code",[v._v("hdparm -T /dev/sda")])]),v._v(" "),_("p",[v._v("硬盘写入速度")]),v._v(" "),_("p",[_("code",[v._v("time dd if=/dev/zero of=/test.dbf bs=8k count=300000")])]),v._v(" "),_("p",[v._v("(在 根目录 / 下面会生成临时文件，记得删除)")])])}),[],!1,null,null,null);_.default=c.exports}}]);