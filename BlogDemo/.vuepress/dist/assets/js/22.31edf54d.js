(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{428:function(v,r,_){"use strict";_.r(r);var t=_(2),e=Object(t.a)({},(function(){var v=this,r=v._self._c;return r("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[r("h3",{attrs:{id:"_1、微服务的优点"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_1、微服务的优点"}},[v._v("#")]),v._v(" 1、微服务的优点：")]),v._v(" "),r("p",[r("strong",[v._v("关键点：复杂度可控，独立按需扩展，技术选型灵活，容错，可用性高")])]),v._v(" "),r("p",[v._v("①它解决了复杂性的问题。它会将一种怪异的整体应用程序分解成一组服务。虽然功能总量 不变，但应用程序已分解为可管理的块或服务。每个服务都以RPC或消息驱动的API的形式定义了一个明确的边界；Microservice架构模式实现了一个模块化水平。")]),v._v(" "),r("p",[v._v("②这种架构使每个服务都能够由专注于该服务的团队独立开发。开发人员可以自由选择任何有用的技术，只要该服务符合API合同。当然，大多数组织都希望避免完全无政府状态并\n限制技术选择。然而，这种自由意味着开发人员不再有义务使用在新项目开始时存在的可能过时的技术。在编写新服务时，他们可以选择使用当前的技术。此外，由于服务相对较小，因此使用当前技术重写旧服务变得可行。")]),v._v(" "),r("p",[v._v("③Microservice架构模式使每个微服务都能独立部署。开发人员不需要协调部署本地服务的变更。这些变化可以在测试后尽快部署。例如，UI团队可以执行A | B测试，并快速迭代\nUI更改。Microservice架构模式使连续部署成为可能。")]),v._v(" "),r("p",[v._v("④Microservice架构模式使每个服务都可以独立调整。您可以仅部署满足其容量和可用性限制的每个服务的实例数。此外，您可以使用最符合服务资源要求的硬件。")]),v._v(" "),r("h3",{attrs:{id:"_2、微服务的缺点"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_2、微服务的缺点"}},[v._v("#")]),v._v(" 2、微服务的缺点")]),v._v(" "),r("p",[r("strong",[v._v("关键点（挑战）")]),v._v("：多服务运维难度，系统部署依赖，服务间通信成本，数据一致性，系统集成测试，重复工作，性能监控等")]),v._v(" "),r("ul",[r("li",[r("p",[v._v("一个缺点是名称本身。术语microservice过度强调服务规模。但重要的是要记住，这是一种手段，而不是主要目标。微服务的目标是充分分解应用程序，以便于敏捷应用程序开发和部署。")])]),v._v(" "),r("li",[r("p",[v._v("微服务器的另一个主要缺点是分布式系统而产生的复杂性。开发人员需要选择和实现基于消息传递或RPC的进程间通信机制。此外，他们还必须编写代码来处理部分故障，因为请求的目的地可能很慢或不可用。")])]),v._v(" "),r("li",[r("p",[v._v("微服务器的另一个挑战是分区数据库架构。更新多个业务实体的业务交易是相当普遍的。但是，在基于微服务器的应用程序中，您需要更新不同服务所拥有的多个数据库。使用分布式事务通常不是一个选择，而不仅仅是因为CAP定理。许多今天高度可扩展的NoSQL数据库都不支持它们。你最终不得不使用最终的一致性方法，这对开发人员来说更具挑战性。")])]),v._v(" "),r("li",[r("p",[v._v("测试微服务应用程序也更复杂。服务类似的测试类将需要启动该服务及其所依赖的任何服务（或至少为这些服务配置存根）。再次，重要的是不要低估这样做的复杂性。")])]),v._v(" "),r("li",[r("p",[v._v("Microservice架构模式的另一个主要挑战是实现跨越多个服务的更改。例如，我们假设您正在实施一个需要更改服务A，B和C的故事，其中A取决于B和B取决于C.在单片应用程序中，您可以简单地更改相应的模块，整合更改，并一次性部署。相比之下，在Microservice架构模式中，您需要仔细规划和协调对每个服务的更改。例如，您需要更新服务C，然后更新服务B，然后再维修A.幸运的是，大多数更改通常仅影响一个服务，而需要协调的多服务变更相对较少。")])]),v._v(" "),r("li",[r("p",[v._v("部署基于微服务的应用程序也更复杂。单一应用程序简单地部署在传统负载平衡器后面的一组相同的服务器上。每个应用程序实例都配置有基础架构服务（如数据库和消息代理）的位置（主机和端口）。相比之下，微服务应用通常由大量服务组成。例如，每个服务将有多个运行时实例。更多的移动部件需要进行配置，部署，扩展和监控。此外，您还需要实现服务发现机制，使服务能够发现需要与之通信的任何其他服务的位置（主机和端口）。传统的基于故障单和手动操作的方法无法扩展到这种复杂程度。因此，成功部署微服务应用程序需要开发人员更好地控制部署方法，并实现高水平的自动化。")])])])])}),[],!1,null,null,null);r.default=e.exports}}]);