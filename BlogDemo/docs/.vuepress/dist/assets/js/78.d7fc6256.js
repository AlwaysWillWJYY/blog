(window.webpackJsonp=window.webpackJsonp||[]).push([[78],{538:function(a,t,s){"use strict";s.r(t);var e=s(1),n=Object(e.a)({},(function(){var a=this,t=a._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h3",{attrs:{id:"_1、线程池的优势"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1、线程池的优势"}},[a._v("#")]),a._v(" 1、线程池的优势")]),a._v(" "),t("p",[a._v("（1）降低系统资源的消耗，通过重用已存在的线程，降低线程创建和销毁时造成的消耗；")]),a._v(" "),t("p",[a._v("（2）提高系统的响应速度，当有任务到达时，通过复用已存在的线程，无需等待新线程的创建便能立即使用；")]),a._v(" "),t("p",[a._v("（3）方便线程并发数的管控。因为线程若是无限制的创建，可能会导致内存占用过度而OOM，并且会造成CPU过度进行线程切换；")]),a._v(" "),t("p",[a._v("（4）提供更强大的功能。")]),a._v(" "),t("h3",{attrs:{id:"_2、线程池的主要参数"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2、线程池的主要参数"}},[a._v("#")]),a._v(" 2、线程池的主要参数")]),a._v(" "),t("div",{staticClass:"language-java line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("public")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("ThreadPoolExecutor")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("int")]),a._v(" corePoolSize"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("int")]),a._v(" maximumPoolSize"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("long")]),a._v(" keepAliveTime"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("TimeUnit")]),a._v(" unit"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("BlockingQueue")]),t("span",{pre:!0,attrs:{class:"token generics"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("<")]),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Runnable")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v(" workQueue"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("this")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("corePoolSize"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" maximumPoolSize"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" keepAliveTime"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" unit"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" workQueue"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n            "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Executors")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("defaultThreadFactory")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" defaultHandler"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n\n")])]),a._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[a._v("1")]),t("br"),t("span",{staticClass:"line-number"},[a._v("2")]),t("br"),t("span",{staticClass:"line-number"},[a._v("3")]),t("br"),t("span",{staticClass:"line-number"},[a._v("4")]),t("br"),t("span",{staticClass:"line-number"},[a._v("5")]),t("br")])]),t("p",[a._v("1）corePoolSize（核心线程数---线程池的基本大小）：当向线程池提交一个任务时，若线程池已创建的线程数小于corePoolSize，即便此时存在空闲线程，也会创建一个新的线程来执行该任务，直到已创建线程数大于或等于corePoolSize时；")]),a._v(" "),t("p",[a._v("2）maximumPoolSize（最大线程数）：线程池所允许的最大线程个数。当队列满了，且已创建的线程数小于maximumPoolSize时，则线程池会创建新的线程来执行该任务，对于无界队列，可忽视此参数；")]),a._v(" "),t("p",[a._v("3）keepAliveTime（线程存活保持时间）当线程池中线程数大于核心线程数时，线程的空闲时间如果超过了线程存活时间，那么该线程就会被销毁，直到线程池中的线程数小于等于核心线程数；")]),a._v(" "),t("p",[a._v("4）workQueue（任务队列）：用于传输和保存等待执行任务的阻塞队列；")]),a._v(" "),t("p",[a._v("5）threadFactory（线程工厂）：用于创建新的线程。threadFactory创建的线程也是采用new Thread()方式，threadFactory创建的线程名都具有统一的风格：pool-m-thread-n（m为线程池的编号，n为线程池内的线程编号）。")]),a._v(" "),t("p",[a._v("6）handler（线程饱和策略）：当线程池和队列都满了，再加入线程会执行此策略。")]),a._v(" "),t("h3",{attrs:{id:"_3、线程池流程"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3、线程池流程"}},[a._v("#")]),a._v(" 3、线程池流程")]),a._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/ce8be2db61cf451b95f9d0305efa5d0f.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_15,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),a._v(" "),t("p",[a._v("1）判断核心线程数是否已满：未满则创建新的线程执行任务；")]),a._v(" "),t("p",[a._v("2）判断任务队列是否已满，没满则将所提交的任务添加到工作队列中；")]),a._v(" "),t("p",[a._v("3）判断整个线程池是否已满，没满则创建一个新的线程来执行任务，已满则执行饱和策略。")]),a._v(" "),t("h3",{attrs:{id:"_4、线程池为什么需要使用阻塞队列"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4、线程池为什么需要使用阻塞队列"}},[a._v("#")]),a._v(" 4、线程池为什么需要使用阻塞队列？")]),a._v(" "),t("p",[a._v("1、因为线程若是无限制的创建，可能会导致内存占用过多而产生OOM，并且会造成cpu过度切换。")]),a._v(" "),t("p",[a._v("2、创建线程池的消耗较高。")]),a._v(" "),t("h3",{attrs:{id:"_5、线程池为什么要使用阻塞队列而不用非阻塞队列"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_5、线程池为什么要使用阻塞队列而不用非阻塞队列"}},[a._v("#")]),a._v(" 5、线程池为什么要使用阻塞队列而不用非阻塞队列？")]),a._v(" "),t("p",[a._v("阻塞队列可以保证任务队列中没有任务时阻塞获取任务的线程，使得线程进入wait状态，释放cpu资源。")]),a._v(" "),t("p",[a._v("当队列中有任务时才唤醒对应线程从队列中取出消息进行执行。使得在线程不至于一直占用cpu资源。")]),a._v(" "),t("h3",{attrs:{id:"_6、如何配置线程池"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_6、如何配置线程池"}},[a._v("#")]),a._v(" 6、如何配置线程池")]),a._v(" "),t("p",[a._v("`CPU密集型任务")]),a._v(" "),t("p",[a._v("尽量使用较小的线程池，一般为CPU核心数+1。 因为CPU密集型任务使得CPU使用率很高，若开过多的线程数，会造成CPU过度切换。")]),a._v(" "),t("p",[a._v("IO密集型任务")]),a._v(" "),t("p",[a._v("可以使用稍大的线程池，一般为2*CPU核心数。 IO密集型任务CPU使用率并不高，因此可以让CPU在等待IO的时候有其他线程去处理别的任务，充分利用CPU时间。`")]),a._v(" "),t("p",[a._v("混合型任务")]),a._v(" "),t("p",[a._v("可以将任务分成IO密集型和CPU密集型任务，然后分别用不同的线程池去处理。 只要分完之后两个任务的执行时间相差不大，那么就会比串行执行来的高效。")]),a._v(" "),t("p",[a._v("因为如果划分之后两个任务执行时间有数据级的差距，那么拆分没有意义。")]),a._v(" "),t("p",[a._v("因为先执行完的任务就要等后执行完的任务，最终的时间仍然取决于后执行完的任务，而且还要加上任务拆分与合并的开销，得不偿失。")]),a._v(" "),t("h3",{attrs:{id:"_7、java中提供的线程池"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_7、java中提供的线程池"}},[a._v("#")]),a._v(" 7、Java中提供的线程池")]),a._v(" "),t("p",[a._v("Executors类提供了4种不同的线程池：newCachedThreadPool, newFixedThreadPool, newScheduledThreadPool, newSingleThreadExecutor")]),a._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/a7f92b18b0f045d582cb8111fa207405.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbGVlZGNvZGVKb2huMDE=,size_19,color_FFFFFF,t_70,g_se,x_16",alt:"在这里插入图片描述"}})]),a._v(" "),t("p",[a._v("1、newCachedThreadPool：用来创建一个可以无限扩大的线程池，适用于负载较轻的场景，执行短期异步任务。（可以使得任务快速得到执行，因为任务时间执行短，可以很快结束，也不会造成cpu过度切换）")]),a._v(" "),t("p",[a._v("2、newFixedThreadPool：创建一个固定大小的线程池，因为采用无界的阻塞队列，所以实际线程数量永远不会变化，适用于负载较重的场景，对当前线程数量进行限制。（保证线程数可控，不会造成线程过多，导致系统负载更为严重）")]),a._v(" "),t("p",[a._v("3、newSingleThreadExecutor：创建一个单线程的线程池，适用于需要保证顺序执行各个任务。")]),a._v(" "),t("p",[a._v("4、newScheduledThreadPool：适用于执行延时或者周期性任务。")]),a._v(" "),t("h3",{attrs:{id:"_8、execute-和submit-方法"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_8、execute-和submit-方法"}},[a._v("#")]),a._v(" 8、execute()和submit()方法")]),a._v(" "),t("p",[a._v("1、execute()，执行一个任务，没有返回值。")]),a._v(" "),t("p",[a._v("2、submit()，提交一个线程任务，有返回值。")]),a._v(" "),t("p",[a._v("submit(Callable"),t("T",[a._v(" task)能获取到它的返回值，通过future.get()获取（阻塞直到任务执行完）。一般使用FutureTask+Callable配合使用（IntentService中有体现）。")])],1),a._v(" "),t("p",[a._v("submit(Runnable task, T result)能通过传入的载体result间接获得线程的返回值。")]),a._v(" "),t("p",[a._v("submit(Runnable task)则是没有返回值的，就算获取它的返回值也是null。")]),a._v(" "),t("p",[a._v("Future.get方法会使取结果的线程进入阻塞状态，知道线程执行完成之后，唤醒取结果的线程，然后返回结果。")]),a._v(" "),t("h3",{attrs:{id:"java线程池的运行过程"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#java线程池的运行过程"}},[a._v("#")]),a._v(" Java线程池的运行过程：")]),a._v(" "),t("p",[a._v("1）当有任务进入时，先判断当前线程池的线程数是否已达核心线程数，如果未到，则直接创建一个新的线程执行该任务；")]),a._v(" "),t("p",[a._v("2）如果此时已经到达核心线程数，就会将该任务放入到任务队列中，等待执行；")]),a._v(" "),t("p",[a._v("3）如果任务队列也满了，则此时会判断当前线程数是否小于最大线程数，如果小于则会创建新的线程来执行任务；")]),a._v(" "),t("p",[a._v("4）如果当前线程池中的线程数已达最大线程数，则会调用handler饱和策略进行处理。")])])}),[],!1,null,null,null);t.default=n.exports}}]);