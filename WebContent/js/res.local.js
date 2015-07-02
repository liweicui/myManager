var resName = {
    /*社交邀请报表*/
    "SOCINVISDK_INVITETRANSRATE":"成功激活数/展示数用户数<br>描述整个社交邀请功能的转化情况",
    "SOCINVISDK_AFFIRMINVITETRANSRATE":"确认邀请人数/展示用户数<br>描述当用户看到邀请功能后参与邀请行为的转化情况",
    "SOCINVISDK_INSTALLTRANSRATE":"接受邀请安装人数/确认邀请人数<br>描述当用户发出邀请后接受安装用户的转化情况",
    "SOCINVISDK_ACTIVATETRANSRATE":"接受邀请激活人数/接受邀请安装人数<br>描述用户在接受邀请并安装后激活应用的转化情况，可反映邀请的质量",
    
    "SOCINVISDK_DAILYACTIVEUSER":"运行了SDK的设备量",
    "SOCINVISDK_DAILYIMPRESSIONINVITEUSER":"看到“邀请按钮”的用户数",
    "SOCINVISDK_DAILYCLICKINVITEUSER":"点击“邀请按钮”的用户数",
    "SOCINVISDK_DAILYCONFIRMINVITEUSER":"点击“确认按钮”的用户数,描述向朋友发出邀请的用户数",
    "SOCINVISDK_DAILYACCEPtINVITEINSTALLUSER":"收到邀请短信并点击链接安装App的用户数",
    "SOCINVISDK_DAILYACCEPTEINVITENEWUSER":"安装并启动了App的设备数",
    "SOCINVISDK_INSTALLTRANSRATE":"接受邀请安装人数/确认发出邀请人数",
    /*社交广告报表*/
    "SOCADVESDK_ADVEEFFECTCONVERTRATE":"成功激活数/广告展示用户数<br>描述整个社交广告功能的转化情况",
    "SOCADVESDK_ADVECLICKCONVERTRATE":"点广告用户数/广告展示用户数<br>描述当用户看到广告后进入广告行为的转化情况",
    "SOCADVESDK_DOWNLOADCONVERTRATE":"完成下载人数/点广告用户数<br>描述用户在点击广告后真正完成下载行为的转化情况",
    "SOCADVESDK_INSTALLCONVERTRATE":"完成安装数/完成下载次数<br>描述用户下载后进行并完成安装行为的转化情况",
    "SOCADVESDK_ACTIVATECONVERTRATE":"成功激活数/完成安装数<br>描述用户完成安装后进行激活行为的转化情况",
    
    "SOCADVESDK_DAILYACTIVEUSER":"运行了SDK的设备量",
    "SOCADVESDK_DAILYIMPRESSIONADUSER":"看到“广告内容”的用户数",
    "SOCADVESDK_DAILYCLICKADUSER":"点击“广告内容”的用户数",
    "SOCADVESDK_DAILYFINISHDOWNLOADUSER":"通过广告获取资源包并成功下载的设备数",
    "SOCADVESDK_DAILYFINISHDOWNLOADS":"通过广告获取资源包进行下载的次数",
    "SOCADVESDK_DAILYFINISHINSTALLUSER":"下载成功后完成安装的设备数",
    "SOCADVESDK_DAILYNEWUSER":"安装并启动了App的设备数",
    /*Push报表*/
    "SOCPUSHSDK_PUSHCONVERTRATE":"查看人数/发送人数<br>描述PUSH功能在发送后用户查看的转化情况",
    "SOCPUSHSDK_ACCEPTCONVERTRATE":"接收人数/发送人数<br>描述PUSH发送成功后用户接收成功的转化情况",
    "SOCPUSHSDK_VIEWCONVERTRATE":"查看人数/接收人数<br>描述用户在接收到PUSH后进行查看的转化情况",
    
    "SOCPUSHSDK_DAILYSENDUSER":"push内容发出的人数",
    "SOCPUSHSDK_DAILYSENDS":"push内容发出的条数",
    "SOCPUSHSDK_DAILYRECEIVEUSER":"接收到push内容的人数",
    "SOCPUSHSDK_DAILYVIEWUSER":"点击查看push的人数",
   
    /*自定义事件*/
    "CUSTOMEVENTREPORT_ACTIONID":"统计点编号",
    "CUSTOMEVENTREPORT_UDNAME":"事件被用户请求的次数",
    "CUSTOMEVENTREPORT_STARTTIMESRATE":"事件次数：该事件被用户请求的次数<br>启动次数: 该事件所在SDK被启动的次数",
    
    /*转化漏斗*/
    "CONVERSIONFUNNELREPORT_FIRSTSTEPNAME":"漏斗开始的第一步",
    "CONVERSIONFUNNELREPORT_LASTSTEPNAME":"漏斗结束的最后一步",
    "CONVERSIONFUNNELREPORT_TIMESRATE":"目标步骤/结束步骤(按发起请求的次数)",
    "CONVERSIONFUNNELREPORT_USERRATE":"目标步骤/结束步骤（按发起请求的人数）",
    
    /*APP用户分析*/
    "APPTERMINALUSER_NEWINST":"第一次安装并启动了App的设备量",
    "APPTERMINALUSER_UNINST":"卸载掉App的设备量",
    "APPTERMINALUSER_ACTIVE":"运行了App的设备量",
    "APPTERMINALUSER_TOTAL":"从开始统计的第一天至所选结束日期内总安装的设备量",
    
    /*APP收集详情*/
    "APPCOLLINSTALLDETAIL_NUMBEROFSTARTS":"App被启动的次数/启动设备数<br>描述该App在每个设备平均启动的次数",
    "APPCOLLINSTALLDETAIL_NUMBEROFSTARTSAVG":"该类App总启动次数/该类用户数<br>App所在类的人均启动次数",
    "APPCOLLINSTALLDETAIL_SUCHSTARTTIMES":"App按启动次数在所在类的排名情况",
    "APPCOLLINSTALLDETAIL_ALLSUCHSTARTTIMES":"App按启动次数在所有App中的排名情况",

    "APPCOLLINSTALLDETAIL_PERCAPITAUSERTIME":"App被使用的时长/启动设备数<br>描述该App在每个设备平均使用的时长",
    "APPCOLLINSTALLDETAIL_SUCHPERCAPITAUSERTIME":"该类App使用总时长/该类用户数<br>App所在类的平均使用时长",
    "APPCOLLINSTALLDETAIL_PERCAPITAUSERTIMERANKING":"App按使用时长在所在类的排名情况",
    "APPCOLLINSTALLDETAIL_ALLPERCAPITAUSERTIMERANKING":"App按使用时长在所有App中的排名情况",
    
    "APPCOLLINSTALLDETAIL_SUCHUNEWLYINCREASED":"App所在类的平均新增用户数",
    "APPCOLLINSTALLDETAIL_SUCHUNEWLYINCREASEDRANKING":"App按新增用户数在所在类的排名情况",
    "APPCOLLINSTALLDETAIL_ALLSUCHUNEWLYINCREASEDRANKING":"App按新增用户数在所有App中的排名情况",
    
    "APPCOLLINSTALLDETAIL_SUCHUAVGUNINSTALL":"App所在类的平均卸载用户数",
    "APPCOLLINSTALLDETAIL_SUCHUAVGUNINSTALLRANKING":"App按卸载用户数在所在类的排名情况",
    "APPCOLLINSTALLDETAIL_ALLSUCHUAVGUNINSTALLRANKING":"App按卸载用户数在所有App中的排名情况",
    
    "APPCOLLINSTALLDETAIL_SUCHUAVGACTIVE":"App所在类的平均活跃用户数",
    "APPCOLLINSTALLDETAIL_SUCHUAVGACTIVERANKING":"App按活跃用户数在所在类的排名情况",
    "APPCOLLINSTALLDETAIL_ALLSUCHUAVGACTIVERANKING":"App按活跃用户数在所有App中的排名情况",
  
    
    "APPCOLLINSTALLDETAIL_SUCHUAVGINSTALL":"App所在类的平均安装总量",
    "APPCOLLINSTALLDETAIL_SUCHUAVGINSTALLRANKING":"App按安装总量在所在类的排名情况",
    "APPCOLLINSTALLDETAIL_ALLSUCHUAVGINSTALL":"App按安装总量在所有App中的排名情况",
    
    //app应用统计
    "APPREPORT_APPINSTALLUERS":"第一次安装并启动了App的设备量",
    "APPREPORT_APPINSTALLUSERSINCREASE":"(本期-上期)/上期<br>上一个统计周期进行比较",
    "APPREPORT_APPUNINSTALLUERS":"卸载掉App的设备量",
    "APPREPORT_APPACTIVEUERS":"运行了App的设备量",
    "APPREPORT_APPTOTALUERS":"从开始统计的第一天至所选结束日期内总安装的设备量",
    "APPREPORT_SORTOCCUPANCY":"该类安装用户数/总用户数<br>该类在整个市场中所在的比重",
    "APPREPORT_APPOCCUPANCY":"App安装用户数/该类安装用户数<br>该App在市场同类产品中所在的比重",
    	
   //app安装分析
    "APPCOLLINSTALLOVERVIEW_INSTALLNEWUSER":"每台设备新安装APP的数量之和",
    "APPCOLLINSTALLOVERVIEW_UNSTALLUSER":"每台设备卸载APP的数量之和",
    "APPCOLLINSTALLOVERVIEW_ACTIVEUSER":"每台设备被启动过APP的数量之和",
    "APPCOLLINSTALLOVERVIEW_INSTALLTOTAL":"从开始统计的第一天至所选结束日期内总安装的APP量",
    
   
   //游戏收入坏账对比
	"GAME_REVENUE_OFFSET_RATE":"(乐逗收入-运营商收入)/运营商收入",
		
	"GAME_REVENUE_BAD_RATE":"(乐逗收入(含坏账)-乐逗收入)/乐逗收入",
	
	
	//游戏概况
	"GAME_NEW_USER":"同一个用户可能玩过公司多个产品,每新玩一个公司产品,该产品新增用户加1.<br/> 例：A用户已玩过神庙逃亡，第一次玩水果忍者,则水果忍者的用户增加1(版本/渠道同理).",
	"GAME_NEW_USER_PERCENTAGE":"产品新增用户/累积用户",
	
	//app收集分析
	"APPCOLLINSTALLOVERVIEW_PERCENTAGESTR":"在总量中的占比."
	
};