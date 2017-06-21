 <%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
 <jsp:useBean id="loginBean" class="com.bean.Login" scope="session"></jsp:useBean>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>管理员登录界面</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<link rel="stylesheet" href="../css/admin/admin.css">
</head>
<body>
<div id="top_content">
  <h1 style="text-align: center;line-height: 80px;letter-spacing: 20px;">管理员界面</h1>
  <div class='top_content_pic'>
	  	<span class="top_main_page">
	  	<i class='top_content_picture_1'></i>
	  	<p>主页面</p>
	  </span>
	  <span class="top_account_user">
	  	<i class='top_content_picture_2'></i>
	  	<p>用户名 </p><a href="javascript:void(0);" class="top_user_name"><jsp:getProperty property="backNews" name="loginBean" /></a>
	  </span>
	  <span class="top_exit">
	  	<i class='top_content_picture_3'></i>
	  	<p>退出</p>
	  </span>
  </div>
 <!--顶层内容图片 -->
</div>
<!-- 顶层 -->
<div id="main_body">
	<div class="main_box_left">
		<dl>
	        <dt><i class="dt_title_1 dt_title"></i><p class="dt_title_content">学生信息</p></dt>
		  	<dd class="SearchStudentmessages"><i class="dd_content"></i><p>查询学生信息</p></dd>
		  	<dd class="ModifyStudentmessages"><i class="dd_content"></i><p>修改学生信息</p></dd>
		</dl>
		<dl>
	        <dt><i class="dt_title_2 dt_title"></i><p class="dt_title_content">教师信息</p></dt>
		  	<dd class="SearchTeachermessages"><i class="dd_content"></i><p>查询教师信息</p></dd>
		  	<dd class="ModifyTeachermessages"><i class="dd_content"></i><p>修改教师信息</p></dd>
		</dl>
		<dl>
	        <dt><i class="dt_title_3 dt_title"></i><p class="dt_title_content">管理员信息</p></dt>
		  	<dd class="Addadmin"><i class="dd_content"></i><p>添加管理员</p></dd>
		  	<dd class="Deladmin"><i class="dd_content"></i><p>删除管理员</p></dd>
		</dl>
		<dl>
	        <dt><i class="dt_title_4 dt_title"></i><p class="dt_title_content">课程信息</p></dt>
		  	<dd class="Searchclass"><i class="dd_content"></i><p>查询课程信息</p></dd>
		  	<dd class="Modifyclass"><i class="dd_content"></i><p>修改课程信息</p></dd>
		  	<dd class="Addclass"><i class="dd_content"></i><p>添加课程信息</p></dd>
		  	<dd class="Delclass"><i class="dd_content"></i><p>删除课程信息</p></dd>
		</dl>
		<dl>
	        <dt><i class="dt_title_5 dt_title"></i><p class="dt_title_content">教学安排</p></dt>
		  	<dd class="Searchplan"><i class="dd_content"></i><p>查询教学安排</p></dd>
		  	<dd class="Modifyplan"><i class="dd_content"></i><p>修改教学安排</p></dd>
		  	<dd class="Addplan"><i class="dd_content"></i><p>添加教学安排</p></dd>
		  	<dd class="Delplan"><i class="dd_content"></i><p>删除教学安排</p></dd>
		</dl>
	 </div>
	<div class="main_box_right">
	      <div class="result_box"></div>
	      <div class="pager" style="display:none;"></div>
		  <div class="pager2" style="display:none;"></div>
		  <div class="pager3" style="display:none;"></div>
		  <div class="pager4" style="display:none;"></div>
		  <div class="pager5" style="display:none;"></div>
		  <div class="pager6" style="display:none;"></div>
		  <div class="pager7" style="display:none;"></div>
		  <div class="pager8" style="display:none;"></div>
		  <div class="pager9" style="display:none;"></div>
		  <div class="pager10" style="display:none;"></div>
		  <div class="pager11" style="display:none;"></div>
		  <div class="pager12" style="display:none;"></div>
		  <div class="pager13" style="display:none;"></div>
		  <div class="pager14" style="display:none;"></div>
		  <div class="pager15" style="display:none;"></div>
    </div>
    <div class="add_box" style="display:none;"></div>
    <div class="add_box2" style="display:none;"></div>
    <div class="add_box3" style="display:none;"></div>
    <div class="info" style="display:none;"></div> 
    <div class="info2" style="display:none;"></div> 
    <div class="info3" style="display:none;"></div> 
	<div class="del_box" style="display:none;"></div>
<div id="footer" style="text-align: center;">Copyright ©2017 一米阳光!</div>
<script src="../js/jquery.js" type="text/javascript"></script>
<script src="../js/admin/admin.js" type="text/javascript" charset="utf-8"></script>
<script src="../js/jquery.validate.js" type="text/javascript" charset="utf-8"></script>
<script src="../js/admin/jquery.paging.js" type="text/javascript" charset="utf-8"></script>
<script src="../js/jquery.ajaxform.js" type="text/javascript" charset="utf-8"></script>
</body>
</html>
